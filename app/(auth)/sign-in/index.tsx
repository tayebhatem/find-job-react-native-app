import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import { Link } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { signIn } from "@/lib/appwrite";

const SignIn = () => {
  const [form, setform] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const submit = async () => {
    if (form.email && form.password) {
      try {
        setIsLoading(true);
        const user = await signIn(form.email, form.password);
        console.log(user);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    }
  };
  return (
    <SafeAreaView className="bg-white h-full w-full px-6 justify-center">
      <Image
        source={require("../../../assets/images/logo.png")}
        resizeMode="cover"
        className=""
      />
      <Text className="text-2xl font-semibold  ">Sign in Right Now</Text>
      <Text className="text-base  text-primary-gray-500 my-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>
      <CustomInput
        title={"email"}
        placeholder="Natasha28@hotmail.com"
        onChange={(text: string) => {
          setform({ ...form, email: text });
        }}
      />

      <CustomInput
        title={"password"}
        placeholder="******************"
        onChange={(text: string) => {
          setform({ ...form, password: text });
        }}
      />
      <Link
        href={"/send-otp"}
        className="text-base text-primary-500 font-medium"
      >
        Forget password ?
      </Link>
      <CustomButton title="Sign in" handlePress={submit} disabled={isLoading} />
      <View className="relative  w-full  py-4 justify-center items-center">
        <View className="absolute bg-primary-gray-300 w-full h-[1px]  "></View>
        <View className=" absolute   bg-white px-2">
          <Text className="text-primary-gray-500">Or continue with</Text>
        </View>
      </View>
      <View className="flex-row gap-x-4 my-4">
        <TouchableOpacity className="border flex-1 border-primary-gray-300 rounded-md p-4 flex-row items-center justify-center ">
          <Image source={require("../../../assets/images/Google.png")} />
          <Text className="ml-4 text-lg font-medium">Google</Text>
        </TouchableOpacity>
        <TouchableOpacity className="border flex-1  border-primary-gray-300 rounded-md p-4 flex-row items-center justify-center ">
          <Image source={require("../../../assets/images/LinkedIn.png")} />
          <Text className="ml-4 text-lg font-medium">Linkedin</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row self-center my-2">
        <Text className="text-base text-primary-gray-500">
          Don't have account ?{" "}
        </Text>
        <Link
          href={"/sign-up"}
          className="text-primary-500 text-base font-semibold"
        >
          Sign up
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;
