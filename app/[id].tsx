import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, FlatList } from "react-native";
import productsData from "../data/products.json";
import { useState } from "react";
import { useCart } from "../context/cartContext";
import ProductCard from "../components/ProductCard";

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export default function ProductDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const product = (productsData as Product[]).find((p) => p.id === Number(id));
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Produit introuvable.</Text>
      </View>
    );
  }

  // Suggestions : autres produits, sauf celui affiché
  const suggestions = (productsData as Product[]).filter((p) => p.id !== product.id).slice(0, 4);

  const handleAdd = () => setQuantity((q) => q + 1);
  const handleRemove = () => setQuantity((q) => (q > 1 ? q - 1 : 1));
  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({ id: product.id, title: product.title, price: product.price, image: product.image });
    }
    router.back();
  };

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.card}>
        <Image source={{ uri: product.image }} style={styles.image} />
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.desc}>{product.description}</Text>
        <Text style={styles.price}>Prix : <Text style={{ color: '#39e07b' }}>{product.price.toFixed(2)} €</Text></Text>
        <View style={styles.qtyRow}>
          <TouchableOpacity style={styles.qtyBtn} onPress={handleRemove}>
            <Text style={styles.qtyBtnText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qty}>{quantity}</Text>
          <TouchableOpacity style={styles.qtyBtn} onPress={handleAdd}>
            <Text style={styles.qtyBtnText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAddToCart}>
          <Text style={styles.addBtnText}>Ajouter au panier</Text>
        </TouchableOpacity>
      </View>
      {suggestions.length > 0 && (
        <View style={styles.suggestionsBlock}>
          <Text style={styles.suggestionsTitle}>Suggestions</Text>
          <FlatList
            data={suggestions}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <ProductCard
                image={item.image}
                title={item.title}
                price={item.price}
                onPress={() => router.push(`/${item.id}`)}
              />
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestionsList}
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  scroll: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    paddingVertical: 32,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    width: 340,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: 18,
    borderRadius: 14,
    resizeMode: 'contain',
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#222',
  },
  desc: {
    fontSize: 16,
    color: '#444',
    marginBottom: 16,
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    color: '#222',
    marginBottom: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  qtyRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  qtyBtn: {
    borderWidth: 1.5,
    borderColor: '#39e07b',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 6,
    marginHorizontal: 10,
    backgroundColor: '#f6fff9',
  },
  qtyBtnText: {
    fontSize: 22,
    color: '#39e07b',
    fontWeight: 'bold',
  },
  qty: {
    fontSize: 20,
    fontWeight: 'bold',
    minWidth: 32,
    textAlign: 'center',
    color: '#222',
  },
  addBtn: {
    backgroundColor: '#39e07b',
    borderRadius: 10,
    paddingVertical: 14,
    paddingHorizontal: 40,
    marginTop: 8,
    shadowColor: '#39e07b',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 2,
  },
  addBtnText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    letterSpacing: 0.5,
  },
  suggestionsBlock: {
    marginTop: 36,
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: 16,
  },
  suggestionsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 10,
    marginLeft: 2,
  },
  suggestionsList: {
    paddingRight: 16,
  },
}); 