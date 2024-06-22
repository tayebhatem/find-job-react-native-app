import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import { Link, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { createUser } from "@/lib/appwrite";

const SignUp = () => {
  const router = useRouter();
  const [form, setForm] = useState({
    email: {
      value: "",
      message: ""
    },
    password: {
      value: "",
      message: ""
    },
    confirmPassword: {
      value: "",
      message: ""
    },
  });
  const [isLoading, setIsLoading] = useState(false);

  const isValid=()=>{
    if(!form.email.value){
      setForm((prevForm) => ({
        ...prevForm,
        email: {
          ...prevForm.email,
          message: "email is required!",
        },
      }))
   
    }
    if(!form.password.value){
      setForm((prevForm) => ({
        ...prevForm,
        password: {
          ...prevForm.password,
          message: "password is required!",
        },
      }))
     
    }
    if(!form.confirmPassword.value){
      setForm((prevForm) => ({
        ...prevForm,
        confirmPassword: {
          ...prevForm.confirmPassword,
          message: "confirm password is required!",
        },
      }))
     
    }

    if(form.confirmPassword.value!==form.password.value){
      setForm((prevForm) => ({
        ...prevForm,
        confirmPassword: {
          ...prevForm.confirmPassword,
          message: "password does not match!",
        },
      }))
     
    }
    
    if(form.email.message || form.password.message || form.confirmPassword.message){
        return false
    }else{
    
     return true
    }
  }


  const submit = async () => {
    if (isValid()) {
      try {
        setIsLoading(true);
        await createUser(form.email.value, form.password.value);
        router.push("/verify-account");
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
      <Text className="text-2xl font-semibold  ">Sign up Right Now</Text>
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
                  message: text,
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

      <CustomInput
        title={"password"}
        placeholder="******************"
        showMessage={
          (text: string) => {
              setForm((prevForm) => ({
                ...prevForm,
                password: {
                  ...prevForm.password,
                  message: text,
                },
              }))
          
            }
       }  
          onChange={(text: string) => {
      setForm((prevForm) => ({
        ...prevForm,
        password: {
          ...prevForm.password,
          value: text,
        },
      }));
    }} 
        value={form.password.value}
        message={form.password.message}
      />
      <CustomInput
        title={"confirm password"}
        placeholder="******************"
        showMessage={
          (text: string) => {
              setForm((prevForm) => ({
                ...prevForm,
                confirmPassword: {
                  ...prevForm.confirmPassword,
                  message: text,
                },
              }))
          
            }
       }  
          onChange={(text: string) => {
      setForm((prevForm) => ({
        ...prevForm,
        confirmPassword: {
          ...prevForm.confirmPassword,
          value: text,
        },
      }));
    }} 
        value={form.confirmPassword.value}
        message={form.confirmPassword.message}
      />
      <CustomButton title="Sign up" handlePress={submit} disabled={isLoading} />

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
          Already have account ?{" "}
        </Text>
        <Link
          href={"/sign-in"}
          className="text-primary-500 text-base font-semibold"
        >
          Sign in
        </Link>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;
