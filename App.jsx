import { View, StyleSheet, Button, Alert } from 'react-native';
import React from 'react';
// import JSX from './src/components/JSX';
// import OnPress from './src/components/OnPress';
// import UseStateHook from './src/components/UseStateHook';
// import Props from './src/components/Props';
// import InputText from './src/components/InputText';
// import Styling from './src/components/Styling';
// import FlatListScreen from './src/components/FlatListScreen';
// import SectionListScreen from './src/components/SectionListScreen';
// import LoginForm from './src/components/LoginForm';
// import ContactListScreen from './src/screens/Contact/ContactListScreen';
// import Grid from './src/components/Grid';
// import ClassComponents from './src/components/ClassComponents';
// import UseEffectHook from './src/components/UseEffectHook';
// import UseEffectHookUpdatingPhase from './src/components/UseEffectHookUpdatingPhase';
// import UseEffectHookUnmoiuntingPhase from './src/components/UseEffectHookUnmoiuntingPhase';
// import HideShowToggle from './src/components/HideShowToggle';
// import StyleWithButton from './src/components/StyleWithButton';
// import Loader from './src/components/Loader';
// import PressableComponent from './src/components/PressableComponent';
// import StatusBarExample from './src/components/StatusBarExample';
// import UseRefHook from './src/components/UseRefHook';
// import ModalDialogBox from './src/components/ModalDialogBox';
// import AlertExample from './src/components/AlertExample';
// import GET_API from './src/components/GET_API';
// import POST_API from './src/components/POST_API';
// import PUT_API from './src/components/PUT_API';
// import PATCH_API from './src/components/PATCH_API';
// import DELETE_API from './src/components/DELETE_API';
// import GET_API_LIST from './src/components/GET_API_LIST';
// import PlatformExample from './src/components/PlatformExample';
// import Search from './src/components/Search';
 

// const App = () => {
//   return (
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
//       <Search />
//     </View>
//   )
// }

import Header from './src/navigations/Header';
import Example from './src/navigations/Example';
import Login from './src/navigations/Login';
import Home from './src/navigations/Home';
import About from './src/navigations/About';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';

import { createDrawerNavigator } from '@react-navigation/drawer';
import { HomeComp, Profile, Settings } from './src/drawerNavigation/DrawerNavigationComponents';
import 'react-native-gesture-handler';


import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { HomeScreen, ProfileScreen, SettingScreen } from './src/tabNavigation/TabNavigationComponents';
import Icon from 'react-native-vector-icons/Ionicons';

// const getTabBarIcon = (route, focused, color, size) => {
//   let iconName;

//   if (route === 'Home'){
//     iconName = focused ? 'home' : 'home-outline';
//   }
//   else if (route === 'Profile') {
//     iconName = focused ? 'person' : 'person-outline';
//   }
//   else if (route === 'Settings') {
//     iconName = focused ? 'settings' : 'settings-outline';
//   }

//   // You can return any component that you like here!
//   return <Icon name={iconName} size={size} color={color} />;
// };


import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {  ChatScreen, StatusScreen, CallsScreen } from './src/tabNavigation/TopTabNavigationComponents';


// For react Navigations
// const Stack = createNativeStackNavigator();
// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();
const TabTop = createMaterialTopTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* Stack navigation */}
      {/* <Stack.Navigator
        screenOptions={{ // This style for global
          headerStyle: styles.header,
          headerTitleStyle: styles.headerTitle,
          headerTintColor: 'white',
          contentStyle: styles.screen
        }}
      >
        <Stack.Screen name="Header" component={Header} 
          options={{
            title: '',
            // headerTitle: () => <Button title='One' color="red"/>,
            // headerRight: () => <Button title='One' color="green"/>,
            headerTitle: HeaderTitle,
            // headerRight: HeaderRight,
            headerRight: MyExample,
          }}
        />
        <Stack.Screen name="Login" component={Login} 
        // options={{ // This style for single screen component
        //   title: 'My Login Form',
        //   headerTintColor: 'red',
        //   headerTitleStyle:{
        //     fontSize: 30,
        //     color: 'yellow'
        //   },
        //   headerStyle: {
        //     backgroundColor: 'red',
        //   },
        // }}
        />
        <Stack.Screen name="Home" component={Home} options={{headerShown:false}} />
        <Stack.Screen name="About" component={About}/>
      </Stack.Navigator> */}





      {/* -------------------------------------------------------------------------------------- */}

      {/* Drawer navigation */}
      {/* <Drawer.Navigator 
        screenOptions={{
          drawerStyle:{
            backgroundColor: '#e6e6e6',
            width: 240,
          },
          drawerLabelStyle:{
            fontSize: 18,
            color: '#333',
          },
          headerStyle:{
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        }}
      >
        <Drawer.Screen name="Home" component={HomeComp} />
        <Drawer.Screen name="About" component={Profile} />
        <Drawer.Screen name="Settings" component={Settings} />
      </Drawer.Navigator> */}


      {/* -------------------------------------------------------------------------------------- */}

      {/* Bottom tab navigation */}
      {/* <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => getTabBarIcon(route.name, focused, color, size),

          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
          // headerShown: false,
          tabBarStyle: {
            paddingBottom: 5,
            height: 60,
            // backgroundColor: '#f5f5f5',
          },
          headerStyle:{
            backgroundColor: '#6200ee',
          },
          headerTintColor: '#fff',
          headerTitleAlign: 'center',
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Settings" component={SettingScreen} />
    </Tab.Navigator> */}

    {/* -------------------------------------------------------------------------------------- */}

    {/* Top tab navigation */}

      <TabTop.Navigator
        screenOptions={{
          tabBarActiveTintColor: '#007bff',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle:{backgroundColor: '#fff'},
          tabBarIndicatorStyle: { // for active tab bar
            backgroundColor: '#007bff',
            height: 3,
          },
          tabBarLabelStyle: {fontWeight: 'bold'},
        }}
      >
        <TabTop.Screen name="Chat" component={ChatScreen} />
        <TabTop.Screen name="Status" component={StatusScreen} />
        <TabTop.Screen name="Calls" component={CallsScreen} />
      </TabTop.Navigator>
    </NavigationContainer>
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

  header:{
    backgroundColor: '#6300EE',
  },
  headerTitle:{
    color: 'white',
    fontSize: 26,
    fontWeight: 'bold',
  },
  screen:{
    flex: 1,
    backgroundColor: 'lightgreen',
    padding: 20,
  },
});

export default App;