import { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Animated, TouchableOpacity, Platform } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { Colors } from '@/constants/Colors';

export default function DedicationScreen() {
  const contentOpacity = useRef(new Animated.Value(0)).current;
  const buttonOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(contentOpacity, {
        toValue: 1,
        duration: 1100,
        useNativeDriver: true,
      }),
      Animated.delay(500),
      Animated.timing(buttonOpacity, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <LinearGradient
      colors={[Colors.warmCream, Colors.softParchment, '#E8D9B8']}
      style={styles.container}
      start={{ x: 0.2, y: 0 }}
      end={{ x: 0.8, y: 1 }}
    >
      <Animated.View style={[styles.dedicationBlock, { opacity: contentOpacity }]}>
        <Text style={styles.dedicatedTo}>Dedicated to</Text>
        <View style={styles.ornamentTop} />
        <Text style={styles.name}>Presley Rose Meyers</Text>
      </Animated.View>

      <Animated.View style={{ opacity: buttonOpacity }}>
        <TouchableOpacity
          style={styles.continueButton}
          onPress={() => router.replace('/home')}
          activeOpacity={0.7}
        >
          <Text style={styles.continueText}>Tap to continue</Text>
        </TouchableOpacity>
      </Animated.View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dedicationBlock: {
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  dedicatedTo: {
    fontSize: 32,
    color: Colors.deepBrown,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    letterSpacing: 1,
    textAlign: 'center',
    marginBottom: 16,
  },
  ornamentTop: {
    width: 48,
    height: 1.5,
    backgroundColor: Colors.gold,
    borderRadius: 1,
    opacity: 0.55,
    marginBottom: 16,
  },
  name: {
    fontSize: 20,
    color: Colors.duskBlue,
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontStyle: 'italic',
    textAlign: 'center',
    letterSpacing: 0.5,
    lineHeight: 28,
    opacity: 0.85,
  },
  continueButton: {
    marginTop: 72,
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: Colors.gold,
  },
  continueText: {
    fontSize: 13,
    color: Colors.duskBlue,
    letterSpacing: 2.5,
    textTransform: 'uppercase',
    opacity: 0.65,
  },
});
