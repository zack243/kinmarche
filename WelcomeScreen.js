import React, { useEffect, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  const navigation = useNavigation(); // Assurez-vous que ce composant est bien dans un NavigationContainer
  const slideAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const isLoggedIn = await AsyncStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        navigation.replace("MainTabs"); // Assurez-vous que "MainTabs" est correctement configuré
      }
    };

    checkUserLoggedIn();

    // Animation du chariot
    Animated.loop(
      Animated.sequence([
        Animated.timing(slideAnim, {
          toValue: 100,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [slideAnim, navigation]);

  const handleEnter = async () => {
    await AsyncStorage.setItem("isLoggedIn", "true");
    navigation.replace("MainTabs");
  };

  return (
    <View style={styles.container}>
      <View style={styles.circleContainer}>
        <Animated.View
          style={[
            styles.cartContainer,
            { transform: [{ translateX: slideAnim }] },
          ]}
        >
          <Text style={styles.cartIcon}>🛒</Text>
        </Animated.View>
      </View>
      <Text style={styles.welcomeText}>Bienvenue à Kin Marché</Text>
      <Text style={styles.subText}>
        Faites vos achats en ligne rapidement et facilement.
      </Text>
      <TouchableOpacity
        style={styles.enterButton}
        onPress={handleEnter}
        activeOpacity={0.8}
      >
        <Text style={styles.enterButtonText}>Suivant</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  circleContainer: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: "#E57373",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 40,
  },
  cartContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  cartIcon: {
    fontSize: 80,
    color: "#fff",
  },
  welcomeText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 10,
    textAlign: "center",
  },
  subText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
    marginBottom: 60,
  },
  enterButton: {
    backgroundColor: "#D32F2F",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  enterButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default WelcomeScreen;
