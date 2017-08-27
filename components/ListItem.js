import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
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
  onPress = () => {
    console.log(this.props.name);
  }

  render() {
    return (
      <ListItem
        onPress = { this.onPress }
        title = { this.props.name }
      />
    );
  }
}

RowItem.propTypes = {
  name: PropTypes.string.isRequired,
};
