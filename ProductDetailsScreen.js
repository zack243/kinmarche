import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProductDetailsScreen({ route, navigation }) {
  const { product } = route.params;

  const handleAddToCart = async () => {
    try {
      const cartKey = "cart";
      const storedCart = await AsyncStorage.getItem(cartKey);
      const cart = storedCart ? JSON.parse(storedCart) : [];

      // Check if product already exists in cart
      const productIndex = cart.findIndex((item) => item.id === product.id);

      if (productIndex >= 0) {
        // If product is already in cart, update quantity
        cart[productIndex].quantity += 1;
      } else {
        // Add new product to cart
        cart.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1,
          image: product.image,
        });
      }

      await AsyncStorage.setItem(cartKey, JSON.stringify(cart));
      Alert.alert("Succès", "Produit ajouté au panier !");
    } catch (error) {
      console.error("Error adding product to cart: ", error);
      Alert.alert("Erreur", "Impossible d'ajouter le produit au panier.");
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Image source={{ uri: product.image }} style={styles.productImage} />
      <Text style={styles.productName}>{product.name}</Text>
      <Text style={styles.productPrice}>${product.price.toFixed(2)}</Text>
      <Text style={styles.productDescription}>{product.description}</Text>

      <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
        <Text style={styles.buttonText}>Ajouter au panier</Text>
      </TouchableOpacity>

      {/* Ajout d'une section d'évaluation du produit */}
      <View style={styles.reviewContainer}>
        <Text style={styles.reviewTitle}>Évaluations :</Text>
        <Text style={styles.reviewText}>⭐⭐⭐⭐☆ (4/5)</Text>
        <Text style={styles.reviewDescription}>
          Ceci est un produit de haute qualité.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  productImage: {
    width: "100%",
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  productName: {
    fontSize: 26,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  productPrice: {
    fontSize: 22,
    color: "#D9534F",
    marginBottom: 20,
    textAlign: "center",
  },
  productDescription: {
    fontSize: 18,
    color: "#555",
    textAlign: "justify",
    marginBottom: 30,
    lineHeight: 24,
  },
  button: {
    backgroundColor: "#D9534F",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  reviewContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  reviewTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  reviewText: {
    fontSize: 16,
    marginBottom: 5,
  },
  reviewDescription: {
    fontSize: 16,
    color: "#555",
  },
});
