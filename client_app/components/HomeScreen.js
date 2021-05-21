import React, { Component } from 'react'
import { TextInput, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native'
import { ListItem, Avatar, Header, SearchBar, Button } from 'react-native-elements'
import axios from 'axios';
import {API_URL} from '@env'

export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            contactData: [],
            formFields: [],
            searchInput: '',
            sortListBoolean: false,
            isLoading: false,
        }
    }

    componentDidMount(){
        this.getData();
    }

    getData = () => {
        this.setState({isLoading: true});
        axios.get(`${API_URL}`)
        .then(data => {
          this.setState({contactData: data.data.contacts}),
          this.setState({formFields: Object.keys(Object.assign({}, ...data.data.contacts))})
          this.setState({isLoading: false});
        })
        .catch(error => {
          console.log(error.message);
        })

    }

    renderContacts = ({item}) => {
        return(
            <ListItem bottomDivider onPress={() => this.props.navigation.navigate('Contact', {itemId:item._id})}>
            <Avatar rounded source={{uri: item.profile_img || null}} />
            <ListItem.Content>
              <ListItem.Title>{item.first_name}</ListItem.Title>
              <ListItem.Subtitle>{item.subtitle}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
          );
    }

    filterContacts = () => {
        if(this.state.searchInput != ''){
            return this.state.contactData.filter(item => item.first_name.toLocaleLowerCase().includes(this.state.searchInput.toLocaleLowerCase()));
        } else {
            return this.state.contactData
        }
    }

    sortContactsByNameAscending = () =>{
        this.state.contactData.sort((a, b) =>  a.first_name.localeCompare(b.first_name))
        this.setState({sortListBoolean: false})
      }
    
      sortContactsByNameDescending = () =>{
        this.state.contactData.sort((a, b) =>  b.first_name.localeCompare(a.first_name))
        this.setState({sortListBoolean: true})
      }

      sortByAlphabeticall = () => {
        if(this.state.sortListBoolean){
          this.sortContactsByNameAscending()
        } else {
          this.sortContactsByNameDescending()
        }
      }
    render() {
        return (
            <View style={styles.container}>
              <Header
                leftComponent={{ icon: 'menu', color: '#fff' }}
                centerComponent={{ text: 'Contacts', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
              />
              <View style={{ flexDirection:"row" }}>
                <View style={styles.buttonStyle}>
                  <Button 
                      type="clear" 
                      title="Form" 
                      onPress={() => this.props.navigation.navigate('Form', {userData: this.state.formFields})} />
                </View>
                <View style={styles.buttonStyle}>
                  <Button type="clear" title="Sort" onPress={() => this.sortByAlphabeticall()}/>
                </View>
              </View>
              <SearchBar
                  placeholder="Type Here..."
                  lightTheme={true}
                  round={true}
                  onChangeText={value => this.setState({searchItem: value})}
                  value={this.state.searchItem}
              />
              <FlatList 
                  data={this.filterContacts()} 
                  renderItem={this.renderContacts}  
                  keyExtractor={item => item._id.toString()}
                  refreshing={this.state.isLoading}
                  onRefresh={this.getData}
              />
              <StatusBar style="auto" />
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    searchInput: {
      fontSize: 16
    },
    buttonStyle: {
      flex:1
    }

})