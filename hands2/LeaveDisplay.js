import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  RefreshControl,
  ScrollView,
  Dimensions,
  StyleSheet,
} from 'react-native';

export function LeaveDisplayScreen(){

  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    // Runs ONCE after initial rendering
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, []);

  const wait = (timeout) => {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }

  return(
    <View style={styles.container}>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
      <View>
        <Text>My Applied Leave History</Text>
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
  }
})
