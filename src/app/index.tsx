import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import { Accuracy } from "expo-location";
import "../global.css";
import BottomSheet, { BottomSheetFooter } from "@gorhom/bottom-sheet";
import Navbar from "@/components/navbar";
import { BottomSheetDefaultFooterProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types";

export default function App() {
	const [, setErrorMsg] = useState("");
	const [mapRegion, setMapRegion] = useState({
		latitude: 37.78825,
		longitude: -122.4324,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	const userLocation = async () => {
		let { status } = await Location.requestForegroundPermissionsAsync();
		if (status !== "granted") {
			console.error("Permission to access location was denied");
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

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
	const footer = useCallback(
		(props: React.JSX.IntrinsicAttributes & BottomSheetDefaultFooterProps) => (
			<BottomSheetFooter {...props} bottomInset={24}>
				<Navbar />
			</BottomSheetFooter>
		),
		[]
	);

	useEffect(() => {
		userLocation();
	}, []);

	return (
		<View className="w-full h-full flex-1">
			<MapView
				style={styles.map}
				region={mapRegion}
				showsUserLocation
				showsMyLocationButton
			>
			</MapView>

			<BottomSheet ref={sheetRef} snapPoints={snapPoints} footerComponent={footer}>
				<View className="w-full h-full pt-32 flex flex-col">
				</View>
			</BottomSheet>
		</View>
	);
}

const styles = StyleSheet.create({
	map: {
		width: "100%",
		height: "100%",
	},
});
