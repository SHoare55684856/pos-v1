import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { colors, spacing, fontSize } from '../theme';

const OrderScreen = ({ route, navigation }) => {
  const { item } = route.params || {}; 
  const [order, setOrder] = useState(item ? [item] : []); 
  const [extras, setExtras] = useState([]); 

  if (!item) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>No item selected</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
          <Text style={styles.buttonText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const menuExtras = [
    { id: 'extra1', name: 'Extra Egg', price: 2.50, image: require('../assets/egg.png') },
    { id: 'extra2', name: 'Sausage', price: 3.00, image: require('../assets/sausage.jpeg') },
    { id: 'extra3', name: 'Chicken', price: 20.00, image: require('../assets/chicken.png') },
    { id: 'extra4', name: 'Coleslaw', price: 5.00, image: require('../assets/coleslaw.jpeg') },
    { id: 'extra5', name: 'Fish', price: 5.00, image: require('../assets/fish.png') },
    { id: 'extra6', name: 'Plantain', price: 5.00, image: require('../assets/plantain.jpeg') },
    { id: 'extra7', name: 'Coke', price: 15.00, image: require('../assets/coke.png') },
    { id: 'extra8', name: 'Sprite', price: 15.00, image: require('../assets/sprite.png') },
  ];

  const addExtra = (extra) => {
    setExtras([...extras, extra]);
  };

  const removeExtra = (extraId) => {
    setExtras(extras.filter(extra => extra.id !== extraId));
  };

  const calculateTotal = () => {
    const orderTotal = order.reduce((total, item) => total + item.price, 0);
    const extrasTotal = extras.reduce((total, extra) => total + extra.price, 0);
    return (orderTotal + extrasTotal).toFixed(2);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Order</Text>
      <Image source={item.image} style={styles.image} />
      <Text style={styles.itemText1}>{item.name} - ₵{item.price.toFixed(2)}</Text>
      
      <Text style={styles.title}>Add Extras</Text>
      <FlatList
        data={menuExtras}
        keyExtractor={(extra) => `extra-${extra.id}`}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.extraItem} onPress={() => addExtra(item)}>
            <Image source={item.image} style={styles.extraImage} />
            <Text style={styles.itemText}>{item.name} - ₵{item.price.toFixed(2)}</Text>
          </TouchableOpacity>
        )}
      />

    

      <Text style={styles.totalText}>Total: ₵{calculateTotal()}</Text>
      <TouchableOpacity 
        style={styles.button} 
        onPress={() => navigation.navigate('Checkout', { orderItems: [...order, ...extras] })}
      >
        <Text style={styles.buttonText}>Go to Checkout</Text>
      </TouchableOpacity>
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
  itemText: {
    fontSize: fontSize.medium,
    // fontWeight: 'bold', // Make the text bold
    color: colors.text,
    textAlign: 'center', // Center the text
    marginVertical: spacing.small,
  },
  itemText1: {
    fontSize: fontSize.medium,
    fontWeight: 'bold', // Make the text bold
    color: colors.text,
    textAlign: 'center', // Center the text
    marginVertical: spacing.small,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: spacing.medium,
  },
  extraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: spacing.medium,
    marginVertical: spacing.small,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  
  extraImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: spacing.medium,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: spacing.small,
    borderRadius: 5,
  },
  removeButtonText: {
    color: '#fff',
    fontSize: fontSize.small,
  },
  totalText: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginVertical: spacing.medium,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: spacing.medium,
    paddingHorizontal: spacing.large,
    borderRadius: 5,
    marginVertical: spacing.small,
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: colors.buttonText,
    fontSize: fontSize.medium,
  },
  emptyText: {
    fontSize: fontSize.medium,
    color: colors.secondary,
    marginTop: spacing.large,
    textAlign: 'center',
  },
});

export default OrderScreen;
