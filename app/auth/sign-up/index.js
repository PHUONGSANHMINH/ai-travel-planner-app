import { View, Text, TextInput, StyleSheet} from 'react-native'
import React, { useEffect } from 'react'
import { Colors } from './../../../constants/Colors'
import { useNavigation } from 'expo-router'

export default function SignUp() {
  const navigation = useNavigation();

   useEffect(()=>{
      navigation.setOptions({
        headerShown: false
      })
    },[])

  return (
    <View style={{
      padding: 25,
      paddingTop: 50,
    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 30,
      }}>Create New Account</Text>


      {/*   Email   */}
      <View style={{
         marginTop: 50,
      }}>
        <Text style={{
            fontFamily: 'outfit'
          }}>Email</Text>
          <TextInput 
          style={styles.input}
          placeholder='Enter Email' />
      </View>
      
      {/*   Password   */}
      <View style={{
        marginTop: 20,
      }}>
        <Text style={{
          ontFamily: 'outfit'
        }}>Password</Text>
        <TextInput 
        secureTextEntry={true}
        style={styles.input}
        placeholder='Enter Password' />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  input:{
      padding: 15,
      borderWidth: 1,
      borderRadius: 15,
      borderColor: Colors.GRAY,
      fontFamily: 'outfit'
    }
})