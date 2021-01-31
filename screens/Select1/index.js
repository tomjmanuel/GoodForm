import React, {useState, Component} from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity, TouchableHighlight, Dimensions, Modal, TextInput } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem, SearchBar } from "react-native-elements";

// get page dimensions
var { height, width } = Dimensions.get('window');
console.log(width)
var box_count = 3;
var controlheight= 10;
var box_height = (height / box_count )- (controlheight/2)-10;

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
  box: {
    height: box_height,
    overflow: 'hidden'
  },
  box1: {
    backgroundColor: '#fc7f03'
  },
  box2: {
    backgroundColor: '#8BC34A'
  },
  box3: {
    backgroundColor: '#e3aa1a'
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
        sampleData = [...this.state.data , {key : lS, vidTag: this.state.vidInput, name: this.state.nickname}];
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
        <Text> Choose Youtube video </Text>
        <FlatList
            data={data}
            renderItem={({item}) =>
            <TouchableOpacity
                onPress={this.getListViewItem.bind(this, item)}
                style={item.key === this.state.selected ? styles.selected : null}
                >
                <Text>{item.name}</Text>
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
                <Button
                    title="Select local video"
                    onPress={selectImage}
                />
            </View>
            <View style={[styles.box, styles.box2]}>
                <Select1Comp/>
            </View>
            <View style={[styles.box, styles.box3]}>
                <Button
                    title="Compare Videos now"
                    onPress={() => navigation.navigate('YoutubeCompare', {vidlink: sour, ytID: ytID})}
                />
            </View>
        </View>
    );

}

export default Select1;