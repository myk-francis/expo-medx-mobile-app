import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useReducer, useRef } from "react";
import { useDrawerProgress } from "@react-navigation/drawer";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { ProfileMenu, ProjectsArray } from "../utils/constants";
import { COLORS, FONTFAMILY } from "../theme/theme";

const DrawerItem = ({
  label,
  onPress,
  tabBarTestID,
  type,
  name,
  notification,
  activeItemColor,
  color,
  styles,
  icon,
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      testID={tabBarTestID}
      accessibilityRole="button"
      style={[styles.drawerItem, { backgroundColor: activeItemColor }]}
    >
      <View style={styles.row}>
        <AntDesign name={icon} size={30} color={color} />
        <Text style={[styles.label, { color }]}>{label}</Text>
      </View>
      {notification > 0 && (
        <View
          style={[
            styles.notificationBadge,
            { backgroundColor: notification > 5 ? "#e892ab" : "#b0e6fd" },
          ]}
        >
          <Text>{notification}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const DrawerItemList = ({ state, descriptors, navigation, styles }: any) => {
  return (
    <View style={styles.view}>
      {state.routes.map((route: any, index: any) => {
        const isFocused = state.index === index;
        const { options } = descriptors[route.key];

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });
          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };
        {
          /* console.log(options) */
        }

        const drawerItem = options.item;
        const color = isFocused ? "white" : "#999999";
        const activeItemColor = isFocused ? "#60c5a8" : null;

        return (
          <DrawerItem
            key={index}
            label={drawerItem.label}
            tabBarTestID={options.tabBarTestID}
            onPress={onPress}
            name={drawerItem.icon}
            type={drawerItem.type}
            notification={drawerItem.notification}
            color={color}
            activeItemColor={activeItemColor}
            styles={styles}
            icon={drawerItem.icon}
          />
        );
      })}
    </View>
  );
};

const ProjectItem = ({
  label,
  onPress,
  type,
  name,
  activeItemColor,
  color,
}: any) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.row, { backgroundColor: activeItemColor }]}
    >
      <View style={[styles.iconContainer, { backgroundColor: color }]}>
        <AntDesign name={name} size={30} color="black" />
      </View>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const ProfileItem = ({ label, onPress, type, name }: any) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.row, { margin: 8 / 4 }]}>
      <AntDesign name={name} size={30} color="#123" />
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  );
};

const CustomDrawer1 = (props: any) => {
  const { state, descriptors, navigation } = props;
  const scrollRef = useRef(null);

  const [show, toggleProfile] = useReducer((s) => !s, false);

  const fun = () => {
    show
      ? // @ts-ignore
        scrollRef.current?.scrollTo({
          y: 0,
          animated: true,
        })
      : // @ts-ignore
        scrollRef.current?.scrollToEnd({
          animated: true,
        });
    toggleProfile();
  };

  const progress = useDerivedValue(() => {
    return show ? withTiming(1) : withTiming(0);
  });

  const menuStyles = useAnimatedStyle(() => {
    const scaleY = interpolate(progress.value, [0, 1], [0, 1]);
    return {
      transform: [{ scaleY }],
    };
  });

  const drawerProgress = useDrawerProgress();

  const viewStyles = useAnimatedStyle(() => {
    const translateX = interpolate(drawerProgress.value, [0, 1], [-200, 0]);
    return {
      transform: [{ translateX }],
    };
  });

  const viewStyles2 = (type: any) =>
    useAnimatedStyle(() => {
      const val = type === "top" ? -100 : 100;
      const translateY = interpolate(drawerProgress.value, [0, 1], [val, 0]);
      const opacity = interpolate(drawerProgress.value, [0, 1], [0, 1]);
      return {
        transform: [{ translateY }],
        opacity,
      };
    });

  return (
    <View style={styles.container}>
      {/* header */}
      <Animated.View
        style={[styles.row, styles.view, styles.marginTop, viewStyles2("top")]}
      >
        <View style={styles.iconContainer}>
          <Ionicons name="logo-electron" size={30} />
        </View>
        <Text style={styles.headerTitle}>Hello there👋</Text>
      </Animated.View>
      {/* Drawer List Item */}
      <Animated.ScrollView
        ref={scrollRef}
        {...props}
        showsVerticalScrollIndicator={false}
        style={[styles.marginVertical, viewStyles]}
      >
        <DrawerItemList {...props} styles={styles} />
        {/* 2nd menu */}
        <View style={[styles.view, styles.marginVertical]}>
          <Text>Projects 3</Text>
          <View style={styles.separator} />
          {ProjectsArray.map((_: any, i: any) => (
            <ProjectItem
              key={i}
              label={_.title}
              type={_.iconType}
              color={_.color}
              name={_.icon}
            />
          ))}
        </View>
        {/* profile menu */}
        <Animated.View
          style={[styles.view, { backgroundColor: "#60c5a8" }, menuStyles]}
        >
          <Text>Kelsey Van</Text>
          <Text>kelseyvan@gmail.com</Text>
          <View style={styles.separator} />
          {ProfileMenu.map((_: any, i: any) => (
            <ProfileItem
              key={i}
              label={_.label}
              type={_.iconType}
              name={_.icon}
            />
          ))}
          <Text style={{ marginTop: 10 }}>v1.0.0 - Terms & Condition</Text>
        </Animated.View>
      </Animated.ScrollView>
      {/* footer */}
      <TouchableOpacity onPress={fun}>
        <Animated.View
          style={[
            styles.row,
            styles.view,
            styles.marginBottom,
            viewStyles2("bottom"),
          ]}
        >
          <Image
            style={styles.profile}
            source={require("../../assets/images/avatar.png")}
          />
          <View style={styles.textContainer}>
            <Text style={styles.headerTitle}>Kelsey Van</Text>
            <Text style={styles.text}>Software Engineer</Text>
          </View>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

export default CustomDrawer1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view: {
    backgroundColor: COLORS.primaryBlackHex,
    borderRadius: 10,
    marginHorizontal: 4,
    padding: 8 / 1.5,
  },
  marginTop: {
    marginTop: 4,
  },
  marginBottom: {
    marginBottom: 4,
  },
  marginVertical: {
    marginVertical: 4,
  },
  drawerItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    justifyContent: "space-between",
    borderRadius: 10,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    color: "white",
    paddingHorizontal: 16,
    fontFamily: FONTFAMILY.poppins_regular,
  },
  notificationBadge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 5,
  },
  iconContainer: {
    padding: 8,
    borderRadius: 10,
    margin: 8,
    backgroundColor: "#60c5a8",
  },
  separator: {
    width: "100%",
    height: 1,
    backgroundColor: "#999999",
    marginVertical: 8,
  },
  textContainer: {
    // color: "white",
  },
  text: {
    color: "white",
    fontFamily: FONTFAMILY.poppins_regular,
  },
  headerTitle: {
    fontSize: 16,
    color: "white",
    fontFamily: FONTFAMILY.poppins_regular,
  },
  profile: {
    marginVertical: 4,
    marginRight: 8,
    marginLeft: 4,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#f0f0f0",
  },
  profileText: {
    color: "white",
    fontFamily: FONTFAMILY.poppins_regular,
  },
});
