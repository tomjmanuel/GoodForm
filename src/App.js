'use strict';

import * as React from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { version } from '../package.json'
import VideoPlayer from 'react-native-video-controls';
import YouTube from 'react-native-youtube';

const HomeScreen = ({ navigation }) => {
  return (
  <>
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Video', { name: 'Jane' })
      }
    />
    <Text>V.{version}</Text>
    <Text>More text!</Text>
    </>
  );
};

const VideoScreen = ({navigation}) => {
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
              style={{ alignSelf: 'stretch', height: 300 }}
            />
            <Text>whattup bit</Text>
            <VideoPlayer
              source={{uri: 'https://vjs.zencdn.net/v/oceans.mp4'}}
              navigator={navigation}
            />
        </>
    );
};

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'GoodForm'}}/>
        <Stack.Screen name="Video" component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default App;

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 65,
  },
});