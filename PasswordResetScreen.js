import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

export default function PasswordResetScreen({ navigation }) {
  const [email, setEmail] = useState("");

  const handleResetPassword = async () => {
    const auth = getAuth();
    if (email) {
      try {
        await sendPasswordResetEmail(auth, email);
        Alert.alert(
          "Réinitialisation du mot de passe",
          "Un email de réinitialisation a été envoyé."
        );
        navigation.navigate("LoginScreen"); // Redirection vers l'écran de connexion après réinitialisation
      } catch (error) {
        let errorMessage = "Une erreur s'est produite. Veuillez réessayer.";
        if (error.code === "auth/invalid-email") {
          errorMessage = "L'adresse email est invalide.";
        } else if (error.code === "auth/user-not-found") {
          errorMessage = "Aucun utilisateur trouvé avec cet email.";
        }
        Alert.alert("Erreur", errorMessage);
      }
    } else {
      Alert.alert("Erreur", "Veuillez entrer votre email.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Réinitialiser le mot de passe</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Réinitialiser</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  button: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});
