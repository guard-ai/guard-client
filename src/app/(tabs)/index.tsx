import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapView from 'react-native-maps';
import { Button, Pressable, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import { Accuracy } from 'expo-location';
import '../../global.css';
import BottomSheet, {
    BottomSheetFlatList,
    BottomSheetView
} from '@gorhom/bottom-sheet';
import {
    IncidentMarker,
    Event,
    EventI,
    EventDetails,
    categoryColors
} from '@/components/map';
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
import {
    RUN_MODE,
    EXPO_PUBLIC_GUARD_ASGARD_SERVER
} from '@env';
import { BackArrowIcon } from '@/components/icons';
import { events as dummyEvents } from '@/lib/data';

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
    const mapRef = useRef<MapView>(null);
    const snapPoints = useMemo(() => ['10%', '25%'], []);
    const [appIsReady, setAppIsReady] = useState(false);
    const [events, setEvents] = useState<EventI[]>([]);
    const [currentEvent, setCurrentEvent] = useState<EventI>(null);

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

        const location = await Location.getCurrentPositionAsync({
            accuracy: Accuracy.High
        });

        setMapRegion({
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            // Aurora, CO coords
            // latitude: 39.705764828248945,
            // longitude: -104.82066854663489,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        });
    };

    const fetchEvents = async () => {
        const user = await getUser();
        if (!user) {
            return;
        }

        if (RUN_MODE == 'MANUAL') {
            console.log('here dummy events')
            setEvents(dummyEvents);
            return;
        }

        const response = await fetch(
            `${EXPO_PUBLIC_GUARD_ASGARD_SERVER}/events/near/${user.id}`,
            {
                method: 'GET'
            }
        ).catch((e) => console.error('error', e));

        if (response && response.ok) {
            const body = await response.json();
            const events = [];
            for (const _event of body['events']) {
                const event: EventI = {
                    id: _event['id'],
                    title: _event['category'],
                    category: _event['level'],
                    time: new Date(_event['created_at']),
                    description: _event['description'],
                    location: _event['location']
                };
                events.push(event);
            }
            events.sort((a: EventI, b: EventI) => {
                if (a.time < b.time) {
                    return 1;
                } else if (a.time > b.time) {
                    return -1;
                }
                return 0;
            });
            setEvents(events);
        }
    };

    const zoomOnEvent = (event: EventI) => {
        const lat = Number(event.location.split(',')[0]);
        const long = Number(event.location.split(',')[1]);
        setCurrentEvent(event);
        const newMapRegion = {
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.01,
            longitudeDelta: 0.005
        };
        mapRef.current.animateToRegion(newMapRegion);
    };

    useEffect(() => {
        userLocation();
        fetchEvents();
    }, []);

    if (!appIsReady && !fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View className="w-full h-full flex-1">
            <MapView
                ref={mapRef}
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
                            fillColor={categoryColors[event.category].fillColor}
                            ringColor={categoryColors[event.category].ringColor}
                            onPress={() => zoomOnEvent(event)}
                        />
                    );
                })}
            </MapView>

            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enableDynamicSizing
            >
                {currentEvent && (
                    <BottomSheetView className="px-2">
                        <View className="mr-auto">
                            <Pressable onPress={() => setCurrentEvent(null)}>
                                <View className="flex flex-row items-center gap-1 mb-2">
                                    <BackArrowIcon />
                                    <Text className="text-xl font-OswaldSemiBold">
                                        Back
                                    </Text>
                                </View>
                            </Pressable>
                        </View>
                        <EventDetails event={currentEvent} />
                    </BottomSheetView>
                )}

                {!currentEvent && events.length > 0 && (
                    <BottomSheetFlatList
                        data={events}
                        renderItem={({ item }) => (
                            <Pressable onPress={() => zoomOnEvent(item)}>
                                <Event event={item} />
                            </Pressable>
                        )}
                        ItemSeparatorComponent={() => (
                            <View className="w-full h-[1px] bg-slate-200 my-3" />
                        )}
                        contentContainerClassName="px-2"
                        refreshing={false}
                        onRefresh={() => fetchEvents()}
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
