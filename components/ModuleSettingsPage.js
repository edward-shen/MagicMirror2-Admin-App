import React from 'react';
import {
  View,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';

export default class ModuleSettingsPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object,
  }
  render() {
    const { params } = this.props.navigation.state;
    return (
      <View><Text>{params.name}</Text></View>
    );
  }
}
