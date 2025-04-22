import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import PlaceCard from './PlaceCard';


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

export default function PlannedTrip({ details }) {

    const [imageUrl, setImageUrl] = useState("");

    return (
        <View style={{
            marginTop: 20,

        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20
            }}>🏕️ Plan Details</Text>

            {Object.entries(details).map(([day, details]) => (
                <View>
                    <Text style={{
                        fontFamily: 'outfit-medium',
                        fontSize: 20,
                        marginTop: 20
                    }}>Day {parseInt(day) + 1}</Text>
                    {details.activities.map((place, index) => (
                        <PlaceCard place={place}/>
                    ))}
                </View>
            ))}
        </View>
    )
}