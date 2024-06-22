import { View, Text, Image, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUser } from "@/lib/useUser";
import CustomInput from "@/components/CustomInput";
import Avatar from "@/components/Avatar";
import ComboNavigation from "@/components/ComboNavigation";
import { useRouter } from "expo-router";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import CustomButton from "@/components/CustomButton";
import { createCompanyAccount, getCompany, updateCompany } from "@/lib/appwrite";
import { setState } from "@/features/state/stateSlice";
import { Choice, fields, states } from "@/constants/data";
import { setFlied } from "@/features/field/fieldSlice";
import TextAreaInput from "@/components/TextAreaInput";

const CompanyProfile = () => {
  
  const router = useRouter();
  const state = useSelector((state: RootState) => state.state);
  const field = useSelector((state: RootState) => state.field);
  const [company, setcompany] = useState<any>();
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch();
  const [form, setForm] = useState({
    name:{
      value:"",
      message:""
    },
    website: {
      value:"",
      message:""
    },
    address: {
      value:"",
      message:""
    },
  });
  const setFormWithNewData = (newData:any) => {
    setForm({
      name: {
        value: newData.name.value,
        message: ""
      },
      website: {
        value: newData.website.value,
        message: ""
      },
      address: {
        value: newData.address.value,
        message:""
      },
    });
  };
  

  const submit = async () => {
      try {
        await updateCompany(
          company.$id,
          form.name.value,
          form.website.value,
          field.id,
          state.id,
          form.address.value
        );

        router.back();
      } catch (error) {
        console.log(error);
      }
    
  };



  useEffect(()=>{
  const fetchCompnay=async()=>{
    setLoading(true)
   try {
    const data=await getCompany();
 
    setcompany(data)

    const fieldItem=fields.find(field=>field.id===data?.field);
    const StateItem=states.find(state=>state.id===data?.user.state);
    
    if(!fieldItem || !StateItem) return
    
    dispatch(setState(StateItem))
    dispatch(setFlied(fieldItem))
   
   } catch (error) {
    console.log(error)
   }finally{
    setLoading(false)
   }

  }  

  fetchCompnay();

   
  },[])

  return (
    <SafeAreaView className="bg-white h-full w-full px-6 justify-center items-center  ">
    {
      loading?
      <ActivityIndicator color={"#864EBB"} size={'large'}/>
      :<>
        
      <ScrollView className="h-full w-full">
        <CustomInput
          title="comany name"
          placeholder="Jhon daow"
          showMessage={
            (text: string) => {
                setForm((prevForm) => ({
                  ...prevForm,
                  name: {
                    ...prevForm.name,
                    message: text,
                  },
                }))
            
              }
         }  
            onChange={(text: string) => {
        setForm((prevForm) => ({
          ...prevForm,
          name: {
            ...prevForm.name,
            value: text,
          },
        }));
      }} 
          
          message={form.name.message}
          value={company?.user.name}
        />
        <CustomInput
          title="Website (optionel)"
          placeholder="https://exmple.com"
          showMessage={
            (text: string) => {
                setForm((prevForm) => ({
                  ...prevForm,
                  website: {
                    ...prevForm.website,
                    message: text,
                  },
                }))
            
              }
         }  
            onChange={(text: string) => {
        setForm((prevForm) => ({
          ...prevForm,
          website: {
            ...prevForm.website,
            value: text,
          },
        }));
      }} 
          
          message={form.website.message}
          value={company?.user.website}
        />
        <ComboNavigation
          title={"field"}
          choice={field}
          key={1}
          navigate={() => router.push("../../choose-field")}
        />
        <ComboNavigation
          title={"State"}
          choice={state}
          key={2}
          navigate={() => router.push("../../choose-state")}
        />

<TextAreaInput 
        placeholder='Type your adress...' 
        title='adress' 
        value={company?.user.adress} 
        message={form.address.message} 
        showMessage={
        (text: string) => {
            setForm((prevForm) => ({
              ...prevForm,
              address: {
                ...prevForm.address,
                message: text,
              },
            }))
        
          }
     }
         onChange={(text: string) => {
    setForm((prevForm) => ({
      ...prevForm,
      address: {
        ...prevForm.address,
        value: text,
      },
    }))

  }}
   
  />
      </ScrollView>
      <CustomButton title="save" handlePress={submit} disabled={false} /></>
    }
    </SafeAreaView>
  );
};

export default CompanyProfile;
