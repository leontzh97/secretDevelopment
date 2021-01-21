import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export class LeaveFormScreen extends Component {

  constructor(props){
    super(props);

    this.state = {
      accessToken: '',
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('accessToken').then((token) => {
      this.setState({
        accessToken: token
      });
    });
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>LeaveForm</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
