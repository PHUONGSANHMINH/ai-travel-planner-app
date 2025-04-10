import { View, Text } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

export default function OptionCard({option,selectedOption}) {
  return (
    <View style={[{
        padding:20,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        backgroundColor:'#f2f2f2',
        borderRadius:15
    },selectedOption?.id==option?.id && {
        borderWidth:3
    }]}>
        <View>
        <Text style={{
            fontSize:18,
            fontFamily:'outfit-bold'
        }}>{option.title}</Text>
         <Text style={{
            fontSize:14,
            fontFamily:'outfit',
            color: Colors.GRAY
        }}>{option.desc}</Text>
        </View>
        <Text style={{
            fontSize:30
        }}>
            {option.icon}
        </Text>
    </View>
  )
}