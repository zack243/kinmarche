import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function InvoicesScreen({ navigation }) {
  const [searchDate, setSearchDate] = useState("");
  const [invoices, setInvoices] = useState([]);
  const [filteredInvoices, setFilteredInvoices] = useState([]);

  const INVOICES_STORAGE_KEY = "invoices";

  const fetchInvoices = async () => {
    try {
      const storedInvoices = await AsyncStorage.getItem(INVOICES_STORAGE_KEY);
      const fetchedInvoices = storedInvoices ? JSON.parse(storedInvoices) : [];
      setInvoices(fetchedInvoices);
      setFilteredInvoices(fetchedInvoices);
    } catch (error) {
      console.error("Erreur lors de la récupération des factures: ", error);
      Alert.alert("Erreur", "Impossible de récupérer les factures.");
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  useEffect(() => {
    setFilteredInvoices(
      invoices.filter((invoice) => invoice.date.includes(searchDate))
    );
  }, [searchDate, invoices]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher par date (AAAA-MM-JJ)"
        value={searchDate}
        onChangeText={setSearchDate}
      />
      <FlatList
        data={filteredInvoices}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.invoiceItem}
            onPress={() =>
              navigation.navigate("InvoiceDetailsScreen", { invoice: item })
            }
          >
            <Text>Date : {item.date}</Text>
            <Text>Montant : {item.amount}</Text>
          </TouchableOpacity>
        )}
      />
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
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  searchInput: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  invoiceItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  backButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  backButtonText: {
    color: "#fff",
    textAlign: "center",
  },
});
