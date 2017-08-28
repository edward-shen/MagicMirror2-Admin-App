import React from 'react';
import {
  ScrollView,
  AsyncStorage,
  View,
} from 'react-native';
import {
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';

export default class SettingsPage extends React.Component {
  checkIsIPV4 = (entry) => {
    const blocks = entry.split('.');
    if (blocks.length === 4) {
      console.log(`${entry} is a valid ip address!`);
      return blocks.every(block =>
        (!isNaN(block) && parseInt(block, 10) >= 0 && parseInt(block, 10) <= 255));
    }
    console.log(`${entry} is not a valid ip address`);
    return false;
  }

  constructor() {
    super();
    this.state = {
      isLoading: true,
      ipAddress: '',
    };
  }

  handleIPSettings = async (text) => {
    if (this.checkIsIPV4(text)) {
      this.setState({ ipAddress: text });
      try {
        await AsyncStorage.setItem('MIRROR_IP_ADDRESS', text);
      } catch (err) {
        console.log(err);
      }
    } else {
      AsyncStorage.setItem('MIRROR_IP_ADDRESS', '127.0.0.1');
    }
  }

  componentWillMount() {
    if (this.state.isLoading) {
      AsyncStorage.getItem('MIRROR_IP_ADDRESS').then((address) => {
        this.setState({
          ipAddress: address,
          isLoading: false,
        });
      });
    }
  }

  render() {
    if (this.state.isLoading) { return <View />; }

    return (
      <ScrollView>
        <FormLabel>IPv4 Address</FormLabel>
        <FormInput
          keyboardType = 'numeric'
          maxLength = {15}
          onChangeText = {text => this.handleIPSettings(text.replace(/ /g, ''))}
          defaultValue = { this.state.ipAddress }
          placeHolder = "Your mirror's IP address"
        />
        <FormValidationMessage>
          {
            this.state.ipAddress !== '' && // Empty str check first
            !this.checkIsIPV4(this.state.ipAddress) &&
            'this is not a valid ip address!'
          }
        </FormValidationMessage>
      </ScrollView>
    );
  }
}
