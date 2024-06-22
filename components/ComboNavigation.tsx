import { View, Text, TouchableOpacity } from "react-native";
import React, { useEffect } from "react";

import { AntDesign } from "@expo/vector-icons";
import { Choice } from "@/constants/data";
const ComboNavigation = ({
  title,
  choice,
  navigate,
}: {
  title: string;
  choice: Choice;
  navigate: any;
}) => {
  return (
    <View className="w-full my-2">
      <Text className="text-base text-primary-gray-500 font-medium capitalize">
        {title}
      </Text>
      <TouchableOpacity
        className="py-4 px-6 mt-2 border border-primary-gray-200 bg-primary-gray-100 rounded-md flex-row  items-center justify-between "
        onPress={navigate}
      >
        <Text
          className={` text-base ${
            choice.id === 0 ? "text-primary-gray-300" : "font-medium capitalize"
          } `}
        >
          {choice.value}
        </Text>

        <AntDesign name="arrowright" size={24} color="#B7B5B1" />
      </TouchableOpacity>
    </View>
  );
};

export default ComboNavigation;
