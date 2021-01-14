import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export function MySubscriptions() {
  return (
    <View style={styles.container}>
      <Text>My Subscriptions</Text>
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
