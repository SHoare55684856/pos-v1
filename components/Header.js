import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { spacing } from '../theme'; 

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Image
        source={require('../assets/food_header.jpeg')} 
        style={styles.headerImage}
        resizeMode="cover"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: '100%',
    height: 200, 
    marginBottom: spacing.medium, 
  },
  headerImage: {
    width: '100%',
    height: '100%',
  },
});

export default Header;
