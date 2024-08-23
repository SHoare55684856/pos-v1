import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing } from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import Icon from 'react-native-vector-icons/Ionicons';
import Header from '../components/Header'; // Ensure Header is correctly imported

const HomeScreen = ({ navigation }) => {
  // Animated values
  const scaleAnim = useRef(new Animated.Value(1)).current; // Initial scale value
  const opacityAnim = useRef(new Animated.Value(1)).current; // Initial opacity value

  useEffect(() => {
    // Create a continuous looping animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2, // Scale up to 1.2 times
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1, // Scale back to original size
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(opacityAnim, {
          toValue: 0.5, // Fade out to 50% opacity
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(opacityAnim, {
          toValue: 1, // Fade back to full opacity
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [scaleAnim, opacityAnim]);

  return (
    <View style={styles.container}>
      <Header />
      {/* Animated Text */}
      <Animated.Text
        style={[
          styles.title,
          {
            transform: [{ scale: scaleAnim }], // Apply scaling animation
            opacity: opacityAnim, // Apply opacity animation
          },
        ]}
      >
        Are you Hungry?
      </Animated.Text>
      <Text style={styles.subtitle}>View orders now!!!</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.buttonText}>View Menu</Text>
        <Icon name="arrow-forward-circle" size={24} color={colors.buttonText} style={styles.icon} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Order')}>
        <Text style={styles.buttonText}>Place Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Checkout')}>
        <Text style={styles.buttonText}>Checkout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    padding: spacing.medium,
  },
  title: {
    fontSize: fontSize.xlarge,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: spacing.medium,
  },
  subtitle: {
    fontSize: fontSize.large,
    color: 'purple',
    textAlign: 'center',
    marginBottom: spacing.large,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: 5,
    marginVertical: spacing.small,
    width: '80%',
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: fontSize.medium,
  },
  icon: {
    marginLeft: spacing.small,
  },
});

export default HomeScreen;
