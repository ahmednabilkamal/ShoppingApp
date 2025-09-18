import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ThemeContext } from '../themes/ThemeContext';
import { Cart, ProductDetailsScreen, ProductList } from '../screens';
import { StackType } from '../types/StackType';
import CartIcon from '../components/CartIcon';
import HeaderLeft from '../components/HeaderLeft';
import Header from '../components/Header';

const Stack = createStackNavigator<StackType>();

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
              <HeaderLeft onPress={toggleTheme} isDarkMode={isDarkMode} />
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

        <Stack.Screen
          name="ProductDetails"
          options={({ route, navigation }) => ({
            headerTitle: '',
            headerLeft: () => <Header title={route.params.product.name} />,
            headerRight: () => <CartIcon navigation={navigation} />,
          })}
        >
          {props => (
            <ProductDetailsScreen product={props.route.params.product} />
          )}
        </Stack.Screen>

        <Stack.Screen
          name="Cart"
          component={Cart}
          options={{
            headerTitle: '',
            headerLeft: () => <Header title="Shopping Cart" />,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
