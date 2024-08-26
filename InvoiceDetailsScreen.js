import React from "react";
import { View, Text, StyleSheet, Button, Alert } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";

export default function InvoiceDetailsScreen({ route, navigation }) {
  const { invoice } = route.params;

  const createPDF = async () => {
    const htmlContent = `
      <html>
        <body>
          <h1>Détails de la facture</h1>
          <p>Date: ${invoice.date}</p>
          <p>Montant: ${invoice.amount}</p>
          <p>Client: ${invoice.customerName}</p>
          <p>Détails: ${invoice.details}</p>
        </body>
      </html>
    `;

    try {
      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await shareAsync(uri);
      Alert.alert("PDF généré et prêt à partager.");
    } catch (error) {
      console.error("Erreur lors de la génération du PDF: ", error);
      Alert.alert("Erreur", "Impossible de générer le PDF.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Détails de la facture</Text>
      <Text>Date : {invoice.date}</Text>
      <Text>Montant : {invoice.amount}</Text>
      <Text>Client : {invoice.customerName}</Text>
      <Text>Détails : {invoice.details}</Text>
      <Button title="Télécharger en PDF" onPress={createPDF} />
      <Button title="Retour" onPress={() => navigation.goBack()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
});
