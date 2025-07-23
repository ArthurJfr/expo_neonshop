import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useCart } from "../context/cartContext";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons';

export default function CartIcon() {
  const { cart } = useCart();
  const router = useRouter();
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <TouchableOpacity style={styles.container} onPress={() => router.push('/cart')}>
      <Ionicons name="cart-outline" size={28} color="#222" />
      {totalItems > 0 && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{totalItems}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
  },
  badge: {
    position: 'absolute',
    right: 2,
    top: 2,
    backgroundColor: '#39e07b',
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 12,
  },
}); 