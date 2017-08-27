import React from 'react';
import {
  Text,
} from 'react-native';

export default class SettingsPage extends React.Component {
  checkIsIPV4 = (entry) => {
    const blocks = entry.split('.');
    if (blocks.length === 4) {
      return blocks.every(block =>
        (!isNaN(block) && parseInt(block, 10) >= 0 && parseInt(block, 10) <= 255));
    }
    return false;
  }

  render() {
    return (
      <Text> test </Text>
    );
  }
}
