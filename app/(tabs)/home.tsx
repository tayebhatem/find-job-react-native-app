import { View, Text, Image } from "react-native";
import React  from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useUser } from "@/lib/useUser";
import {FontAwesome } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Link } from "expo-router";
import LatestOffers from "@/components/LatestOffers";

const home = () => {
  const {user}=useUser();
  
  if(!user) return null

  return (
   <SafeAreaView className="h-full w-full bg-light py-8 px-6">
    
      
   <View className="flex-row w-full justify-between items-center">
   <FontAwesome name="moon-o" size={24} color="black"/>
  <View className="flex-row gap-2">
  <View>
  <Text className="text-primary-gray-300 text-sm">weclome back</Text>
  <Text className=" text-lg font-medium">{user.name}</Text>
  </View>
   <Image source={{uri:user.avatar}} resizeMode="cover" width={60} height={60} className="rounded-full bg-primary-gray-100"/>
  </View>
  
   </View>
   <LinearGradient
       className=" p-4 rounded-lg shadow-black shadow-md my-6 flex-row overflow-hidden"
        colors={[ '#B981EE', '#864EBB']}
        
        >

    <View className="flex-1">
    <Text className="text-xl font-bold text-white mb-2 w-full">
      Search for emplyee
    </Text>
    <Text className="text-white ">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. 
    </Text>
    </View>
    <Image
        source={require("../../assets/images/search.png")}
        resizeMode="contain"
        className="w-32 h-32 flex-1"
       
      />
        </LinearGradient>


   <View className="">
   <View className="justify-between flex-row items-center">
   <Text className="text-lg font-medium">
      Recent Offers
    </Text>
    <Link href={'/offers'} className=" font-medium caption-top text-primary-500 text-base">
      View more
    </Link>
   </View>
  <LatestOffers/>
   </View>

   <View className="h-full">
    <Text className="text-lg font-medium">
      Recent Requests
    </Text>
   <View className="bg-white shadow-primary-500 shadow-md border border-primary-gray-200 rounded-md p-4 my-2">
    <Text className="text-base font-medium">0 sended requests </Text>
    <View className="flex-row justify-between items-center ">
      <Text className="text-primary-gray-500">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Molestias molestiae!
      </Text>
      <Text className="px-5 py-2  border border-primary-gray-200 text-primary-gray-500 rounded-full font-medium">0</Text>
    </View>
   </View>
   </View>
   </SafeAreaView>
  );
};

export default home;
