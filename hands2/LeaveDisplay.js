import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
  Dimensions,
  StatusBar,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

const CREDENTIALS = require('../Credentials.json');

export function LeaveDisplayScreen(){

  const [refreshing, setRefreshing] = useState(false);
  const [data, setData] = useState(null);

  useFocusEffect(
      useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          const user = await AsyncStorage.getItem('user');
          let u = JSON.parse(user);

          if (isActive) {
            fetch(CREDENTIALS.API.link + '?q=' + u.name)
            .then((response) => response.json())
            .then((data) => {
              setData(data);
            })
          }
        } catch (e) {
          // Handle error
          console.warn(e.message)
        }
      };

      fetchUser();

      return () => {
        isActive = false
      };
    }, [data])
  );

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  const renderForm = () => {
    const fields = [];
    if(data != null){
      for (let i=0; i < data.data.length; i++) {
        let num = i+1;
        let date = new Date(data.data[i][2]);
        fields.push(
          <View key={i} style={styles.formContainer}>
            <View style={{flexDirection: 'row'}}>
              <View><Text style={{fontSize:16, fontWeight:'bold'}}>{num}. </Text>
              </View>
                <Text>{"Date: " + date.toLocaleDateString() + `\nTime: ` + data.data[i][3] + `\nReason: ` + data.data[i][4]}</Text>
             </View>
           </View>
        );
      }
    }
    return fields;
  }

  return(
    <View style={styles.container}>
    <StatusBar barStyle="light-content" />
    <ScrollView contentContainerStyle={styles.contentContainer}>
      {data == null ? (
        <View style={styles.activity}><ActivityIndicator size="large" color="black" /></View>
      ):(
        <View>
          <Text style={[styles.title, {alignSelf: 'center'}]}>My Applied Leave History</Text>
          {renderForm()}
        </View>
      )}
    </ScrollView>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    width: Dimensions.get('screen').width / 1.13,
    height: Dimensions.get('screen').height,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
  },
  activity: {
    alignSelf:'center',
    justifyContent:'center',
    height: Dimensions.get('screen').height
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    padding: 20
  },
  formContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderWidth: 1,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    width: Dimensions.get('screen').width/1.13,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginTop:10,
    marginBottom:10
  },
})
