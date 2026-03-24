import './global.css';
import { LogBox } from 'react-native';
import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/redux/store/store';
import SplashScreen from 'react-native-splash-screen';
import 'react-native-gesture-handler';

// Ignore SafeAreaView deprecation warning
LogBox.ignoreLogs(['SafeAreaView has been deprecated']);

import AppNavigator from './src/navigation/AppNavigator';

const App = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

export default App;