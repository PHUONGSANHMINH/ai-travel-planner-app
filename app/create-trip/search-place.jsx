/* import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Colors } from './../../constants/Colors';
import Autocomplete from 'react-native-autocomplete-input';

const HERE_API_KEY = "wyqKhVaoA0e4_haqjwB-Vq0YoID-ekFip75sdrSAWRY"; // Thay bằng API key thật

export default function SearchPlace() {

  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  // 🔎 Fetch Places từ HERE API
  const fetchPlaces = async (text) => {
    setQuery(text);
    if (text.length < 3) return; // Chỉ tìm kiếm khi nhập ít nhất 3 ký tự

    try {
      const response = await fetch(
        `https://discover.search.hereapi.com/v1/discover?apikey=${HERE_API_KEY}&q=${text}&at=10.7769,106.7009&limit=5`,
        {
          headers: {
            "Accept-Charset": "utf-8",
          },
        }
      );
      
      if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

      const data = await response.json();
      console.log(" Dữ liệu API trả về:", JSON.stringify(data, null, 2));

      setSuggestions(data.items || []);
    } catch (error) {
      console.error(" Lỗi tìm kiếm địa điểm:", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Autocomplete
        data={suggestions.length > 0 ? suggestions : []}
        value={query}
        onChangeText={fetchPlaces}
        placeholder=" Nhập địa điểm..."
        style={styles.input}
        flatListProps={{
          keyExtractor: (item) => item.id,
          renderItem: ({ item }) => (
            <TouchableOpacity
              onPress={() => {
                setQuery(item.title);
                setSuggestions([]);
                console.log("Đã chọn địa điểm:", item);
              }}
              style={styles.suggestionItem}
            >
              <Text style={styles.suggestionText}>{item.title}</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </View>
  );
}

//  StyleSheet cho UI
const styles = StyleSheet.create({
  container: {
    padding: 25,
    paddingTop: 50,
    backgroundColor: Colors.WHITE,
    height: '100%',
  },
  input: {
    fontSize: 16,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  suggestionItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  suggestionText: {
    fontSize: 16,
  },
});

*/
import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from 'expo-router'
import { Colors } from './../../constants/Colors'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';

export default function SearchPlace() {

  const navigation = useNavigation();

  useEffect(()=>{
    navigation.setOptions({
      headerShown: true,
      headerTransparent: true,
      headerTitle: 'Search'
    })
  },[])
  return (
    <View style={{
       padding: 25,
       paddingTop: 50,
       backgroundColor:Colors.WHITE,
       height: '100%', 
    }}>
    <GooglePlacesAutocomplete
      placeholder='Search'
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: process.env.EXPO_PUBLIC_GOOGLE_MAP_KEY,
        language: 'en',
      }}
    />
    </View>
  )
}