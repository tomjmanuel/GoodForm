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

type Props = {};

const RootStack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
            name="Select1"
            component={Select1}
            options={{
              title: 'Select videos',
              headerStyle: {
                backgroundColor: '#ff3526',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            />
        <RootStack.Screen
            name="YoutubeCompare"
            component={YoutubeCompare}
            options={{
              title: 'You vs. Youtube',
              headerStyle: {
                backgroundColor: '#ff3526',
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
              },
            }}
            />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default App;
