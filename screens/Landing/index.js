import React, {useEffect, useState}  from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Image, Button, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import MMKV from 'react-native-mmkv-storage';
// this is the Apps Landing page
var { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  plusIcon: {
      resizeMode: 'center',
      //height:30,
      width:width,
    },
    text: {
        color: 'black',
        fontSize: 20
    }
});

stockData = [
  {key: '1', vidTag: 'F0PW2sVi2EQ', name: 'Eagle Backhand'},
  {key: '2', vidTag: '4M6wvGXeBeI', name: 'Paul Backhand'},
  {key: '3', vidTag: 'GfjiaZ9DvXQ', name: 'Collage Video from euro open'},
  {key: '4', vidTag: 'RMqAGcMdpLA', name: 'Paul Finland'},
  {key: '5', vidTag: '6YqClC9fjac', name: 'Bradley Williams Maple'},
  {key: '6', vidTag: 'AwYvav4xCR8', name: 'Aussie Open Compilation'},
  {key: '7', vidTag: 'nuEFQkxqBSc', name: 'Waco Open Compilation'},
];

const MMKVStorage = new MMKV.Loader().withEncryption().initialize();

foo=0;

const LandingScreen = ({ navigation }) => {
  const [arrayValue, setArrayValue] = useState([]);

    useFocusEffect(() => {
      (async () => {
        let array = await MMKVStorage.getArrayAsync('listData');
        if (array == null){
            setArrayValue(stockData)
            console.log('null');
        } else {
            if (foo==0){
            setArrayValue(array);
            }
        }
        //await MMKVStorage.setArrayAsync('array', new Array(16).fill());
        //await MMKVStorage.indexer.hasKey('array').then(console.log);
      })();
    }, []);
  return (
    <View style={styles.container}>
        <TouchableOpacity
          style={{paddingTop:15}}
          onPress={() => navigation.navigate('Select1', {listData: arrayValue})}
        >
          <Image
              style={styles.plusIcon}
              source={require('./sporticons.png')}
          />
        </TouchableOpacity>

    </View>
  );
};

export default LandingScreen;