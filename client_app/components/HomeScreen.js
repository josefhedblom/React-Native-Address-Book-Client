import React, { Component } from 'react'
import { TextInput, View, Button, FlatList, StyleSheet } from 'react-native'
import axios from 'axios';

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            contactData: [],
            searchInput: '',
            sortListBoolean: false,
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

    renderContacts = ({contact}) => {
        return(
            <View>
              <Text style={styles.listItem}>{contact.first_name}</Text>
            </View>
          );
    }

    filterContacts = () => {
        if(this.state.searchInput != ''){
            return this.state.contactData.filter(contact => contact.first_name.toLocaleLowerCase().includes(this.state.searchInput.toLocaleLowerCase()));
        } else {
            return this.state.contactData
        }
    }

    sortByAlphabeticall = () => {
        if(this.state.sortListBoolean){
          this.state.contactData.sort((a, b) =>  a.first_name.localeCompare(b.first_name))
          this.setState({sortListBoolean: false})
        } else {
          this.state.contactData.sort((a, b) =>  b.first_name.localeCompare(a.first_name))
          this.setState({sortListBoolean: true})
        }
    }
    render() {
        return (
            <View>
                <View>
                    <TextInput placeholder="Serach" onChangeText={value => this.setState({searchInput: value})}/>
                </View>
                <View>
                    <Button title="Form" />
                </View>
                <View>
                    <Button title="Sort" />
                </View>
                <FlatList 
                    data={this.filterContacts()}
                    renderItem={this.renderContacts}
                    keyExtractor={contact => contact._id.toString()}
                />
            </View>
        )
    }
};

const styles = StyleSheet.create({})