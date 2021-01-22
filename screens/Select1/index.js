import React, {useState, Component} from 'react';
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

sampleData = [
  {key: '0', pressed: false},
  {key: '1', pressed: false},
  {key: '2', pressed: false}
]

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
  }
});


class Select1Comp extends Component {

  constructor(props){
      super(props);
  }

  state = {
    data: sampleData
  }

  changeItem(item)
  {
    this.setState( (prevState) => {
      prevState.data.map(a=>a.pressed=false);
      prevState.data[item.key] = { ...item, pressed: !item.pressed}
      return{
        ...prevState,
        data: [...prevState.data]
        //data: [...sampleData]
      }
      });
  };

     componentDidUpdate(){
       console.log(this.state.data)
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
        Alert.alert(item.key);
    }

    addItem = () => {
        console.log('hey');
        console.log(sampleData);
        var LL = sampleData.length + 1;
        var lS = LL.toString();
        sampleData = [...sampleData , {key : lS, pressed: false}];
        this.setState({
            data: sampleData
        });
    }


  render() {
  const {data} = this.state
  return (
        <>
        <FlatList
            data={data}
            renderItem={({item}) =>
            <Text
                onPress={this.getListViewItem.bind(this, item)}>{item.key}
            </Text>}
            ItemSeparatorComponent={this.renderSeparator}
      />
      <Button
        onPress={this.addItem}
        title= "addItem"

      />
      </>
  );
  }
}

const Select1 = ({ navigation }) => {

    const [sour, setSour] = useState({uri: 'https://vjs.zencdn.net/v/oceans.mp4'});

    function addElement (){
        console.log(sampleData);
        var LL = sampleData.length + 1;
        var lS = LL.toString();
        sampleData = [...sampleData , {key : lS, pressed: false}];
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
                    onPress={() => navigation.navigate('YoutubeCompare', {vidlink: sour})}
                />
                <Button
                    color='#03fcc6'
                    title="Add element"
                    onPress={addElement}
                />
            </View>
        </View>
    );

}

export default Select1;