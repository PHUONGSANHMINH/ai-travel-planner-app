import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';


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
                        <View style={{
                            backgroundColor: '#e1eef8',
                            padding: 10,
                            borderRadius: 15,
                            marginTop: 20
                        }}>
                            <Image source={imageUrl ? { uri: imageUrl } : require('./../../assets/images/login2.jpg')}
                                style={{
                                    width: '100%',
                                    height: 120,
                                    borderRadius: 15,

                                }} />
                            <View style={{
                                marginTop: 5,

                            }}>
                                <Text style={{
                                    fontFamily: 'outfit-bold',
                                    fontSize: 20
                                }}>{place?.placeName}</Text>
                                <Text style={{
                                    fontFamily: 'outfit',
                                    fontSize: 17,
                                    color: Colors.GRAY
                                }}>{place?.placeDetails}</Text>
                                <View style={{
                                    display: 'flex',
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                    <View style={{
                                        width: 320
                                    }}>
                                        <Text style={{
                                            fontFamily: 'outfit',
                                            fontSize: 17,
                                            marginTop: 5,
                                            color: Colors.PRIMARY
                                        }}>🎟️ Ticket Price:
                                            <Text style={{
                                                fontFamily: 'outfit-bold',
                                            }}> {place?.ticketPricing}</Text>
                                        </Text>
                                        <Text style={{
                                            fontFamily: 'outfit',
                                            fontSize: 17,
                                            marginTop: 5,
                                            color: Colors.PRIMARY
                                        }}>🕒 Time To Travel:
                                            <Text style={{
                                                fontFamily: 'outfit-bold',
                                            }}> {place?.timeToTravel}</Text></Text>
                                    </View>
                                    <TouchableOpacity style={{
                                        backgroundColor: Colors.PRIMARY,
                                        padding: 8,
                                        borderRadius: 7
                                    }}>
                                    <Ionicons name="navigate" size={20} color="white" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    ))}
                </View>
            ))}
        </View>
    )
}