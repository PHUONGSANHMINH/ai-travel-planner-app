import { View, Text, TouchableOpacity } from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { useNavigation } from 'expo-router';
import { Colors } from './../../constants/Colors';
import Autocomplete from 'react-native-autocomplete-input';
import { CreateTripContext } from './../../context/CreateTripContext';

const API_KEY = "wyqKhVaoA0e4_haqjwB-Vq0YoID-ekFip75sdrSAWRY";

export default function SearchPlace() {
  const navigation = useNavigation();
  const {tripData, setTripdata}= useContext(CreateTripContext);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search'
    });
  }, []);

  const fetchPlaces = async (text) => {
    if (!text) return;
    const url = `https://autocomplete.search.hereapi.com/v1/autocomplete?q=${text}&apiKey=${API_KEY}&limit=5`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items) {
        const formattedData = data.items.map((item) => {
          const province = item.address?.state || item.address?.county || "";
          const country = item.address?.countryName || "";
          return {
            id: item.id,
            title: province ? `${province}, ${country}` : country,
          };
        });

        setSuggestions(formattedData);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API HERE:", error);
    }
  };

  return (
      <View style={{ padding: 25, paddingTop: 65, backgroundColor: Colors.WHITE, height: '100%' }}>
      <Autocomplete
        data={suggestions}
        defaultValue={query}
        onChangeText={(text) => {
          setQuery(text);
          fetchPlaces(text);
          setTripdata({
            location
          })
        }}
        placeholder="Nhập địa điểm..."
        containerStyle={{
          flex: 1,
          borderWidth: 0, 
          backgroundColor: "transparent",
        }}
        inputContainerStyle={{
          borderWidth: 0, 
          borderBottomWidth: 0, 
          borderColor: "#ccc",
          backgroundColor: "transparent",
        }}
        style={{
          fontSize: 16,
          padding: 10,
          backgroundColor: "transparent",
        }}
        listContainerStyle={{
          borderWidth: 0, 
          elevation: 0, 
          backgroundColor: "transparent",
        }}
        listStyle={{
          borderWidth: 0, 
          backgroundColor: "transparent",
          shadowColor: "transparent",
        }}
        flatListProps={{
          keyExtractor: (item) => item.id,
          renderItem: ({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setQuery(item.title);
                setSuggestions([]);
              }}
              style={{ 
                paddingVertical: 10, 
                paddingHorizontal: 15,
                borderBottomWidth: 1, 
                borderBottomColor: "#ccc", // Đường gạch chân
              }}
            >
              <Text style={{ fontSize: 14 }}>{item.title}</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </View>
  );
}
