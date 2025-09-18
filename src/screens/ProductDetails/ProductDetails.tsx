/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { View, Text, Image, ScrollView, Alert } from 'react-native';

import { Product } from '../../types/ProductTypes';
import { useAppDispatch } from '../../store/store';
import { addItem } from '../../store/cartSlice';
import { ThemeContext } from '../../themes/ThemeContext';
import styles from './styles';
import Button from '../../components/Button';

const ProductDetailsScreen: React.FC<{ product: Product }> = ({ product }) => {
  const dispatch = useAppDispatch();
  const { theme } = useContext(ThemeContext)!;
  const isDarkMode = theme === 'dark';

  const handleAddToCart = () => {
    dispatch(addItem(product));
    Alert.alert('Success', `${product.name} added to cart!`);
  };

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' },
      ]}
    >
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <View style={styles.detailsContainer}>
        <Text
          style={[styles.productName, { color: isDarkMode ? '#fff' : '#000' }]}
        >
          {product.name}
        </Text>
        <Text
          style={[styles.productPrice, { color: isDarkMode ? '#fff' : '#555' }]}
        >
          ${product.price.toFixed(2)}
        </Text>
        <Text
          style={[
            styles.productDescription,
            { color: isDarkMode ? '#bbb' : '#333' },
          ]}
        >
          {product.description}
        </Text>
        <Button title="Add to Cart" onPress={handleAddToCart} />
      </View>
    </ScrollView>
  );
};

export { ProductDetailsScreen };
