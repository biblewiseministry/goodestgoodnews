import { useState, useCallback, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Audio } from 'expo-av';
import {
  ChevronLeft,
  ChevronRight,
  House,
  BookOpen,
  Play,
  Pause,
  RotateCcw,
} from 'lucide-react-native';
import { Colors } from '@/constants/Colors';
import { storyData, StoryMode } from '@/data/storyData';

export default function StoryScreen() {
  const params = useLocalSearchParams<{ mode: string }>();
  const mode = ((Array.isArray(params.mode) ? params.mode[0] : params.mode) ?? 'read-myself') as StoryMode;

  const { width, height } = useWindowDimensions();
  const isLandscape = width > height;
  const isWeb = Platform.OS === 'web';
  // On web, always show the story regardless of orientation.
  const showStory = isLandscape || isWeb;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const soundRef = useRef<Audio.Sound | null>(null);
  const activeIndexRef = useRef(0);

  // ─── Lifecycle ────────────────────────────────────────────────────────────

  useEffect(() => {
    if (Platform.OS !== 'web') {
      Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
    }
    return () => { releaseSound(); };
  }, []);

  useEffect(() => {
    activeIndexRef.current = currentIndex;
    if (!showStory) {
      releaseSound();
      return;
    }
    if (storyData[currentIndex].type === 'back_cover') {
      releaseSound();
      return;
    }
    if (mode === 'read-to-me') {
      playNarration(currentIndex);
    }
  }, [currentIndex, showStory]);

  // ─── Audio ────────────────────────────────────────────────────────────────

  async function releaseSound() {
    const sound = soundRef.current;
    soundRef.current = null;
    setIsPlaying(false);
    if (sound) {
      try { await sound.stopAsync(); } catch (_) {}
      try { await sound.unloadAsync(); } catch (_) {}
    }
  }

  async function playNarration(index: number) {
    const spread = storyData[index];
    if (!spread.narration) { setIsPlaying(false); return; }

    // Synchronously clear ref so concurrent calls don't touch the same instance
    const prev = soundRef.current;
    soundRef.current = null;
    setIsPlaying(false);
    if (prev) {
      try { await prev.stopAsync(); } catch (_) {}
      try { await prev.unloadAsync(); } catch (_) {}
    }

    if (activeIndexRef.current !== index) return;

    let sound: Audio.Sound;
    try {
      const result = await Audio.Sound.createAsync(spread.narration, { shouldPlay: true });
      sound = result.sound;
    } catch (_) { setIsPlaying(false); return; }

    if (activeIndexRef.current !== index) {
      try { await sound.unloadAsync(); } catch (_) {}
      return;
    }

    soundRef.current = sound;
    setIsPlaying(true);

    sound.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded || !status.didJustFinish) return;
      setIsPlaying(false);
    });
  }

  async function handlePlayPause() {
    if (!soundRef.current) { playNarration(currentIndex); return; }
    try {
      const status = await soundRef.current.getStatusAsync();
      if (!status.isLoaded) { soundRef.current = null; playNarration(currentIndex); return; }
      if (status.isPlaying) {
        await soundRef.current.pauseAsync();
        setIsPlaying(false);
      } else {
        await soundRef.current.playAsync();
        setIsPlaying(true);
      }
    } catch (_) {}
  }

  async function handleReplay() {
    if (soundRef.current) {
      try {
        await soundRef.current.stopAsync();
        await soundRef.current.setPositionAsync(0);
        await soundRef.current.playAsync();
        setIsPlaying(true);
        return;
      } catch (_) {}
    }
    playNarration(currentIndex);
  }

  // ─── Navigation ───────────────────────────────────────────────────────────

  const goNext = useCallback(async () => {
    const next = currentIndex + 1;
    if (next >= storyData.length) return;
    await releaseSound();
    setCurrentIndex(next);
  }, [currentIndex]);

  const goPrev = useCallback(async () => {
    const prev = currentIndex - 1;
    if (prev < 0) return;
    await releaseSound();
    setCurrentIndex(prev);
  }, [currentIndex]);

  // ─── Keyboard navigation (web only) ──────────────────────────────────────

  useEffect(() => {
    if (Platform.OS !== 'web') return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'ArrowRight') goNext();
      if (e.key === 'ArrowLeft') goPrev();
    }
    (window as any).addEventListener('keydown', handleKey);
    return () => (window as any).removeEventListener('keydown', handleKey);
  }, [goNext, goPrev]);

  // ─── Render ───────────────────────────────────────────────────────────────

  if (!showStory) return <RotatePrompt />;

  const spread = storyData[currentIndex];
  const isFirst = currentIndex === 0;
  const isLast = currentIndex === storyData.length - 1;
  const isBackCover = spread.type === 'back_cover';
  const hasNarration = spread.narration !== null;

  return (
    <View style={{ width, height, backgroundColor: Colors.nightSky }}>
      {/*
        All pages pre-rendered in the native tree; only the active one is
        visible (opacity 1). Explicit width/height on every layer is required
        so React Native's Image can correctly calculate resizeMode="contain".
        With absoluteFill (right/bottom constraints), dimensions are implicit
        and the contain calculation breaks — the image renders at its natural
        decoded size, appearing zoomed in and cropped.
      */}
      <View
        style={{ position: 'absolute', top: 0, left: 0, width, height }}
        pointerEvents="none"
      >
        {storyData.map((item, i) => (
          <Image
            key={item.id}
            source={item.image}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width,
              height,
              opacity: i === currentIndex ? 1 : 0,
            }}
            resizeMode="contain"
          />
        ))}
      </View>

      {/* Left arrow */}
      <TouchableOpacity
        style={[styles.sideArrow, styles.sideArrowLeft, isFirst && styles.arrowHidden]}
        onPress={goPrev}
        activeOpacity={0.65}
        disabled={isFirst}
      >
        <View style={styles.arrowCircle}>
          <ChevronLeft color={Colors.cream} size={28} strokeWidth={2.5} />
        </View>
      </TouchableOpacity>

      {/* Right arrow */}
      <TouchableOpacity
        style={[styles.sideArrow, styles.sideArrowRight, isLast && styles.arrowHidden]}
        onPress={goNext}
        activeOpacity={0.65}
        disabled={isLast}
      >
        <View style={styles.arrowCircle}>
          <ChevronRight color={Colors.cream} size={28} strokeWidth={2.5} />
        </View>
      </TouchableOpacity>

      <TopBar
        currentIndex={currentIndex}
        total={storyData.length}
        onHome={async () => { await releaseSound(); router.replace('/home'); }}
      />

      {hasNarration && !isBackCover && (
        <AudioControls
          isPlaying={isPlaying}
          onPlayPause={handlePlayPause}
          onReplay={handleReplay}
        />
      )}

      {isBackCover && (
        <BackCoverActions
          onReadAgain={async () => { await releaseSound(); setCurrentIndex(0); }}
          onHome={async () => { await releaseSound(); router.replace('/home'); }}
        />
      )}
    </View>
  );
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function TopBar({
  currentIndex,
  total,
  onHome,
}: {
  currentIndex: number;
  total: number;
  onHome: () => void;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={[
        styles.topBar,
        { top: insets.top + 8, left: insets.left + 8, right: insets.right + 8 },
      ]}
    >
      <TouchableOpacity style={styles.topPill} onPress={onHome} activeOpacity={0.7}>
        <House color={Colors.cream} size={18} strokeWidth={2} />
        <Text style={styles.topPillText}>Home</Text>
      </TouchableOpacity>

      <View style={styles.topPill}>
        <Text style={styles.pageText}>{currentIndex + 1} / {total}</Text>
      </View>
    </View>
  );
}

function AudioControls({
  isPlaying,
  onPlayPause,
  onReplay,
}: {
  isPlaying: boolean;
  onPlayPause: () => void;
  onReplay: () => void;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.audioBar, { bottom: insets.bottom + 12, left: insets.left + 64 }]}>
      <TouchableOpacity style={styles.audioBtn} onPress={onReplay} activeOpacity={0.7}>
        <RotateCcw color={Colors.cream} size={18} strokeWidth={2} />
        <Text style={styles.audioBtnLabel}>Replay</Text>
      </TouchableOpacity>

      <View style={styles.audioDivider} />

      <TouchableOpacity style={styles.audioBtn} onPress={onPlayPause} activeOpacity={0.7}>
        {isPlaying
          ? <Pause color={Colors.gold} size={20} strokeWidth={2} />
          : <Play color={Colors.gold} size={20} strokeWidth={2} />
        }
        <Text style={[styles.audioBtnLabel, { color: Colors.gold }]}>
          {isPlaying ? 'Pause' : 'Play'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

function BackCoverActions({
  onReadAgain,
  onHome,
}: {
  onReadAgain: () => void;
  onHome: () => void;
}) {
  const insets = useSafeAreaInsets();
  return (
    <View style={[styles.audioBar, { bottom: insets.bottom + 12, left: insets.left + 64 }]}>
      <TouchableOpacity style={styles.audioBtn} onPress={onReadAgain} activeOpacity={0.7}>
        <RotateCcw color={Colors.gold} size={18} strokeWidth={2} />
        <Text style={[styles.audioBtnLabel, { color: Colors.gold }]}>Read Again</Text>
      </TouchableOpacity>

      <View style={styles.audioDivider} />

      <TouchableOpacity style={styles.audioBtn} onPress={onHome} activeOpacity={0.7}>
        <House color={Colors.cream} size={18} strokeWidth={2} />
        <Text style={styles.audioBtnLabel}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
}

function RotatePrompt() {
  return (
    <LinearGradient
      colors={[Colors.nightSky, Colors.deepBlue]}
      style={styles.rotateContainer}
    >
      <BookOpen color={Colors.gold} size={52} strokeWidth={1.5} />
      <Text style={styles.rotateTitle}>Please rotate your device</Text>
      <Text style={styles.rotateSub}>to read the story.</Text>
      <TouchableOpacity
        style={styles.rotateBack}
        onPress={() => router.replace('/home')}
        activeOpacity={0.75}
      >
        <Text style={styles.rotateBackText}>Back to Home</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  sideArrow: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    width: 56,
    zIndex: 10,
  },
  sideArrowLeft: { left: 0 },
  sideArrowRight: { right: 0 },
  arrowHidden: {
    opacity: 0,
    pointerEvents: 'none' as any,
  },
  arrowCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(13,27,42,0.55)',
    borderWidth: 1,
    borderColor: 'rgba(212,168,67,0.35)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBar: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    zIndex: 20,
  },
  topPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(13,27,42,0.6)',
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(212,168,67,0.3)',
  },
  topPillText: {
    fontSize: 13,
    color: Colors.cream,
    letterSpacing: 0.5,
    opacity: 0.9,
  },
  pageText: {
    fontSize: 13,
    color: Colors.gold,
    letterSpacing: 1,
  },
  audioBar: {
    position: 'absolute',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(13,27,42,0.6)',
    borderRadius: 24,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: 'rgba(212,168,67,0.3)',
    gap: 4,
    zIndex: 20,
  },
  audioBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingVertical: 3,
    paddingHorizontal: 7,
  },
  audioBtnLabel: {
    fontSize: 13,
    color: Colors.cream,
    letterSpacing: 0.4,
    opacity: 0.9,
  },
  audioDivider: {
    width: 1,
    height: 20,
    backgroundColor: 'rgba(212,168,67,0.3)',
    marginHorizontal: 4,
  },
  rotateContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 16,
    paddingHorizontal: 32,
  },
  rotateTitle: {
    fontSize: 22,
    color: Colors.cream,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    textAlign: 'center',
    marginTop: 8,
  },
  rotateSub: {
    fontSize: 16,
    color: Colors.cream,
    opacity: 0.65,
    textAlign: 'center',
  },
  rotateBack: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 28,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  rotateBackText: {
    fontSize: 15,
    color: Colors.gold,
    letterSpacing: 1,
  },
});
