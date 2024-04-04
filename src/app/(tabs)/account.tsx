import React, { useContext } from 'react';
import { Button, View } from 'react-native';
import { supabase } from '@/lib/supabase';
import AuthContext from '../context';
import '../../global.css';

export default function AccountPage() {
    const { setUser } = useContext(AuthContext);
    const signOut = async () => {
        const error = await supabase.auth.signOut();
        setUser(null);
        console.log(error);
    };
    return (
        <View className="w-full h-full flex items-center justify-center">
            <Button onPress={() => signOut()} title="Sign Out" />
        </View>
    );
}
