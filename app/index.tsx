import { StyleSheet, Text, View, FlatList, ListRenderItem, Dimensions } from "react-native";
import { useEffect, useState } from "react";
import productsData from "../data/products.json";
import { useRouter } from "expo-router";
import ProductCard from "../components/ProductCard";

// Définition du type Product
interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

const CARD_MARGIN = 10;
const CARD_WIDTH = 160; // même largeur que dans ProductCard

export default function Page() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    setProducts(productsData as Product[]);
  }, []);

  const renderItem: ListRenderItem<Product> = ({ item }) => (
    <ProductCard
      image={item.image}
      title={item.title}
      price={item.price}
      onPress={() => router.push(`/${item.id}`)}
    />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Produits</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 16,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 8,
    color: '#39e07b',
  },
  list: {
    paddingBottom: 24,
    paddingHorizontal: CARD_MARGIN,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: CARD_MARGIN,
  },
});
