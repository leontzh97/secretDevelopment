import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
} from 'react-native';
import * as Google from 'expo-google-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CREDENTIALS = require('./Credentials.json');

export class GoogleLogin extends Component{
  constructor(props){
    super(props);

    this.state = {
      navigation: props.navigation,
      user: {},
      accessToken: '',
      loaded: false
    }
  }

  signInWithGoogleAsync = async() => {
    try {
      const result = await Google.logInAsync({
        androidClientId: CREDENTIALS.credentials.androidClientId,
        iosClientId: CREDENTIALS.credentials.iosClientId,
        scopes: ['profile', 'email'], //The scopes to ask for from Google for this login
      });

      if (result.type === 'success') {
        try{
          let user = JSON.stringify(result.user);
          await AsyncStorage.setItem('accessToken', result.accessToken);
          await AsyncStorage.setItem('user', user);
          this.props.navigation.navigate('MyTabs', {
            screen: 'MyTabs'
          });
        } catch(e){
          console.warn(e.message);
        }
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  }

  render(){
    return(
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./assets/hands_logo.png')} />
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.signInWithGoogleAsync()}>
          <Text style={styles.loginText}>GOOGLE LOGIN</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => this.state.navigation.navigate('MyTabs', {
            screen: 'MyTabs'
          })}>
          <Text style={styles.loginText}>GUEST LOGIN</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    height: 80,
    width: 250,
    marginBottom: 60,
  },
  loginBtn:{
    width:"80%",
    backgroundColor:"#b22222",
    borderRadius:25,
    height:50,
    alignItems:"center",
    justifyContent:"center",
    marginTop:40,
    marginBottom:10
  },
  loginText:{
    color:"white"
  }
});
