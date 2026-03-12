import { NavigatorScreenParams } from '@react-navigation/native';
import { StackScreenProps } from '@react-navigation/stack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { DrawerScreenProps } from '@react-navigation/drawer';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  MainApp: NavigatorScreenParams<MainDrawerParamList>;
  SplashScreen: undefined;
};

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
  ForgotPasswordScreen: undefined;
};

export type MainDrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabsParamList>;
  ProfileScreen: undefined;
  SettingsScreen: undefined;
  LogoutScreen: undefined;
};

export type MainTabsParamList = {
  HomeScreen: undefined;
  AttendanceScreen: undefined;
  LeaveScreen: undefined;
  PayrollScreen: undefined;
};

// Navigation Props Types
export type RootStackScreenProps<T extends keyof RootStackParamList> = StackScreenProps<
  RootStackParamList,
  T
>;

export type AuthStackScreenProps<T extends keyof AuthStackParamList> = StackScreenProps<
  AuthStackParamList,
  T
>;

export type MainDrawerScreenProps<T extends keyof MainDrawerParamList> = DrawerScreenProps<
  MainDrawerParamList,
  T
>;

export type MainTabsScreenProps<T extends keyof MainTabsParamList> = BottomTabScreenProps<
  MainTabsParamList,
  T
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
