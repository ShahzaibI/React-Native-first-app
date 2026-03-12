import './global.css';
import { View, StyleSheet, LogBox } from 'react-native';
import React, { useEffect } from 'react';

// Ignore SafeAreaView deprecation warning
LogBox.ignoreLogs(['SafeAreaView has been deprecated']);

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
import ModalDialogBox from './src/components/ModalDialogBox';
import AlertExample from './src/components/AlertExample';
import GET_API from './src/components/GET_API';
import POST_API from './src/components/POST_API';
import PUT_API from './src/components/PUT_API';
import PATCH_API from './src/components/PATCH_API';
import DELETE_API from './src/components/DELETE_API';
import GET_API_LIST from './src/components/GET_API_LIST';
import PlatformExample from './src/components/PlatformExample';
import Search from './src/components/Search';
import AsyncStorageExample from './src/components/AsyncStorageExample';
import ImageComponent from './src/components/ImageComponent';
import Parent from './src/components/Parent';
import { Provider } from 'react-redux';
import {store } from './src/redux/store/store'
import CounterWithRedux from './src/components/CounterWithRedux';
import One from './src/components/One';
import MyLogin from './src/components/MyLogin';
import AnimatedCardFlip from './src/components/AnimatedCardFlip';
import Register from './src/components/Register';
import Login from './src/components/Login';
import ForgotPassword from './src/components/ForgotPassword';
import UserCRUD from './src/components/UserCRUD';
import UserRealtimeCRUD from './src/components/UserRealtimeCRUD';
import SwitchUI from './src/components/SwitchUI';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SplashScreen from 'react-native-splash-screen';

const Stack = createNativeStackNavigator();


import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { RootNavigator } from './src/navigation/RootNavigator';


const App = () => {

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  // return (
  //   <Provider store={store}>
  //     <View style={styles.container}>
  //       {/* <JSX /> */}
  //       {/* <UseStateHook /> */}
  //       {/* <Props /> */}
  //       {/* <OnPress /> */}
  //       {/* <InputText /> */}
  //       {/* <Styling /> */}
  //       {/* <FlatListScreen /> */}
  //       {/* <SectionListScreen /> */}
  //       {/* <LoginForm /> */}
  //       {/* <ContactListScreen /> */}
  //       {/* <Grid /> */}
  //       {/* <ClassComponents /> */}
  //       {/* <UseEffectHook /> */}
  //       {/* <UseEffectHookUpdatingPhase /> */}
  //       {/* <UseEffectHookUnmoiuntingPhase /> */}
  //       {/* <HideShowToggle /> */}
  //       {/* <StyleWithButton /> */}
  //       {/* <Loader /> */}
  //       {/* <PressableComponent /> */}
  //       {/* <StatusBarExample /> */}
  //       {/* <UseRefHook /> */}
  //       {/* <ModalDialogBox /> */}
  //       {/* <AlertExample /> */}
  //       {/* <GET_API /> */}
  //       {/* <POST_API /> */}
  //       {/* <PUT_API /> */}
  //       {/* <PATCH_API /> */}
  //       {/* <DELETE_API /> */}
  //       {/* <GET_API_LIST /> */}
  //       {/* <PlatformExample /> */}
  //       {/* <Search /> */}
  //       {/* <AsyncStorageExample /> */}
  //       {/* <ImageComponent /> */}

  //       {/* This is for Redux state managment */}
  //       {/* <CounterWithRedux /> */}

  //       {/* This is for Zustand state managment */}
  //       {/* <One /> */}

  //       {/* <MyLogin /> */}
  //       {/* <Register /> */}
  //       {/* <Login /> */}
  //       {/* <ForgotPassword /> */}
  //       {/* <NavigationContainer>
  //         <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
  //           <Stack.Screen name="Login" component={Login} />
  //           <Stack.Screen name="Register" component={Register} />
  //           <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
  //         </Stack.Navigator>
  //       </NavigationContainer> */}

  //       {/* <UserCRUD /> */}
  //       {/* <UserRealtimeCRUD /> */}
  //       {/* <SwitchUI /> */}
  //     </View>
      
  //   </Provider>
  // )

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaProvider>
        <NavigationContainer>
          <RootNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
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