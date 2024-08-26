import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

export default function CartScreen() {
  const [cartItems, setCartItems] = useState([]);
  const navigation = useNavigation();

  const CART_STORAGE_KEY = "cartItems";

  const fetchCartItems = async () => {
    try {
      const storedCartItems = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (storedCartItems !== null) {
        setCartItems(JSON.parse(storedCartItems));
      }
    } catch (error) {
      console.error("Error fetching cart items: ", error);
      Alert.alert("Erreur", "Impossible de charger les articles du panier.");
    }
  };

  const updateCartItem = async (id, action) => {
    try {
      const updatedItems = cartItems
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity:
                  action === "increase"
                    ? item.quantity + 1
                    : Math.max(1, item.quantity - 1),
              }
            : item
        )
        .filter((item) => item.quantity > 0);

      setCartItems(updatedItems);
      await AsyncStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(updatedItems)
      );
    } catch (error) {
      console.error("Error updating cart item: ", error);
      Alert.alert("Erreur", "Impossible de mettre à jour l'article du panier.");
    }
  };

  const removeItem = async (id) => {
    try {
      const updatedItems = cartItems.filter((item) => item.id !== id);
      setCartItems(updatedItems);
      await AsyncStorage.setItem(
        CART_STORAGE_KEY,
        JSON.stringify(updatedItems)
      );
    } catch (error) {
      console.error("Error removing item from cart: ", error);
      Alert.alert("Erreur", "Impossible de supprimer l'article du panier.");
    }
  };

  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => total + item.price * item.quantity, 0)
      .toFixed(2);
  };

  const handleCheckout = () => {
    navigation.navigate("PaymentScreen");
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  return (
    <View style={styles.container}>
      {cartItems.length > 0 ? (
        <FlatList
          data={cartItems}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.cartItem}>
              <Image
                source={{ uri: item.image }}
                style={styles.cartItemImage}
              />
              <View style={styles.cartItemDetails}>
                <Text style={styles.cartItemName}>{item.name}</Text>
                <Text style={styles.cartItemPrice}>
                  ${item.price.toFixed(2)}
                </Text>
                <View style={styles.cartItemQuantityContainer}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateCartItem(item.id, "decrease")}
                  >
                    <Text style={styles.quantityText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{item.quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={() => updateCartItem(item.id, "increase")}
                  >
                    <Text style={styles.quantityText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeItem(item.id)}
              >
                <Text style={styles.removeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      ) : (
        <View style={styles.emptyCartContainer}>
          <Text style={styles.emptyCartText}>Panier vide</Text>
        </View>
      )}
      {cartItems.length > 0 && (
        <View style={styles.totalContainer}>
          <Text style={styles.totalText}>Total: ${calculateTotal()}</Text>
          <TouchableOpacity
            style={styles.checkoutButton}
            onPress={handleCheckout}
          >
            <Text style={styles.checkoutButtonText}>Passer à la caisse</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  cartItem: {
    flexDirection: "row",
    backgroundColor: "#fff",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cartItemImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  cartItemDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  cartItemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  cartItemPrice: {
    fontSize: 16,
    color: "#888",
  },
  cartItemQuantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#ddd",
    padding: 5,
    borderRadius: 5,
  },
  quantityText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityValue: {
    marginHorizontal: 10,
    fontSize: 18,
  },
  removeButton: {
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
  },
  removeButtonText: {
    fontSize: 18,
    color: "#ff4d4d",
  },
  totalContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
  },
  totalText: {
    fontSize: 22,
    fontWeight: "bold",
  },
  checkoutButton: {
    marginTop: 20,
    backgroundColor: "#ff6f00",
    padding: 15,
    borderRadius: 10,
    width: "100%",
    alignItems: "center",
  },
  checkoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  emptyCartContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyCartText: {
    fontSize: 20,
    color: "#888",
  },
});
