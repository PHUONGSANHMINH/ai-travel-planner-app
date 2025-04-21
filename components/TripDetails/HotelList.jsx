import { View, Text, FlatList, Image } from 'react-native'
import React, { useState, useEffect } from 'react';

const fetchImageFromPixabay = async (searchTerm) => {
    const apiKey = '36876278-12651aa4af241803ba25f856b'; // Pixabay API key
    const apiUrl = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(searchTerm)}`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data.hits && data.hits.length > 0) {
        return data.hits[0].webformatURL; // Adjust as per Pixabay API response structure
      } else {
        throw new Error('No images found');
      }
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

export default function HotelList({ hotelList }) {

    const [hotelImages, setHotelImages] = useState({});
  
    useEffect(() => {
      // Fetch images for each hotel in hotelList
      const fetchHotelImages = async () => {
        const images = {};
        for (const hotel of hotelList) {
          const imageUrl = await fetchImageFromPixabay(hotel.hotelName);
          images[hotel.hotelName] = imageUrl;
        }
        setHotelImages(images);
      };
  
      fetchHotelImages();
    }, [hotelList]);

      if (!hotelList || hotelList.length === 0) {
        return (
          <View>
            <Text>No hotel details available</Text>
          </View>
        );
      }    

    return (
        <View style={{
            marginTop: 20,
        }}>
            <Text style={{
                fontFamily: 'outfit-bold',
                fontSize: 20,
            }}>🏨 Hotel Recommendation</Text>

            <FlatList
                style={{
                    marginTop: 8,
                }}
                showsHorizontalScrollIndicator={false}
                horizontal={true}
                data={hotelList}
                renderItem={({ item, index }) => (
                    <View style={{
                        marginRight: 20,
                        width: 180,
                    }}>
                        <Image source={{ uri:
                hotelImages[item.hotelName] ||
                'https://via.placeholder.com/400x300.png?text=Image+Not+Found',
            }}
                            style={{
                                width: 180,
                                height: 120,
                                borderRadius: 15,
                            }} />
                        <View style={{
                            padding: 5
                        }}>
                            <Text style={{
                                fontFamily: 'outfit-medium',
                                fontSize: 17,
                            }}>{item.hotelName}</Text>
                        </View>
                        <View style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={{
                                fontFamily: 'outfit'
                            }}>⭐ {item.rating}</Text>
                            <Text style={{
                                fontFamily: 'outfit'
                            }}>💰 {item.price}</Text>
                        </View>
                    </View>
                )} />
        </View>
    )
}