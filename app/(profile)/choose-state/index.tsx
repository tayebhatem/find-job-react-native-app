import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import SearchInput from "@/components/SearchInput";
import { Fontisto } from "@expo/vector-icons";

import { Choice, states } from "@/constants/data";
import { useDispatch, useSelector } from "react-redux";
import { setState } from "@/features/state/stateSlice";

import { RootState } from "@/app/store";

const ChooseState = () => {
  const [data, setData] = useState<Choice[]>(states);
  const state = useSelector((state: RootState) => state.state);
  const dispatch = useDispatch();

  const selectState = (item: Choice) => {
    dispatch(setState(item));
  };

  return (
    <SafeAreaView className="bg-white h-full w-full px-6 ">
      <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={(item) => (
          <TouchableOpacity
            className=" border-b border-primary-gray-200 px-2 py-4 flex-row  items-center justify-between"
            activeOpacity={0.8}
            onPress={() => selectState(item.item)}
          >
            <Text className=" text-lg font-medium capitalize">
              {item.item.id + "   -   " + item.item.value}
            </Text>
            {state.id === item.item.id ? (
              <Fontisto name="radio-btn-active" size={20} color="#864EBB" />
            ) : (
              <Fontisto name="radio-btn-passive" size={20} color="#B7B5B1" />
            )}
          </TouchableOpacity>
        )}
        ListHeaderComponent={() => (
          <View>
            <Text className="text-primary-gray-500">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit sed
              vitae modi neque
            </Text>

            <SearchInput placeholder="Search state ..." changeData={setData} />
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default ChooseState;
