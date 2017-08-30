import React from 'react';
import {
  AsyncStorage,
  View,
} from 'react-native';
import {
  Card,
  FormLabel,
  FormInput,
  FormValidationMessage,
} from 'react-native-elements';

// TODO: standardize function names (checkIsIPv4, isValidPort, etc)
export default class SettingsPage extends React.Component {
  checkIsIPv4 = (entry) => {
    const blocks = entry.split('.');
    if (blocks.length === 4) {
      console.log(`${entry} is a valid ip address!`);
      return blocks.every(block =>
        (!isNaN(block) && parseInt(block, 10) >= 0 && parseInt(block, 10) <= 255));
    }
    console.log(`${entry} is not a valid ip address`);
    return false;
  }

  isValidPort = (str) => {
    const n = Math.floor(Number(str));
    return String(n) === str && n > 0 && n <= 65535;
  }

  constructor() {
    super();
    this.state = {
      isLoading: true,
      ipAddress: '',
    };
  }

  handleIPSettings = async (text) => {
    if (this.checkIsIPv4(text)) {
      this.setState({ ipAddress: text });
      await AsyncStorage.setItem('MIRROR_IP_ADDRESS', text);
    } else {
      AsyncStorage.setItem('MIRROR_IP_ADDRESS', '127.0.0.1');
    }
  }

  handlePortSettings = async (text) => {
    if (this.isValidPort(text)) {
      this.setState({ port: text });
      await AsyncStorage.setItem('MIRROR_PORT', text);
    } else {
      AsyncStorage.setItem('MIRROR_PORT', '8080');
    }
  }

  componentWillMount() {
    if (this.state.isLoading) {
      AsyncStorage.getItem('MIRROR_IP_ADDRESS').then((address) => {
        this.setState({
          ipAddress: address,
        });
      });
      AsyncStorage.getItem('MIRROR_PORT').then((mirrorPort) => {
        this.setState({
          port: mirrorPort,
        });
      }).then(() => this.setState({ isLoading: false }));
    }
  }

  render() {
    if (this.state.isLoading) { return <View />; }

    return (
      <Card title = 'Mirror Network Settings'>
        <FormLabel>Mirror IPv4 Address</FormLabel>
        <FormInput
          keyboardType = 'numeric'
          maxLength = {15}
          onChangeText = {text => this.handleIPSettings(text.replace(/ /g, ''))}
          defaultValue = { this.state.ipAddress }
          placeHolder = "Your mirror's IP address"
        />
        <FormValidationMessage>
          {
            // TODO: Optimize
            this.state.ipAddress !== '' && // Empty str check first
            !this.checkIsIPv4(this.state.ipAddress) &&
            'this is not a valid ip address!'
          }
        </FormValidationMessage>

        <FormLabel>Mirror Access Port</FormLabel>
        <FormInput
          keyboardType = 'numeric'
          maxLength = {5}
          onChangeText = {text => this.handlePortSettings(text)}
          defaultValue = { this.state.port }
          placeHolder = "Your mirror's web port. Default: 8080."
        />

        <FormValidationMessage>
          {
            // TODO: Optimize
            this.state.port !== '' && // Empty str check first
            !this.isValidPort(this.state.port) &&
            'this is not a valid port!'
          }
        </FormValidationMessage>
      </Card>
    );
  }
}
