import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import { Link, Redirect, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import { signIn, signOut } from "@/lib/appwrite";
import { useSession } from "@/lib/useSession";
import { ALERT_TYPE, Dialog, Toast } from "react-native-alert-notification";

const SignIn = () => {
  const [form, setForm] = useState({
    email: {
      value: "",
      message: ""
    },
    password: {
      value: "",
      message: ""
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  
  const router = useRouter();
  const session = useSession();
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
   
    if(form.email.message || form.password.message){
        return false
    }else{
     return true
    }
  }
  const submit = async () => {
    if (isValid()) {
      try {
       
        setIsLoading(true);
        const verified = await signIn(form.email.value, form.password.value);
        if (!verified) {
          router.push("/verify-account");
        } else {
          router.push("/home");
        }
      } catch (error: any) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: "Error",
          textBody: error.message,
          button: "close",
        });
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (session) return <Redirect href={"/verify-account"} />;
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
