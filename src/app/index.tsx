import React, { useEffect, useState, useRef } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, View, Text, Button, Pressable } from "react-native";
import * as Location from "expo-location";
import { Accuracy } from "expo-location";
import "../global.css";

export default function App() {
  const [errorMsg, setErrorMsg] = useState("");
  const [mapRegion, setMapRegion] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const userLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
    }
    let location = await Location.getCurrentPositionAsync({
      accuracy: Accuracy.High,
    });
    setMapRegion({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    });
  };

  useEffect(() => {
    userLocation();
  }, []);

  return (
    <View className="flex-1">
      <MapView
        style={styles.map}
        provider={"google"}
        region={mapRegion}
        showsUserLocation
        showsMyLocationButton
      >
      </MapView>
      <Text className="absolute top-20 left-1/2 -translate-x-1/2 text-5xl">Guard AI</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    width: "100%",
    height: "100%",
  },
});
