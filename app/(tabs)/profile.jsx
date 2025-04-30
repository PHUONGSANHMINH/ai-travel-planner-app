import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Share,
  TextInput,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import { auth } from "./../../configs/FirebaseConfig";
import { Colors } from "../../constants/Colors";

const Profile = () => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    photoURL: "",
  });

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        const defaultData = {
          fullName: user.displayName || "",
          email: user.email || "",
          phone: "",
          address: "",
          dob: "",
          photoURL: user.photoURL || "",
        };
        setUser(defaultData);
        setFormData(defaultData);
      } else {
        setUser(null);
      }
    });

    return unsubscribe;
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      router.replace("/auth/sign-in");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message:
          "Check out this amazing app developed by KN, SM, VT! [App Link]",
      });
    } catch (error) {
      console.error("Error sharing the app:", error);
    }
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
    if (!editMode && user) {
      setFormData(user);
    }
  };

  const handleSave = () => {
    setUser(formData);
    setEditMode(false);
  };

  const handleChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setFormData({ ...formData, photoURL: result.assets[0].uri });
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user && (
        <View style={styles.userIntroContainer}>
          <TouchableOpacity
            onPress={editMode ? pickImage : null}
            style={styles.imageWrapper}
          >
            <Image
              source={
                formData.photoURL
                  ? { uri: formData.photoURL }
                  : require("./../../assets/images/login2.jpg")
              }
              style={styles.userImage}
            />
            {editMode && (
              <TouchableOpacity
                style={styles.editIconButton}
                onPress={pickImage}
              >
                <Text style={styles.editIconText}>✏️</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>

          {editMode ? (
            <>
              <TextInput
                style={styles.input}
                placeholder="Full Name"
                value={formData.fullName}
                onChangeText={(text) => handleChange("fullName", text)}
              />
              <TextInput
                style={[styles.input, { backgroundColor: "#f5f5f5" }]}
                placeholder="Email"
                value={formData.email}
                editable={false}
              />
              <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={formData.phone}
                onChangeText={(text) => handleChange("phone", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Address"
                value={formData.address}
                onChangeText={(text) => handleChange("address", text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Date of Birth (YYYY-MM-DD)"
                value={formData.dob}
                onChangeText={(text) => handleChange("dob", text)}
              />
              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={handleSave}
              >
                <Text style={styles.buttonTextWhite}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.buttonSecondary}
                onPress={handleEditToggle}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={styles.infoContainer}>
              <Text style={styles.label}>👤 {user.fullName}</Text>
              <Text style={styles.label}>📧 {user.email}</Text>
              {user.phone ? (
                <Text style={styles.label}>📞 {user.phone}</Text>
              ) : null}
              {user.address ? (
                <Text style={styles.label}>🏠 {user.address}</Text>
              ) : null}
              {user.dob ? (
                <Text style={styles.label}>🎂 {user.dob}</Text>
              ) : null}
              <TouchableOpacity
                style={styles.buttonPrimary}
                onPress={handleEditToggle}
              >
                <Text style={styles.buttonTextWhite}>Edit Profile</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      )}

      <TouchableOpacity style={styles.buttonSecondary} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonPrimary} onPress={handleShare}>
        <Text style={styles.buttonTextWhite}>Share App</Text>
      </TouchableOpacity>

      <Text style={styles.footer}>
        Crafted with passion by KN, SM, VT. ✨ Bringing ideas to life, one line
        of code at a time.
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    padding: 25,
  },
  title: {
    fontFamily: "outfit-bold",
    fontSize: 35,
    marginBottom: 20,
    marginTop: 10,
    textAlign: "center",
    color: "#333",
  },
  userIntroContainer: {
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
    marginBottom: 30,
    width: "100%",
  },
  imageWrapper: {
    alignItems: "center",
    marginBottom: 15,
    position: "relative",
  },
  userImage: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderColor: "#ddd",
    borderWidth: 2,
  },
  editIconButton: {
    position: "absolute",
    bottom: 0,
    right: 10,
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 6,
    borderWidth: 1,
    borderColor: "#ccc",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  editIconText: {
    fontSize: 14,
  },
  input: {
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginVertical: 6,
    fontSize: 16,
  },
  label: {
    fontSize: 16,
    fontFamily: "outfit",
    color: "#444",
    marginVertical: 4,
    textAlign: "center",
  },
  buttonPrimary: {
    padding: 15,
    backgroundColor: Colors.PRIMARY,
    borderRadius: 12,
    width: "100%",
    marginTop: 15,
  },
  buttonSecondary: {
    padding: 15,
    backgroundColor: Colors.WHITE,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "roboto",
    color: "#333",
  },
  buttonTextWhite: {
    textAlign: "center",
    fontSize: 16,
    fontFamily: "roboto",
    color: "white",
  },
  footer: {
    fontFamily: "outfit-medium",
    fontSize: 12,
    textAlign: "center",
    marginTop: 30,
    color: "#888",
  },
  infoContainer: {
    alignItems: "center",
    width: "100%",
  },
});

export default Profile;
