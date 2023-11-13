import { Platform, StatusBar, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ScreensArray } from "../utils/constants";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { COLORS } from "../theme/theme";
import CustomDrawer1 from "./CustomDrawer1";

const Drawer = createDrawerNavigator();

const DrawerScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle={"dark-content"} backgroundColor={"white"} />
      <Text>Sup you lil bitch</Text>
    </View>
  );
};

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: styles.drawerStyles,
        drawerType: "front",
        swipeEdgeWidth: Platform.OS === "android" ? 180 : 0,
      }}
      drawerContent={(props: any) => <CustomDrawer1 {...props} />}
    >
      {ScreensArray.map((item, i) => (
        <Drawer.Screen
          key={i}
          name={item.route}
          component={DrawerScreen}
          options={{
            // @ts-ignore
            item: item,
          }}
        />
      ))}
    </Drawer.Navigator>
  );
};

export default DrawerNav;

const styles = StyleSheet.create({
  drawerStyles: {
    width: 260,
    backgroundColor: "transparent",
  },
  safeArea: {
    flex: 1,
    backgroundColor: "white",
  },

  container: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
});
