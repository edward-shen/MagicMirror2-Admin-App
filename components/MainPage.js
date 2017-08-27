import React from 'react';
import {
  ScrollView,
  Alert,
} from 'react-native';
import {
  Button,
  Card,
} from 'react-native-elements';

export default class MainPage extends React.Component {
    rootHTML = 'http://192.168.1.133:8080/remote?';

    sendMessage(msgType, payload = { }) {
      let url = this.rootHTML;

      // Special cases
      switch (msgType) {
        case 'PAGE_INCREMENT':
          url += 'action=NOTIFICATION&notification=';
          break;
        case 'PAGE_DECREMENT':
          url += 'action=NOTIFICATION&notification=';
          break;
        default:
          url += 'action=';
      }

      console.log(url + msgType);

      fetch(url + msgType, payload);
    }

    confirmThenSend(msgType, payload = { }) {
      Alert.alert(
        'Warning',
        `Are you sure you wish to ${msgType.toLowerCase()}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'OK', onPress: () => this.sendMessage(msgType, payload) },
        ],
      );
    }

    render() {
      return (
        <ScrollView>
          <Card title='Monitor Settings'>
            <Button
              icon={{ name: 'visibility' }}
              backgroundColor = '#03A9F4'
              onPress = {() => this.sendMessage('MONITORON')}
              title= 'On' />
            <Button
              icon = {{ name: 'visibility-off' }}
              backgroundColor = '#03A9F4'
              onPress={() => this.sendMessage('MONITOROFF')}
              title='Off' />
          </Card>

          <Card title='Raspberry Pi Settings'>
            <Button
              icon={{ name: 'power-settings-new' }}
              backgroundColor='#03A9F4'
              onPress={() => this.confirmThenSend('SHUTDOWN')}
              title='Shutdown' />
            <Button
              icon={{ name: 'autorenew' }}
              backgroundColor='#03A9F4'
              onPress={() => this.confirmThenSend('REBOOT')}
              title='Reboot' />
          </Card>

          <Button
            title="Page Increment"
            onPress={() => this.sendMessage('PAGE_INCREMENT')}
          />
          <Button
            title="Page Decrement"
            onPress={() => this.sendMessage('PAGE_DECREMENT')}
          />
        </ScrollView>
      );
    }
}
