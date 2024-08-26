// AppNavigator.js
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./src/screens/HomeScreen";

// Importez d'autres écrans

const Stack = createStackNavigator();

const AppNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />

    {/* Ajoutez d'autres écrans ici */}
  </Stack.Navigator>
);

export default AppNavigator;
