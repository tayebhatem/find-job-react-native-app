import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const AuthLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="sign-in/index" options={{ headerShown: false }} />
      <Stack.Screen name="sign-up/index" options={{ headerShown: false }} />
      <Stack.Screen name="send-otp/index" options={{ headerShown: false }} />
      <Stack.Screen
        name="verify-account/index"
        options={{ headerShown: false }}
      />
    </Stack>
  );
};

export default AuthLayout;
