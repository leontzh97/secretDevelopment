import React, { useState } from 'react';
import { Button, View, StyleSheet, Text , TextInput, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MyTabs } from './Home';

function LoginScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={require('./assets/hands_logo.png')} />
        <View style={styles.inputView} >
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#696969"
            />
        </View>
        <View style={styles.inputView} >
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#696969"
            />
        </View>
        <TouchableOpacity
          style={styles.loginBtn}
          onPress={() => navigation.navigate('MyTabs', {
            screen: 'MyTabs'
          })}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      </View>
    );
}

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
      <Stack.Screen name="MyTabs" component={MyTabs} options={{headerShown: false}} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
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
  inputView:{
    width:"80%",
    backgroundColor:"#ffffff",
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius:25,
    height:30,
    marginBottom:20,
    justifyContent:"center",
    padding:20
  },
  inputText:{
    height:50,
    color:"black"
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
