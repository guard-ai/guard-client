import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import * as Location from 'expo-location';
import { Accuracy } from 'expo-location';
import '../../global.css';
import BottomSheet, { BottomSheetFlatList } from '@gorhom/bottom-sheet';
import { Event } from '@/components/map';
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
    // const onLayoutRootView = useCallback(async () => {
    //     if (appIsReady || fontsLoaded || fontError) {
    //         // This tells the splash screen to hide immediately! If we call this after
    //         // `setAppIsReady`, then we may see a blank screen while the app is
    //         // loading its initial state and rendering its first pixels. So instead,
    //         // we hide the splash screen once we know the root view has already
    //         // performed layout.
    //         await SplashScreen.hideAsync();
    //     }
    // }, [appIsReady, fontsLoaded, fontError]);

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
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421
        });
    };

    useEffect(() => {
        userLocation();
    }, []);

    if (!appIsReady && !fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View className="w-full h-full flex-1">
            <MapView
                style={styles.map}
                region={mapRegion}
                provider="google"
                showsUserLocation
            ></MapView>

            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enableDynamicSizing
            >
                <BottomSheetFlatList
                    data={[]}
                    renderItem={({ item }) => <Event event={item} />}
                    ItemSeparatorComponent={() => (
                        <View className="w-full h-[1px] bg-slate-200 my-3" />
                    )}
                    contentContainerClassName="px-2"
                />
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
