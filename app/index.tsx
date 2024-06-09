import { View, Text, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import { Redirect, useRouter } from "expo-router";
import { useSession } from "@/lib/useSession";

const OnBoreadingScreen = () => {
  const router = useRouter();
  const session = useSession();

  if (session) {
    return <Redirect href={"/choose-category"} />;
  }
  return (
    <SafeAreaView className="justify-end h-full w-full bg-white  px-8 py-4">
      <Image
        source={require("../assets/images/onboarding-image.png")}
        resizeMode="cover"
        className="self-center"
      />
      <Text className="text-4xl font-bold my-2 text-left">
        search for a job with <Text className="text-primary-500">Jobit</Text>
      </Text>
      <Text className="text-base text-primary-gray-500">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci,
        repellat consequuntur quasi veritatis, provident natus ratione iste
        molestiae laudantium blanditiis reiciendis possimus tempore
      </Text>
      <CustomButton
        handlePress={() => {
          router.push("/sign-in");
        }}
        title="start now"
        disabled={false}
      />
    </SafeAreaView>
  );
};

export default OnBoreadingScreen;
