import React from 'react';
import { View, Text, Image, Button, ScrollView, Alert } from 'react-native';

import { Product } from '../../types/ProductTypes';
import { useAppDispatch } from '../../store/store';
import { addItem } from '../../store/cartSlice';
import styles from './styles';

const ProductDetailsScreen: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addItem(product));
    Alert.alert('Success', `${product.name} added to cart!`);
  };

  return (
    <ScrollView>
      <View>
        <Image source={{ uri: product.image }} style={styles.productImg} />
        <Text>{product.name}</Text>
        <Text>${product.price}</Text>
        <Text>{product.description}</Text>
        <Button title="Add to Cart" onPress={handleAddToCart} />
      </View>
    </ScrollView>
  );
};

export default ProductDetailsScreen;
