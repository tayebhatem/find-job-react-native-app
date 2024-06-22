import { Tabs } from "expo-router";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { TabBarIcon } from "@/components/navigation/TabBarIcon";
import TabIcon from "@/components/TabIcon";
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
export default function TabLayout() {
  const color = "#864EBB";
  
  return (
    
    <Tabs
      screenOptions={{
        
        headerShown: false,
        tabBarActiveTintColor:"#864EBB",
        tabBarInactiveTintColor:"#A5A29D",
        tabBarShowLabel:false,
        tabBarStyle:{
          height:75,
          
        }
        
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
         
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} icon={"home"} name="Home" />
          ),
          
        
        }}
      />
<Tabs.Screen
        name="messages"
        options={{
          title: "Messages",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} icon={"envelope"} name="Messages" />
          ),
          
         
        }}
      />
       <Tabs.Screen
        name="offers"
        options={{
          
          title: "Offer",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} icon={"suitcase"} name="Offers" />
          ),
          
          
          
        }}
      />
      <Tabs.Screen
        name="requests"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} icon={"user-plus"} name="Requests" />
          ),
         
        }}
      />
      
      <Tabs.Screen
        name="profile"
        options={{
        
         headerTitleAlign:'center',
          headerStyle:{
            backgroundColor:'#864EBB',
            borderColor:'#000'
          },
          headerTintColor:'#fff',
          title: "Profile",
          tabBarIcon: ({ color, focused }) => (
            <TabIcon color={color} focused={focused} icon={"user"} name="Profile" />
          ),
        
        }}
        
      />
      
    </Tabs>

  );
}
