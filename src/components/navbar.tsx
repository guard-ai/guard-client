import React from "react";
import { Text, View } from "react-native";
import { FriendsIcon, InsightsIcon, MapIcon } from "./icons";

export default function Navbar() {
	return (
		<View className="w-100 flex flex-row p-6 gap-8 items-center justify-center">
			<View className="flex flex-col items-center justify-center">
				<MapIcon />
				<Text>MAP</Text>
			</View>
			<View className="flex flex-col items-center justify-center">
				<FriendsIcon />
				<Text>FRIENDS</Text>
			</View>
			<View className="flex flex-col items-center justify-center">
				<InsightsIcon />
				<Text>INSIGHTS</Text>
			</View>
		</View>
	);
}
