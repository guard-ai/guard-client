import { supabase } from '@/lib/supabase';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';

export default function SignUp() {
    const [err, setErr] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signUp = async () => {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error.message === 'User already registered') {
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
            router.replace('/');
        } else if (error.message) {
            setErr(error.message);
        }
        console.log(error.message);
        console.log('signup: data:', data, 'error:', error);
    };

    return (
        <View className="w-full h-full flex-1 flex-col items-center justify-center bg-slate-100 gap-3">
            <Text className="text-6xl font-bold text-[#111]">Guard AI</Text>
            {err && <Text className="text-red-500 font-bold">{err}</Text>}
            <TextInput
                textContentType="emailAddress"
                className="w-3/4 bg-white p-5 rounded-[30px]"
                onChangeText={setEmail}
                value={email}
                placeholder="Email"
                autoCapitalize="none"
            />
            <TextInput
                textContentType="password"
                className="w-3/4 bg-white p-5 rounded-[30px]"
                secureTextEntry
                onChangeText={setPassword}
                value={password}
                placeholder="Password"
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
            {/* <Text className='text-xl text-white'>Already have an account? <Link href='/signin' className="text-[#007aff]">Login</Link></Text> */}
        </View>
    );
}
