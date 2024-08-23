import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');

  const handleSendCode = () => {
    console.log('Verification code sent to:', email);
    navigation.navigate('Verify');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>
      <TextInput
        placeholder="Enter your Email"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send Verification Code</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
    padding: spacing.large,
  },
  title: {
    fontSize: fontSize.xlarge,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.large,
  },
  input: {
    width: '90%',
    height: 50,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: spacing.medium,
    marginBottom: spacing.medium,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: 10,
    alignItems: 'center',
    width: '90%',
    marginBottom: spacing.medium,
  },
  buttonText: {
    color: '#fff',
    fontSize: fontSize.medium,
    fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
