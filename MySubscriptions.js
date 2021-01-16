import React from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import {
  Card,
  Icon,
} from 'react-native-elements';

import CardMedia from 'react-native-card-media';

const path = 'https://raw.githubusercontent.com/dondoko-susumu/react-native-card-media-example/master/media/';
const files1 = [
  `${path}kids_play_640.jpeg`,
];

export function MySubscriptions() {
  return (
    <View style={styles.scene}>
      <ScrollView>
        <View style={styles.container}>
          <Card style={styles.cardStyle}>
            <CardMedia
              style={{ height: 200 }}
              title="Title"
              titleStyle={{ fontSize: 24, fontWeight: '400', lineHeight: 32, color: '#fafafa' }}
              files={files1}
              onPress={() => alert('Clicked')}
            />
            <Card.Divider>
            <Text>Multiple image component for React Native</Text>
            </Card.Divider>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scene: {
    marginTop: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  cardStyle: {
    width: 320,
  },
});
