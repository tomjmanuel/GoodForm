'use strict';

//import React, { Component } from 'react'; // 1
import * as React from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// At the top where our imports are...
import VideoPlayer from 'react-native-video-controls';
import YouTube from 'react-native-youtube';

type Props = {};

/*
class HomeScreen extends Component<Props> {
    render() {
      //return React.createElement(Text, {style: styles.description}, "Search for houses to buy!");
      return (
        <Text style={styles.description}>Search for houses to buy!</Text>
      );
    }
} // 3*/

const HomeScreen = ({ navigation }) => {
  return (
    <Button
      title="Go to Jane's profile"
      onPress={() =>
        navigation.navigate('Video', { name: 'Jane' })
      }
    />
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
        <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Welcome'}}/>
        <Stack.Screen name="Video" component={VideoScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
/*
const App = createStackNavigator({
  Home: { screen: SearchPage },
});*/
export default App;

const styles = StyleSheet.create({
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#656565',
    marginTop: 65,
  },
});