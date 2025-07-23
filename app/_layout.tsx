import { Stack } from "expo-router";
import { CartProvider } from "../context/cartContext";
import CartIcon from "../components/CartIcon";
import { Text } from "react-native";

export default function Layout() {
  return (
    <CartProvider>
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#39e07b' },
          headerTintColor: '#222',
          headerTitle: () => <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#222' }}>Neon Shop</Text>,
          headerRight: () => <CartIcon />,
        }}
      />
    </CartProvider>
  );
}
