import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from './../../constants/Colors';

export default function TabLayout() {
  return (
   <Tabs screenOptions={{
    headerShown: false,
    tabBarActiveTintColor: Colors.PRIMARY
   }}>
    <Tabs.Screen name="mytrip"
    options={{
      tabBarLabel:'My Trip',
      tabBarIcon:({colors})=><Ionicons name="location-sharp" 
      size={24} color={colors}/>
    }}
    />
    <Tabs.Screen name="discover"
    options={{
      tabBarLabel:'Discover',
      tabBarIcon:({colors})=><Ionicons name="globe-sharp"
       size={24} color={colors}/>
    }}/>
    <Tabs.Screen name="profile"
     options={{
      tabBarLabel:'Profile',
      tabBarIcon:({colors})=><Ionicons name="people-sharp" 
      size={24} color={colors}/>
    }}/>
   </Tabs>
  )
}