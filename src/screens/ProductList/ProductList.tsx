/* eslint-disable react-native/no-inline-styles */
import React, { useState, useCallback, useContext, useEffect } from 'react';
import {
  FlatList,
  Text,
  View,
  Image,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';

import { Product } from '../../types/ProductTypes';
import { ThemeContext } from '../../themes/ThemeContext';
import { ProductsList } from '../../data/mockData';
import styles from './styles';
import { PAGE_SIZE } from '../../constants';

const ProductList: React.FC<{
  onProductPress: (product: Product) => void;
}> = ({ onProductPress }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMoreData, setHasMoreData] = useState(true);

  const { theme } = useContext(ThemeContext)!;
  const isDarkMode = theme === 'dark';

  const fetchData = useCallback((pageToLoad: number) => {
    setLoadingMore(true);
    const startIndex = (pageToLoad - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const newProducts = ProductsList.slice(startIndex, endIndex);

    setTimeout(() => {
      if (pageToLoad === 1) {
        setProducts(newProducts);
      } else {
        setProducts(prevProducts => [...prevProducts, ...newProducts]);
      }
      setCurrentPage(pageToLoad + 1);
      setLoadingMore(false);
      setRefreshing(false);
      setHasMoreData(newProducts.length === PAGE_SIZE);
    }, 1000);
  }, []);

  useEffect(() => {
    fetchData(1);
  }, [fetchData]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchData(1);
  }, [fetchData]);

  const loadMoreProducts = useCallback(() => {
    if (loadingMore || !hasMoreData || refreshing) return;
    fetchData(currentPage);
  }, [currentPage, hasMoreData, loadingMore, refreshing, fetchData]);

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
          {item?.name}
        </Text>
        <Text
          style={[styles.productPrice, { color: isDarkMode ? '#bbb' : '#555' }]}
        >
          ${item?.price?.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  const renderFooter = () => {
    if (!loadingMore) return null;
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="small" color={isDarkMode ? '#fff' : '#000'} />
        <Text
          style={[styles.loadingText, { color: isDarkMode ? '#fff' : '#000' }]}
        >
          Loading more...
        </Text>
      </View>
    );
  };

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
        onEndReached={loadMoreProducts}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
      />
    </View>
  );
};

export { ProductList };
