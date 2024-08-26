import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Alert,
  TextInput,
  ScrollView,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

const categories = [
  {
    id: "1",
    name: "Boissons",
    image: require("../../assets/categorie/category_boissons.png"),
  },
  {
    id: "2",
    name: "Détergents",
    image: require("../../assets/categorie/category_detergents.png"),
  },
  {
    id: "3",
    name: "Laits",
    image: require("../../assets/categorie/category_laits.png"),
  },
  {
    id: "4",
    name: "Légumes",
    image: require("../../assets/categorie/category_legumes.png"),
  },
];

const products = [
  {
    id: "1",
    name: "Product 1",
    price: 10,
    category: "Boissons",
    image: require("../../assets/products/product1_boissons.png"),
  },
  {
    id: "2",
    name: "Product 2",
    price: 15,
    category: "Détergents",
    image: require("../../assets/products/product1_detergents.png"),
  },
  {
    id: "3",
    name: "Product 3",
    price: 20,
    category: "Laits",
    image: require("../../assets/products/product1_laits.png"),
  },
  {
    id: "4",
    name: "Product 4",
    price: 25,
    category: "Légumes",
    image: require("../../assets/products/product1_legumes.png"),
  },
  // Ajoutez ici les autres produits (jusqu'à 5)
];

const offers = [
  { id: "1", name: "Offer 1", image: require("../../assets/offer/offer1.png") },
  { id: "2", name: "Offer 2", image: require("../../assets/offer/offer2.png") },
  { id: "3", name: "Offer 3", image: require("../../assets/offer/offer3.png") },
];

const HomeScreen = ({ navigation }) => {
  const addToCart = (productId) => {
    Alert.alert(
      "Produit ajouté",
      "Le produit a été ajouté au panier avec succès!"
    );
  };

  const renderCategory = ({ item }) => (
    <TouchableOpacity style={styles.categoryItem}>
      <Image source={item.image} style={styles.categoryImage} />
      <Text style={styles.categoryName}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderProduct = ({ item }) => (
    <View style={styles.productItem}>
      <Image source={item.image} style={styles.productImage} />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>{item.price} $</Text>
      <TouchableOpacity
        style={styles.addToCartButton}
        onPress={() => addToCart(item.id)}
      >
        <Text style={styles.addToCartText}>Ajouter au panier</Text>
      </TouchableOpacity>
    </View>
  );

  const renderOffer = ({ item }) => (
    <TouchableOpacity style={styles.offerItem}>
      <Image source={item.image} style={styles.offerImage} />
      <Text style={styles.offerName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      {/* Bannière */}
      <View style={styles.bannerContainer}>
        <Image
          source={require("../../assets/banner.png")}
          style={styles.bannerImage}
        />
      </View>

      {/* Barre de recherche */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Rechercher un produit..."
          placeholderTextColor="#888"
        />
        <TouchableOpacity style={styles.searchIcon}>
          <FontAwesome name="search" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Section des catégories */}
      <Text style={styles.sectionTitle}>Catégories</Text>
      <FlatList
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.categoryList}
        showsHorizontalScrollIndicator={false}
      />

      {/* Section des offres */}
      <Text style={styles.sectionTitle}>Offres</Text>
      <FlatList
        data={offers}
        renderItem={renderOffer}
        keyExtractor={(item) => item.id}
        horizontal
        contentContainerStyle={styles.offerList}
        showsHorizontalScrollIndicator={false}
      />

      {/* Section des produits */}
      <Text style={styles.sectionTitle}>Tous les produits</Text>
      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.productList}
        showsVerticalScrollIndicator={false}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  bannerContainer: {
    height: 150,
    marginBottom: 16,
  },
  bannerImage: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    borderRadius: 8,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F1F1",
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    marginHorizontal: 16,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#000",
  },
  searchIcon: {
    padding: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 16,
    marginBottom: 8,
    color: "#333",
  },
  categoryList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  categoryItem: {
    alignItems: "center",
    marginRight: 16,
  },
  categoryImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    textAlign: "center",
    color: "#555",
  },
  offerList: {
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  offerItem: {
    alignItems: "center",
    marginRight: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 8,
    elevation: 3,
  },
  offerImage: {
    width: 120,
    height: 120,
    borderRadius: 8,
    marginBottom: 8,
  },
  offerName: {
    fontSize: 16,
    textAlign: "center",
    color: "#333",
  },
  productList: {
    paddingHorizontal: 16,
  },
  productItem: {
    marginBottom: 16,
    backgroundColor: "#FFF",
    borderRadius: 8,
    padding: 16,
    elevation: 2,
  },
  productImage: {
    width: "100%",
    height: 150,
    resizeMode: "cover",
    borderRadius: 8,
    marginBottom: 8,
  },
  productName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
  },
  productPrice: {
    fontSize: 16,
    marginBottom: 8,
    color: "#888",
  },
  addToCartButton: {
    backgroundColor: "#ff6347",
    borderRadius: 4,
    paddingVertical: 8,
    alignItems: "center",
  },
  addToCartText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
