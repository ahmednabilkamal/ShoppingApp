/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert } from 'react-native';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { CartItem } from '../../types/CartItem';
import { removeItem } from '../../store/cartSlice';
import styles from './styles';
import { ThemeContext } from '../../themes/ThemeContext';
import Button from '../../components/Button';

const Cart: React.FC = () => {
  const cartItems = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext)!;
  const isDarkMode = theme === 'dark';

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View
      style={[
        styles.cartItem,
        { backgroundColor: isDarkMode ? '#333' : '#fff' },
      ]}
    >
      <View style={styles.itemDetails}>
        <Text
          style={[styles.itemName, { color: isDarkMode ? '#fff' : '#000' }]}
        >
          {item.name}
        </Text>
        <Text
          style={[styles.itemQuantity, { color: isDarkMode ? '#bbb' : '#555' }]}
        >
          Quantity: {item.quantity}
        </Text>
      </View>
      <View style={styles.itemPrice}>
        <Text
          style={[
            styles.itemPriceText,
            { color: isDarkMode ? '#fff' : '#000' },
          ]}
        >
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(removeItem({ id: item.id }))}
        style={styles.removeButton}
      >
        <Text style={styles.removeButtonText}>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#121212' : '#f0f0f0' },
      ]}
    >
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text
            style={[
              styles.emptyCartText,
              { color: isDarkMode ? '#bbb' : '#555' },
            ]}
          >
            Your cart is empty.
          </Text>
        }
      />
      <View
        style={[
          styles.footer,
          { backgroundColor: isDarkMode ? '#222' : '#fff' },
        ]}
      >
        <View style={styles.totalContainer}>
          <Text
            style={[styles.totalLabel, { color: isDarkMode ? '#fff' : '#000' }]}
          >
            Total:
          </Text>
          <Text
            style={[styles.totalPrice, { color: isDarkMode ? '#fff' : '#000' }]}
          >
            ${total.toFixed(2)}
          </Text>
        </View>

        <Button
          title="Checkout"
          onPress={() => Alert.alert('Checkout', 'Proceeding to checkout!')}
          style={styles.checkoutButton}
          textStyle={styles.checkoutButtonText}
        />
      </View>
    </View>
  );
};

export { Cart };
