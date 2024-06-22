import { View, Text, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getCompany, getOffersByCompanyId } from '@/lib/appwrite';
import { useUser } from '@/lib/useUser';
import { Link } from 'expo-router';

const LatestOffers = () => {
    const {user}=useUser();
  const [offers, setOffers] = useState<any>([])
  useEffect(() => {
    const fetchCompnay=async()=>{
      try {
       const data=await getCompany();
      
       if(!data) return
       const offers=await getOffersByCompanyId(data?.$id)
       
        setOffers(offers?.slice(0,3))
  
      } catch (error) {
       console.log(error)
      }
     }  
     fetchCompnay();
  }, [])
  if (!user) return null;
  return (
   <>
    {
    offers.length===0?
    <View className="my-3">
       <Text className="text-center font-medium text-xl">
        No offers
      </Text>
      <Text className="text-center text-primary-gray-500">
        No offers has posted yet try to create new offer
      </Text>

      <TouchableOpacity activeOpacity={0.8} className="self-center px-8 py-6 my-4 bg-primary-500 items-center rounded-lg shadow-primary-500 shadow-md">
        <Text className="font-medium text-white">
        New Offer
        </Text>
      </TouchableOpacity>
    </View>
    :
    <FlatList
    className="my-2"
    horizontal
  pagingEnabled
   showsHorizontalScrollIndicator={false}
   
   keyExtractor={(item)=>item.$id}
   data={offers}
  
   renderItem={item=>(
    <View className='relative mr-2  p-4 bg-white shadow-black shadow-md  rounded-md border border-primary-gray-200 overflow-hidden '>
    <View className='flex-row justify-between items-start'>
<View className='flex-row  gap-x-2'>
<Image source={{uri:user?.avatar}} resizeMode="cover" width={40} height={40} className="rounded-full bg-primary-gray-100"/>
      <Text className='font-medium text-base capitalize'>{item.item.title}</Text>
</View>
   <View className='flex-row items-center gap-x-2'>

   </View>

    </View>

    <View className='my-2'>
      <Text className='text-primary-gray-500 text-justify w-64 h-16  ' numberOfLines={3} >{item.item.description}</Text>
    </View>

    <Link href={`/offer/${item.item.$id}`} className='text-primary-500 underline' >
      View Offer
    </Link>
    </View>
   )}
   />
   }
   </>
  )
}

export default LatestOffers