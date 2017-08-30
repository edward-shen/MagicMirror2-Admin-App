import React from 'react';
import {
  ScrollView,
  Alert,
  AsyncStorage,
} from 'react-native';
import {
  Button,
  Card,
} from 'react-native-elements';

export default class MainPage extends React.Component {
  sendMessage = async (msgType, payload = { }) => {
    const ipAddress = await AsyncStorage.getItem('MIRROR_IP_ADDRESS');
    const port = await AsyncStorage.getItem('MIRROR_PORT');
    let url = `http://${ipAddress}:${port}/remote?action=`;

    // Special cases
    if (msgType === 'PAGE_INCREMENT' || msgType === 'PAGE_DECREMENT') {
      url += 'NOTIFICATION&notification=';
    }

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
            onPress={() => this.sendMessage('MONITORON')}
            title='On' />
          <Button
            icon={{ name: 'visibility-off' }}
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

        <Card title='Magic Mirror Settings'>
          <Button
            icon={{ name: 'autorenew' }}
            backgroundColor='#03A9F4'
            onPress={() => this.confirmThenSend('REFRESH')}
            title='Refresh' />
          <Button
            icon={{ name: 'power-settings-new' }}
            backgroundColor='#03A9F4'
            onPress={() => this.confirmThenSend('RESTART')}
            title='Restart' />
          <Button
            icon={{ name: 'power-settings-new' }}
            backgroundColor='#03A9F4'
            onPress={() => this.confirmThenSend('UPDATE')}
            title='Update' />
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
