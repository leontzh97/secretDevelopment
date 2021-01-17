import React, { Component } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { Card } from 'react-native-elements';
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
  constructor(props){
        super(props);

        this.state = {
          navigation: props.navigation
        };
    };

  onPress(title, classAmount) {
    this.state.navigation.navigate('ClassDetailScreen',{
      screen:'ClassDetailScreen',
      classAmount: classAmount,
      name:title,
      style:  {
        backgroundColor: '#b22222',
      },
      tintColor: '#fff',
      titleStyle: {
        fontWeight: 'bold',
      },
    })
  }

  render() {
    return (
        <ScrollView>
          <View style={styles.container}>
            <StatusBar barStyle="light-content" />
            <Card>
              <CardMedia
                style={{ height: 200 }}
                title="Elementary Class"
                titleStyle={styles.cardTitle}
                files={files1}
                onPress={() => this.onPress("Elementary",3)}
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
                titleStyle={styles.cardTitle}
                files={files2}
                onPress={() => this.onPress("Intermediate",5)}
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
                titleStyle={styles.cardTitle}
                files={files3}
                onPress={() => this.onPress("Advance",7)}
              />
              <Card.Divider style={styles.cardStyle}>
                <Text>
                  For advance players in drumming lessons
                </Text>
              </Card.Divider>
            </Card>
          </View>
        </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  cardStyle: {
    width: 320,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 32,
    color: '#fafafa'
  }
});
