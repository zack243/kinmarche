import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function DeliveryStatusScreen({ navigation }) {
  const [deliveryInProgress, setDeliveryInProgress] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState("0 min");
  const [deliveryDetails, setDeliveryDetails] = useState(null);

  useEffect(() => {
    const fetchDeliveryStatus = async () => {
      try {
        const deliveryData = await AsyncStorage.getItem("delivery");
        if (deliveryData) {
          const data = JSON.parse(deliveryData);
          if (data && data.delivery) {
            setDeliveryInProgress(true);
            setTimeRemaining(data.delivery.timeRemaining);
            setDeliveryDetails(data.delivery);
          } else {
            setDeliveryInProgress(false);
            setTimeRemaining("0 min");
          }
        } else {
          setDeliveryInProgress(false);
          setTimeRemaining("0 min");
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération des informations de livraison: ",
          error
        );
        Alert.alert(
          "Erreur",
          "Impossible de récupérer les informations de livraison."
        );
      }
    };

    fetchDeliveryStatus();
  }, []);

  return (
    <View style={styles.container}>
      {deliveryInProgress ? (
        <View>
          <Text style={styles.infoText}>
            Livraison en cours. Temps restant : {timeRemaining}
          </Text>
          {deliveryDetails && (
            <View style={styles.detailsContainer}>
              <Text style={styles.detailsText}>
                Adresse : {deliveryDetails.address}
              </Text>
              <Text style={styles.detailsText}>
                Numéro de suivi : {deliveryDetails.trackingNumber}
              </Text>
            </View>
          )}
        </View>
      ) : (
        <Text style={styles.infoText}>Aucune livraison en cours.</Text>
      )}
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate("ProfileScreen")}
      >
        <Text style={styles.backButtonText}>Retour au profil</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
  },
  infoText: {
    fontSize: 18,
    marginBottom: 20,
  },
  detailsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailsText: {
    fontSize: 16,
    color: "#333",
  },
  backButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  backButtonText: {
    color: "#fff",
  },
});
