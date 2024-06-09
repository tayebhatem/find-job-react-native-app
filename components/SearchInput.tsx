import { View, Text, TextInput } from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { states } from "@/constants/data";
interface Choice {
  id: number;
  value: string;
}
const SearchInput = ({
  placeholder,

  changeData,
}: {
  placeholder: string;
  changeData: (data: Choice[]) => void;
}) => {
  const [search, setSearch] = useState("");
  const searchState = (text: string) => {
    setSearch(text);
    if (text) {
      const filteredData = states.filter((item) =>
        item.value.toLowerCase().includes(text.toLowerCase())
      );

      changeData(filteredData);
    } else {
      changeData(states);
    }
  };

  return (
    <View className="w-full my-2">
      <View className="p-3 mt-2 border border-primary-gray-200 rounded-md flex-row items-center ">
        <Feather name="search" size={24} color="#B7B5B1" />
        <TextInput
          placeholder={placeholder}
          className="ml-3 text-base"
          onChangeText={(text) => searchState(text)}
          value={search}
        />
      </View>
    </View>
  );
};

export default SearchInput;
