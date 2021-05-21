import React from 'react';
import { useEffect, useState } from 'recat';
import { View, Text, StyleSheet } from 'react-native';
import { API_URL } from '@env';

export default function ProfileScreen() {

    const [contactData, setContactData] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/${itemId}`)
        .then(response => response.json())
        .then(data => setContactData(data.user))
        .catch(error => console.log(error.message))
    }, [])

    function contactHeader(){
        return (
            <React.Fragment>
                <View>
                    {/* Avatar */}
                </View>
                {/* Card title Card divider */}
            </React.Fragment>
        )
    }

    function contactBody(){
        return Object.keys(contactData).map((field, index) => {
            if(`${field}` != '_id' && `${field}` != 'profile_img' && `${field}` != '__v'){
                return(
                    <React.Fragment key={index}>
                        <ListItem>
                            <ListItem.Content >
                              <ListItem.Title>{field}: {contactData[`${field}`]}</ListItem.Title>
                            </ListItem.Content>
                        </ListItem>
                        <Card.Divider/>
                    </React.Fragment>
                   )
            }
        })
    }

    return (
        <View>
            <Text></Text>
        </View>
    )
}
