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
import { MaterialCommunityIcons } from '@expo/vector-icons';

const CREDENTIALS = require('../Credentials.json');

export function LeaveFormScreen({ navigation }){

  const initialStates = {
    dates: [new Date()],
    times: [new Date()],
    form: 0,
    reasons: [],
    days: 1,
    showForm: false
  }

  const [dates, setDates] = useState([new Date()]);
  const [times, setTimes] = useState([new Date()]);
  const [mode, setMode] = useState('date');
  const [shows, setShows] = useState([false, false]);
  const [form, setForm] = useState(0);
  const [reasons, setReasons] = useState([]);
  const [days, setDays] = useState(1);
  const [showForm, setShowForm] = useState(false);
  const [user, setUser] = useState([]);

  useEffect(() => {
    try{
      AsyncStorage.getItem('user').then((user) => {
        setUser(JSON.parse(user));
      });
    }catch(e){
      alert(e.message)
    }
  }, []); // <-- Have to pass in [] here!

  const onChange1 = (event, selectedDate) => {
    const currentDate = selectedDate || dates[form];
    setShows({
      ...shows,
      0: false
    });
    setDates({
      ...dates,
      [form]: currentDate,
    });
    setTimes({
      ...times,
      [form]: currentDate,
    });
  };

  const onChange2 = (event, selectedDate) => {
    const currentDate = selectedDate || times[form];

    if(currentDate < dates[form]){
      Alert.alert('Unavailable Time','Please choose wisely');
    }else{
      setShows({
        ...shows,
        1: false
      });
      setTimes({
        ...times,
        [form]: currentDate
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
    if(reasons[form] == null || reasons[form] == "" ){
      alert('Please state your reason correctly')
    }else{
      if(form == days - 1){
        setShowForm(false)
        setForm(form + 1);
        setDates({
          ...dates,
          [form + 1]: new Date(),
        });
        setTimes({
          ...times,
          [form + 1]: new Date(),
        });
      }
      else{
        setForm(form + 1);
        setDates({
          ...dates,
          [form + 1]: new Date(),
        });
        setTimes({
          ...times,
          [form + 1]: new Date(),
        });
      }
    }
  }

  const submitForm = () => {
    let d = [];
    let r = [];
    let t = [];
    let u = [];
    for( let i = 0; i < form; i++){
      u[i] = user.name
      d[i] = dates[i];
      t[i] = dates[i].toLocaleTimeString().slice(0,5) + ' - ' + times[i].toLocaleTimeString().slice(0,5);
      r[i] = reasons[i];
    }
    try{
      fetch(CREDENTIALS.API.link,{
        method:'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          Name: u,
          Date: d,
          Time: t,
          Reason: r
        })
      })
      .then(async response => {
        const data = await response.json();

        if(response.ok){
          setDays(initialStates.days);
          setForm(initialStates.form);
          setShowForm(initialStates.showForm);
          setDates(initialStates.dates);
          setTimes(initialStates.times);
          setReasons(initialStates.reasons);

          alert('Leave Applied! Please check at your history!');
        }else{
          const error = (data && data.message) || response.status;
          return Promise.reject(error);
        }
      })
    }catch(e){
      alert(e.message)
    }
  }

  const renderClass = () => {
    const fields = [];
    for (let i=0; i < form; i++) {
        let num = i+1;
        fields.push(
          <View key={i} style={{flex:1}}>
            <View style={{flex:1, flexDirection: 'row'}}>
              <View style={{justifyContent:'center'}}><Text style={{fontSize:16, fontWeight:'bold'}}>{num}.</Text>
              </View>
              <TextInput
                style={styles.DateTimeInput}
                editable={false}
                value={dates[i].toLocaleDateString()}
              />
              <TextInput
                style={styles.DateTimeInput}
                editable={false}
                value={dates[i].toLocaleTimeString().slice(0,5) + ' - ' + times[i].toLocaleTimeString().slice(0,5)}
              />
             </View>
             <View style={{flex:1, flexDirection: 'row'}}>
               <TextInput
                 style={styles.ReasonInput}
                 editable={false}
                 value={reasons[i]}
               />
               <TouchableOpacity
                 style={{justifyContent:'center'}}
                 onPress={()=>alert('function')}
               >
                 <MaterialCommunityIcons name="content-save-edit-outline" color="green" size={26} />
               </TouchableOpacity>
             </View>
           </View>
        );
    }
    return fields;
  }

  return (
      <View style={styles.container}>
        <ScrollView>
        <StatusBar barStyle="light-content" />
        <View style={[styles.action, { alignItems: "center" }]} >
          <Image source={require('../assets/handsLogo.jpg')} style={styles.logo} />
          <Text style={styles.actionTxt}>Hands 2 Leave Application</Text>
        </View>
        {/*Edit Form View*/}
        <View style={[styles.action, { alignItems: "flex-start" }]}>
          <Text style={styles.title}>Leave Application Form</Text>
          <Text>Kindly select the date, time and state reason for leave that you'll be absent.</Text>
          <Text style={styles.title}>How many days to be absent:</Text>
          <View style={{flexDirection:'row'}}>
            <Picker
              selectedValue={days}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                setDays(itemValue)
              }>
              {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24].map(i => (
                  <Picker.Item key={i} label={i.toString()} value={i} />
              ))}
            </Picker>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setShowForm(true)}
              style={styles.appButtonContainer}
            >
              <Text style={styles.appButtonText}>Done</Text>
            </TouchableOpacity>
          </View>
            {showForm &&
              <View style={{flex:1}}>
                <View style={styles.formContainer}>
                <Text style={styles.title}>Leave Application {form + 1}</Text>
                <Text style={styles.title}>Select your date here:</Text>
                <TouchableOpacity
                  activeOpacity={0.8}
                  onPress={showDatepicker}
                  style={styles.appButtonContainer}
                >
                  <Text style={styles.appButtonText}>{dates[form].toLocaleDateString()}</Text>
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
                    >{dates[form].toLocaleTimeString().slice(0,5)}</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={() => showTimepicker(1)}
                    style={styles.appButtonContainer}
                  >
                    <Text style={styles.appButtonText}>{times[form].toLocaleTimeString().slice(0,5)}</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.title}>State your reason here:</Text>
                <TextInput
                  style={styles.txtInput}
                  multiline
                  maxLength={40}
                  placeholder="State your reasons here..."
                  onChangeText={text => setReasons({...reasons, [form]: text})}
                  value={reasons[form]}
                />
                </View>
                <View style={styles.footer}>
                  { form == days - 1 ? (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={addForm}
                      style={styles.appButtonContainer}
                    >
                      <Text style={styles.appButtonText}>Done</Text>
                    </TouchableOpacity>
                  ): (
                    <TouchableOpacity
                      activeOpacity={0.8}
                      onPress={addForm}
                      style={styles.appButtonContainer}
                    >
                      <Text style={styles.appButtonText}>Add</Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            }
            {shows[0] && (
              <DateTimePicker
                testID="DateTimePicker1"
                value={dates[form]}
                mode={mode}
                is24Hour={false}
                display="spinner"
                onChange={onChange1}
              />
            )}
            {shows[1] && (
              <DateTimePicker
                testID="DateTimePicker2"
                value={times[form]}
                mode={mode}
                is24Hour={false}
                display="spinner"
                onChange={onChange2}
              />
            )}
        </View>
        {/*Display Form View*/}
        {form == 0 ? (<View></View>):
          <View style={styles.action}>
            <Text style={styles.title}>Applied Leave</Text>
              {renderClass()}
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={submitForm}
                style={styles.appButtonContainer}
              >
                <Text style={[styles.appButtonText,{width: Dimensions.get('screen').width/1.13}]}>Submit</Text>
              </TouchableOpacity>
          </View>
        }
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
      textAlign:'center'
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
  },
  txtDaysInput: {
    height: 40,
    width: Dimensions.get('screen').width/2,
    borderColor: 'gray',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 10,
    fontSize: 16,
    margin: 10
  },
  footer: {
    width: Dimensions.get('screen').width/1.13,
    flex:1,
    flexDirection: 'row',
    justifyContent:'flex-end'
  },
  DateTimeInput: {
    height: 40,
    width: Dimensions.get('screen').width/2.8,
    borderColor: 'black',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5,
    margin: 5,
    color: 'black',
    textAlign: 'center'
  },
  ReasonInput: {
    height: 80,
    width: Dimensions.get('screen').width/1.35,
    borderColor: 'black',
    borderWidth: 1,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
    padding: 5,
    marginLeft:18,
    margin: 5,
    color: 'black'
  },
});
