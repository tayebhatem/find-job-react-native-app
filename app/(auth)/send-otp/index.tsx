import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import { Link } from "expo-router";
import CustomButton from "@/components/CustomButton";

const SendOtp = () => {
  const [form, setForm] = useState({
    email: {
      value: "",
      message: "",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const submit = () => {
    
  };
  return (
    <SafeAreaView className="bg-white h-full w-full px-6 justify-center">
      <Image
        source={require("../../../assets/images/Mail-sent.png")}
        resizeMode="cover"
        className="self-center"
      />

      <Text className="text-2xl font-semibold  ">Enter your Email</Text>
      <Text className="text-base  text-primary-gray-500 my-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>

      <CustomInput
        title={"email"}
        placeholder="Natasha28@hotmail.com"
        showMessage={
          (text: string) => {
              setForm((prevForm) => ({
                ...prevForm,
                email: {
                  ...prevForm.email,
                  messsage: text,
                },
              }))
          
            }
       }  
          onChange={(text: string) => {
      setForm((prevForm) => ({
        ...prevForm,
        email: {
          ...prevForm.email,
          value: text,
        },
      }));
    }} 
        value={form.email.value}
        message={form.email.message}
      />

      <CustomButton title="send" handlePress={submit} disabled={isLoading} />
    </SafeAreaView>
  );
};

export default SendOtp;
