import AsyncStorage from "@react-native-async-storage/async-storage";

// Sauvegarder des données dans AsyncStorage
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
    return true; // Indiquer que l'opération a réussi
  } catch (e) {
    console.error("Erreur lors de la sauvegarde", e);
    return false; // Indiquer que l'opération a échoué
  }
};

// Récupérer des données depuis AsyncStorage
export const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.error("Erreur lors de la récupération", e);
    return null; // Retourner null en cas d'erreur
  }
};

// Supprimer des données dans AsyncStorage
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
    return true; // Indiquer que l'opération a réussi
  } catch (e) {
    console.error("Erreur lors de la suppression", e);
    return false; // Indiquer que l'opération a échoué
  }
};
