import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";

const CustomInput = ({
  title,
  placeholder,
  value,
  message,
  showMessage,
  onChange,
}: {
  title: string;
  placeholder: string;
  value:string;
  showMessage:any;
  message:string;
  onChange: any;
}) => {
  const [showPassword, setShowPassword] = useState(true)

  const togglePassword=()=>{
    setShowPassword(!showPassword)
  }
  const isValidPassword=(text:string)=>{
    if(title === "password" || title==="confirm password"){
       text.length<8 ?  showMessage('password must be at least 8 characters!'): showMessage("")
    }
  }
  const isValidEmail=(text:string)=>{
   if(title==='email'){
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(text)) {
      showMessage('email is not valid!')
    }else{
      showMessage("")
    }
   }
  
  }
  const handlChange = (text: string) => {
  
    onChange(text);
    if (text === "") {
      showMessage(`${title} is required!`)
     
    } else {
      isValidEmail(text)
      isValidPassword(text)
    }
  };
 
  return (
    <View className="w-full my-1">
      <Text className="text-base text-primary-gray-500 font-medium capitalize">
        {title}
      </Text>
      <View className={`p-3 mt-2 border ${message?'border-red-500':'border-primary-gray-200'} rounded-md flex-row items-center bg-primary-gray-100 ${!message && 'focus:border-primary-500'}`}>
        {title === "email" ? (
          <MaterialIcons name="email" size={24} color="#B7B5B1" />
        ) : title === "password" || title==="confirm password" ? (
          <FontAwesome name="lock" size={24} color="#B7B5B1" />
        ) : null}
        <TextInput
          placeholder={placeholder}
          className="ml-3 text-base flex-1"
          secureTextEntry={(title === "password" || title==="confirm password") && showPassword}
          onChangeText={(text) => handlChange(text)}
          value={value}
        />
       {(title === "password" || title==="confirm password") && 
       <TouchableOpacity activeOpacity={0.8} onPress={togglePassword}>
       {showPassword? <FontAwesome name="eye" size={24} color="#B7B5B1" />: <FontAwesome name="eye-slash" size={24} color="#B7B5B1" />}
        </TouchableOpacity>}
      </View>
      {message && <Text className="text-red-500 mt-1">{message}</Text>}
    </View>
  );
};

export default CustomInput;
