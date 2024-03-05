import React from "react";
import "../global.css";
import { Slot } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Layout() {
	return (
		<GestureHandlerRootView className="w-full h-full flex-1">
			<Slot />
		</GestureHandlerRootView>
	);
}
