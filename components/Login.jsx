import { View, Text, Image, StyleSheet} from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

export default function Login() {
  return (
    <View>
      <Image source={require('./../assets/images/login.jpg')}
      style={{
        width:'100%',
        height:500
      }}
      />
      <View style={styles.container}>
        <Text style={{
          fontSize: 25,
          fontFamily: 'outfit-bold'
        }}> AI Travel Planner </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor:Colors.WHITE,
    marginTop: -20,
    height:'100%'
  }
})