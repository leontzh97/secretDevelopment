import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  Dimensions,
  Image,
  TouchableOpacity,
  Alert,
  Picker,
  TextInput,
  ScrollView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

export function LeaveFormScreen(){

  /*useEffect(() => {
    fetch('https://raw.githubusercontent.com/adhithiravi/React-Hooks-Examples/master/testAPI.json')
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);*/
  const initialValues = {
    dates: [new Date(),new Date()],
    reason: ['MC'],
  };

  const [dates, setDates] = useState([new Date(),new Date()]);
  const [mode, setMode] = useState('date');
  const [shows, setShows] = useState([false, false]);
  const [form, setForm] = useState(0);
  const [reason, setReason] = useState('MC');

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || dates[0];
    setShows({
      ...shows,
      0: false
    });
    setDates({
      ...dates,
      0: currentDate,
      1: currentDate
    });
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || dates[1];
    if(currentDate < dates[0]){
      Alert.alert('Unavailable Time','Please choose wisely');
    }else{
      setShows({
        ...shows,
        1: false
      });
      setDates({
        ...dates,
        1: currentDate
      });
    }
  };

  const showMode = (val, currentMode) => {
    setShows({
      ...shows,
      [val]: true
    });
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode(0, 'date');
  };

  const showTimepicker = (val) => {
    showMode(val, 'time');
  };

  const addForm = () => {
    setForm(form + 1);
  }

  const clearForm = () => {
    setDates({
      ...initialValues.dates
    });
    setReason(...initialValues.reason);
  }

  return (
      <View style={styles.container}>
        <ScrollView>
        <StatusBar barStyle="light-content" />
        <View style={[styles.action, { alignItems: "center" }]} >
          <Image source={require('../assets/handsLogo.jpg')} style={styles.logo} />
          <Text style={styles.actionTxt}>Hands 2 Leave Application</Text>
        </View>
        <View style={[styles.action, { alignItems: "flex-start" }]}>
          <Text style={styles.title}>Leave Application Form</Text>
          <Text>Kindly select the date, time and state reason for leave that you'll be absent.</Text>
            <View style={styles.formContainer}>
              <Text style={styles.title}>Select your date here:</Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={showDatepicker}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}>{dates[0].toLocaleDateString()}</Text>
              </TouchableOpacity>
              <Text style={styles.title}>Select your time here:</Text>
              <View style={{ flex: 1, flexDirection: 'row'}}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => showTimepicker(0)}
                  style={styles.appButtonContainer}
                >
                  <Text
                    style={styles.appButtonText}
                  >{dates[0].toLocaleTimeString().slice(0,5)}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={() => showTimepicker(1)}
                  style={styles.appButtonContainer}
                >
                  <Text style={styles.appButtonText}>{dates[1].toLocaleTimeString().slice(0,5)}</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.title}>State your reason here:</Text>
              {reason == 'MC' || reason == 'Work' || reason == 'EL' ? (
                <Picker
                  selectedValue={reason}
                  style={styles.picker}
                  onValueChange={(itemValue, itemIndex) =>
                    setReason(itemValue)
                  }>
                  <Picker.Item label="MC" value="MC" />
                  <Picker.Item label="Work" value="Work" />
                  <Picker.Item label="Emergency Leave" value="EL" />
                  <Picker.Item label="Others" value="others" />
                </Picker>
              ): (
                <TextInput
                  style={styles.txtInput}
                  multiline
                  maxLength={40}
                  editable={reason == 'MC' || reason == 'Work' || reason == 'EL' ? false : true}
                  placeholder="State your others reason here"
                  onChangeText={text => setReason(text)}
                  value={reason == 'others' ? '': reason}
                />
              )
              }
            </View>
            <View style={{width: Dimensions.get('screen').width/1.13, flex:1, flexDirection: 'row', justifyContent:'flex-end'}}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={clearForm}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}>Clear</Text>
              </TouchableOpacity>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={addForm}
                style={styles.appButtonContainer}
              >
                <Text style={styles.appButtonText}>Add</Text>
              </TouchableOpacity>
            </View>
            {shows[0] && (
              <DateTimePicker
                testID="DateTimePicker1"
                value={dates[0]}
                mode={mode}
                is24Hour={false}
                display="spinner"
                onChange={onChange1}
              />
            )}
            {shows[1] && (
              <DateTimePicker
                testID="DateTimePicker2"
                value={dates[1]}
                mode={mode}
                is24Hour={false}
                display="spinner"
                onChange={onChange2}
              />
            )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  action: {
    width: Dimensions.get('screen').width,
    padding: 20,
  },
  actionTxt: {
    fontSize: 20,
    padding: 10
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 100 / 2
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  appButtonContainer: {
      elevation: 8,
      backgroundColor: "#b22222",
      borderRadius: 10,
      paddingVertical: 10,
      paddingHorizontal: 12,
      margin: 10
  },
  appButtonText: {
      fontSize: 18,
      color: "#fff",
      fontWeight: "bold",
      alignSelf: "center",
  },
  picker: {
    height: 50,
    width: Dimensions.get('screen').width/2,
  },
  txtInput: {
    height: 70,
    width: Dimensions.get('screen').width/1.3,
    borderColor: 'gray',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    fontSize: 16,
    margin: 10
  }
});
