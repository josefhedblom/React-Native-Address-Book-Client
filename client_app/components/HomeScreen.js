import React, { Component } from 'react'
import { Text, View } from 'react-native'
import axios from 'axios';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            contactData: []
        }
    }

    componentDidMount(){
        axios.get("http://000.000.0.00:5000") /* ADD IP-ADDRESS TO ENV FILE */
        .then(response => {
            this.setState({contactData: response.data});
        })
        .catch(error => {
            console.log(error.message);
        })
    }
    render() {
        return (
            <View>
                <Text> HomeScreen </Text>
            </View>
        )
    }
}
