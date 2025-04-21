import { View, Text, Image, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react'
import { useLocalSearchParams, useNavigation } from 'expo-router'
import axios from 'axios';
import moment from 'moment/moment';
import { Colors } from '@/constants/Colors';
import FlightInfo from '@/components/TripDetails/FlightInfo';
import HotelList from '@/components/TripDetails/HotelList';
import PlannedTrip from '@/components/TripDetails/PlannedTrip';

const fetchImage = async (locationName) => {
  const apiKey = '36876278-12651aa4af241803ba25f856b'; // Pixabay API key
  try {
    console.log("Fetching image for location:", locationName);
    const response = await axios.get("https://pixabay.com/api/", {
      params: {
        key: apiKey,
        q: locationName,
        image_type: 'photo',
      },
    });
    console.log("Fetched image URL:", response.data.hits[0].largeImageURL);
    return response.data.hits[0].largeImageURL;
  } catch (error) {
    console.error("Error fetching image from Pixabay:", error);
    throw error;
  }
};

export default function TripDetails() {

  const navigation = useNavigation();
  const params = useLocalSearchParams();
  const [tripDetails, setTripDetails] = useState([]);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: ''
    });

    if (params.trip) {
      try {
        let parsedTrip;
        if (typeof params.trip === 'string') {
          parsedTrip = JSON.parse(params.trip);
        } else {
          parsedTrip = params.trip;
        }
        console.log("Parsed trip:", JSON.stringify(parsedTrip, null, 2));

        setTripDetails(parsedTrip);

        let tripData;
        if (typeof parsedTrip.tripData === 'string') {
          tripData = JSON.parse(parsedTrip.tripData);
        } else {
          tripData = parsedTrip.tripData;
        }
        console.log("Parsed tripData:", JSON.stringify(tripData, null, 2));

        const locationName = tripData?.locationInfo?.name;

        if (locationName) {
          fetchImage(locationName)
            .then(url => {
              setImageUrl(url);
              setLoading(false);
            })
            .catch(error => {
              console.error('Error fetching image:', error);
              setLoading(false);
            });
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error("Error parsing trip details:", error);
        setError("Failed to parse trip details");
        setLoading(false);
      }
    } else {
      setError("Trip details are not provided");
      setLoading(false);
    }
  }, [params.trip]);

  if (loading) {
    return (
      <View style={{
        size: 'large',
        color: Colors.PRIMARY
      }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>{error}</Text>
      </View>
    );
  }

  if (!tripDetails) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text>No trip details available</Text>
      </View>
    );
  }

  let tripData;
  try {
    tripData = typeof tripDetails.tripData === 'string' ? JSON.parse(tripDetails.tripData) : tripDetails.tripData;
  } catch (error) {
    console.error("Error parsing tripData:", error);
    return (
      <View style={styles.centered}>
        <Text>Error loading trip data</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <Image source={imageUrl ? { uri: imageUrl } : require('./../../assets/images/login2.jpg')}
        style={{
          height: 330,
          width: '100%',
        }} />
      <View style={{
        padding: 15,
        backgroundColor: Colors.WHITE,
        height: '100%',
        marginTop: -30,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30
      }}>
        <Text style={{
          fontFamily: 'outfit-bold',
          fontSize: 25,
        }}>{tripDetails?.tripPlan.tripDetails.location}</Text>

        <Text style={{
          marginTop: 5,
          fontFamily: 'outfit',
          fontSize: 18,
          color: Colors.GRAY,
        }}>{moment(tripData.startDate).format("DD MMM yyyy")} - {" "}
          {moment(tripData.endDate).format("DD MMM yyyy")}</Text>

        <Text style={{
          fontFamily: 'outfit',
          fontSize: 17,
          color: Colors.GRAY,
          marginTop: 5
        }}>
          🚌 {tripData.traveler.title}
        </Text>

        {/*  Flight infor */}

          <FlightInfo flightData={tripDetails?.tripPlan?.flightInfo} />

        {/*  Hotel list */}
           
           <HotelList hotelList={tripDetails?.tripPlan?.hotelOptions}/>
        {/*  Trip day plan */}
           <PlannedTrip details={tripDetails?.tripPlan?.dailyItinerary}/>
      </View>

    </ScrollView>
  )
}