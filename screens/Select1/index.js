import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity, Dimensions } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { FlatList } from 'react-native-gesture-handler';
import { List, ListItem, SearchBar } from "react-native-elements";
// this is the Apps Landing page

// get page dimensions
var { height, width } = Dimensions.get('window');
console.log(width)
var box_count = 3;
var controlheight= 10;
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
    backgroundColor: '#fc7f03'
  },
  box2: {
    backgroundColor: '#8BC34A'
  },
  box3: {
    backgroundColor: '#e3aa1a'
  }
});

const Select1 = ({ navigation }) => {
  const [sour, setSour] = useState({uri: 'https://vjs.zencdn.net/v/oceans.mp4'});

    var initialElements = [
        { id : "0", text : "Object 1"},
        { id : "1", text : "Object 2"},
        { id : "2", text : "Object 1"},
        { id : "3", text : "Object 2"},
        { id : "4", text : "Object 1"},
        { id : "5", text : "Object 2"},
        { id : "6", text : "Object 1"},
        { id : "7", text : "Object 2"},
        { id : "8", text : "Object 1"},
        { id : "9", text : "Object 2"},
        { id : "10", text : "Object 1"},
        { id : "11", text : "Object 2"}
    ]
    
    const [exampleState, setExampleState] = useState(initialElements)

    const addElement = () => {
    var newArray = [...initialElements , {id : "2", text: "Object 3"}];
    setExampleState(newArray);
    }



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
              let source = { uri: response.uri };
              console.log({ source });
              setSour(response.uri);
            }
          });
    }

  return (
    <View style={styles.container}>
        <View style={[styles.box, styles.box1]}>
            <Button
                title="Select local video"
                onPress={selectImage}
            />
        </View>
        <View style={[styles.box, styles.box2]}>
            <FlatList
                keyExtractor = {item => item.id}
                data={exampleState}
                renderItem = {item => (<Button title={item.item.text} />)}
            />
        </View>
        <View style={[styles.box, styles.box3]}>
            <Button
                title="Add element"
                onPress={addElement}
            />

            <Button
                title="Compare Videos now"
                onPress={() => navigation.navigate('YoutubeCompare', {vidlink: sour})}
            />
        </View>
    </View>
  );
};

export default Select1;