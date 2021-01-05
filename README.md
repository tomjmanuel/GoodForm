# goodForm
goodform app

This is the repo for the goodForm app.
This repo is built using react-native. 

Steps to run on react-native

// skip if react-native and android stuio are setup
Install react-native and android studio.
Setup path and environment variables for react-native.
This tutorial can help with some of this:
"https://www.raywenderlich.com/247-react-native-tutorial-building-android-apps-with-javascript"

Test that react-native is working: react-native init TestProject

//

If thats working, you're ready to clone this repo
react projects can be cloned with git and installed with npm
$ git clone {the url to the GitHub repo}

cd into project directory "cd ../GoodForm
npm install
npm start

// dependencies that should be built in but which I added for future
// ref
// react-navigation
yarn add react-navigation
// react-native-video-controls
npm install --save react-native-video react-native-video-controls
react-native link react-native-video
// react-native-youtube
npm install --save react-native-youtube
react-native-link react-native-youtube

// navigation and dependencies
npm install react-native-reanimated react-native-gesture-handler react-native-screens react-native-safe-area-context @react-native-community/masked-view
npm install @react-navigation/native @react-navigation/stack
