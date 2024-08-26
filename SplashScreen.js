import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SplashScreen = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("Home"); // Assurez-vous que cet écran est bien défini dans Stack.Navigator
  };

  return (
    <View style={styles.splashContainer}>
      <Text style={styles.splashText}>Chargement...</Text>
      <Button title="Suivant" onPress={handlePress} />
    </View>
  );
};

const styles = StyleSheet.create({
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  splashText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SplashScreen;
