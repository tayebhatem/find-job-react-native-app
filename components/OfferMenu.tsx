import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import { archiveOffer, deleteOffer } from '@/lib/appwrite'

const OfferMenu = ({id,refrech,fetchArchived,archived}:{id:string,refrech:()=>void,fetchArchived:()=>void,archived:boolean}) => {
    const archive=async()=>{
        try {
          await archiveOffer(id,!archived)
        !archived ? refrech():fetchArchived()
      } catch (error) {
          console.log(error)
      }
          }
      
          const remove=async()=>{
              try {
                await deleteOffer(id)
                refrech()
            } catch (error) {
                console.log(error)
            }
                }
  return (
    <View className={`absolute   bg-white top-14 gap-y-4 pb-3 pl-3 rounded-md z-50 right-4 w-32 border border-primary-gray-200  shadow-black shadow-md `}>
    <TouchableOpacity className='flex-row items-center gap-x-2' activeOpacity={0.8} onPress={archive}>
   {archived?<MaterialCommunityIcons name="archive-off-outline" size={24} color="black" />: <Ionicons name="archive-outline" size={24} color="black" />}
      <Text>{archived?'Unarchive':'Archive'}</Text>
    </TouchableOpacity>
  
    <TouchableOpacity className='flex-row items-center gap-x-2' activeOpacity={0.8} onPress={remove}>
    <AntDesign name="delete" size={24} color="black" />
      <Text>delete</Text>
    </TouchableOpacity>
    </View>
  )
}

export default OfferMenu