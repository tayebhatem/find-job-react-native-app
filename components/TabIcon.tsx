import { View, Text } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons'

const TabIcon = ({ icon, color, name, focused }:{icon:any,color:string,name:string,focused:any}) => {
  return (
    <View className="flex items-center justify-center gap-2 my-2">
     <FontAwesome
              name={icon}
              size={32}
              color={color}
              
            />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  )
}

export default TabIcon