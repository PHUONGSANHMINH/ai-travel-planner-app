import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator } from "react-native";
import { Colors } from '@/constants/Colors';
import UserTripCard from './UserTripCard';
import React, { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import moment from "moment";
import axios from "axios";


const fetchImage = async (locationName) => {
    const apiKey = '36876278-12651aa4af241803ba25f856b'; // Pixabay API key
    try {
        const response = await axios.get("https://pixabay.com/api/", {
            params: {
                key: apiKey,
                q: locationName,
                image_type: 'photo',
            },
        });
        return response.data.hits[0].largeImageURL;
    } catch (error) {
        console.error("Error fetching image from Pixabay:", error);
        throw error; // Throw the error to handle it in the caller function
    }
};

export default function UserTripList({ userTrips }) {

    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        console.log("Rendering UserTripList with userTrips:", userTrips);
        if (userTrips && userTrips.length > 0) {
            const firstTripLocation = JSON.parse(userTrips[0].tripData).locationInfo.name;
            fetchImage(firstTripLocation)
                .then(url => {
                    setImageUrl(url);
                    setLoading(false);
                })
                .catch(error => {
                    console.error('Error fetching image:', error);
                    setLoading(false);
                });
        }
    }, [userTrips]);

    if (!userTrips || userTrips.length === 0) {
        return <Text>No trips available</Text>;
    }

    // Parse the tripData JSON string for the first trip
    const firstTrip = {
        ...userTrips[0],
        tripData: JSON.parse(userTrips[0].tripData),
    };

    // Parse the tripData JSON string for the rest of the trips
    const otherTrips = userTrips.slice(1).map((trip) => ({
        ...trip,
        tripData: JSON.parse(trip.tripData),
    }));

    const LastestTrip = JSON.parse(userTrips[0].tripData)
    return userTrips && (
        <View>
            <View style={{
                marginTop: 20
            }}>
                {loading ? (
                    <ActivityIndicator size="large" color={Colors.PRIMARY} />
                ) : (
                    <Image source={imageUrl ? { uri: imageUrl } : require('./../../assets/images/login2.jpg')}
                    style={{
                        height: 240,
                        width: '100%',
                        objectFit: 'cover',
                        borderRadius: 15
                    }} />
                )}
                <View style={{
                    marginTop: 10,

                }}>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20
                    }}>{userTrips[0]?.tripPlan?.tripDetails?.location}</Text>
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginTop: 5
                    }}>
                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 17,
                            color: Colors.GRAY
                        }}>{moment(LastestTrip.startDate).format('DD MMM yyyy')}</Text>

                        <Text style={{
                            fontFamily: 'outfit',
                            fontSize: 17,
                            color: Colors.GRAY
                        }}> 🚌 {LastestTrip.traveler.title}</Text>
                    </View>
                    <TouchableOpacity
                    onPress={() => router.push({ pathname: '/trip-details', params: { trip: JSON.stringify(userTrips[0]) 
                    }})}
                    style={{
                        backgroundColor: Colors.PRIMARY,
                        padding: 15,
                        borderRadius: 15,
                        marginTop: 10
                    }}>
                        <Text style={{
                            color: Colors.WHITE,
                            textAlign: 'center',
                            fontFamily: 'outfit-medium',
                            fontSize: 15
                        }}>See Your Plan</Text>
                    </TouchableOpacity>
                </View>

                {userTrips.map((trip, index) => (
                    <UserTripCard trip={trip} key={index} />
                ))}
            </View>
        </View>
    )
}