import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { Entypo } from "@expo/vector-icons";
import { uploadImage } from "@/lib/appwrite";
import * as ImagePicker from "expo-image-picker";
import { Feather } from "@expo/vector-icons";
const Avatar = ({ imageUrl,disabled }: { imageUrl: string,disabled:boolean }) => {
  const [image, setImage] = useState(imageUrl);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        const file = result.assets[0];
       
        await uploadImage(file);
        setImage(file.uri);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    setImage(imageUrl);
  }, []);
  return (
    <TouchableOpacity
      className="self-center relative items-center bg-primary-gray-500 rounded-full p-1"
      activeOpacity={0.8}
      onPress={pickImage}
      disabled={disabled}
    >
    {!disabled &&   <View className="absolute bottom-1 right-3 z-50 bg-primary-500 p-1 rounded-full ">
        <Feather name="camera" size={18} color="white" />
      </View>}

      <Image
        source={{ uri: image }}
        resizeMode="cover"
        className="w-28 h-28 rounded-full"
      />
    </TouchableOpacity>
  );
};

export default Avatar;
