import React, {useState, Component} from 'react';
import { View, Text, StyleSheet, Button, Dimensions } from 'react-native';
import Video from 'react-native-video';
import YouTube from 'react-native-youtube';
import 'react-native-gesture-handler';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
/*
this is a page where the user compares a local video to a youtube video
This page comes after select1 page where the user choose a local video and a youtube video

*/
// get page dimensions
var { height, width } = Dimensions.get('window');
console.log(width)
var box_count = 2;
var controlheight= 200;
var box_height = height / box_count - controlheight/2;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  box: {
    height: box_height,
    overflow: 'hidden'
  },
  box1: {
    backgroundColor: '#2196F3'
  },
  box2: {
    backgroundColor: '#8BC34A'
  },
  box3: {
    backgroundColor: '#e3aa1a',
    height: box_height
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  button: {
    backgroundColor: 'green',
    width: '30%',
    height: '40'
  }
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
        <View style={styles.container}>
            <View style={[styles.box, styles.box1]}>
                <ReactNativeZoomableView
                   maxZoom={1.5}
                   minZoom={1}
                   zoomStep={0.3}
                   initialZoom={1}
                   bindToBorders={true}
                   style={{
                      padding: 0,
                      backgroundColor: 'black',
                   }}
                >
                    <YouTube
                      apiKey = "AIzaSyBU2qiNfENE59bF895o5Twoo4qu8MYzW90"
                      videoId="F0PW2sVi2EQ" // The YouTube video ID
                      showFullscreenButton = { false }
                      modestbranding = { true }
                      style={{ alignSelf: 'stretch', height: box_height }}
                      controls = {1}
                      loop = {true}
                      play = {!this.state.paused}
                    />
                </ReactNativeZoomableView>
            </View>
            <View style={[styles.box, styles.box2]}>
                <ReactNativeZoomableView
                   maxZoom={1.5}
                   minZoom={1}
                   zoomStep={0.3}
                   initialZoom={1}
                   bindToBorders={true}
                   style={{
                      padding: 0,
                      backgroundColor: 'black',
                   }}
                >
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
                </ReactNativeZoomableView>
            </View>
            <View style={styles.box3}>
                <View style={styles.buttonRow}>
                    <Button
                        style={styles.button}
                        title="<<"
                        onPress={() => this.stepForward()}
                    />
                    <Button
                        style={styles.button}
                        title=">>"
                        onPress={() => this.stepBackward()}
                    />
                    <Button
                        style={styles.button}
                        title="Play both"
                        onPress={() => this.togglePlayback()}
                    />
                </View>
            </View>
        </View>
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