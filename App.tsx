import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import AppStack from "./src/navigators/AppStack";
import { useFonts } from "expo-font";

export default function App() {
  const [loaded] = useFonts({
    poppins_black: require("./assets/fonts/Poppins-Black.ttf"),
    poppins_bold: require("./assets/fonts/Poppins-Bold.ttf"),
    poppins_extrabold: require("./assets/fonts/Poppins-ExtraBold.ttf"),
    poppins_extralight: require("./assets/fonts/Poppins-ExtraLight.ttf"),
    poppins_light: require("./assets/fonts/Poppins-Light.ttf"),
    poppins_medium: require("./assets/fonts/Poppins-Medium.ttf"),
    poppins_regular: require("./assets/fonts/Poppins-Regular.ttf"),
    poppins_semibold: require("./assets/fonts/Poppins-SemiBold.ttf"),
    poppins_thin: require("./assets/fonts/Poppins-Thin.ttf"),
  });

  return <NavigationContainer>{loaded && <AppStack />}</NavigationContainer>;
}
