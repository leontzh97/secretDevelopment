import React, { Component } from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  StatusBar
} from 'react-native';
import { Card } from 'react-native-elements';
import CardMedia from 'react-native-card-media';

const path = 'https://raw.githubusercontent.com/dondoko-susumu/react-native-card-media-example/master/media/';
const files1 = [
  `${path}kids_play_640.jpeg`,
];

export class ClassDetailScreen extends Component<{}> {
  constructor(props){
        super(props);

        this.state = {
          classAmount: props.route.params.classAmount,
          navigation: props.navigation
        }
  };

  onPress(title) {
    this.state.navigation.navigate('ClassVideoScreen',{
      screen:'ClassVideoScreen',
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

  renderClass() {
    const classAmount = this.state.classAmount;
    const fields = [];
    for (let i=0; i < classAmount; i++) {
        let num = i+1;
        fields.push(
          <Card key={i}>
            <CardMedia
              style={{ height: 200 }}
              title={"Class " + num}
              titleStyle={styles.cardTitle}
              files={files1}
              onPress={() => this.onPress("Class " + num)}
            />
            <Card.Divider style={styles.cardStyle}>
              <Text>
                Class Details
              </Text>
            </Card.Divider>
          </Card>
        );
    }
    return fields;
  }

  render(){
    return (
      <ScrollView>
        <View style={styles.container}>
          <StatusBar barStyle="light-content" />
           {this.renderClass()}
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
