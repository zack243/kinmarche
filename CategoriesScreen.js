import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

export default function CategoryProductsScreen({ route }) {
  const { categoryName } = route.params;

  const getProductsByCategory = (category) => {
    switch (category) {
      case "Laits & Produits Laitiers":
        return [
          {
            id: "lait1",
            name: "Lait 1",
            image: require("../../assets/products/product1_laits.png"),
          },
          {
            id: "lait2",
            name: "Lait 2",
            image: require("../../assets/products/product2_laits.png"),
          },
          {
            id: "lait3",
            name: "Lait 3",
            image: require("../../assets/products/product3_laits.png"),
          },
          {
            id: "lait4",
            name: "Lait 4",
            image: require("../../assets/products/product4_laits.png"),
          },
          {
            id: "lait5",
            name: "Lait 5",
            image: require("../../assets/products/product5_laits.png"),
          },
        ];
      case "Boissons":
        return [
          {
            id: "boisson1",
            name: "Boisson 1",
            image: require("../../assets/products/product1_boissons.png"),
          },
          {
            id: "boisson2",
            name: "Boisson 2",
            image: require("../../assets/products/product2_boissons.png"),
          },
          {
            id: "boisson3",
            name: "Boisson 3",
            image: require("../../assets/products/product3_boissons.png"),
          },
          {
            id: "boisson4",
            name: "Boisson 4",
            image: require("../../assets/products/product4_boissons.png"),
          },
          {
            id: "boisson5",
            name: "Boisson 5",
            image: require("../../assets/products/product5_boissons.png"),
          },
        ];
      case "Détergents":
        return [
          {
            id: "detergent1",
            name: "Détergent 1",
            image: require("../../assets/products/product1_detergents.png"),
          },
          {
            id: "detergent2",
            name: "Détergent 2",
            image: require("../../assets/products/product2_detergents.png"),
          },
          {
            id: "detergent3",
            name: "Détergent 3",
            image: require("../../assets/products/product3_detergents.png"),
          },
          {
            id: "detergent4",
            name: "Détergent 4",
            image: require("../../assets/products/product4_detergents.png"),
          },
          {
            id: "detergent5",
            name: "Détergent 5",
            image: require("../../assets/products/product5_detergents.png"),
          },
        ];
      case "Légumes":
        return [
          {
            id: "legume1",
            name: "Légume 1",
            image: require("../../assets/products/product1_legumes.png"),
          },
          {
            id: "legume2",
            name: "Légume 2",
            image: require("../../assets/products/product2_legumes.png"),
          },
          {
            id: "legume3",
            name: "Légume 3",
            image: require("../../assets/products/product3_legumes.png"),
          },
          {
            id: "legume4",
            name: "Légume 4",
            image: require("../../assets/products/product4_legumes.png"),
          },
          {
            id: "legume5",
            name: "Légume 5",
            image: require("../../assets/products/product5_legumes.png"),
          },
        ];
      default:
        return [];
    }
  };

  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (categoryName) {
      const productsForCategory = getProductsByCategory(categoryName);
      setProducts(productsForCategory);
    }
  }, [categoryName]);

  const renderProduct = ({ item }) => (
    <TouchableOpacity style={styles.productButton}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productText}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{categoryName}</Text>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={renderProduct}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: "#333",
  },
  productButton: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 15,
    margin: 10,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
    resizeMode: "contain",
  },
  productText: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
  },
});
