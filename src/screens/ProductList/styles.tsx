import { Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');
const itemWidth = width / 2 - 30;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
  },
  row: {
    flex: 1,
    justifyContent: 'space-around',
    paddingVertical: 10,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    width: itemWidth,
    marginBottom: 10,
  },
  productImage: {
    width: '100%',
    height: 150,
  },
  productInfo: {
    padding: 10,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productPrice: {
    fontSize: 14,
    fontWeight: '600',
  },
});

export default styles;
