import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Platform,
  AsyncStorage,
} from 'react-native';
import { Constants } from 'expo';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';


import MainPage from './components/MainPage';
import ModulePage from './components/ModulePage';
import SettingsPage from './components/SettingsPage';


export default class App extends React.Component {
  render() {
    return (
      <ScrollableTabView style={styles.headerStyle}>
        <MainPage tabLabel="Home" />
        <ModulePage tabLabel="Modules" />
        <SettingsPage tabLabel="Settings" />
      </ScrollableTabView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerStyle: {
    height: Constants.statusBarHeight + (Platform.OS === 'ios' ? 44 : 56),
    paddingTop: Platform.OS === 'ios' ? 20 : Constants.statusBarHeight,
  },
});
