import { View, Text, ScrollView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams } from 'expo-router'
import { useUser } from '@/lib/useUser'
import { getCompany, getCompanyById, getOfferById } from '@/lib/appwrite'
import Avatar from '@/components/Avatar'
import { education, experiences, fields, states } from '@/constants/data'
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome,FontAwesome5,FontAwesome6 } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import CustomButton from '@/components/CustomButton'

const OfferScreen = () => {
 const searchPrams=useLocalSearchParams()
 const{id}=searchPrams
 const {user}=useUser();
 const [offer, setOffer] = useState<any>()
 const [view, setView] = useState('description')

 useEffect(()=>{
   const fetchOffer=async()=>{
     try {
        if(!id) return
        const offerId=id?.toString()
        const offer=await getOfferById(offerId)
      console.log(offer?.company.user.avatar)
        setOffer(offer)
        
       
      
     } catch (error) {
        console.log(error)
     }
   }
   fetchOffer()
 },[])
 if(!user) return null
  return (
    <View className='bg-white w-full h-full px-6'>
      <ScrollView className='my-1' showsVerticalScrollIndicator={false}>
      <View className='w-full items-center'>
      <Avatar imageUrl={user?.avatar} disabled={true}/>
      <Text  className='font-medium text-2xl'>{offer?.title}</Text>
      <Text className='text-primary-gray-500'>{fields.find(field=>field.id===offer?.company.field)?.value}</Text>
      </View>
      <View className='my-2 flex-row w-full p-6 bg-primary-100 rounded-md justify-between'>
    <View className='flex-1 flex-row items-center gap-x-2 justify-center'>
    <Ionicons name="calendar-clear-outline" size={32} color="#864EBB" />
    <Text className='text-base '>Interenship</Text>
    </View >

    <View className='w-[1px] bg-primary-500 h-full'>

    </View>

     <View className='flex-1 flex-row items-center gap-x-2 justify-center'>
        <Text className='text-base '>Full time</Text>
     <Ionicons name="time-outline" size={32} color="#864EBB" />
     </View>
     
     </View>
 
    <View className='space-y-2'>
    <Text className='text-base font-medium'>About</Text>
     <View className='flex-row gap-x-2'>
     <FontAwesome name="building-o" size={24} color="#A5A29D" />
     <Text className='text-primary-gray-500 font-medium capitalize'>{offer?.company.user.name}</Text>
     </View>
     <View className='flex-row gap-x-2'>
     <FontAwesome6 name="location-dot" size={24} color="#A5A29D" />
     <Text className='text-primary-gray-500 font-medium capitalize'>{states.find(state=>state.id===offer?.company.user.state)?.value+", "+offer?.company.user.adress}</Text>
     </View>
     <View className='flex-row gap-x-2'>
  
     <Entypo name="mail" size={24} color="#A5A29D" />
     <Text className='text-primary-gray-500 font-medium '>{offer?.company.user.email}</Text>
     </View>

    { offer?.company.user.website &&
       <View className='flex-row gap-x-2'>
       <FontAwesome5 name="globe" size={24} color="#A5A29D" />
       <Text className='text-primary-gray-500 font-medium'>{offer?.company.user.website}</Text>
       </View>
    }
    </View>
 
    <View className='space-y-2'>
    <Text className='text-base font-medium'>Requirements</Text>
    <View className='flex-row gap-x-1 gap-y-2 flex-wrap w-full'>
    <View className='flex-row items-center bg-primary-500 py-2 px-4  rounded-full justify-center'>
<FontAwesome name="male" size={24} color="#FFF" />
<Text className='text-base text-white ml-2'>Male</Text>
</View>
<View className='flex-row items-center bg-primary-500 py-2 px-4 rounded-full justify-center'>
<Ionicons name="language" size={24} color="#FFF" />
<Text className='text-base text-white ml-2'>English</Text>
</View>

<View className='flex-row items-center bg-primary-500 py-2 px-4 rounded-full justify-center'>
    <Ionicons name="school" size={24} color="#FFF" />
    <Text className='text-base  text-white ml-2'>{education.find(item=>item.id===offer?.education)?.value}</Text>
    </View>
   <View className='flex-row items-center bg-primary-500 py-2 px-4 rounded-full justify-center'>
   <FontAwesome name="suitcase" size={24} color="#FFF" />
    <Text className='text-base  text-white ml-2'>{experiences.find(item=>item.id===offer?.experience)?.value} experience</Text>
   </View>
    </View>
    </View>
    <View className='my-2'>
      <Text className='text-base font-medium'>Description</Text>
   
       <Text className='leading-5 text-primary-gray-500' numberOfLines={5}  >
         {offer?.description}
        
         </Text>
       
    </View>
    </ScrollView>
      {
        offer?.company.user.userType==='Emplyee' &&  <CustomButton
        disabled={false}
        handlePress={()=>{}}
        title='Apply'
        />
      }
    </View>
  )
}

export default OfferScreen