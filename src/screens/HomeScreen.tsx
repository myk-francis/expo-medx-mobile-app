import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>HomeScreen</Text>
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: COLORS.primaryWhiteHex,
  },
});
