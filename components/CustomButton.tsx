import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

import { AntDesign } from "@expo/vector-icons";
const CustomButton = ({
  title,
  handlePress,
  disabled,
}: {
  title: string;
  handlePress: any;
  disabled: boolean;
}) => {
  return (
    <TouchableOpacity
      className={`w-full flex-row justify-center px-4 py-6 my-4 bg-primary-500 items-center rounded-lg shadow-primary-500 shadow-md ${
        disabled && "opacity-70"
      } `}
      onPress={handlePress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      <Text className="text-white font-medium text-lg mr-4 capitalize">
        {title}
      </Text>
      <AntDesign name="arrowright" size={24} color="white" />
    </TouchableOpacity>
  );
};

export default CustomButton;
