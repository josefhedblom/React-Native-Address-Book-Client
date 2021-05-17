import React, { Component } from 'react'
import { TextInput, View, Button, FlatList, StyleSheet, Text } from 'react-native'
import axios from 'axios';
import {API_URL} from '@env'

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
        axios.get(`${API_URL}`)
        .then(response => {
            this.setState({contactData: response.data});
        })
        .catch(error => {
            console.log(error.message);
        })
    }

    renderContacts = ({item}) => {
        return(
            <View>
              <Text style={styles.listItem}>{item.first_name}</Text>
            </View>
          );
    }

    filterContacts = () => {
        if(this.state.searchInput != ''){
            return this.state.contactData.filter(item => item.first_name.toLocaleLowerCase().includes(this.state.searchInput.toLocaleLowerCase()));
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
            <View style={styles.container}>
                <View style={{marginBottom:20}}>
                    <TextInput style={styles.searchInput} placeholder="Serach" onChangeText={value => this.setState({searchInput: value})}/>
                </View>
                <View>
                    <Button title="Form" />
                </View>
                <View>
                    <Button title="Sort" onPress={() => this.sortByAlphabeticall()}/>
                </View>
                <FlatList 
                    data={this.filterContacts()}
                    renderItem={this.renderContacts}
                    keyExtractor={item => item._id.toString()}
                />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 100
    },
      listItem: {
        backgroundColor: 'pink',
        width: 300,
        padding: 20,
        margin: 10,
        fontSize:20
      },
      searchInput: {
        fontSize: 16
      }

})