import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import { Link } from "expo-router";
import CustomButton from "@/components/CustomButton";
import OtpTextInput from "react-native-text-input-otp";
import { verifyAccount } from "@/lib/appwrite";
const VerifyUser = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const submit = async () => {};
  return (
    <SafeAreaView className="bg-white h-full w-full px-6 justify-center">
      <Image
        source={require("../../../assets/images/Mail-sent.png")}
        resizeMode="cover"
        className="self-center"
      />
      <Image
        source={require("../../../assets/images/logo.png")}
        resizeMode="cover"
        className=""
      />
      <Text className="text-2xl font-semibold  ">Verify your account</Text>
      <Text className="text-base  text-primary-gray-500 my-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>
      <OtpTextInput
        otp={otp}
        setOtp={setOtp}
        digits={4}
        style={styles.otp}
        fontStyle={{ fontSize: 20, fontWeight: "bold" }}
        focusedStyle={{ borderColor: "#864EBB" }}
      />
      <CustomButton title="verify" handlePress={submit} disabled={isLoading} />

      <View className="flex-row self-center my-2">
        <Text className="text-base text-primary-gray-500">
          Didn't recieve code ?{" "}
        </Text>

        <TouchableOpacity activeOpacity={0.8}>
          <Text className="text-primary-500 text-base font-semibold">
            Resend
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyUser;
const styles = StyleSheet.create({
  otp: {
    height: 75,
    width: 75,
    alignItems: "center",
    justifyContent: "center",
  },
});
