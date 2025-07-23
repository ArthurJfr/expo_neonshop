import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

interface ProductCardProps {
  image: string;
  title: string;
  price: number;
  onPress?: () => void;
}

export default function ProductCard({ image, title, price, onPress }: ProductCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      <Image source={{ uri: image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>{title}</Text>
      <Text style={styles.price}>{price.toFixed(2)} €</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 14,
    alignItems: 'center',
    width: 160,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    marginBottom: 12,
    marginHorizontal: 6,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  image: {
    width: 90,
    height: 90,
    marginBottom: 10,
    borderRadius: 10,
    resizeMode: 'contain',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#222',
  },
  price: {
    fontSize: 15,
    color: '#39e07b',
    fontWeight: 'bold',
  },
}); 