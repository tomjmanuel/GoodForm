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
var controlheight= 140;
var box_height = (height / box_count )- (controlheight/2)-10;

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
    backgroundColor: '#0018C6'
  },
  box2: {
    backgroundColor: '#0018C6'
  },
  box3: {
    backgroundColor: '#0018C6',
    height: box_height
  },
  buttonRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    height: '100%',
    backgroundColor: '#0018C6',
    paddingBottom: 20,
    paddingTop: 20,
  },
  button: {
    width: '30%',
    height: '100%',
  }
});

class VideoComp extends Component {

    constructor(props){
        super(props);
    }

    state = {
        pausedYT: false,
        pausedV: false,
        progress: 0.0,
        duration: 0,
        currentTime: 0,
        error: null,
        mode: 'Both',
        speed: 1.0,
        speedString: '1x'
    }

    handleProgress = (progress) => {
        this.setState({
            progress: progress.currentTime,
        });
    }

    stepForward = () => {
        if (this.state.mode =='Bottom' || this.state.mode =='Both'){
            this.player.seek(this.state.progress+3,0);
            };

        if (this.state.mode =='Top' || this.state.mode == 'Both'){
            //youtube portion
            this._youTubeRef.current.seekTo(this.state.currentTime+3);
            if (this._youTubeRef.current) {
              this._youTubeRef.current
                .getCurrentTime()
                .then(currentTime => {
                  this.setState({ currentTime });
                })
                .catch(errorMessage => {
                  this.setState({ error: errorMessage });
                });
                console.log(this.state.currentTime);

            }
        };
    }

    stepForward2 = () => {
        // use play pause to step forward instead of seek
        this.togglePlayback();
        setTimeout(() => {this.togglePlayback()}, 50);
    }

    stepBackward = () => {
        if (this.state.mode =='Bottom' || this.state.mode =='Both'){
            this.player.seek(this.state.progress-(1 * this.state.speed),0);
            };

        if (this.state.mode =='Top' || this.state.mode == 'Both'){
            //youtube portion
            this._youTubeRef.current.seekTo(this.state.currentTime-1);
            if (this._youTubeRef.current) {
              this._youTubeRef.current
                .getCurrentTime()
                .then(currentTime => {
                  this.setState({ currentTime });
                })
                .catch(errorMessage => {
                  this.setState({ error: errorMessage });
                });
                console.log(this.state.currentTime);

            }
        };
    }

    handleLoad = (meta) => {
        this.setState({
            duration: meta.duration
        })
    }

    togglePlayback = () => {
        if (this.state.mode == 'Top'|| this.state.mode == 'Both'){
            this.setState({
                pausedYT: !this.state.pausedYT
            });
        }
        if (this.state.mode == 'Bottom'|| this.state.mode == 'Both'){
            this.setState({
                pausedV: !this.state.pausedV
            });
        }
    }

    changeMode = () => {
        if (this.state.mode == 'Top'){
            this.setState({
                mode: 'Bottom'
            });
        }
        if (this.state.mode == 'Bottom'){
            this.setState({
                mode: 'Both'
            });
        }
        if (this.state.mode == 'Both'){
            this.setState({
                mode: 'Top'
            });
        }
        console.log(this.state.mode);
        }

    changeSpeed = () => {
    var str2 = 'X';
    if (this.state.speed < 4 && this.state.speed >=1){
        this.setState({
            speed: this.state.speed+.5
        });
        var str1 = (this.state.speed+.5).toString();
        var str3 = str1.substring(0,3);
        var strFinal = str3.concat('X');
    }
    if (this.state.speed >= 4){
        this.setState({
            speed: 0.2
        });
        var str1 = (0.2).toString();
        var str3 = str1.substring(0,3);
        var strFinal = str3.concat('X');
    }
    if (this.state.speed < 1){
        this.setState({
            speed: this.state.speed + 0.2
        });
        var str1 = (this.state.speed+0.2).toString();
        var str3 = str1.substring(0,3);
        var strFinal = str3.concat('X');
    }

    this.setState({
        speedString: strFinal
    });

    console.log(strFinal);
    console.log(this.state.error)
    }

    _youTubeRef = React.createRef();

    updateYT = () => {
        if (this._youTubeRef.current) {
          this._youTubeRef.current
            .getCurrentTime()
            .then(currentTime => {
              this.setState({ currentTime });
            })
            .catch(errorMessage => {
              this.setState({ error: errorMessage });
            });
        };
    }

    render() {
        const { width } = Dimensions.get('window');
        const height = width * 0.5625;
        return (
        <View style={styles.container}>
            <View style={[styles.box, styles.box1]}>
                <YouTube
                  apiKey = "AIzaSyBU2qiNfENE59bF895o5Twoo4qu8MYzW90"
                  videoId={this.props.ytID} // The YouTube video ID
                  onError={e=> {this.setState({error: e.error});}}
                  showFullscreenButton = { false }
                  modestbranding = { true }
                  style={{ alignSelf: 'stretch', height: box_height }}
                  controls = {0}
                  loop = {true}
                  play = {!this.state.pausedYT}
                  ref = {this._youTubeRef}
                  onChangeState = {() => this.updateYT()}
                  resumePlayAndroid = {false}
                />
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
                      paused = {this.state.pausedV}
                      onProgress = {this.handleProgress}
                      onSeek = {this.handleProgress}
                      onLoad = {this.handleLoad}
                      controls = {false}
                      resizeMode = 'contain'
                      progressUpdateInterval = {200}
                      rate = {this.state.speed}

                    />
                </ReactNativeZoomableView>
            </View>
                <View style={styles.buttonRow}>
                    <Button
                        style={styles.button}
                        title="  <<   "
                        onPress={() => this.stepBackward()}
                    />
                    <Button
                        style={styles.button}
                        title={this.state.mode}
                        onPress={() => this.changeMode()}
                    />
                    <Button
                        style={styles.button}
                        title="  >>   "
                        onPress={() => this.stepForward2()}
                    />
                    <Button
                        style={styles.button}
                        title="  >>>>  "
                        onPress={() => this.stepForward()}
                    />
                    <Button
                        style={styles.button}
                        title="Play"
                        onPress={() => this.togglePlayback()}
                    />
                    <Button
                        style={styles.button}
                        title={this.state.speedString}
                        onPress={() => this.changeSpeed()}
                    />
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
        <VideoComp source={route.params.vidlink} ytID={route.params.ytID}/>
    </>
  );
};

export default Youtube_compare;