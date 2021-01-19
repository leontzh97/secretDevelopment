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
import AsyncStorage from '@react-native-async-storage/async-storage';

export class Me extends Component {

  constructor(props){
    super(props);

    this.state = {
      navigation: props.navigation,
      user: {},
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('user').then((user) => {
      this.setState({
        user: JSON.parse(user)
      });
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableHighlight
              style={styles.logoImgContainer}>
            <Image
            source={require('./assets/unknown.png')}
            style={styles.logo}
            resizeMode="contain"
            />
          </TouchableHighlight>
          <Text style={styles.personalDetails}>
            {this.state.user.name}
          </Text>
        </View>
        <View style={styles.footer}>
        <TouchableOpacity onPress={() => alert('Password page')}>
          <View style={[styles.button,{borderTopWidth:1}]}>
            <Text style={styles.buttonText}>
              <MaterialCommunityIcons name="security" size={20} color="white"/>
              Change Password
            </Text>
          </View>
        </TouchableOpacity>
          <TouchableOpacity onPress={() => alert('Membership page')}>
            <View style={styles.button}>
              <Text style={styles.buttonText}>
                <MaterialCommunityIcons name="account" size={20} color="white"/>
                Membership
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.state.navigation.navigate('GoogleLogin', {
            screen: 'GoogleLogin'
          })}>
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
    marginLeft: 8,
    height: height_logo,
    width: height_logo,
    borderRadius: 60,
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
