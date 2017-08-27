import React from 'react';
import {
  StyleSheet,
  Text,
  TouchableHighlight,
} from 'react-native';
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


export default class ListItem extends React.Component {
  onPress = () => {
    console.log(this.props.name);
  }

  render() {
    return (
      <TouchableHighlight
        style = { styles.container }
        onPress = { this.onPress }
      >
        <Text style = {styles.text}>
          {`${this.props.name}`}
        </Text>
      </TouchableHighlight>
    );
  }
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
};
