import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "../theme/theme";

const SearchScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>SearchScreen</Text>
    </View>
  );
};

export default SearchScreen;

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
