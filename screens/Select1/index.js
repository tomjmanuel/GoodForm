import React, {useState, Component} from 'react';
import { View, Image, Text, Button, StyleSheet, Alert, TouchableOpacity, TouchableHighlight, Dimensions, Modal, TextInput } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem, SearchBar } from "react-native-elements";
import parseYouTubeUrl from '../../parseYouTubeUrl';

// get page dimensions
var { height, width } = Dimensions.get('window');
console.log(width)
var box_count = 2;
var y2height= 80;
var compare_height = 150;
var box_height = (height-y2height-compare_height )/ box_count;

sampleData = [
  {key: '1', vidTag: 'F0PW2sVi2EQ', name: 'Eagle Backhand'},
  {key: '2', vidTag: '4M6wvGXeBeI', name: 'Paul Backhand'},
  {key: '3', vidTag: 'GfjiaZ9DvXQ', name: 'Collage Video from euro open'}
]

var ytID = "F0PW2sVi2EQ";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column'
  },
  whiteText: {
    color: 'white',
    textAlign: 'center',
    padding: 10
  },
  icon: {
    resizeMode: 'contain',
    height: 100,
    width:200
  },
  y2logo: {
    height: 30,
    width:200,
    resizeMode: 'contain',
  },
  y2Text:{
    color: 'white',
    fontSize: 20,
    textAlign: 'center'
  },
  listText:{
    fontSize: 18,
    padding: 10
  },
  y2View: {
    padding: 20,
    flexDirection:'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#006AEA',
    height: y2height
  },
  box: {
    height: box_height,
    overflow: 'hidden'
  },
  box1: {
    backgroundColor: '#0018C6',
    height: 100
  },
  box2: {
    backgroundColor: '#32BAFA'
  },
  box3: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#0018C6'
  },
  button1:{
    color: '#03fcc6'
  },
  selected:{
    backgroundColor: "#DDDDDD",
  },
  modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      }}
});


class Select1Comp extends Component {

  constructor(props){
      super(props);
  }

  state = {
    data: sampleData,
    selected: '1',
    selectedVideo: '4M6wvGXeBeI',
    modalVis: false,
    nickname: '',
    vidInput: ''
  }

    // this gets called after add item and selected
     componentDidUpdate(){
       console.log('Updated');
       console.log(this.state.nickname);
       console.log(this.state.vidInput);
       ytID = this.state.selectedVideo;
     }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "100%",
                    backgroundColor: "#000",
                }}
            />
        );
    };
    //handling onPress action
    getListViewItem = (item) => {
        this.setState({ selected: item.key, selectedVideo: item.vidTag });
    }

    //show modal
    showModal = () => {
        this.setState({ modalVis: !this.state.modalVis});
    }

    //addItem adds a new element to flatlist
    // will eventually be called after modal based input
    addItem = () => {
        console.log('addItem');
        var LL = this.state.data.length + 1;
        var lS = LL.toString();
        const result = parseYouTubeUrl(this.state.vidInput);
        console.log(result);
        sampleData = [...this.state.data , {key : lS, vidTag: result.videoId, name: this.state.nickname}];
        this.setState({
            data: sampleData
        });
    }

    removeItem = () => {
        console.log('removeItem');
        // iterate through data
        var LL = this.state.data.length+1;
        var newData = [];
        for (var i=1; i<LL; i++){
            if (i.toString()!=this.state.selected){
                console.log(i.toString());
                newData.push(this.state.data[i-1]);
            }
        }
        this.setState({
            data: newData
        });
    }


  render() {
  const {data} = this.state
  return (
        <>
        <FlatList
            data={data}
            renderItem={({item}) =>
            <TouchableOpacity
                onPress={this.getListViewItem.bind(this, item)}
                style={item.key === this.state.selected ? styles.selected : null}
                >
                <Text style={styles.listText}>{item.name}</Text>
            </TouchableOpacity>}
            ItemSeparatorComponent={this.renderSeparator}
      />
      <Button
        color = "#03fcc6"
        onPress={this.showModal}
        title= "addItem"

      />
        <Button
          color = "#f54542"
          onPress={this.removeItem}
          title= "remove item"

        />
        <Modal
              animationType="slide"
              transparent={true}
              visible={this.state.modalVis}
              onRequestClose={() => {
                Alert.alert("Modal has been closed.");
              }}
            >
            <View style={styles.modalView}>
              <Text>Video nickname</Text>
                  <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                    onChangeText={text => this.setState({nickname: text})}
                    value={this.state.nickname}
                  />
              <Text>Youtube video URL</Text>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
                  onChangeText={text => this.setState({vidInput: text})}
                  value={this.state.vidInput}
                />
              <TouchableHighlight
                onPress={() => {
                  this.setState({modalVis: false});
                  this.addItem();
                }}
              >
                <Text>Save video link</Text>
              </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    this.setState({modalVis: false});
                  }}
                >
                  <Text>Cancel</Text>
                </TouchableHighlight>
            </View>
        </Modal>
      </>
  );
  }
}

const Select1 = ({ navigation }) => {

    const [sour, setSour] = useState({uri: 'https://vjs.zencdn.net/v/oceans.mp4'});

    function selectImage() {
    let options = {
      title: 'Choose one image',
       mediaType: 'video',
      storageOptions: {
        skipBackup: true
      }
    };
    launchImageLibrary(options, response => {
          console.log({ response });
            if (response.didCancel) {
              console.log('User cancelled photo picker');
              Alert.alert('You did not select any image');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else {
              setSour(response.uri);
            }
          });
    }

    return(
        <View style={styles.container}>
            <View style={[styles.box, styles.box3]}>
                <TouchableOpacity
                    title="Select local video"
                    onPress={selectImage}

                >
                    <Text style={styles.whiteText}>Select your video</Text>
                    <Image
                        style={styles.icon}
                        source={require('./cameraicon.png')}
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.y2View}>
                <Text style={styles.y2Text}>
                    Links from
                </Text>
                <Image
                    style={styles.y2logo}
                    source={require('./yt_logo_rgb_dark.png')}
                />
            </View>
            <View style={[styles.box, styles.box2]}>
                <Select1Comp/>
            </View>
            <View style={styles.box1}>
                <Button
                    title="Compare Videos now"
                    onPress={() => navigation.navigate('YoutubeCompare', {vidlink: sour, ytID: ytID})}
                />
            </View>
        </View>
    );

}

export default Select1;