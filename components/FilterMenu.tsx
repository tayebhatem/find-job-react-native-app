import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'
import { Ionicons } from '@expo/vector-icons'

const data=[
    {
        id:1,
        value:'All'
    },
    {
        id:2,
        value:'Archived'
    },

]
const FilterMenu = ({refrech,fetchArchived,isSelcted,setIsSelcted}:{refrech:()=>void,fetchArchived:()=>void,isSelcted:number,setIsSelcted:(id:number)=>void}) => {
   
    const fetchData=async(id:number)=>{
     setIsSelcted(id)
        try {
        if(id===1){
            refrech()
        }else{
     fetchArchived()
        }
      } catch (error) {
          console.log(error)
      }
          }
   
  return (
    <View className={`absolute   bg-white top-24 gap-y-4 pb-3 pl-3 rounded-md z-50 left-6 w-36 border border-primary-gray-200  shadow-black shadow-md `}>
        <FlatList
         data={data}
         keyExtractor={(item)=>item.id.toString()}
         renderItem={(item)=>(
            <TouchableOpacity className='flex-row items-center gap-x-2 justify-between  pl-2 pr-3 my-2' activeOpacity={0.8} onPress={()=>fetchData(item.item.id)}>
    
            <Text className='font-medium'>{item.item.value}</Text>
           {item.item.id===isSelcted &&  <Ionicons name="checkmark-outline" size={24} color="black" />}
          </TouchableOpacity>
         )}
        />
   
    </View>
  )
}

export default FilterMenu