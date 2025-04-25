import { View, Text, TouchableOpacity, Linking } from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

export default function FlightInfo({ flightData }) {
    return (
        <View style={{
            marginTop: 20,
            borderWidth: 1,
            padding: 10,
            borderRadius: 15,
            borderColor: Colors.GRAY
        }}>
            <View style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Text style={{
                    fontFamily: 'outfit-bold',
                    fontSize: 20,
                }}>✈️ Flights</Text>
                <TouchableOpacity 
                onPress={() => Linking.openURL('https://www.vietjetair.com/vi')}
                style={{
                    backgroundColor: Colors.PRIMARY,
                    padding: 5,
                    width: 100,
                    borderRadius: 7,
                    marginTop: 7
                }}>
                    <Text style={{
                        color: Colors.WHITE,
                        fontFamily: 'outfit',
                        textAlign: 'center',
                    }}>Book here</Text>
                </TouchableOpacity>
            </View>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 17,
                marginTop: 7
            }}>Airline: {flightData.exampleAirline}</Text>
            <Text style={{
                fontFamily: 'outfit',
                fontSize: 16,
                marginTop: 7
            }}>Price: {flightData.examplePrice}</Text>
        </View>
    )
}