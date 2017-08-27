import React from 'react';
import {
  StyleSheet,
  TouchableNativeFeedback,
  TouchableHighlight,
  Platform,
} from 'react-native';
import { ListItem } from 'react-native-elements';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',

  },
  text: {
    marginLeft: 12,
    fontSize: 16,

  },
});


export default class RowItem extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    // I have no idea what navigation really is, so I'm just gonna assume an Object
    navigation: PropTypes.object.isRequired,
  }
  onPress = () => {
    this.props.navigation.navigate('ModuleSettings', this.props);
  }

  render() {
    if (Platform.OS === 'android') {
      return (
        <TouchableNativeFeedback
          onPress = { this.onPress }
          background = { TouchableNativeFeedback.SelectableBackground() }>
          <ListItem
            title = { this.props.name }
          />
        </TouchableNativeFeedback>
      );
    }

    return (
      <TouchableHighlight
        onPress = { this.onPress }
      >
        <ListItem
          title = { this.props.name }
        />
      </TouchableHighlight>
    );
  }
}
