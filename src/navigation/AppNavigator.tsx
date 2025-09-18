import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {
  createStackNavigator,
  StackScreenProps,
} from '@react-navigation/stack';
import { useSelector } from 'react-redux';

import { Product } from '../types/ProductTypes';
import { RootState } from '../types/CartItem';
import { ThemeContext } from '../themes/ThemeContext';
import { Cart, ProductDetailsScreen, ProductList } from '../screens';

type RootStackParamList = {
  Product: undefined;
  ProductDetails: { product: Product };
  Cart: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

// Define the header component for the cart icon.
const CartIcon = ({
  navigation,
}: StackScreenProps<RootStackParamList, 'Product'>) => {
  const cartItems = useSelector((state: RootState) => state.cart);
  const { theme } = useContext(ThemeContext)!;
  const isDarkMode = theme === 'dark';

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Cart')}
      style={{ marginRight: 15 }}
    >
      <Text style={{ fontSize: 24, color: isDarkMode ? 'white' : 'black' }}>
        🛒 ({cartItems.length})
      </Text>
    </TouchableOpacity>
  );
};

const AppNavigator = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)!;
  const isDarkMode = theme === 'dark';

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Product"
        screenOptions={{
          headerStyle: {
            backgroundColor: isDarkMode ? '#333' : '#f4511e',
          },
          headerTintColor: isDarkMode ? '#fff' : '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="Product"
          options={({ navigation }) => ({
            title: 'Products',
            headerRight: () => <CartIcon navigation={navigation} />,
            headerLeft: () => (
              <TouchableOpacity
                onPress={toggleTheme}
                style={{ marginLeft: 15 }}
              >
                <Text style={{ fontSize: 24 }}>{isDarkMode ? '🌞' : '🌙'}</Text>
              </TouchableOpacity>
            ),
          })}
        >
          {props => (
            <ProductList
              onProductPress={product =>
                props.navigation.navigate('ProductDetails', { product })
              }
            />
          )}
        </Stack.Screen>

        <Stack.Screen name="ProductDetails" options={{ title: 'Details' }}>
          {props => (
            <ProductDetailsScreen product={props.route.params.product} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{ title: 'Shopping Cart' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
