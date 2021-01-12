import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import VideoPlayer from 'react-native-video-controls';
import YouTube from 'react-native-youtube';
import 'react-native-gesture-handler';
/*
this is a page where the user compares a local video to a youtube video
This page comes after select1 page where the user choose a local video and a youtube video

*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Youtube_compare = ({ navigation, route }) => {
  return (
    <>
        <YouTube
          apiKey = "AIzaSyBU2qiNfENE59bF895o5Twoo4qu8MYzW90"
          videoId="F0PW2sVi2EQ" // The YouTube video ID
          //play // control playback of video with true/false
          //fullscreen // control whether the video should play in fullscreen or inline
          //loop // control whether the video should loop when ended
          //onReady={e => this.setState({ isReady: true })}
          //onChangeState={e => this.setState({ status: e.state })}
          //onChangeQuality={e => this.setState({ quality: e.quality })}
          //onError={e => this.setState({ error: e.error })}
          scrubbing = "100"
          style={{ alignSelf: 'stretch', height: 300 }}
        />
        <VideoPlayer
          source={{uri: route.params.vidlink}}
          navigator={navigation}
        />
        <Button
          title="Play both"
        />
    </>
  );
};

export default Youtube_compare;