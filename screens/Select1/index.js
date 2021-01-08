import React from 'react';
import { View, Text, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';
// this is the Apps Landing page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const Select1 = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Public Landing Screen</Text>
        <Button
          title="Compare Videos now"
          onPress={() => navigation.navigate('YoutubeCompare')}
        />
    </View>
  );
};

export default Select1;