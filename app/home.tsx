import { useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Platform,
  Image,
  useWindowDimensions,
} from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

export type StoryMode = 'read-to-me' | 'read-myself';

interface ModeButtonProps {
  label: string;
  description: string;
  onPress: () => void;
  delay: number;
}

function ModeButton({ label, description, onPress, delay }: ModeButtonProps) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(18)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 600,
        delay,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <Animated.View style={{ opacity, transform: [{ translateY }], width: '100%' }}>
      <TouchableOpacity style={styles.modeButton} onPress={onPress} activeOpacity={0.75}>
        <Text style={styles.modeButtonLabel}>{label}</Text>
        <Text style={styles.modeButtonDescription}>{description}</Text>
      </TouchableOpacity>
    </Animated.View>
  );
}

export default function HomeScreen() {
  const headerOpacity = useRef(new Animated.Value(0)).current;
  const headerY = useRef(new Animated.Value(14)).current;
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    Animated.parallel([
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 900,
        useNativeDriver: true,
      }),
      Animated.timing(headerY, {
        toValue: 0,
        duration: 900,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const navigateToStory = (mode: StoryMode) => {
    router.push({ pathname: '/story', params: { mode } });
  };

  return (
    <View style={styles.container}>
      {/* Cover artwork — rendered at 2× screen width so only the left half is visible.
          The baked-in title text sits in the top-right of the artwork and is clipped off-screen. */}
      <Image
        source={require('@/assets/images/Cover_GGN.jpg')}
        style={[styles.bgImage, { width: width * 2, height, top: 0, left: 0 }]}
        resizeMode="cover"
      />

      {/* Overlay: uniform dim for readability across the full screen */}
      <LinearGradient
        colors={[
          'rgba(13,27,42,0.60)',
          'rgba(13,27,42,0.55)',
          'rgba(13,27,42,0.65)',
          'rgba(13,27,42,0.80)',
        ]}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
      />

      {/* Content */}
      <View style={styles.content}>
        {/* Header */}
        <Animated.View
          style={[styles.header, { opacity: headerOpacity, transform: [{ translateY: headerY }] }]}
        >
          <Text style={styles.appTitle}>The Goodest{'\n'}Good News</Text>
          <View style={styles.titleDivider} />
          <Text style={styles.subtitle}>Choose how you want to enjoy the story.</Text>
        </Animated.View>

        {/* Mode buttons */}
        <View style={styles.buttonGroup}>
          <ModeButton
            label="Read to Me"
            description="Listen along as the story is narrated"
            onPress={() => navigateToStory('read-to-me')}
            delay={350}
          />
          <ModeButton
            label="Read by Myself"
            description="Turn pages at your own pace"
            onPress={() => navigateToStory('read-myself')}
            delay={520}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.nightSky,
    overflow: 'hidden',
  },
  bgImage: {
    position: 'absolute',
    left: 0,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  header: {
    alignItems: 'center',
    marginBottom: 52,
  },
  appTitle: {
    fontSize: 36,
    color: Colors.gold,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    textAlign: 'center',
    lineHeight: 46,
    letterSpacing: 0.5,
    textShadowColor: Colors.goldGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14,
  },
  titleDivider: {
    width: 44,
    height: 1.5,
    backgroundColor: Colors.gold,
    borderRadius: 1,
    marginVertical: 18,
    opacity: 0.6,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.cream,
    textAlign: 'center',
    letterSpacing: 0.5,
    opacity: 0.68,
    lineHeight: 23,
  },
  buttonGroup: {
    width: '100%',
    maxWidth: 380,
    gap: 14,
  },
  modeButton: {
    backgroundColor: 'rgba(15,34,54,0.88)',
    borderRadius: 14,
    paddingVertical: 22,
    paddingHorizontal: 28,
    borderWidth: 1,
    borderColor: 'rgba(212,168,67,0.4)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 5,
  },
  modeButtonLabel: {
    fontSize: 21,
    color: Colors.gold,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: 0.4,
    marginBottom: 5,
    textShadowColor: Colors.goldGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 8,
  },
  modeButtonDescription: {
    fontSize: 13,
    color: Colors.cream,
    opacity: 0.65,
    letterSpacing: 0.2,
    lineHeight: 19,
  },
});
