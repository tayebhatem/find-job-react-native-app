import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useUser } from '@/lib/useUser'
import Avatar from '@/components/Avatar'
import { Entypo, FontAwesome,Ionicons } from '@expo/vector-icons';
import {  Redirect, useRouter } from 'expo-router'
import { useDispatch } from 'react-redux'
import { signOut } from '@/lib/appwrite'
import { useSession } from '@/lib/useSession'
const Profile = () => {
  const {user,loading}=useUser();
  const session=useSession();
  const router=useRouter();
 
const logout=async()=>{
    await signOut();
    router.replace('/sign-in')

}
 
  if(!user) return null;
 
  return (
<SafeAreaView className='h-full w-full   bg-primary-500 '>
  <View className='flex-row p-6 w-full justify-between items-center'>
  <TouchableOpacity activeOpacity={0.9} onPress={()=>router.back()}>
  <FontAwesome name="angle-left" size={32} color="white" />
  </TouchableOpacity>

  <TouchableOpacity activeOpacity={0.8} onPress={()=>router.push('/company-profile')}>
  
  <Entypo name="edit" size={24} color="white" />
  </TouchableOpacity>
  </View>
      <View className='bg-white rounded-t-3xl mt-32 w-full h-full  relative items-center '>
      <View className='absolute -top-14 w-full'>
      <View className='items-center'>
       <Avatar imageUrl={user?.avatar} disabled={false}/>
       <Text className='text-xl font-medium mt-3'>{user?.name}</Text>
       <Text className='text-primary-gray-500'>{user?.email}</Text>
      </View>
      <View className='w-full p-10 gap-y-6'>
      <TouchableOpacity className='flex-row w-full justify-between rounded-md'>
     <View className='flex-row gap-x-6 items-center'>
     <Ionicons name="settings-sharp" size={32} color="black" />
        <Text className='text-base'>Setings</Text>
     </View>
        <FontAwesome name="angle-right" size={32} color="#ccc" />
      </TouchableOpacity>


      <TouchableOpacity activeOpacity={0.8} className='flex-row w-full justify-between rounded-md'>
     <View className='flex-row gap-x-6 items-center'>
     <FontAwesome name="globe" size={32} color="black" />
        <Text className='text-base'>English</Text>
     </View>
        <FontAwesome name="angle-right" size={32} color="#ccc" />
      </TouchableOpacity>
      
      <TouchableOpacity activeOpacity={0.8} className='flex-row w-full justify-between rounded-md' onPress={()=>router.push('/change-password')}>
     <View className='flex-row gap-x-6 items-center'>
     <FontAwesome name="lock" size={32} color="black" />
        <Text className='text-base'>Change Password</Text>
     </View>
        <FontAwesome name="angle-right" size={32} color="#ccc" />
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.8} className='flex-row w-full justify-between rounded-md' onPress={logout}>
     <View className='flex-row gap-x-6 items-center'>
     <FontAwesome name="sign-out" size={32} color="black" />
        <Text className='text-base'>Logout</Text>

     </View>
      
      </TouchableOpacity>
      </View>
      </View>
      </View>
    </SafeAreaView>
  )
}

export default Profile