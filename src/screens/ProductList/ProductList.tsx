import React, { useState, useCallback } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';

import { Product } from '../../types/ProductTypes';
import { ProductsList } from '../../data/mockData';
import styles from './styles';

const ProductList: React.FC<{
  onProductPress: (product: Product) => void;
}> = ({ onProductPress }) => {
  const [products] = useState<Product[]>(ProductsList);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  }, []);

  const renderProduct = ({ item }: { item: Product }) => (
    <TouchableOpacity onPress={() => onProductPress(item)}>
      <View>
        <Image
          source={{ uri: item.image }}
          resizeMode="cover"
          style={styles.productImg}
        />
        <Text>{item.name}</Text>
        <Text>${item.price}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={item => item.id.toString()}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      getItemLayout={(data, index) => ({
        length: 120,
        offset: 120 * index,
        index,
      })}
    />
  );
};

export default ProductList;
