import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

// this is the Apps Landing page

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const LandingScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Public Landing Screen</Text>
        <Button
          title="You vs. Youtube"
          onPress={() => navigation.navigate('Select1')}
        />
    </View>
  );
};

export default LandingScreen;