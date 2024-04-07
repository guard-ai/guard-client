import React, { useContext, useState } from 'react';
import {
    Button,
    StyleSheet,
    SafeAreaView,
    View,
    ScrollView,
    Text,
    TouchableOpacity,
    Switch,
    Image,
  } from 'react-native';
import {
    useFonts,
    Oswald_200ExtraLight,
    Oswald_300Light,
    Oswald_400Regular,
    Oswald_500Medium,
    Oswald_600SemiBold,
    Oswald_700Bold
  } from '@expo-google-fonts/oswald';
import { supabase } from '@/lib/supabase';
import AuthContext from '../context';
import '../../global.css';
import FeatherIcon from 'react-native-vector-icons/Feather';


export default function Example() {

    const [form, setForm] = useState({
      darkMode: false,
      emailNotifications: true,
      pushNotifications: false,
    });
  
    const { setUser } = useContext(AuthContext);
    const signOut = async () => {
        const error = await supabase.auth.signOut();
        setUser(null);
        console.log(error);
    }

    const [fontsLoaded] = useFonts({
        Oswald_400Regular,
        // Include other font styles you need
      });

    
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={styles.container}>
          <View style={styles.profile}>
            <TouchableOpacity
              onPress={() => {
                // handle onPress
              }}>
              <View style={styles.profileAvatarWrapper}>
                <Image
                  accessibilityLabel=''
                  source={{
                    uri: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=facearea&facepad=2.5&w=256&h=256&q=80',
                  }}
                  style={styles.profileAvatar} />
  
                <TouchableOpacity
                  onPress={() => {
                    // handle onPress
                  }}>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
  
            <View>
              <Text style={styles.profileName}>Jon Doe</Text>
  
              <Text style={styles.profileEmail}>
                jondoe@email.com
              </Text>
            </View>
          </View>
  
          <ScrollView>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account</Text>
  
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
  
                <Text style={styles.rowLabel}>User Profile</Text>
  
                <View style={styles.rowSpacer} />

                <FeatherIcon
                  color="#C6C6C6"
                  name="chevron-right"
                  size={20} />
              </TouchableOpacity>


              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Change Password</Text>
  
                <View style={styles.rowSpacer} />

                <FeatherIcon
                  color="#C6C6C6"
                  name="chevron-right"
                  size={20} />
              </TouchableOpacity>
  

              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
  
                <Text style={styles.rowLabel}>Notifications</Text>
  
                <View style={styles.rowSpacer} />

                <FeatherIcon
                  color="#C6C6C6"
                  name="chevron-right"
                  size={20} />
              </TouchableOpacity>
  
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Permissions</Text>
  
                <View style={styles.rowSpacer} />

                <FeatherIcon
                  color="#C6C6C6"
                  name="chevron-right"
                  size={20} />
              </TouchableOpacity>
                

              <TouchableOpacity
                onPress={() => {
                    signOut()
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Sign Out</Text>
  
                <View style={styles.rowSpacer} />

                <FeatherIcon
                  color="#C6C6C6"
                  name="chevron-right"
                  size={20} />
              </TouchableOpacity>


              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Deactivate Account</Text>
  
                <View style={styles.rowSpacer} />

                <FeatherIcon
                  color="#C6C6C6"
                  name="chevron-right"
                  size={20} />
              </TouchableOpacity>
            </View>
  
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Subscription</Text>
  
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>

                <Text style={styles.rowLabel}>Upgrade Plan</Text>
  
                <View style={styles.rowSpacer} />
  
                <FeatherIcon
                  color="#C6C6C6"
                  name="chevron-right"
                  size={20} />
              </TouchableOpacity>
  
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>
                <Text style={styles.rowLabel}>Mangae Payment Method</Text>
  
                <View style={styles.rowSpacer} />
  
                <FeatherIcon
                  color="#C6C6C6"
                  name="chevron-right"
                  size={20} />
              </TouchableOpacity>
  
              <TouchableOpacity
                onPress={() => {
                  // handle onPress
                }}
                style={styles.row}>  
                <Text style={styles.rowLabel}>Cancel Subscritpion</Text>
  
                <View style={styles.rowSpacer} />
  
                <FeatherIcon
                  color="#C6C6C6"
                  name="chevron-right"
                  size={20} />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }

  
  const styles = StyleSheet.create({
    container: {
      padding: 0,
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
    /** Profile */
    profile: {
      padding: 24,
      backgroundColor: '#fff',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
    profileAvatarWrapper: {
      position: 'relative',
    },
    profileAvatar: {
      width: 72,
      height: 72,
      borderRadius: 9999,
    },
    profileAction: {
      position: 'absolute',
      right: -4,
      bottom: -10,
      alignItems: 'center',
      justifyContent: 'center',
      width: 28,
      height: 28,
      borderRadius: 9999,
      backgroundColor: '#007bff',
    },
    profileName: {
      fontFamily: 'Oswald_600SemiBold',
      marginTop: 20,
      fontSize: 26,
      fontWeight: '600',
      color: '#414d63',
      textAlign: 'center',
    },
    profileEmail: {
      fontFamily: 'Oswald_400Regular',
      marginTop: 5,
      fontSize: 16,
      color: '#989898',
      textAlign: 'center',
    },
    /** Section */
    section: {
      fontFamily: 'Oswald_400Regular',
      paddingHorizontal: 24,
    },
    sectionTitle: {
      fontFamily: 'Oswald_400Regular',
      paddingVertical: 12,
      fontSize: 14,
      fontWeight: '600',
      color: '#9e9e9e',
      textTransform: 'uppercase',
      letterSpacing: 1.1,
    },
    /** Row */
    row: {
      fontFamily: 'Oswald_400Regular',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
      height: 50,
      backgroundColor: '#f2f2f2',
      borderRadius: 8,
      marginBottom: 12,
      paddingLeft: 12,
      paddingRight: 12,
    },
    rowIcon: {
      fontFamily: 'Oswald_400Regular',
      width: 32,
      height: 32,
      borderRadius: 9999,
      marginRight: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    rowLabel: {
      fontFamily: 'Oswald_400Regular',
      fontSize: 17,
      fontWeight: '400',
      color: '#0c0c0c',
    },
    rowSpacer: {
      flexGrow: 1,
      flexShrink: 1,
      flexBasis: 0,
    },
  });
