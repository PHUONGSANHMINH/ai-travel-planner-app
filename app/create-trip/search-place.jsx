import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from './../../constants/Colors'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';

export default function SearchPlace() {

  const navigation = useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search'
    })
  },[])
  return (
    <View style={{
       padding: 25,
       paddingTop: 90,
       backgroundColor:Colors.WHITE,
       height: '100%', 
    }}>
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: "AIzaSyAIqjyrlugZ2GJDKs4xUCYr5_Ha-PvKWyY",
        language: 'vi',
      }}
    />
    </View>
  )
}