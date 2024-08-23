import React from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

const MenuScreen = ({ navigation }) => {
  const menuItems = [
    {
      id: '1',
      name: 'Waakye Basic',
      price: 20.00,
      image: require('../assets/waakye_basic.png'),
      description: 'Includes 1 egg, spaghetti, and salad',
    },
    {
      id: '2',
      name: 'Waakye Plus',
      price: 30.00,
      image: require('../assets/waakye_plus.webp'),
      description: 'Includes sausage, plantain, egg, and spaghetti',
    },
    {
      id: '3',
      name: 'Waakye Ultimate',
      price: 50.00,
      image: require('../assets/waakye_ultimate.webp'),
      description: 'Includes chicken, fish, egg, sausage, pear, and spaghetti',
    },
    {
      id: '4',
      name: 'Jollof Plus',
      price: 35.00,
      image: require('../assets/jollof_plus.webp'),
      description: 'Includes chicken and egg, ',
    },
    {
      id: '5',
      name: 'Jollof Ultimate',
      price: 50.00,
      image: require('../assets/jollof_ultimate.webp'),
      description: 'Includes chicken, fish, egg, sausage, coleslaw',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={menuItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.menuItem} onPress={() => navigation.navigate('Order', { item })}>
            <Image source={item.image} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.itemText}>{item.name} - ₵{item.price.toFixed(2)}</Text>
              <Text style={styles.description}>{item.description}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.medium,
  },
  title: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.medium,
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: spacing.large, // Add some padding to the bottom of the list
  },
  menuItem: {
    backgroundColor: '#fff',
    padding: spacing.medium,
    marginVertical: spacing.small,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginBottom: spacing.small,
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: spacing.small,
  },
  itemText: {
    fontSize: fontSize.medium,
    color: colors.text,
    fontWeight: 'bold',
    marginBottom: spacing.small,
  },
  description: {
    fontSize: fontSize.small,
    color: '#555',
    textAlign: 'center',
  },
});

export default MenuScreen;
