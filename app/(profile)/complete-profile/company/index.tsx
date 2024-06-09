import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/lib/useUser";
import CustomInput from "@/components/CustomInput";
import Avatar from "@/components/Avatar";
import ComboNavigation from "@/components/ComboNavigation";
import { useRouter } from "expo-router";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import CustomButton from "@/components/CustomButton";
import TextAreaInput from "@/components/TextAreaInput";
import { createCompanyAccount } from "@/lib/appwrite";

const Company = () => {
  const user = useUser();
  const router = useRouter();
  const state = useSelector((state: RootState) => state.state);
  const field = useSelector((state: RootState) => state.field);
  const [form, setform] = useState({
    name: "",
    website: "",
    adress: "",
  });
  if (!user) return null;

  const submit = async () => {
    if (form.name && form.adress && field.id !== 0 && state.id !== 0) {
      try {
        await createCompanyAccount(
          form.name,
          form.website.toLowerCase(),
          field.value,
          state.value,
          form.adress
        );
        router.push("../../../home");
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("empty fileds");
    }
  };
  return (
    <SafeAreaView className="bg-white h-full w-full px-6  ">
      <Avatar imageUrl={user.avatar} />
      <ScrollView className="h-full">
        <CustomInput
          title="comany name"
          placeholder="Jhon daow"
          onChange={(text: string) => {
            setform({ ...form, name: text });
          }}
        />
        <CustomInput
          title="Website (optionel)"
          placeholder="https://exmple.com"
          onChange={(text: string) => {
            setform({ ...form, website: text });
          }}
        />
        <ComboNavigation
          title={"field"}
          choice={field}
          key={1}
          navigate={() => router.push("../../choose-field")}
        />
        <ComboNavigation
          title={"State"}
          choice={state}
          key={2}
          navigate={() => router.push("../../choose-state")}
        />

        <CustomInput
          title="Adress"
          placeholder="Type your adress ...."
          onChange={(text: string) => {
            setform({ ...form, adress: text });
          }}
        />
      </ScrollView>
      <CustomButton title="save" handlePress={submit} disabled={false} />
    </SafeAreaView>
  );
};

export default Company;
