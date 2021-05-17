import React, { Component } from 'react'
import { Text, View } from 'react-native'
import axios from 'axios';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            contactData: [],
            searchInput: '',
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

    filterContacts = () => {
        if(this.state.searchInput != ''){
            return this.state.contactData.filter(contact => contact.first_name.toLocaleLowerCase().includes(this.state.searchInput.toLocaleLowerCase()));
        } else {
            return this.state.contactData
        }
    }
    render() {
        return (
            <View>
                <Text> HomeScreen </Text>
            </View>
        )
    }
}
