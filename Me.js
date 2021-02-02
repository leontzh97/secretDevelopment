import React, { Component } from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Dimensions,
  Image,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CREDENTIALS = require('./Credentials.json');

export class Me extends Component {

  constructor(props){
    super(props);

    this.state = {
      navigation: props.navigation,
      user: {},
      accessToken: '',
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then((user) => {
      this.setState({
        user: JSON.parse(user),
      });
    });
    AsyncStorage.getItem('accessToken').then((token) => {
      this.setState({
        accessToken: token
      });
    });
  }

  signOutWithGoogleAsync = async() => {
    try {
      let token = this.state.accessToken;
      const result = await Google.logOutAsync({
        androidClientId: CREDENTIALS.credentials.androidClientId,
        iosClientId: CREDENTIALS.credentials.iosClientId,
        accessToken: token,
      });

      if (result.status === 200) {
        try{
          AsyncStorage.getAllKeys().then(keys => AsyncStorage.multiRemove(keys));
          this.state.navigation.navigate('GoogleLogin', {
            screen: 'GoogleLogin'
          });
        } catch(e){
          console.warn(e.message);
        }
      } else {
        console.warn(result);
      }
    } catch (e) {
      return { error: true };
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight
              style={styles.logoImgContainer}>
            <Image
            source={this.state.user === null ? require('./assets/unknown.png') : {uri: this.state.user.photoUrl}}
            style={styles.logo}
            resizeMode="contain"
            />
          </TouchableHighlight>
          <Text style={styles.personalDetails}>
            {this.state.user === null ? 'Guest' : this.state.user.name}
          </Text>
        </View>
        <View style={styles.footer}>
        <TouchableOpacity onPress={() => alert('Achivements page')}>
          <View style={[styles.button,{borderTopWidth:1}]}>
            <Text style={styles.buttonText}>
              <MaterialCommunityIcons name="trophy" size={20} color="white"/>
              Achivements
            </Text>
          </View>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('My training page')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                <MaterialCommunityIcons name="account" size={20} color="white"/>
                My Training
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.state.accessToken === null ? this.state.navigation.navigate('GoogleLogin', {
            screen: 'GoogleLogin'
          }) : this.signOutWithGoogleAsync()}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                <MaterialCommunityIcons name="logout" size={20} color="white"/>
                Logout
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.13;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer:{
    flex:2,
    backgroundColor: '#b22222',
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    paddingVertical:50,
    paddingHorizontal:10
  },
  logo:{
    width: height_logo,
    height: height_logo,
    borderRadius:60
  },
  logoImgContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height_logo,
    width: height_logo,
    borderRadius:60,
    overflow:'hidden',
    borderColor: 'black',
    borderWidth:2
  },
  personalDetails:{
    fontSize: 20,
    fontWeight:'bold',
  },
  button: {
   alignItems: 'flex-start',
   justifyContent: 'center',
   borderColor:'white',
   borderBottomWidth:1,
 },
 buttonText: {
   textAlign: 'left',
   padding: 20,
   color: 'white',
   fontWeight:'bold'
 }
});
