import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import HomeScreen from './src/screens/HomeScreen';
import MainScreen from './src/screens/MainScreen';

const App = () => {
  return (
    <View style={styles.container}>
      <MainScreen />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
