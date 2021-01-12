import React, {useState} from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
// this is the Apps Landing page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

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
              let source = { uri: response.uri };
              console.log({ source });
              setSour(response.uri);
            }
          });
    }

  return (
    <View style={styles.container}>
      <Text>Public Landing Screen</Text>
            <Button
            title="Select local video"
            onPress={selectImage}
            />
            <Text>"select vid before pressing compare"</Text>
            <Button
              title="Compare Videos now"
              onPress={() => navigation.navigate('YoutubeCompare', {vidlink: sour})}
            />
            <Button
              title="use state"
              onPress={() => setSour('hey')}
            />
    </View>
  );
};

export default Select1;