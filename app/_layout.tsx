
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import "react-native-reanimated";

import { Provider } from "react-redux";
import { useColorScheme } from "@/hooks/useColorScheme";
import { store } from "./store";
import { Text, TouchableOpacity } from "react-native";
import { Entypo, FontAwesome } from '@expo/vector-icons';
// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
       
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="offer/[id]" 
        options={{ 
          title:'Job Details',
          headerTitleAlign:'center',
          headerShadowVisible: false,
          animation:'slide_from_left',
          headerRight:()=>(
          <TouchableOpacity activeOpacity={0.9} className="mx-2">
          
          <Entypo name="edit" size={24} color="#864EBB" />
          </TouchableOpacity>
          )
           }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false,animation:'simple_push' }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false,animation:'simple_push' }} />
        <Stack.Screen name="(profile)" options={{ headerShown: false,animation:'slide_from_right' }} />
      </Stack>
    </Provider>
  );
}
