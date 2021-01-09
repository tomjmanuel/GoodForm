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
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
            } else {
              let source = { uri: response.uri };
              console.log({ source });
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
            <Button
              title="Compare Videos now"
              onPress={() => navigation.navigate('YoutubeCompare')}
            />
    </View>
  );
};

export default Select1;