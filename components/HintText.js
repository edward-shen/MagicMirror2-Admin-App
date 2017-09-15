import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  textAlign: 'center',
  textAlignVertical: 'center',
});

export default function HintText(props) {
  return (
    <View>
      <Text style={styles}>{props.children}</Text>
    </View>
  );
}

HintText.propTypes = {
  children: PropTypes.object.isRequired,
};
