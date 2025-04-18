import { View, Text, Image } from 'react-native'
import React from 'react'
import moment from "moment";


// Function to fetch image URL from Pixabay
const fetchImageUrl = async (query) => {
    const apiKey = '36876278-12651aa4af241803ba25f856b'; // Pixabay API key
    try {
      const response = await axios.get("https://pixabay.com/api/", {
        params: {
          key: apiKey,
          q: query,
          image_type: 'photo',
        },
      });
      return response.data.hits[0]?.largeImageURL || null;
    } catch (error) {
      console.error("Error fetching image from Pixabay:", error);
      return null;
    }
  };

export default function UserTripCard({trip}) {


    const formatData=(data)=>{
        return JSON.parse(data);
    }

  return (
    <View style={{
        marginTop: 15,
        display: 'flex',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center'
    }}>
      <Image source={require('./../../assets/images/login2.jpg')}
         style={{
            width: 100,
            height: 100
         }}
      />
      <View>
        <Text style={{
            fontFamily: 'outfit',
            fontSize: 18
        }}>{trip.tripPlan?.tripDetails?.location}</Text>
        <Text>{moment(formatData(trip.tripData).startDate).format('DD MMM yyyy')}</Text>
        <Text>{formatData(trip.tripData).traveler.title}</Text>
      </View>
    </View>
  )
}