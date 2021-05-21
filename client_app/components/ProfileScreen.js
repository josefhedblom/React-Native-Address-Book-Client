import React from 'react';
import { useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { ListItem, Avatar, Card  } from 'react-native-elements';
import { API_URL } from '@env';
import '../helpers/StingHelper';

export default function ProfileScreen({ route }) {
    const { contactId } = route.params;
    const [contactData, setContactData] = useState([]);

    useEffect(() => {
        fetch(`${API_URL}/${contactId}`)
        .then(response => response.json())
        .then(data => setContactData(data.user))
        .catch(error => console.log(error.message))
    }, [])

    function contactHeader(){
        return (
            <React.Fragment>
                <View style={styles.contact_header}>
                    <Avatar rounded source={{ uri: contactData.profile_img || null }} />
                </View>
                <Card.Title >{contactData.first_name} {contactData.last_name}</Card.Title>
                <Card.Divider/>
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
                              <ListItem.Title>{field.titleize()}: {contactData[`${field}`]}</ListItem.Title>
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
                <Card>
                    {contactHeader()}
                    {contactBody()}
                </Card>
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
