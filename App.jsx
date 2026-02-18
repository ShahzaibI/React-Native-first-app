import { View, StyleSheet } from 'react-native';
import React from 'react';
import JSX from './src/components/JSX';
import OnPress from './src/components/OnPress';
import UseStateHook from './src/components/UseStateHook';
import Props from './src/components/Props';
import InputText from './src/components/InputText';
import Styling from './src/components/Styling';
import FlatListScreen from './src/components/FlatListScreen';
import SectionListScreen from './src/components/SectionListScreen';
 

const App = () => {
  return (
    <View>
      {/* <JSX /> */}
      {/* <OnPress /> */}
      {/* <UseStateHook /> */}
      {/* <Props /> */}
      {/* <InputText /> */}
      {/* <Styling /> */}
      {/* <FlatListScreen /> */}
      <SectionListScreen />
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