import React, { Component } from 'react'
import { StyleSheet, View, TextInput, Button } from 'react-native'
import axios from 'axios';
import {API_URL} from '@env'

export default function FormScreen() {
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
            if(response.status === 200) {
                console.log('response', response);
            }
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputField}>
                <TextInput placeholder="First Name" onChangeText={value => this.setState({first_name: value})}/>
            </View>
            <View style={styles.inputField}>
                <TextInput placeholder="Last Name"  onChangeText={value => this.setState({last_name: value})}/>
            </View>
            <View style={styles.inputField}>
                <TextInput placeholder="Email"      onChangeText={value => this.setState({email: value})}/>
            </View>
            <View style={styles.inputField}>
                <TextInput placeholder="Phone"      onChangeText={value => this.setState({phone: value})}/>
            </View>
            <View style={styles.inputField}>
                <TextInput placeholder="Address"    onChangeText={value => this.setState({address: value})}/>
            </View>
            <View style={styles.inputField}>
                <TextInput placeholder="City"       onChangeText={value => this.setState({city: value})}/>
            </View>
            <View style={styles.inputField}>
                <TextInput placeholder="Country"    onChangeText={value => this.setState({country: value})}/>
            </View>
            <View style={styles.inputField}>
                <Button onPress={this.addContact} title="Add Contact"/>
            </View>
        </View>
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
      fontSize:20
    }
});
