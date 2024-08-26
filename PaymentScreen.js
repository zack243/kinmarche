import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PaymentScreen({ navigation }) {
  const [paymentMethod, setPaymentMethod] = useState("M-Pesa");
  const [points, setPoints] = useState(0); // Points de fidélité disponibles
  const [mpesaNumber, setMpesaNumber] = useState(""); // Numéro pour M-Pesa
  const [amount, setAmount] = useState(0); // Montant à payer

  useEffect(() => {
    const loadPoints = async () => {
      try {
        const storedPoints = await AsyncStorage.getItem("points");
        setPoints(storedPoints ? parseInt(storedPoints, 10) : 0);
      } catch (error) {
        console.error("Erreur lors du chargement des points: ", error);
      }
    };

    loadPoints();
  }, []);

  const handlePayment = async () => {
    try {
      if (paymentMethod === "Points de fidélité" && points >= amount) {
        // Utilisation des points de fidélité
        setPoints(points - amount);
        await AsyncStorage.setItem("points", points - amount.toString());
      } else if (paymentMethod === "M-Pesa") {
        if (!mpesaNumber) {
          Alert.alert("Erreur", "Veuillez entrer un numéro M-Pesa.");
          return;
        }
        // Logique de paiement M-Pesa simulée
        // (Dans un scénario réel, vous intégreriez ici la logique M-Pesa)
      } else {
        Alert.alert(
          "Erreur",
          "Méthode de paiement non supportée ou fonds insuffisants."
        );
        return;
      }

      // Génération et stockage de la facture
      const invoice = {
        id: Date.now().toString(),
        paymentMethod: paymentMethod,
        amount: amount,
        date: new Date().toLocaleString(),
      };

      const storedInvoices = await AsyncStorage.getItem("invoices");
      const invoices = storedInvoices ? JSON.parse(storedInvoices) : [];

      invoices.push(invoice);
      await AsyncStorage.setItem("invoices", JSON.stringify(invoices));

      Alert.alert("Paiement", `Paiement effectué par ${paymentMethod}.`);
      navigation.navigate("InvoicesScreen"); // Redirection vers la page des factures
    } catch (error) {
      Alert.alert(
        "Erreur",
        "Une erreur s'est produite lors du paiement. Veuillez réessayer."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Paiement</Text>
      <Text style={styles.label}>Montant à payer</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={amount.toString()}
        onChangeText={(value) => setAmount(Number(value))}
        placeholder="Entrez le montant"
      />
      <Text style={styles.label}>Méthode de paiement</Text>
      <TouchableOpacity
        style={[
          styles.button,
          paymentMethod === "M-Pesa" && styles.selectedButton,
        ]}
        onPress={() => setPaymentMethod("M-Pesa")}
      >
        <Text style={styles.buttonText}>M-Pesa</Text>
      </TouchableOpacity>
      {paymentMethod === "M-Pesa" && (
        <TextInput
          style={styles.input}
          keyboardType="phone-pad"
          value={mpesaNumber}
          onChangeText={setMpesaNumber}
          placeholder="Entrez votre numéro M-Pesa"
        />
      )}
      <TouchableOpacity
        style={[
          styles.button,
          paymentMethod === "Points de fidélité" && styles.selectedButton,
        ]}
        onPress={() => setPaymentMethod("Points de fidélité")}
      >
        <Text style={styles.buttonText}>
          Points de fidélité ({points} points disponibles)
        </Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.paymentButton} onPress={handlePayment}>
        <Text style={styles.paymentButtonText}>Payer</Text>
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
  label: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#ddd",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    alignItems: "center",
  },
  selectedButton: {
    backgroundColor: "#4CAF50",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
  paymentButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  paymentButtonText: {
    color: "#fff",
    fontSize: 18,
  },
});
