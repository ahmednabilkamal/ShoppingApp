import React, { useState, useCallback, useContext } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import { Product } from '../../types/ProductTypes';
import { ThemeContext } from '../../themes/ThemeContext';
import { ProductsList } from '../../data/mockData';
import styles from './styles';

const ProductList: React.FC<{
  onProductPress: (product: Product) => void;
}> = ({ onProductPress }) => {
  const [products] = useState<Product[]>(ProductsList);
  const [refreshing, setRefreshing] = useState(false);
  const { theme } = useContext(ThemeContext)!;
  const isDarkMode = theme === 'dark';

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity
      onPress={() => onProductPress(item)}
      style={styles.productCard}
    >
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productInfo}>
        <Text
          style={[styles.productName, { color: isDarkMode ? '#fff' : '#000' }]}
        >
          {item.name}
        </Text>
        <Text
          style={[styles.productPrice, { color: isDarkMode ? '#bbb' : '#555' }]}
        >
          ${item.price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? '#121212' : '#f0f0f0' },
      ]}
    >
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export { ProductList };
