import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Link } from 'expo-router'
import OfferMenu from './OfferMenu'
import { useUser } from '@/lib/useUser'
import * as timeago from 'timeago.js';
const OfferCard = ({item,refrech,fetchArchived}:{item:any,refrech:()=>void,fetchArchived:()=>void}) => {
    const {user}=useUser();
    const [isVisisble, setIsVisisble] = useState(false)
   
  return (
    <View className=' w-full p-4 bg-white shadow-black shadow-md my-2 rounded-md border border-primary-gray-200 overflow-visible'>
    <View className='flex-row justify-between items-start'>
<View className='flex-row  gap-x-2'>
<Image source={{uri:user?.avatar}} resizeMode="cover" width={40} height={40} className="rounded-full bg-primary-gray-100"/>
     <View>
     <Text className='font-medium text-base capitalize'>{item.title}</Text>
      <Text className='text-primary-gray-500'>{timeago.format(item.datetime)}  </Text> 
    
     </View>
</View>
 
   <TouchableOpacity activeOpacity={0.8} className='relative' onPress={()=>setIsVisisble(!isVisisble)}>
  <MaterialCommunityIcons name="dots-vertical" size={22} color="black" /> 
  

  </TouchableOpacity>
    </View>

    <View className='my-2'>
      <Text className='text-primary-gray-500 text-justify h-16   ' numberOfLines={3} >{item.description}</Text>
    </View>

    <Link href={`/offer/${item.$id}`} className='text-primary-500 underline' >
      View Offer
    </Link>

   {isVisisble &&  <OfferMenu refrech={refrech} fetchArchived={fetchArchived}  id={item.$id} archived={item.archived} />}

    </View>
  )
}

export default OfferCard