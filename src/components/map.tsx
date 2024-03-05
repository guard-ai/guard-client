import React from "react";
import { Text, View } from "react-native";

function Chip(props: {
	children: any, category: "CONFIRMED_THREAT" | "REPORTED_THREAT" | "CONFIRMED_INFO" | "REPORTED_INFO" | "NONE"
}) {
	let color = "bg-[#E7E7E7]";

	if (props.category.includes("THREAT")) {
		color = "bg-[#FF9393]";
	} else if (props.category.includes("INFO")) {
		color = "bg-[#FFEE93]";
	}

	return (
		<View className={`flex flex-1 min-w-0`}>
			<View style={{ alignSelf: "flex-start" }} className={`py-1 px-2 rounded-full ${color}`}>
				{props.children}
			</View>
		</View>
	);
}

export interface EventI {
	title: string,
	category: "CONFIRMED_THREAT" | "REPORTED_THREAT" | "CONFIRMED_INFO" | "REPORTED_INFO" | "NONE",
	time: Date,
	description: string,
};

function Event(props: { index: number, event: EventI }) {
	let time = ((new Date().getTime() / 1000) - props.event.time.getTime() / 1000) <= 60 ? "NOW" : `${timeSince(props.event.time)} AGO`;
	let label = props.event.category.includes("CONFIRMED") ? "CONFIRMED" : "REPORTED";

	return (
		<View className={`w-full flex flex-col gap-2 ${props.index === 0 ? "" : "pt-2 border-t border-[#BCBCBC]"}`}>
			<View className="w-full flex flex-row flex-nowrap items-center justify-between gap-2">
				<Chip category={props.event.category}>
					<Text numberOfLines={1} ellipsizeMode="tail" className="text-base uppercase overflow-hidden font-OswaldSemiBold">{`${label}: ${props.event.title}`}</Text>
				</Chip>
				<Text className="text-right text-sm uppercase font-OswaldLight">{time}</Text>
			</View>

			<Text className="text-base pl-2 font-OswaldLight">{props.event.description}</Text>
		</View>
	);
}

export default function Map(props: { events: EventI[] }) {
	return (
		<View className="w-full h-full flex flex-col items-start gap-4">
			{props.events.map((event, i) => {
				return (
					<View key={i}>
						<Event event={event} index={i} />
					</View>
				);
			})}
		</View>
	);
}

function timeSince(date: Date) {
	if (typeof date !== 'object') {
		date = new Date(date);
	}

	let seconds = Math.floor(((new Date().getTime() / 1000) - (date.getTime() / 1000)));
	let intervalType = "seconds";

	var interval = Math.floor(seconds / 31536000);
	if (interval >= 1) {
		intervalType = 'year';
	} else {
		interval = Math.floor(seconds / 2592000);
		if (interval >= 1) {
			intervalType = 'month';
		} else {
			interval = Math.floor(seconds / 86400);
			if (interval >= 1) {
				intervalType = 'day';
			} else {
				interval = Math.floor(seconds / 3600);
				if (interval >= 1) {
					intervalType = "hour";
				} else {
					interval = Math.floor(seconds / 60);
					if (interval >= 1) {
						intervalType = "minute";
					} else {
						interval = seconds;
						intervalType = "second";
					}
				}
			}
		}
	}

	if (interval > 1 || interval === 0) {
		intervalType += 's';
	}

	return interval + ' ' + intervalType;
}
