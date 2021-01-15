import React, {useState, Component} from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import Video from 'react-native-video';
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

class VideoComp extends Component {

    constructor(props){
        super(props);
    }

    state = {
        paused: false,
        progress: 0,
        duration: 0
    }

    handleProgress = (progress) => {
        this.setState({
            progress: progress.currentTime
        });
    }

    stepForward = () => {
        console.log(this.state.progress);
        this.player.seek(this.state.progress+.5,0);
    }

    stepBackward = () => {
        console.log(this.state.progress);
        this.player.seek(this.state.progress-.5,0);
    }

    handleLoad = (meta) => {
        this.setState({
            duration: meta.duration
        })
    }

    togglePlayback = () => {
        this.setState({
            paused: !this.state.paused
        });
    }

    render() {
        const { width } = Dimensions.get('window');
        const height = width * 0.5625;
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
              play = {!this.state.paused}
            />
            <Video
              source={{uri: this.props.source}}
              ref = {ref => this.player = ref}
              style = {{width: '100%', height}}
              paused = {this.state.paused}
              onProgress = {this.handleProgress}
              onSeek = {this.handleProgress}
              onLoad = {this.handleLoad}
              controls = {true}
              resizeMode = 'contain'
              progressUpdateInterval = {200}
            />
            <Button
                title="<<"
                onPress={() => this.stepForward()}
            />
            <Button
                title=">>"
                onPress={() => this.stepBackward()}
            />
            <Button
              title="Play both"
              onPress={() => this.togglePlayback()}
            />
        </>
        )
    }
}

const Youtube_compare = ({ navigation, route }) => {
  const [check, setCheck] = useState(false);
  const [time, setTime] = useState(1);
  function togglePlayback() {
    console.log('Current playback state: ');
    console.log({check});
    setCheck(prevCheck => !prevCheck);
  }
  return (
    <>
        <VideoComp source={route.params.vidlink}/>
    </>
  );
};

export default Youtube_compare;