import React from "react";
import { Image, Text, View } from "react-native";
import { FriendsIcon, InsightsIcon, MapIcon } from "./icons";
import Svg, { Path } from "react-native-svg";

function ProfilePicture() {
	return (
		<View className="w-8 h-8 rounded-full stroke-2 stroke-black">
			<Svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8 stroke-black">
				<Path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
			</Svg>
		</View>
	);
}

export default function Navbar() {
	return (
		<View className="w-full flex flex-row m-0 px-6 pt-2 pb-8 gap-8 items-center justify-evenly bg-white">
			<View className="flex flex-col items-center justify-center gap-2">
				<MapIcon />
				<Text className="text-base font-OswaldLight">MAP</Text>
			</View>
			<View className="flex flex-col items-center justify-center gap-2">
				<FriendsIcon />
				<Text className="text-base font-OswaldLight">FRIENDS</Text>
			</View>
			<View className="flex flex-col items-center justify-center gap-2">
				<InsightsIcon />
				<Text className="text-base font-OswaldLight">INSIGHTS</Text>
			</View>
			<View className="flex flex-col items-center justify-center gap-2">
				<ProfilePicture />
				<Text className="text-base font-OswaldLight">ACCOUNT</Text>
			</View>
		</View>
	);
}
