/* eslint class-methods-use-this: ["error", { "exceptMethods": ["render"] }] */

import React from 'react';
import {
  StyleSheet,
  Platform,
} from 'react-native';
import { Constants } from 'expo';
import {
  TabNavigator,
  StackNavigator,
} from 'react-navigation';
import MainPage from './components/MainPage';
import ModulePage from './components/ModulePage';
import SettingsPage from './components/SettingsPage';
import ModuleSettingsPage from './components/ModuleSettingsPage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    marginTop: Platform.OS === 'ios' ? 20 : Constants.statusBarHeight,
  },
});

export default class App extends React.Component {
  render() {
    const MainNavigator = TabNavigator({
      Home: { screen: MainPage },
      Modules: { screen: ModulePage },
      Settings: { screen: SettingsPage },
    });

    const WrapperNavigator = StackNavigator({
      Home: { screen: MainNavigator },
      ModuleSettings: { screen: ModuleSettingsPage },
    }, {
      navigationOptions: {
        headerStyle: styles.headerStyle,
        title: 'Magic Mirror Admin App',
      },
    });

    // TODO: ESLint expects 'this' in this function.
    // Tried to make it static, but react requires a non-static function
    return (
      <WrapperNavigator onNavigationStateChange={null} />
    );
  }
}
