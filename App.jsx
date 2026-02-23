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
import LoginForm from './src/components/LoginForm';
import ContactListScreen from './src/screens/Contact/ContactListScreen';
import Grid from './src/components/Grid';
import ClassComponents from './src/components/ClassComponents';
import UseEffectHook from './src/components/UseEffectHook';
import UseEffectHookUpdatingPhase from './src/components/UseEffectHookUpdatingPhase';
import UseEffectHookUnmoiuntingPhase from './src/components/UseEffectHookUnmoiuntingPhase';
import HideShowToggle from './src/components/HideShowToggle';
import StyleWithButton from './src/components/StyleWithButton';
import Loader from './src/components/Loader';
import PressableComponent from './src/components/PressableComponent';
import StatusBarExample from './src/components/StatusBarExample';
import UseRefHook from './src/components/UseRefHook';
 

const App = () => {
  return (
    <View style={styles.container}>
      {/* <JSX /> */}
      {/* <UseStateHook /> */}
      {/* <Props /> */}
      {/* <OnPress /> */}
      {/* <InputText /> */}
      {/* <Styling /> */}
      {/* <FlatListScreen /> */}
      {/* <SectionListScreen /> */}
      {/* <LoginForm /> */}
      {/* <ContactListScreen /> */}
      {/* <Grid /> */}
      {/* <ClassComponents /> */}
      {/* <UseEffectHook /> */}
      {/* <UseEffectHookUpdatingPhase /> */}
      {/* <UseEffectHookUnmoiuntingPhase /> */}
      {/* <HideShowToggle /> */}
      {/* <StyleWithButton /> */}
      {/* <Loader /> */}
      {/* <PressableComponent /> */}
      {/* <StatusBarExample /> */}
      <UseRefHook />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // backgroundColor: '#f5f5f5',
    // padding: 20,
  },
});

export default App;