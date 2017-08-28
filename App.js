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

const MainNavigator = TabNavigator({
  Home: { screen: MainPage },
  Modules: { screen: ModulePage },
  Settings: { screen: SettingsPage },
});

const App = StackNavigator({
  Home: { screen: MainNavigator },
  ModuleSettings: { screen: ModuleSettingsPage },
}, {
  navigationOptions: { headerStyle: styles.headerStyle },
});

export default App;

