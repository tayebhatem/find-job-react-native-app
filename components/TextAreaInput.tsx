import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const TextAreaInput = ({
  title,
  placeholder,
  onChange,
}: {
  title: string;
  placeholder: string;
  onChange: any;
}) => {
  const [error, seterror] = useState("");
  const handlChange = (text: string) => {
    onChange(text);
    if (text === "") {
      seterror(`${title} is required!`);
    } else {
      seterror("");
    }
  };
  return (
    <View className="w-full my-2">
      <Text className="text-base text-primary-gray-300 capitalize">
        {title}
      </Text>
      <View className="p-3 mt-2 border border-primary-gray-200 rounded-md flex-row items-center ">
        <TextInput
          numberOfLines={4}
          placeholder={placeholder}
          className="ml-3 text-base"
          secureTextEntry={title === "password"}
          onChangeText={(text) => handlChange(text)}
        />
      </View>
      {error && <Text className="text-red-500">{error}</Text>}
    </View>
  );
};

export default TextAreaInput;