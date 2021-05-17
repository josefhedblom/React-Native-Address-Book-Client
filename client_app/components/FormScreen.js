import React, { Component } from 'react'
import { Text, View } from 'react-native'
import axios from 'axios';

export default class FormScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            address: '',
            city: '',
            zipCode: '',
            country: '',
        }
    }
    render() {
        return (
            <View>
                <Text> textInComponent </Text>
            </View>
        )
    }
}
