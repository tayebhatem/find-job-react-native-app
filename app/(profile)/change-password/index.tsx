import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import CustomButton from '@/components/CustomButton'
import CustomInput from '@/components/CustomInput'
import { updatePassword } from '@/lib/appwrite'
import { router } from 'expo-router'

const ChangePasswordScreen = () => {
  const [form, setForm] = useState({
    password:{
      value:"",
      message:""
    },
    confirmPassword:{
      value:"",
      message:""
    },
  })
  const [isLoading, setIsLoading] = useState(false);
  const isValid=()=>{
 
    if(!form.password.value){
      setForm((prevForm) => ({
        ...prevForm,
        password: {
          ...prevForm.password,
          message: "password is required!",
        },
      }))
     
    }
    if(!form.confirmPassword.value){
      setForm((prevForm) => ({
        ...prevForm,
        confirmPassword: {
          ...prevForm.confirmPassword,
          message: "confirm password is required!",
        },
      }))
     
    }

    if(form.confirmPassword.value!==form.password.value){
      setForm((prevForm) => ({
        ...prevForm,
        confirmPassword: {
          ...prevForm.confirmPassword,
          message: "password does not match!",
        },
      }))
      return false
    }
    
    if(form.password.message || form.confirmPassword.message){
        return false
    }else{
    
     return true
    }
  }
  const submit=async()=>{
    setIsLoading(true)
    try {
      if(isValid()){
        await updatePassword(form.password.value)
        router.back()
      }
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }
  return (
    <SafeAreaView className='w-full h-full bg-white px-6'>
      <View>
      <CustomInput
        title={"password"}
        placeholder="******************"
        showMessage={
          (text: string) => {
              setForm((prevForm) => ({
                ...prevForm,
                password: {
                  ...prevForm.password,
                  message: text,
                },
              }))
          
            }
       }  
          onChange={(text: string) => {
      setForm((prevForm) => ({
        ...prevForm,
        password: {
          ...prevForm.password,
          value: text,
        },
      }));
    }} 
        value={form.password.value}
        message={form.password.message}
      />
      <CustomInput
        title={"confirm password"}
        placeholder="******************"
        showMessage={
          (text: string) => {
              setForm((prevForm) => ({
                ...prevForm,
                confirmPassword: {
                  ...prevForm.confirmPassword,
                  message: text,
                },
              }))
          
            }
       }  
          onChange={(text: string) => {
      setForm((prevForm) => ({
        ...prevForm,
        confirmPassword: {
          ...prevForm.confirmPassword,
          value: text,
        },
      }));
    }} 
        value={form.confirmPassword.value}
        message={form.confirmPassword.message}
      />
      <CustomButton title="Save" handlePress={submit} disabled={isLoading} />
      </View>
    </SafeAreaView>
  )
}

export default ChangePasswordScreen