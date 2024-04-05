import React, { useEffect, useMemo, useRef, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Text, Pressable } from 'react-native';
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
import { events } from '@/lib/data';
import { sendPushNotification } from '@/lib/notifications';
import * as Notifications from 'expo-notifications';

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

    // SENDING NOTIFICATION EXAMPLE
    // const sendFirstNotification = async () => {
    //     const testNotification: Notifications.NotificationContent = {
    //         title: 'Test Notification',
    //         subtitle: 'This is a test subtitle',
    //         body: 'Here is the body of a notification',
    //         sound: 'default',
    //         data: {}
    //     };
    //     console.log('sending test notification');
    //     await sendPushNotification(
    //         user.user_metadata.expoPushToken,
    //         testNotification
    //     );
    // };

    if (!appIsReady && !fontsLoaded && !fontError) {
        return null;
    }

    return (
        <View className="w-full h-full flex-1">
            <MapView
                style={styles.map}
                region={mapRegion}
                showsUserLocation
            ></MapView>

            {/* <Pressable className='absolute top-1/2 left-1/2' onPress={() => sendFirstNotification()}><Text>Send test notification</Text></Pressable>  */}

            <BottomSheet
                ref={sheetRef}
                snapPoints={snapPoints}
                enableDynamicSizing
            >
                <BottomSheetFlatList
                    data={events}
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
// import React, { useState, useEffect, useRef } from 'react';
// import { Text, View, Button, Platform } from 'react-native';
// import * as Device from 'expo-device';
// import * as Notifications from 'expo-notifications';
// import Constants from 'expo-constants';


// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });


// // Can use this function below or use Expo's Push Notification Tool from: https://expo.dev/notifications
// async function sendPushNotification(expoPushToken: Notifications.ExpoPushToken) {
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Here is the title',
//     body: 'And here is the body! Updated',
//     data: { someData: 'goes here' },
//   };

//   console.log(message)
//   console.log('here')

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = await Notifications.getExpoPushTokenAsync({
//       projectId: Constants.expoConfig?.extra?.eas.projectId,
//     });
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   return token.data;
// }

// export default function App() {
//   const [expoPushToken, setExpoPushToken] = useState(null);
//   const [notification, setNotification] = useState<Notifications.Notification | null>(null);
//   const notificationListener = useRef<Notifications.Subscription>();
//   const responseListener = useRef<Notifications.Subscription>();

//   useEffect(() => {
//     registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

//     // // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
//     // //   setNotification(notification);
//     // // });

//     // responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
//     //   console.log(response);
//     // });

//     // return () => {
//     // //   Notifications.removeNotificationSubscription(notificationListener.current as Notifications.Subscription);
//     //   Notifications.removeNotificationSubscription(responseListener.current as Notifications.Subscription);
//     // };
//   }, []);

//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'space-around' }}>
//       <View style={{ alignItems: 'center', justifyContent: 'center' }}>
//         <Text className='font-bold text-2xl'>Sample Notification</Text>
//         <Text>Title: {notification && notification.request.content.title} </Text>
//         <Text>Body: {notification && notification.request.content.body}</Text>
//         <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
//       </View>
//       <Button
//         title="Press to Send Notification"
//         onPress={async () => {
//             if (expoPushToken)
//                 await sendPushNotification(expoPushToken);
//         }}
//       />
//     </View>
//   );
// }