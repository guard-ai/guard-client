import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { registerForPushNotificationsAsync } from '@/lib/notifications';
import * as Location from 'expo-location';
import { EXPO_PUBLIC_GUARD_ASGARD_SERVER } from '@env';

export default function SignUp() {
    const [err, setErr] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const setUserExpoPushToken = async (id: string) => {
        const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.High
        });

        const expoPushToken = await registerForPushNotificationsAsync();
        // notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
        //     console.log(notification);
        // });
        // return () => {
        //     Notifications.removeNotificationSubscription(notificationListener.current);
        // };

        const url = `${EXPO_PUBLIC_GUARD_ASGARD_SERVER}/user`;
        console.log(`creating user metadata at: ${url}`);
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id,
                location: `${location.coords.latitude},${location.coords.longitude}`,
                // location: '39.705781336390864,-104.82072755523521',
                push_token: expoPushToken
            })
        }).catch((e) => console.error(e));

        console.log(`response: ${JSON.stringify(response)}`);
    };

    const signUp = async () => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error?.message === 'User already registered') {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            console.log('signin: data:', data, 'error:', error);
            if (data?.session?.user) {
                router.replace('/');
            } else {
                setErr(error.message);
            }
        } else if (data?.session?.user) {
            await setUserExpoPushToken(data.session.user.id);
            router.replace('/');
        } else if (error.message) {
            setErr(error.message);
        }
        console.log(error.message);
        console.log('signup: data:', data, 'error:', error);
    };

    return (
        <View className="w-full h-full flex-1 flex-col items-center justify-center bg-white gap-3">
            <Text className="text-6xl font-bold text-[#111]">Guard AI</Text>
            {err && <Text className="text-red-500 font-bold">{err}</Text>}
            <TextInput
                textContentType="emailAddress"
                className="w-3/4 bg-white p-5 rounded-[30px]"
                style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    borderStyle: 'solid'
                }}
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                placeholderTextColor="gray"
                autoCapitalize="none"
            />

            <TextInput
                textContentType="password"
                className="w-3/4 bg-white p-5 rounded-[30px]"
                style={{
                    borderWidth: 1,
                    borderColor: 'black',
                    borderStyle: 'solid'
                }}
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
                placeholderTextColor="gray"
                autoCapitalize="none"
            />
            <Pressable
                className="w-1/2 bg-[#111] p-5 rounded-[30px]"
                onPress={() => signUp()}
            >
                <Text className="text-white font-bold text-xl text-center">
                    Continue
                </Text>
            </Pressable>
        </View>
    );
}
