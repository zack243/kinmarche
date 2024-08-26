import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
  Animated,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { getAuth, updateEmail, updatePassword, signOut } from "firebase/auth";

export default function ProfileScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showProfileEdit, setShowProfileEdit] = useState(false);
  const [points, setPoints] = useState(150); // Exemple de points de fidélité
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current; // Animation d'opacité
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const checkAuthStatus = () => {
      if (user) {
        setEmail(user.email || "");
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    };

    checkAuthStatus();
  }, [user]);

  useEffect(() => {
    // Animer les points de fidélité lorsque le composant est monté
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  const handleSaveChanges = async () => {
    if (user) {
      try {
        // Mise à jour de l'email
        if (email !== user.email) {
          await updateEmail(user, email);
        }

        // Mise à jour du mot de passe
        if (password) {
          await updatePassword(user, password);
        }

        Alert.alert(
          "Modifications enregistrées",
          "Votre profil a été mis à jour."
        );
        setShowProfileEdit(false);
      } catch (error) {
        console.error("Error updating profile: ", error);
        Alert.alert("Erreur", "Impossible de mettre à jour le profil.");
      }
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      navigation.navigate("LoginScreen");
    } catch (error) {
      console.error("Error signing out: ", error);
      Alert.alert("Erreur", "Impossible de se déconnecter.");
    }
  };

  const handleLogin = () => {
    navigation.navigate("LoginScreen");
  };

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/150" }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.addPhotoButton}>
            <FontAwesome name="plus" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        <Text style={styles.profileName}>
          {user ? user.displayName : "Nom de l'utilisateur"}
        </Text>
      </View>

      {isLoggedIn ? (
        <>
          <TouchableOpacity
            style={styles.optionButton}
            onPress={() => setShowProfileEdit(!showProfileEdit)}
          >
            <FontAwesome name="edit" size={24} color="#333" />
            <Text style={styles.optionText}>Modifier le profil</Text>
          </TouchableOpacity>

          {showProfileEdit && (
            <View style={styles.profileEditContainer}>
              <View style={styles.formGroup}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              <View style={styles.formGroup}>
                <Text style={styles.label}>Mot de passe</Text>
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>

              <TouchableOpacity
                style={styles.saveButton}
                onPress={handleSaveChanges}
              >
                <Text style={styles.saveButtonText}>
                  Enregistrer les modifications
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <Animated.View style={{ opacity: fadeAnim }}>
            <Text style={styles.pointsText}>Points de fidélité : {points}</Text>
          </Animated.View>

          <TouchableOpacity
            style={[styles.optionButton, styles.logoutButton]}
            onPress={handleLogout}
          >
            <FontAwesome name="sign-out" size={24} color="#fff" />
            <Text style={styles.logoutText}>Se déconnecter</Text>
          </TouchableOpacity>
        </>
      ) : (
        <TouchableOpacity
          style={[styles.optionButton, styles.loginButton]}
          onPress={handleLogin}
        >
          <FontAwesome name="sign-in" size={24} color="#fff" />
          <Text style={styles.loginText}>Se connecter</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("InvoicesScreen")}
      >
        <FontAwesome name="file-text" size={24} color="#333" />
        <Text style={styles.optionText}>Factures</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("DeliveryStatusScreen")}
      >
        <FontAwesome name="truck" size={24} color="#333" />
        <Text style={styles.optionText}>Livraison</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.optionButton}
        onPress={() => navigation.navigate("SettingsScreen")}
      >
        <FontAwesome name="cogs" size={24} color="#333" />
        <Text style={styles.optionText}>Paramètres</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  imageContainer: {
    position: "relative",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  addPhotoButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#4CAF50",
    borderRadius: 15,
    padding: 5,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
  },
  profileEditContainer: {
    marginBottom: 20,
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  optionButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginVertical: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  optionText: {
    fontSize: 18,
    marginLeft: 10,
  },
  pointsText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  loginButton: {
    backgroundColor: "#2196F3",
  },
  loginText: {
    color: "#fff",
    fontSize: 18,
  },
  logoutButton: {
    backgroundColor: "#f44336",
  },
  logoutText: {
    color: "#fff",
    fontSize: 18,
  },
});
