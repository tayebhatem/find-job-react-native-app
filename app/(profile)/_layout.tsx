import { View, Text, Modal } from "react-native";
import React from "react";
import { Stack } from "expo-router";

const ProfileLayout = () => {
  return (
    <Stack >
      <Stack.Screen
        name="choose-category/index"
        options={{
          headerShown: false,

          animation: "slide_from_right",
        }}
      />

      <Stack.Screen
        name="complete-profile/company/index"
        options={{
          headerTitle: "Complete Profile",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          animation: "slide_from_right",
        }}
      />
       <Stack.Screen
        name="company-profile/index"
        options={{
          title: "Edit Profile",
          headerShadowVisible: false,
          headerTitleAlign: "center",
          animation: "slide_from_right",
        }}
      />
      <Stack.Screen
        name="choose-state/index"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "modal",
          animation: "slide_from_left",
          headerTitle: "Choose State",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />

      <Stack.Screen
        name="choose-field/index"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "containedModal",
          animation: "slide_from_left",
          headerTitle: "Choose State",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
       <Stack.Screen
        name="change-password/index"
        options={{
          // Set the presentation mode to modal for our modal route.
          presentation: "containedModal",
          animation: "slide_from_left",
          headerTitle: "Change Password",
          headerShadowVisible: false,
          headerTitleAlign: "center",
        }}
      />
      
    </Stack>
  );
};

export default ProfileLayout;
