import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

const VerifyScreen = ({ navigation }) => {
  const [code, setCode] = useState('');

  const handleVerify = () => {
    if (code === '1234') {
      console.log('Code verified');
      navigation.navigate('ChangePassword');
    } else {
      alert('Invalid verification code');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Verify Your Account</Text>
      <TextInput
        placeholder="Enter 4-digit code"
        style={styles.input}
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        maxLength={4}
      />
      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
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
    borderWidth: 1

  },
});

export default VerifyScreen;
