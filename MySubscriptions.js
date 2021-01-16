import React, { Component } from 'react';
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

const files2 = [
  `${path}kids_play_640.jpeg`,
  `${path}sea_kids_640.jpeg`,
];

const files3 = [
  `${path}kids_play_640.jpeg`,
  `${path}temple_640.jpeg`,
  `${path}road_640.jpg`,
];

export class MySubscriptions extends Component<{}> {

  onPress() {
    Alert.alert('onPress');
  }

  render() {
    return (
      <View style={styles.scene}>
        <ScrollView>
          <View style={styles.container}>
            <Card>
              <CardMedia
                style={{ height: 200 }}
                title="Elementary Class"
                titleStyle={{ fontSize: 24, fontWeight: '400', lineHeight: 32, color: '#fafafa' }}
                files={files1}
                onPress={() => this.onPress()}
              />
              <Card.Divider style={styles.cardStyle}>
                <Text>
                  For elementary players in drumming lessons
                </Text>
              </Card.Divider>
            </Card>
            <Card>
              <CardMedia
                style={{ height: 200 }}
                title="Intermediate Class"
                titleStyle={{ fontSize: 24, fontWeight: '400', lineHeight: 32, color: '#fafafa' }}
                files={files2}
                onPress={() => this.onPress()}
              />
              <Card.Divider style={styles.cardStyle}>
                <Text>
                  For intermediate players in drumming lessons
                </Text>
              </Card.Divider>
            </Card>
            <Card>
              <CardMedia
                style={{ height: 200 }}
                title="Advance Class"
                titleStyle={{ fontSize: 24, fontWeight: '400', lineHeight: 32, color: '#fafafa' }}
                files={files3}
                onPress={() => this.onPress()}
              />
              <Card.Divider style={styles.cardStyle}>
                <Text>
                  For advance players in drumming lessons
                </Text>
              </Card.Divider>
            </Card>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    marginTop: 30,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cardStyle: {
    width: 320,
  },
});
