import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

export function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        title="Login"
        onPress={() => navigation.navigate('MyTabs', {
          screen: 'MyTabs'
        })}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
