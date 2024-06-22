import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons'
import {  useRouter } from 'expo-router'
import { Entypo } from '@expo/vector-icons';
import { useUser } from '@/lib/useUser'
import { getArchivedOffers, getCompany, getOffersByCompanyId } from '@/lib/appwrite'
import OfferCard from '@/components/OfferCard'
import NewOffer from '@/components/NewOffer'
import { RefreshControl } from 'react-native'
import FilterMenu from '@/components/FilterMenu'
import { Image } from 'react-native'


const Offers = () => {
  const router=useRouter();
  const [offers, setOffers] = useState<any>();
  const {user,loading}=useUser();
  const [showNewOffer, setShowNewOffer] = useState(false);
  const [showFilterMenu, setShowFilterMenu] = useState(false)
  const [companyId, setCompanyId] = useState<string | undefined>()
  const [onLoad, setOnLoad] = useState(false) 
  const [isSelcted, setIsSelcted] = useState(1)
   const referch=useCallback(()=>{
    
    const fetchOffers=async()=>{
      setOnLoad(true)
      try {
       const data=await getCompany();
       setCompanyId(data?.$id)
       if(!data) return
  
       const offers=await getOffersByCompanyId(data?.$id)
        setOffers(offers)
  
      } catch (error) {
       console.log(error)
      }finally{
        setOnLoad(false)
      }
     } 
    fetchOffers();
   },[])
const fetchArchived=async()=>{
  try {
    if(!companyId) return null
    const offers=await getArchivedOffers(companyId)
    setOffers(offers)
  } catch (error) {
    console.log(error)
  }
}
  useEffect(() => {
  
     referch()
  }, [])
  
  if(!user) return null
  if(loading) return <SafeAreaView className='w-full h-full items-center justify-center'>
     <ActivityIndicator size={'large'} color={'#864EBB'}/>
        </SafeAreaView>
  return ( 
    <SafeAreaView className='w-full h-full px-6 bg-light ' >
   <View className='flex-row py-6 w-full justify-between items-center'>
  <TouchableOpacity activeOpacity={0.9} onPress={()=>setShowFilterMenu(!showFilterMenu)} className='relative'>
  <Ionicons name="filter" size={24} color="black" />
  
  </TouchableOpacity>

  <TouchableOpacity activeOpacity={0.8} onPress={()=>setShowNewOffer(true)} className='flex-row  items-center gap-x-2'>
    
  <Entypo name="plus" size={32} color="#864EBB" />
  <Text className='text-primary-500 text-base font-medium'>New Offer</Text>
  </TouchableOpacity>
  </View>

  {
    offers && offers.length===0 ?<View className='w-full h-full justify-center items-center'>
       <Text className='text-3xl capitalize font-medium'>No offers</Text>
   <Text className='text-primary-gray-500 text-base'> No archived offers at the moment</Text>
   <MaterialCommunityIcons name="archive-off-outline" size={64} color="#A5A29D" />
  
    </View>:
    <FlatList
    refreshControl={
     <RefreshControl refreshing={onLoad} onRefresh={()=>{
       isSelcted===1 ?referch():fetchArchived()
     }} />
    }
    showsVerticalScrollIndicator={false}
      data={offers}
      keyExtractor={(item)=>item.$id}
      renderItem={item=>(
       <OfferCard item={item.item} refrech={referch} fetchArchived={fetchArchived}/>
      )}
      />
  }

{showFilterMenu && <FilterMenu refrech={referch} fetchArchived={fetchArchived} isSelcted={isSelcted} setIsSelcted={setIsSelcted}/>}
<NewOffer modalVisible={showNewOffer} setModalVisible={setShowNewOffer}  refrech={referch}  id={companyId}/>
    </SafeAreaView>
  )
}

export default Offers