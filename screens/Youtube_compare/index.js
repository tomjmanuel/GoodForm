import React, {useState} from 'react';
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
  const [check, setCheck] = useState(false);
  function togglePlayback() {
    console.log('Current playback state: ');
    console.log({check});
    setCheck(prevCheck => !prevCheck);
    console.log('New playback state: ');
    console.log({check});
  }
  return (
    <>
        <YouTube
          apiKey = "AIzaSyBU2qiNfENE59bF895o5Twoo4qu8MYzW90"
          videoId="F0PW2sVi2EQ" // The YouTube video ID
          showFullscreenButton = { false }
          modestbranding = { true }
          style={{ alignSelf: 'stretch', height: 300 }}
          controls = {1}
          loop = {true}
          play = {check}
        />
        <VideoPlayer
          source={{uri: route.params.vidlink}}
          paused={!check}
          navigator={navigation}
          scrubbing={5}
          tapAnywhereToPause={false}
          controlTimeout = {1600}
          disableFullscreen = {true}
          disableVolume = {true}
          disableBack = {true}
          disableTimer = {true}
          style={{ alignSelf: 'stretch', height: 300 }}
        />
        <Button
          title="Play both"
          onPress={() => togglePlayback()}
        />
    </>
  );
};

export default Youtube_compare;