import React, {useEffect, useState}  from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { View, Text, Button, StyleSheet } from 'react-native';
import MMKV from 'react-native-mmkv-storage';
// this is the Apps Landing page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

stockData = [
  {key: '1', vidTag: 'F0PW2sVi2EQ', name: 'Eagle Backhand'},
  {key: '2', vidTag: '4M6wvGXeBeI', name: 'Paul Backhand'},
  {key: '3', vidTag: 'GfjiaZ9DvXQ', name: 'Collage Video from euro open'}
];

const MMKVStorage = new MMKV.Loader().withEncryption().initialize();

const LandingScreen = ({ navigation }) => {
  const [arrayValue, setArrayValue] = useState([]);

    useFocusEffect(() => {
      (async () => {
        let array = await MMKVStorage.getArrayAsync('listData');
        if (array?.length == 1 || array == null){
            setArrayValue(stockData)
            console.log('null');
        } else {
            setArrayValue(array);
            console.log('found one: ')
        }
        //await MMKVStorage.setArrayAsync('array', new Array(16).fill());
        //await MMKVStorage.indexer.hasKey('array').then(console.log);
      })();
    }, []);
  return (
    <View style={styles.container}>
      <Text>Public Landing Screen</Text>
        <Button
          title="Goodform"
          onPress={() => navigation.navigate('Select1', {listData: arrayValue})}
        />
    </View>
  );
};

export default LandingScreen;