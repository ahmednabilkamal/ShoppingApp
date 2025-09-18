/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { ThemeContext } from '../themes/ThemeContext';
import { StackType } from '../types/StackType';
import { RootState } from '../types/CartItem';

type CartIconProps = StackScreenProps<StackType, 'Product'>;

const CartIcon = ({ navigation }: CartIconProps) => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const { theme } = useContext(ThemeContext)!;
  const isDarkMode = theme === 'dark';

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={styles.container}
    >
      <Text
        style={[styles.iconText, { color: isDarkMode ? 'white' : 'black' }]}
      >
        🛒 ({cartItems.length})
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 15,
  },
  iconText: {
    fontSize: 20,
  },
});

export default CartIcon;
