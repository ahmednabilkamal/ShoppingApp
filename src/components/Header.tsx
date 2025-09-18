/* eslint-disable react-native/no-inline-styles */
import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../themes/ThemeContext';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const navigation = useNavigation();
  const { theme } = useContext(ThemeContext)!;
  const isDarkMode = theme === 'dark';

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      style={styles.container}
    >
      <View style={styles.backButton}>
        <Text
          style={[styles.backText, { color: isDarkMode ? 'white' : 'white' }]}
        >
          &#8249;
        </Text>
      </View>
      <Text style={[styles.title, { color: isDarkMode ? 'white' : 'white' }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  backButton: {
    paddingRight: 10,
  },
  backText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
});

export default Header;
