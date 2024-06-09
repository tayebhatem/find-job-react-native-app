import { View, Text } from "react-native";
import React from "react";
import { Stack } from "expo-router";
import { AlertNotificationRoot } from "react-native-alert-notification";
const AuthLayout = () => {
  return (
    <AlertNotificationRoot>
      <Stack>
        <Stack.Screen name="sign-in/index" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up/index" options={{ headerShown: false }} />
        <Stack.Screen name="send-otp/index" options={{ headerShown: false }} />
        <Stack.Screen
          name="verify-account/index"
          options={{ headerShown: false }}
        />
      </Stack>
    </AlertNotificationRoot>
  );
};

export default AuthLayout;
