import React, { useState, useEffect, useContext } from 'react';
import { Redirect, Tabs } from 'expo-router';
import {
    FriendsIcon,
    InsightsIcon,
    MapIcon,
    ProfilePicture
} from '@/components/icons';
import { View, Text } from 'react-native';
import {
    Oswald_300Light,
    Oswald_400Regular,
    useFonts
} from '@expo-google-fonts/oswald';
import { getUser } from '@/lib/supabase';
import AuthContext from '../context';

export default function TabLayout() {
    const [fontsLoaded, fontError] = useFonts({
        Oswald_300Light,
        Oswald_400Regular
    });

    const { user } = useContext(AuthContext);
    if (!fontsLoaded && !fontError) {
        return null;
    }

    if (!user) {
        return <Redirect href="/signup" />;
    }

    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: 'black',
                tabBarLabelStyle: {
                    fontFamily: 'Oswald_400Regular',
                    fontSize: 16
                },
                tabBarItemStyle: { marginTop: 15 }
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Map',
                    tabBarIcon: () => <MapIcon />
                }}
            />
            <Tabs.Screen
                name="friends"
                options={{
                    title: 'Friends',
                    tabBarIcon: () => <FriendsIcon />
                }}
            />
            <Tabs.Screen
                name="insights"
                options={{
                    title: 'Insights',
                    tabBarIcon: () => <InsightsIcon />
                }}
            />
            <Tabs.Screen
                name="account"
                options={{
                    title: 'Account',
                    tabBarIcon: () => <ProfilePicture />
                }}
            />
        </Tabs>
    );
}
