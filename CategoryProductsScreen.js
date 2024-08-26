import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

// Import des images locales pour les catégories
const categoryImages = {
  boissons: require("../../assets/categorie/category_boissons.png"),
  detergents: require("../../assets/categorie/category_detergents.png"),
  legumes: require("../../assets/categorie/category_legumes.png"),
  laits: require("../../assets/categorie/category_laits.png"),
};

// Import des images locales pour les produits
const productImages = {
  product1_boissons: require("../../assets/products/product1_boissons.png"),
  product2_boissons: require("../../assets/products/product2_boissons.png"),
  product3_boissons: require("../../assets/products/product3_boissons.png"),
  product4_boissons: require("../../assets/products/product4_boissons.png"),
  product5_boissons: require("../../assets/products/product5_boissons.png"),
  product1_detergents: require("../../assets/products/product1_detergents.png"),
  product2_detergents: require("../../assets/products/product2_detergents.png"),
  product3_detergents: require("../../assets/products/product3_detergents.png"),
  product4_detergents: require("../../assets/products/product4_detergents.png"),
  product5_detergents: require("../../assets/products/product5_detergents.png"),
  product1_legumes: require("../../assets/products/product1_legumes.png"),
  product2_legumes: require("../../assets/products/product2_legumes.png"),
  product3_legumes: require("../../assets/products/product3_legumes.png"),
  product4_legumes: require("../../assets/products/product4_legumes.png"),
  product5_legumes: require("../../assets/products/product5_legumes.png"),
  product1_laits: require("../../assets/products/product1_laits.png"),
  product2_laits: require("../../assets/products/product2_laits.png"),
  product3_laits: require("../../assets/products/product3_laits.png"),
  product4_laits: require("../../assets/products/product4_laits.png"),
  product5_laits: require("../../assets/products/product5_laits.png"),
};

export default function CategoryProductsScreen({ route }) {
  const { category } = route.params;
  const navigation = useNavigation();
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(category);
  const [categories] = useState([
    "Tout",
    "laits",
    "legumes",
    "detergents",
    "boissons",
  ]);

  const fetchProducts = async () => {
    // Simuler la récupération des produits en fonction de la catégorie sélectionnée
    const allProducts = [
      {
        id: "1",
        name: "Boisson 1",
        price: 2.5,
        category: "boissons",
        image: "product1_boissons",
      },
      {
        id: "2",
        name: "Boisson 2",
        price: 3.0,
        category: "boissons",
        image: "product2_boissons",
      },
      {
        id: "3",
        name: "Légume 1",
        price: 1.5,
        category: "legumes",
        image: "product1_legumes",
      },
      {
        id: "4",
        name: "Détergent 1",
        price: 4.0,
        category: "detergents",
        image: "product1_detergents",
      },
      {
        id: "5",
        name: "Lait 1",
        price: 2.2,
        category: "laits",
        image: "product1_laits",
      },
      // Ajoutez d'autres produits ici en fonction des informations fournies
    ];

    const filteredProducts =
      selectedCategory === "Tout"
        ? allProducts
        : allProducts.filter(
            (product) => product.category === selectedCategory
          );

    setProducts(filteredProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory]);

  const handleProductPress = (product) => {
    navigation.navigate("ProductDetails", { product });
  };

  const addToCart = (product) => {
    Alert.alert(
      "Produit ajouté au panier",
      `${product.name} a été ajouté au panier !`
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.header}>Produits de la catégorie</Text>
        <Picker
          selectedValue={selectedCategory}
          style={styles.picker}
          onValueChange={(itemValue) => setSelectedCategory(itemValue)}
          mode="dropdown"
        >
          {categories.map((cat, index) => (
            <Picker.Item key={index} label={cat} value={cat} />
          ))}
        </Picker>
      </View>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.productContainer}
            onPress={() => handleProductPress(item)}
          >
            <Image
              source={productImages[item.image]}
              style={styles.productImage}
            />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
              <TouchableOpacity
                style={styles.addToCartButton}
                onPress={() => addToCart(item)}
              >
                <Text style={styles.addToCartButtonText}>
                  Ajouter au panier
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 10,
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#f2f2f2",
  },
  backButton: {
    marginRight: 15,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333333",
    flex: 1,
  },
  picker: {
    flex: 1,
    height: 40,
    color: "#333333",
    backgroundColor: "#e0e0e0",
    borderRadius: 5,
  },
  productContainer: {
    flexDirection: "row",
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 10,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 15,
  },
  productDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
  },
  productPrice: {
    fontSize: 16,
    color: "#777777",
  },
  addToCartButton: {
    backgroundColor: "#ff6f00",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  addToCartButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
