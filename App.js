'use strict';

//import React, { Component } from 'react'; // 1
import * as React from 'react';
import {Platform, StyleSheet, Text, View, Button} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { version } from './package.json'


// custom components and screens
import YoutubeCompare from './screens/Youtube_compare';
import Select1 from './screens/Select1';
import LandingScreen from './screens/Landing';

type Props = {};

const RootStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen name="Landing" component={LandingScreen}/>
        <RootStack.Screen name="Select1" component={Select1} />
        <RootStack.Screen name="YoutubeCompare" component={YoutubeCompare}/>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
