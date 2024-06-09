import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";

export default function TabLayout() {
  const color = "#864EBB";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <FontAwesome
              name="home"
              size={36}
              color={focused ? "#864EBB" : "#A5A29D"}
            />
          ),
          tabBarLabelStyle: {
            color: "#864EBB",
            fontSize: 14,
          },
          tabBarStyle: {
            height: 60,
          },
        }}
      />
    </Tabs>
  );
}
