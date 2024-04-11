import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { Accuracy } from 'expo-location';
import '../../global.css';
import BottomSheet, {
    BottomSheetFlatList,
    BottomSheetView
} from '@gorhom/bottom-sheet';
import { IncidentMarker, Event, EventI } from '@/components/map';
import {
    useFonts,
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold
} from '@expo-google-fonts/oswald';
import { SplashScreen } from 'expo-router';
import { getUser } from '@/lib/supabase';
import { EXPO_PUBLIC_GUARD_ASGARD_SERVER } from '@env';

export default function MapPage() {
    const [fontsLoaded, fontError] = useFonts({
        Oswald_200ExtraLight,
        Oswald_300Light,
        Oswald_400Regular,
        Oswald_500Medium,
        Oswald_600SemiBold,
        Oswald_700Bold
    });

    const [, setErrorMsg] = useState('');
    const [mapRegion, setMapRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    });
    const sheetRef = useRef<BottomSheet>(null);
    const snapPoints = useMemo(() => ['25%', '50%'], []);
    const [appIsReady, setAppIsReady] = useState(false);
    const [events, setEvents] = useState<EventI[]>([]);
    const [updateInterval, setUpdateInterval] = useState(undefined);

    useEffect(() => {
        async function prepare() {
            try {
                // Keep the splash screen visible while we fetch resources
                await SplashScreen.preventAutoHideAsync();
                // Pre-load fonts, make any API calls you need to do here
            } catch (e) {
                console.warn(e);
            } finally {
                // Tell the application to render
                setAppIsReady(true);
            }
        }

        prepare();
    }, []);

    const userLocation = async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            console.error('Permission to access location was denied');
            setErrorMsg('Permission to access location was denied');
        }

        // const location = await Location.getCurrentPositionAsync({
        //     accuracy: Accuracy.High
        // });

        setMapRegion({
            // latitude: location.coords.latitude,
            // longitude: location.coords.longitude,
            latitude: 39.705764828248945,
            longitude: -104.82066854663489,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        });
    };

    useEffect(() => {
        userLocation();
        if (!updateInterval) {
            const updateInterval = setInterval(async () => {
                const user = await getUser();
                if (user) {
                    const response = await fetch(
                        `${EXPO_PUBLIC_GUARD_ASGARD_SERVER}/events/near/${user.id}`,
                        {
                            method: 'GET'
                        }
                    ).catch((e) => console.error(e));

                    if (response && response.ok) {
                        const body = await response.json();
                        const events = [];
                        for (const _event of body['events']) {
                            const event: EventI = {
                                id: _event['id'],
                                title: _event['category'],
                                category: _event['level'],
                                time: new Date(_event['created_at']),
                                description:
                                    'This will soon be the radio utterance!',
                                location: _event['location']
                            };
                            events.push(event);
                        }
                        setEvents(events);
                    }
                } else {
                    clearInterval(updateInterval);
                }
            }, 1000);
            setUpdateInterval(updateInterval);
        }
    }, [updateInterval]);

    if (!appIsReady && !fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View className="w-full h-full flex-1">
            <MapView
                style={styles.map}
                region={mapRegion}
                mapType="hybrid"
                showsUserLocation
            >
                {events.map((event) => {
                    const lat = Number(event.location.split(',')[0]);
                    const long = Number(event.location.split(',')[1]);
                    return (
                        <IncidentMarker
                            key={event.id}
                            coords={{ lat: lat, long: long }}
                            fillColor="#FA3232"
                            ringColor="rgba(255, 147, 147, .7)"
                        />
                    );
                })}
            </MapView>

            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enableDynamicSizing
            >
                {events.length > 0 && (
                    <BottomSheetFlatList
                        data={events}
                        renderItem={({ item }) => <Event event={item} />}
                        ItemSeparatorComponent={() => (
                            <View className="w-full h-[1px] bg-slate-200 my-3" />
                        )}
                        contentContainerClassName="px-2"
                    />
                )}

                {events.length === 0 && (
                    <BottomSheetView>
                        <View className="w-full flex items-center mt-5">
                            <Text>
                                There are no reported incidents in your area..
                            </Text>
                        </View>
                    </BottomSheetView>
                )}
            </BottomSheet>
        </View>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%'
    }
});
