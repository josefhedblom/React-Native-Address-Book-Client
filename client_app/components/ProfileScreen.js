import React from 'react';
import { useEffect } from 'recat';
import { View, Text, StyleSheet } from 'react-native';
import { API_URL } from '@env';

export default function ProfileScreen() {

    useEffect(() => {
        fetch(`${API_URL}/${itemId}`)
        .then(response => response.json())
        .then(data => data.user)
        .catch(error => console.log(error.message))
    }, [])
    
    return (
        <View>
            <Text></Text>
        </View>
    )
}
