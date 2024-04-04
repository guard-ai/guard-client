import React, { useEffect, useState } from 'react';
import '../global.css';
import { Stack } from 'expo-router/stack';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AuthContext from './context';
import { supabase } from '@/lib/supabase';
import { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { router } from 'expo-router';

export default function Layout() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        supabase.auth.onAuthStateChange(
            (_: AuthChangeEvent, session: Session) => {
                if (session) {
                    setUser(session.user);
                    router.replace('/');
                } else {
                    setUser(null);
                    router.replace('/signup');
                }
                console.log('changing auth state to', session);
            }
        );
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            <GestureHandlerRootView className="w-full h-full flex-1">
                <Stack screenOptions={{ headerShown: false }}>
                    <Stack.Screen
                        name="(tabs)"
                        options={{ headerShown: false }}
                    />
                </Stack>
            </GestureHandlerRootView>
        </AuthContext.Provider>
    );
}
