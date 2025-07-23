import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, FlatList, ListRenderItem } from "react-native";
import { useCart } from "../context/cartContext";
import { useState } from "react";
import { CartItem } from "../context/cartContext";

export default function CartPage() {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const [email, setEmail] = useState("");

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const renderItem: ListRenderItem<CartItem> = ({ item }) => (
    <View style={styles.itemRow}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={{ flex: 1 }}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemPrice}>Prix : {item.price.toFixed(2)} €</Text>
      </View>
      <View style={styles.qtyControl}>
        <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.qtyBtn}>
          <Text style={styles.qtyBtnText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{item.quantity}</Text>
        <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.qtyBtn}>
          <Text style={styles.qtyBtnText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => removeFromCart(item.id)} style={styles.removeBtn}>
        <Text style={styles.removeBtnText}>×</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Votre Panier</Text>
      {cart.length === 0 ? (
        <Text style={styles.empty}>Votre panier est vide.</Text>
      ) : (
        <FlatList
          data={cart}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={{ paddingBottom: 24 }}
        />
      )}
      <View style={styles.totalRow}>
        <Text style={styles.totalLabel}>Total :</Text>
        <Text style={styles.totalValue}>{total.toFixed(2)} €</Text>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Votre email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.submitBtn} disabled={cart.length === 0 || !email}>
        <Text style={styles.submitBtnText}>Submit Order</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#39e07b',
    marginBottom: 16,
    textAlign: 'center',
  },
  empty: {
    fontSize: 18,
    color: '#888',
    textAlign: 'center',
    marginTop: 40,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 12,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  itemImage: {
    width: 54,
    height: 54,
    borderRadius: 8,
    marginRight: 10,
  },
  itemTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 2,
  },
  itemPrice: {
    color: '#007bff',
    fontSize: 14,
  },
  qtyControl: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  qtyBtn: {
    borderWidth: 1,
    borderColor: '#39e07b',
    borderRadius: 6,
    paddingHorizontal: 10,
    paddingVertical: 2,
    marginHorizontal: 2,
  },
  qtyBtnText: {
    fontSize: 18,
    color: '#39e07b',
    fontWeight: 'bold',
  },
  qty: {
    fontSize: 16,
    fontWeight: 'bold',
    minWidth: 24,
    textAlign: 'center',
  },
  removeBtn: {
    marginLeft: 6,
    padding: 4,
  },
  removeBtnText: {
    fontSize: 22,
    color: '#e03939',
    fontWeight: 'bold',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 8,
  },
  totalLabel: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  totalValue: {
    fontSize: 20,
    color: '#007bff',
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 16,
    fontSize: 16,
  },
  submitBtn: {
    backgroundColor: '#222',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 4,
    opacity: 1,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 