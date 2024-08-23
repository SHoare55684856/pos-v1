import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { colors, spacing, fontSize } from '../theme';
import axios from 'axios';  // Import axios for HTTP requests

const CheckoutScreen = ({ route, navigation }) => {
  const { orderItems } = route.params || { orderItems: [] };
  const [items, setItems] = useState(orderItems);

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0).toFixed(2);
  };

  const [total, setTotal] = useState(calculateTotal());

  useEffect(() => {
    setTotal(calculateTotal());
  }, [items]);

  const removeItem = (itemId) => {
    setItems(items.filter(item => item.id !== itemId));
  };

  const handleConfirmOrder = async () => {
    try {
      const response = await axios.post('http://localhost:3000/api/checkout', { cartItems: items });
      if (response.status === 200) {
        Alert.alert('Order Confirmed!', 'Your order has been successfully processed.');
        navigation.navigate('Menu'); // Navigate back to the Menu screen or wherever appropriate
      }
    } catch (error) {
      Alert.alert('Order Failed', 'There was an error processing your order. Please try again.');
      console.error('Checkout error:', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Checkout</Text>
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.name} - ₵{item.price.toFixed(2)}</Text>
            <TouchableOpacity style={styles.removeButton} onPress={() => removeItem(item.id)}>
              <Text style={styles.removeButtonText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No items in your order.</Text>}
      />
      <Text style={styles.totalText}>Total: ₵{total}</Text>
      <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
        <Text style={styles.buttonText}>Confirm Order</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Menu')}>
        <Text style={styles.buttonText}>Back to Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.medium,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: fontSize.large,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: spacing.medium,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: spacing.small,
    marginVertical: spacing.small,
    borderRadius: 5,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  itemText: {
    fontSize: fontSize.medium,
    color: colors.text,
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
    marginTop: spacing.large,
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

export default CheckoutScreen;
