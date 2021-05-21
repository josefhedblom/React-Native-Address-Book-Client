import React from 'react'
import { StyleSheet, View, TextInput, Button, SafeAreaView, ScrollView} from 'react-native'
import axios from 'axios';
import {API_URL} from '@env'

export default function FormScreen({ route, navigation }) {
    const { userData } = route.params;
    const state = {
        first_name: '',
        last_name: '', 
        email: '', 
        phone: '', 
        address: '', 
        city: '', 
        zipCode: '', 
        country: '', 
        profile_img: ''
    }
    function addContact(){
        axios.post(`${API_URL}/add`,state)
        .then(response => {
            if(response.status === 200) console.log('response', response)
        })
        .catch(error => console.log(error.message))

        goHome();
    }

    function goHome(){
        navigation.navigate('Home');
    }

    function contactForm(){
        return userData.map((field, index) =>{
            if(`${field}` != '_id' && `${field}` != 'profile_img' && `${field}` != '__v' ){
                return(
                    <View key={index} style={styles.inputTextField}>
                        <TextInput
                            placeholder={`${field}`} 
                            onChangeText={(value) => state[field] = value}
                        />
                    </View>
                )
            }
        })

    }

    return (
        <SafeAreaView>
            <ScrollView>
            <View style={styles.container}>
                <View style={styles.inputField}>
                    {contactForm()}
                    <Button onPress={() => {addContact();}} title="Add Contact"/>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
        )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputField: {
      width: 300,
      padding: 20,
      margin: 10,
      fontSize:20,
    },
    inputTextField: {
      width: '90%',
      padding: 20,
      margin: 10,
      fontSize:20,
      backgroundColor:'white',
      borderRadius:5
    }
});
