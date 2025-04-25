import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import moment from 'moment';
import axios from 'axios';
import { useRouter } from 'expo-router';
import { Colors } from '@/constants/Colors';


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

export default function UserTripCard({ trip }) {

  const [photoUrl, setPhotoUrl] = useState(null);
  const router = useRouter();

  if (!trip) {
    console.error('Trip data is missing');
    return null;
  }

  let tripData;

   // Safely parse tripData
   try {
    tripData = typeof trip.tripData === 'string' ? JSON.parse(trip.tripData) : trip.tripData;
  } catch (error) {
    console.error('Failed to parse trip data:', error);
    return null;
  }

  useEffect(() => {
    const fetchPhoto = async () => {
      if (tripData?.locationInfo?.name) {
        const url = await fetchImageUrl(tripData.locationInfo.name.trim());
        setPhotoUrl(url);
      }
    };
    fetchPhoto();
  }, [tripData?.locationInfo?.name]);

  const formatData = (data) => {
    return JSON.parse(data);
  }

  return (
    <TouchableOpacity 
    style={{
      marginTop: 20,
      display: 'flex',
      flexDirection: 'row',
      gap: 10,
      alignItems: 'center'
    }}>
      <Image source={photoUrl ? { uri: photoUrl } : require('./../../assets/images/login2.jpg')}
        style={{
          width: 100,
          height: 100,
          borderRadius: 15
        }}
      />
      <View>
        <Text style={{
          fontFamily: 'outfit-medium',
          fontSize: 18
        }}>{trip.tripPlan?.tripDetails?.location}</Text>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 14,
          color: Colors.GRAY,
        }}>{moment(formatData(trip.tripData).startDate).format('DD MMM yyyy')}</Text>
        <Text style={{
          fontFamily: 'outfit',
          fontSize: 14,
          color: Colors.GRAY,
        }}>Travelling: {formatData(trip.tripData).traveler.title}</Text>
      </View>
    </TouchableOpacity>
  )
}