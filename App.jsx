import { View, StyleSheet } from 'react-native';
import React from 'react';
import JSX from './src/components/JSX';
 

const App = () => {
  return (
    <View style={styles.container}>
      <JSX />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
});

export default App;