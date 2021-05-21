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
                <View style={styles.contact_header}>
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
                        <ListItem style={styles.profile}>
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
        <ScrollView>
            <View style={styles.main}>
              {/* Card with contactHeader and contactBody */}
            </View>
      </ScrollView>
    )
}

const styles = StyleSheet.create({
    main: {
        flex: 1, 
        height: '100%', 
        marginBottom:50, 
        marginTop: 10
    },
    profile: {
        margin: 5,
    },
    contact_header: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: 10,
        marginBottom: 30
    }
})
