import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  productImage: {
    width: '100%',
    height: 350,
    resizeMode: 'cover',
  },
  detailsContainer: {
    padding: 20,
  },
  productName: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  productDescription: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 30,
  },
});

export default styles;
