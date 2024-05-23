import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import MainScreen from './src/screens/MainScreen';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <MainScreen />
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
