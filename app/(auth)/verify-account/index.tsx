import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import { Link, router, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import OtpTextInput from "react-native-text-input-otp";
import { getCurrentSession, resendCode, verifyAccount } from "@/lib/appwrite";
import { useSession } from "@/lib/useSession";
const VerifyAccount = () => {
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const session = useSession();
  const router = useRouter();
  const submit = async () => {
    if (otp) {
      try {
        const response = await verifyAccount(otp);
        if (!response?.success) {
          if (response?.error) setError(response?.error);
        } else {
          if (response.message) console.log(response.message);
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };
  const resend = async () => {
    try {
      await resendCode();
    } catch (error) {
      console.log(error);
    }
  };

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
      {error && (
        <Text className="text-red-500 text-base mt-2 text-center">{error}</Text>
      )}
      <CustomButton title="verify" handlePress={submit} disabled={isLoading} />

      <View className="flex-row self-center my-2">
        <Text className="text-base text-primary-gray-500">
          Didn't recieve code ?{" "}
        </Text>
        <TouchableOpacity activeOpacity={0.8} onPress={resend}>
          <Text className="text-primary-500 text-base font-semibold">
            Resend
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default VerifyAccount;
const styles = StyleSheet.create({
  otp: {
    height: 75,
    width: 75,
    alignItems: "center",
    justifyContent: "center",
  },
});
