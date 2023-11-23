import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  HomeScreen,
  InboxScreen,
  SearchScreen,
  AppointmentsScreen,
} from "../screens";
import { COLORS, FONTFAMILY } from "../theme/theme";

const Stack = createNativeStackNavigator();

const Tab = createBottomTabNavigator();

function TimelineStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="HomeScreen"
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
    </Stack.Navigator>
  );
}

function InboxStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="InboxScreen"
    >
      <Stack.Screen name="InboxScreen" component={InboxScreen} />
    </Stack.Navigator>
  );
}

function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="SearchScreen"
    >
      <Stack.Screen name="SearchScreen" component={SearchScreen} />
    </Stack.Navigator>
  );
}

function AppointmentStack() {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="AppointmentsScreen"
    >
      <Stack.Screen name="AppointmentsScreen" component={AppointmentsScreen} />
    </Stack.Navigator>
  );
}

const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Timeline") {
            iconName = focused ? "grid" : "grid-outline";
          } else if (route.name === "Inbox") {
            iconName = focused ? "chatbox-sharp" : "chatbox-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "md-search" : "md-search";
          } else if (route.name === "Appointments") {
            iconName = focused ? "calendar-sharp" : "calendar-outline";
          }

          // You can return any component that you like here
          //@ts-ignore
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primaryOrangeHex,
        tabBarInactiveTintColor: "gray",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: COLORS.primaryBlackHex,
          borderTopColor: COLORS.primaryBlackHex,
          // borderTopWidth: 1,
        },
        tabBarLabelStyle: {
          fontFamily: FONTFAMILY.poppins_semibold,
        },
      })}
    >
      <Tab.Screen
        name="Timeline"
        component={TimelineStack}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Search"
        component={SearchStack}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Appointments"
        component={AppointmentStack}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen
        name="Inbox"
        component={InboxStack}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

export default HomeTabs;
