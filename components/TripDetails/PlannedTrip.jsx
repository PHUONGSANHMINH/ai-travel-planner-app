import { View, Text } from 'react-native'
import React from 'react'

export default function PlannedTrip({details}) {
  return (
    <View style={{
        marginTop: 20,

    }}>
      <Text style={{
        fontFamily: 'outfit-bold',
        fontSize: 20
      }}>🏕️ Plan Details</Text>
      <Text>{details.location}</Text>

      {Object.entries(details).map(([day, details])=>(
        <View>
            <Text>{day.charAt(0).toUpperCase()+day.slice(1)}</Text>
        </View>
      ))}
    </View>
  )
}