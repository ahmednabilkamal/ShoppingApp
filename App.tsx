import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';

import { ThemeProvider } from './src/themes/ThemeContext';
import AppNavigator from './src/navigation/AppNavigator';
import { store } from './src/store/store';

const App = () => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <AppNavigator />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
