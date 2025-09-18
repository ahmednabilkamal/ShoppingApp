import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
  Button,
} from 'react-native';

import { useAppDispatch, useAppSelector } from '../../store/store';
import { CartItem } from '../../types/CartItem';
import { removeItem } from '../../store/cartSlice';
import styles from './styles';

const Cart: React.FC = () => {
  const cartItems = useAppSelector(state => state.cart);
  const dispatch = useAppDispatch();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const renderCartItem = ({ item }: { item: CartItem }) => (
    <View style={styles.cartItem}>
      <Text>
        {item.name} x {item.quantity}
      </Text>
      <Text>${(item.price * item.quantity).toFixed(2)}</Text>
      <TouchableOpacity onPress={() => dispatch(removeItem({ id: item.id }))}>
        <Text>Remove</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <FlatList
        data={cartItems}
        renderItem={renderCartItem}
        keyExtractor={item => item.id.toString()}
      />
      <Text>Total: ${total.toFixed(2)}</Text>
      <Button
        title="Checkout"
        onPress={() => Alert.alert('Checkout', 'Proceeding to checkout!')}
      />
    </View>
  );
};

export { Cart };
