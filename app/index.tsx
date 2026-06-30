import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions, Platform, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const starsOpacity = useRef(new Animated.Value(0)).current;
  const titleOpacity = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(12)).current;
  const subtitleOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(starsOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.parallel([
        Animated.timing(titleOpacity, {
          toValue: 1,
          duration: 900,
          useNativeDriver: true,
        }),
        Animated.timing(titleY, {
          toValue: 0,
          duration: 900,
          useNativeDriver: true,
        }),
      ]),
      Animated.delay(300),
      Animated.timing(subtitleOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
      Animated.delay(400),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={[Colors.nightSky, Colors.deepBlue, Colors.duskBlue]}
      style={styles.container}
      start={{ x: 0.3, y: 0 }}
      end={{ x: 0.7, y: 1 }}
    >
      {/* Star field */}
      <Animated.View style={[styles.starsLayer, { opacity: starsOpacity }]}>
        {STARS.map((star) => (
          <View
            key={star.id}
            style={[
              styles.star,
              { top: star.top, left: star.left, width: star.size, height: star.size, opacity: star.opacity },
            ]}
          />
        ))}
      </Animated.View>

      {/* Mountain silhouettes */}
      <View style={styles.mountainRow}>
        <View style={[styles.mountain, styles.mountainLeft]} />
        <View style={[styles.mountain, styles.mountainCenter]} />
        <View style={[styles.mountain, styles.mountainRight]} />
      </View>

      {/* Title block */}
      <Animated.View
        style={[styles.titleBlock, { opacity: titleOpacity, transform: [{ translateY: titleY }] }]}
      >
        <Text style={styles.titleThe}>The</Text>
        <Text style={styles.titleMain}>Goodest</Text>
        <Text style={styles.titleMain}>Good News</Text>
        <Animated.Text style={[styles.subtitle, { opacity: subtitleOpacity }]}>
          A Children's Story
        </Animated.Text>
        <Animated.Text style={[styles.author, { opacity: subtitleOpacity }]}>
          by Erik Meyers
        </Animated.Text>
      </Animated.View>

      {/* Begin button — appears last, user must tap to proceed */}
      <Animated.View style={[styles.beginWrapper, { opacity: buttonOpacity }]}>
        <TouchableOpacity
          style={styles.beginButton}
          onPress={() => router.replace('/dedication')}
          activeOpacity={0.7}
        >
          <Text style={styles.beginText}>Begin</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const STARS = [
  { id: 1,  top: '8%',  left: '12%', size: 4,   opacity: 0.9  },
  { id: 2,  top: '14%', left: '28%', size: 3,   opacity: 0.7  },
  { id: 3,  top: '6%',  left: '50%', size: 5,   opacity: 1.0  },
  { id: 4,  top: '11%', left: '68%', size: 3,   opacity: 0.6  },
  { id: 5,  top: '18%', left: '82%', size: 4,   opacity: 0.8  },
  { id: 6,  top: '5%',  left: '90%', size: 2,   opacity: 0.5  },
  { id: 7,  top: '22%', left: '40%', size: 3,   opacity: 0.7  },
  { id: 8,  top: '9%',  left: '75%', size: 2,   opacity: 0.9  },
  { id: 9,  top: '26%', left: '15%', size: 3,   opacity: 0.6  },
  { id: 10, top: '4%',  left: '35%', size: 2,   opacity: 0.8  },
  { id: 11, top: '16%', left: '58%', size: 4,   opacity: 0.7  },
  { id: 12, top: '30%', left: '88%', size: 3,   opacity: 0.5  },
];

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  starsLayer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '60%',
  },
  star: {
    position: 'absolute',
    borderRadius: 99,
    backgroundColor: Colors.starGlow,
  },
  mountainRow: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: height * 0.28,
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  mountain: {
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: Colors.forestGreen,
    width: 0,
    height: 0,
  },
  mountainLeft: {
    borderLeftWidth: 100,
    borderRightWidth: 100,
    borderBottomWidth: 160,
    marginRight: -40,
    opacity: 0.6,
  },
  mountainCenter: {
    borderLeftWidth: 140,
    borderRightWidth: 140,
    borderBottomWidth: 220,
    zIndex: 2,
    opacity: 0.85,
  },
  mountainRight: {
    borderLeftWidth: 110,
    borderRightWidth: 110,
    borderBottomWidth: 175,
    marginLeft: -40,
    opacity: 0.65,
  },
  titleBlock: {
    alignItems: 'center',
    marginBottom: height * 0.26,
    paddingHorizontal: 24,
  },
  titleThe: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 22,
    color: Colors.cream,
    letterSpacing: 4,
    textTransform: 'uppercase',
    marginBottom: 4,
    opacity: 0.85,
  },
  titleMain: {
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontSize: 46,
    color: Colors.gold,
    letterSpacing: 1,
    lineHeight: 54,
    textShadowColor: Colors.goldGlow,
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 14,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.cream,
    letterSpacing: 3.5,
    textTransform: 'uppercase',
    marginTop: 18,
    opacity: 0.65,
  },
  author: {
    fontSize: 12,
    color: Colors.cream,
    letterSpacing: 2,
    marginTop: 8,
    opacity: 0.5,
  },
  beginWrapper: {
    position: 'absolute',
    bottom: height * 0.32,
  },
  beginButton: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(212,168,67,0.5)',
  },
  beginText: {
    fontSize: 13,
    color: Colors.cream,
    letterSpacing: 3,
    textTransform: 'uppercase',
    opacity: 0.8,
  },
});
