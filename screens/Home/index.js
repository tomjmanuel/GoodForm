import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
// this screen is not actually beingn used right now

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Protected Homie Screen</Text>
    </View>
  );
};

export default HomeScreen;