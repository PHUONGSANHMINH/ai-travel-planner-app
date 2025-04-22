import { View, Text, StyleSheet, Image, ActivityIndicator, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Colors } from '@/constants/Colors';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';

const fetchActivityImage = async (locationName) => {
    const apiKey = '36876278-12651aa4af241803ba25f856b';
    const cleanQuery = locationName
        .replace(/\(.*?\)/g, '')
        .replace(/Da Nang/i, '')
        .replace(/Pho/i, '')
        .replace(/&.*$/, '')
        .trim();

    try {
        console.log("Fetching image for:", cleanQuery);
        const response = await axios.get("https://pixabay.com/api/", {
            params: {
                key: apiKey,
                q: cleanQuery,
                image_type: 'photo',
                per_page: 3,
            },
        });

        const hits = response.data.hits;
        if (hits && hits.length > 0) {
            console.log("Found image:", hits[0].largeImageURL);
            return hits[0].largeImageURL;
        } else {
            console.warn("No image found for:", cleanQuery);
            return null;
        }
    } catch (error) {
        console.error("Error fetching image:", error);
        return null;
    }
};



export default function PlaceCard({ place }) {

    const [imageUrl, setImageUrl] = useState("");

    useEffect(() => {
        const fetchImage = async () => {
          if (place?.placeName) {
            const url = await fetchActivityImage(place.placeName);
            setImageUrl(url);
          }
        };
        fetchImage();
      }, [place]);          
      
    return (
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
{/*                 <TouchableOpacity style={{
                        backgroundColor: Colors.PRIMARY,
                        padding: 8,
                        borderRadius: 7
                    }}>
                        <Ionicons name="navigate" size={20} color="white" />
                    </TouchableOpacity>
*/}
                </View>
            </View>
        </View>
    )
}