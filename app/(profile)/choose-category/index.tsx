import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "@/components/CustomButton";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import { updateUserType } from "@/lib/appwrite";
import { useRouter } from "expo-router";
enum Category {
  Emplyee = "Emplyee",
  Company = "Company",
}
const ChooseCategory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [category, setCategory] = useState<Category>(Category.Company);
  const router = useRouter();
  const submit = async () => {
    try {
      await updateUserType(category);
      if (category === Category.Company) {
        router.push("../complete-profile/company");
      } else {
        router.push("../complete-profile/emplyee");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView className="bg-white h-full w-full px-6 justify-center">
      <Image
        source={require("../../../assets/images/logo.png")}
        resizeMode="cover"
        className=""
      />
      <Text className="text-3xl font-semibold capitalize ">
        Choose Account category
      </Text>
      <Text className="text-base  text-primary-gray-500 my-2">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>
      <Image
        source={require("../../../assets/images/account-type.png")}
        resizeMode="cover"
        className="self-center"
      />
      <View className="flex-row gap-x-3">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setCategory(Category.Company)}
          className={`relative flex-1 border-2  rounded-md p-3 items-center ${
            category === Category.Company
              ? "border-primary-500"
              : "border-primary-gray-200"
          } `}
        >
          {category === Category.Company && (
            <View className="absolute -top-3 -right-2 bg-white">
              <FontAwesome name="check-circle" size={24} color="#864EBB" />
            </View>
          )}

          <View className="bg-primary-100  items-center justify-center rounded-full w-20 h-20">
            <FontAwesome6 name="building-user" size={30} color="#864EBB" />
          </View>
          <Text className="text-2xl font-medium my-3">Company</Text>
          <Text className="text-primary-gray-300 text-base text-center">
            I’m looking for an emplyee
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setCategory(Category.Emplyee)}
          className={`relative flex-1 border-2  rounded-md p-3 items-center ${
            category === Category.Emplyee
              ? "border-primary-500"
              : "border-primary-gray-200"
          } `}
        >
          {category === Category.Emplyee && (
            <View className="absolute -top-3 -right-2 bg-white">
              <FontAwesome name="check-circle" size={24} color="#864EBB" />
            </View>
          )}
          <View className="bg-secondary-100  items-center justify-center rounded-full w-20 h-20">
            <FontAwesome5 name="user-tie" size={30} color="#9A99F2" />
          </View>
          <Text className="text-2xl font-medium my-3">Emplyee</Text>
          <Text className="text-primary-gray-300 text-base text-center">
            I’m looking for an emplyee
          </Text>
        </TouchableOpacity>
      </View>
      <CustomButton title="next" handlePress={submit} disabled={isLoading} />
    </SafeAreaView>
  );
};

export default ChooseCategory;
