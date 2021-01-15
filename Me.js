import React from 'react';
import {
  StyleSheet,
  Button,
  Text,
  View,
  Dimensions
} from 'react-native';

export function Me({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
      </View>
      <View style={styles.footer}>
        <Text>My Personal</Text>
        <Button
          title="Logout"
          onPress={() => navigation.navigate('Login', {
            screen: 'Login'
          })}
        />
      </View>
    </View>
  );
}

const {height} = Dimensions.get("screen");
const height_logo = height * 0.28;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header:{
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footer:{
    flex:1,
    backgroundColor: 'red',
    borderTopLeftRadius: 30,
    borderTopRightRadius:30,
    paddingVertical:50,
    paddingHorizontal:30
  },
  logo:{
    width: height_logo,
    height: height_logo
  }
});
