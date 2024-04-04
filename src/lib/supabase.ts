import { AppState } from 'react-native';
import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, createClient } from '@supabase/supabase-js';
import { REACT_NATIVE_SUPABASE_KEY, REACT_NATIVE_SUPABASE_URL } from '@env';

const supabaseUrl = REACT_NATIVE_SUPABASE_URL;
const supabaseAnonKey = REACT_NATIVE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
        storage: AsyncStorage,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
    }
});

// Tells Supabase Auth to continuously refresh the session automatically
// if the app is in the foreground. When this is added, you will continue
// to receive `onAuthStateChange` events with the `TOKEN_REFRESHED` or
// `SIGNED_OUT` event if the user's session is terminated. This should
// only be registered once.
AppState.addEventListener('change', (state) => {
    if (state === 'active') {
        supabase.auth.startAutoRefresh();
    } else {
        supabase.auth.stopAutoRefresh();
    }
});

export const getUser = async () => {
    const { data, error } = await supabase.auth.getSession();
    if (data?.session?.user && !error) {
        return data.session.user;
    }
    return null;
};
