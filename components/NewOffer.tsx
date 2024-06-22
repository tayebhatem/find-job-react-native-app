import { View, Text, Modal, TouchableOpacity, FlatList } from 'react-native'
import React, { useState } from 'react'

import { AntDesign, Fontisto } from '@expo/vector-icons';
import CustomInput from './CustomInput';
import TextAreaInput from './TextAreaInput';
import { education, experiences } from '@/constants/data';
import CustomButton from './CustomButton';
import { createOffer } from '@/lib/appwrite';
const NewOffer = ({modalVisible,setModalVisible,refrech,id}:{modalVisible:boolean,setModalVisible:(modalVisible:boolean)=>void,refrech:()=>void,id:string | undefined}) => {
    const [form, setForm] = useState({
        jobeName:{
         value:"",
         messsage:""
       },
        experience:{
            value:0,
            messsage:""
        },
        education:{
            value:0,
            messsage:""
        },
        desceription:{
            value:"",
            messsage:""
        },
    });
  
  const isValid=()=>{
    if(form.desceription.messsage || form.education.messsage || form.experience.value===0 || form.education.value===0 || form.jobeName.messsage){
        return false
    }else{
     return true
    }
  }
  const resetForm = () => {
    setForm({
        jobeName: {
            value: "",
            messsage: ""
          },
          experience: {
            value: 0,
            messsage: ""
          },
          education: {
            value: 0,
            messsage: ""
          },
          desceription: {
            value: "",
            messsage: ""
          },
    });
  };
  const closeModel=()=>{
    resetForm();
    setModalVisible(!modalVisible)
  }
  const submit=async()=>{
   try {
    if(isValid()){
        await createOffer(id,form.jobeName.value,form.desceription.value,form.experience.value,form.education.value)
        
        setModalVisible(!modalVisible);
        resetForm()
        refrech();
    }
   } catch (error) {
    console.log(error)
   }
  }
  return (
<Modal transparent={true}  visible={modalVisible} animationType='slide' onRequestClose={()=>setModalVisible(!modalVisible)}>
    <View className='p-8 bg-white h-screen rounded-t-3xl shadow-black shadow-md  '>
        <View className='flex-row justify-between '>
            <TouchableOpacity activeOpacity={0.8} onPress={closeModel}>
            <AntDesign name="arrowleft" size={24} color="black" />
            </TouchableOpacity>

        <TouchableOpacity activeOpacity={0.8} onPress={resetForm}>
           
            <Text className='text-primary-500 font-medium text-base'>Clear</Text>
        </TouchableOpacity>
        </View>
        <View className='my-4'>
        <CustomInput  
        placeholder='Web developper' 
        value={form.jobeName.value}
        title='job title'
        message={form.jobeName.messsage} 
        showMessage={
        (text: string) => {
            setForm((prevForm) => ({
              ...prevForm,
              desceription: {
                ...prevForm.desceription,
                messsage: text,
              },
            }))
        
          }
     }  
        onChange={(text: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      jobeName: {
        ...prevForm.jobeName,
        value: text,
      },
    }));
  }}    />
        <TextAreaInput 
        placeholder='write job description...' 
        title='job description' 
        value={form.desceription.value} 
        message={form.desceription.messsage} 
        showMessage={
        (text: string) => {
            setForm((prevForm) => ({
              ...prevForm,
              desceription: {
                ...prevForm.desceription,
                messsage: text,
              },
            }))
        
          }
     }
         onChange={(text: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      desceription: {
        ...prevForm.desceription,
        value: text,
      },
    }))

  }}/>
  

        <Text className='text-base font-medium text-primary-gray-500'>Exprecience</Text>
        <FlatList
        data={experiences}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={(item)=>(
        
        <TouchableOpacity className='my-2 flex-row items-center gap-x-4' activeOpacity={0.9} onPress={()=>setForm({...form,experience:{value:item.item.id,messsage:""}})}>
        {form.experience.value=== item.item.id ? (
              <Fontisto name="radio-btn-active" size={20} color="#864EBB" />
            ) : (
              <Fontisto name="radio-btn-passive" size={20} color="#B7B5B1" />
            )}    
        <Text className='text-base font-medium'>{item.item.value}</Text>
        </TouchableOpacity>
    
        )}
        />
<Text className='text-base font-medium text-primary-gray-500'>Education</Text>
<FlatList
        data={education}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={(item)=>(
        
        <TouchableOpacity className='my-2 flex-row items-center gap-x-4' activeOpacity={0.9} onPress={()=>setForm({...form,education:{value:item.item.id,messsage:""}})}>
        {form.education.value=== item.item.id ? (
              <Fontisto name="radio-btn-active" size={20} color="#864EBB" />
            ) : (
              <Fontisto name="radio-btn-passive" size={20} color="#B7B5B1" />
            )}    
        <Text className='text-base font-medium'>{item.item.value}</Text>
        </TouchableOpacity>
    
        )}
        />
        <CustomButton disabled={false} title='Save' handlePress={submit}/>
        </View>
    </View>
</Modal>
  )
}

export default NewOffer