import React, { useState, useEffect } from 'react';
import * as Location from 'expo-location';
import Map from '../components/Map';
import { View,
    ActivityIndicator,
    StyleSheet } from 'react-native';


export default function MainScreen() {
    const [location, setLocation] = useState(null);
    const [error, setError] = useState(null);

    const checkPermissions = async () => {
        let { status } = await Location.requestPermissionsAsync();
        if (status !== 'granted') {
            setError('Permission to access location was denied');
        }

        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
    }
    useEffect(() => {
        checkPermissions()
    },[]);
    return (
        <View style={styles.container}>
            {
                !error && !location && <ActivityIndicator size="large" />
            }
            {
                location && <Map latitude={location.coords.latitude} longitude={location.coords.longitude}/>
            }
        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})
