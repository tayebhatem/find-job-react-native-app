import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const TextAreaInput = ({
  title,
  value,
  message,
  showMessage,
  placeholder,
  onChange,
}: {
  title: string;
  value:string;
  showMessage:any;
  message:string;
  placeholder: string;
  onChange: any;
}) => {

  const handlChange = (text: string) => {
    onChange(text);
    if (text === "") {
      showMessage(`${title} is required!`)
     
    } else {
      showMessage("")
    }
  };
  return (
    <View className="w-full my-1">
      <Text className="text-base text-primary-gray-500 font-medium capitalize">
        {title}
      </Text>
      <View className={`p-3 mt-2 border ${message?'border-red-500':'border-primary-gray-200'} bg-primary-gray-100 rounded-md flex-row items-center ${!message && 'focus:border-primary-500'}`}>
        <TextInput
        value={value}
        multiline={true}
          numberOfLines={6}
          placeholder={placeholder}
          className="ml-3 text-base"
          style={{textAlignVertical:'top'}}
          onChangeText={(text) => handlChange(text)}/>
        
      </View>
      {message && <Text className="text-red-500 mt-1">{message}</Text>}
    </View>
  );
};

export default TextAreaInput;
