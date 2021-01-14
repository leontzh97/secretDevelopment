import React from 'react';
import { StyleSheet, Button, Text, View } from 'react-native';

export function Me({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>My Personal</Text>
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login', {
          screen: 'Login'
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
