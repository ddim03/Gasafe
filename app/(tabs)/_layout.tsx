import { Tabs } from "expo-router";
import { Text, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

type TabIconProps = {
  icon: any;
  color: string;
  name: string;
  focused: boolean;
};

const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View className="items-center justify-center gap-2 -mb-7">
      {icon}
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: "#ffe001",
        tabBarInactiveTintColor: "#cdcde0",
        tabBarStyle: {
          backgroundColor: "#161622",
          borderTopColor: "#232533",
          height: 62,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={<FontAwesome size={24} name="home" color={color} />}
              color={color}
              name={"Home"}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="tools"
        options={{
          title: "",
          headerShown: false,
          tabBarIcon: ({ color, focused }) => (
            <TabIcon
              icon={<FontAwesome size={24} name="wrench" color={color} />}
              color={color}
              name={"Tools"}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
