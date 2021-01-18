import React, { Component } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Video } from 'expo-av';
import VideoPlayer from 'expo-video-player';

export class ClassVideoScreen extends Component<{}>{
  render(){
    return(
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <VideoPlayer
          videoProps={{
            shouldPlay: true,
            resizeMode: Video.RESIZE_MODE_CONTAIN,
            source: {
              uri: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
            },
          }}
          inFullscreen={true}
          videoBackground='transparent'
          height={220}
        />
      </ScrollView>
    )

}
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
