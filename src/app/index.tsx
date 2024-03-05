import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import MapView from "react-native-maps";
import { StyleSheet, View, Text } from "react-native";
import * as Location from "expo-location";
import { Accuracy } from "expo-location";
import "../global.css";
import BottomSheet, { BottomSheetFooter, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import Navbar from "@/components/navbar";
import { BottomSheetDefaultFooterProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types";
import Map, { EventI } from "@/components/map";
import {
  useFonts,
  Oswald_200ExtraLight,
  Oswald_300Light,
  Oswald_400Regular,
  Oswald_500Medium,
  Oswald_600SemiBold,
  Oswald_700Bold,
} from '@expo-google-fonts/oswald';
import AppLoading from "expo-app-loading";

export default function App() {
	let [fontsLoaded] = useFonts({
		Oswald_200ExtraLight,
		Oswald_300Light,
		Oswald_400Regular,
		Oswald_500Medium,
		Oswald_600SemiBold,
		Oswald_700Bold,
	});

	const [viewIndex, setViewIndex] = useState(0);
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

	useEffect(() => {
		userLocation();
	}, []);

	const sheetRef = useRef<BottomSheet>(null);
	const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);
	const footer = useCallback(
		(props: React.JSX.IntrinsicAttributes & BottomSheetDefaultFooterProps) => (
			<BottomSheetFooter {...props}>
				<Navbar />
			</BottomSheetFooter>
		),
		[]
	);

	const events: EventI[] = [
		{
			title: "FIRE",
			category: "CONFIRMED_THREAT",
			time: new Date(),
			description: "Fire reported on 10th and 8th street, several residents trapped inside. Fire Department and EMS on site, additional backup requested"
		},
		{
			title: "ACTIVE STABBING",
			category: "CONFIRMED_INFO",
			time: new Date(new Date().getTime() - (1000 * 60 * 5)),
			description: "Stabbing reported at Publix. All units requesting backup, rolling RA to site. Suspect was reported leaving the area."
		},
		{
			title: "AGGRAVATED ROBBERY",
			category: "NONE",
			time: new Date(new Date().getTime() - (1000 * 60 * 32)),
			description: "Active units needed at Marta station on 5th and 6th. Active robbery reported near Marta bus station, rolling RA to the location. All units be advised."
		},
		{
			title: "SUPER DUPER LONG NAME BLAH BLAH BLAH BLAH",
			category: "NONE",
			time: new Date(new Date().getTime() - (1000 * 60 * 32)),
			description: "Active units needed at Marta station on 5th and 6th. Active robbery reported near Marta bus station, rolling RA to the location. All units be advised."
		},
	];

	const views = [<Map events={events} />];

	if (!fontsLoaded) {
		return (<AppLoading />);
	}

	return (
		<View className="w-full h-full flex-1">
			<MapView
				style={styles.map}
				region={mapRegion}
				provider="google"
				showsUserLocation
				showsMyLocationButton
			>
			</MapView>

			<BottomSheet ref={sheetRef} snapPoints={snapPoints} footerComponent={footer}>
				<BottomSheetScrollView className="w-full h-full p-2">
					{views[viewIndex]}
				</BottomSheetScrollView>
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
