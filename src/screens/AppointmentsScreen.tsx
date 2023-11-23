import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";

const AppointmentsScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>AppointmentsScreen</Text>
    </View>
  );
};

export default AppointmentsScreen;

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
