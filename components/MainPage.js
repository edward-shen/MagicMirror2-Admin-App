import React, { Component } from 'react';
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
    
    _rootHTML = "http://192.168.1.133:8080/remote?";
    
    _sendMessage(msgType, payload = { }) {
        
        let url = this._rootHTML;
        
        // Special cases
        switch (msgType) {
            case "PAGE_INCREMENT":
                url += "action=NOTIFICATION&notification=";
                break;
            case "PAGE_DECREMENT":
                url += "action=NOTIFICATION&notification=";
                break;
            default:
                url += "action=";
        }
        
        console.log(url + msgType);
        
        fetch(url + msgType, payload);
    }
    
    _confirmThenSend(msgType, payload = { }) {
        Alert.alert(
            'Warning',
            'Are you sure you wish to ' + msgType.toLowerCase() + "?",
            [
                {text: 'Cancel', style: 'cancel'},
                {text: 'OK', onPress: () => this._sendMessage(msgType, payload)},
            ]
        );
    }
    
    render() {
        return (
            <ScrollView>
                <Card title='Monitor Settings'>
                    <Button
                        icon={{name: 'visibility'}}
                        backgroundColor = '#03A9F4'
                        onPress = {() => this._sendMessage("MONITORON")}
                        title= 'On' />
                    <Button
                        icon = {{name: 'visibility-off'}}
                        backgroundColor = '#03A9F4'
                        onPress={() => this._sendMessage("MONITOROFF")}
                        title='Off' />
                </Card>
                
                <Card title='Raspberry Pi Settings'>
                    <Button
                        icon={{name: 'power-settings-new'}}
                        backgroundColor='#03A9F4'
                        onPress={() => this._confirmThenSend("SHUTDOWN")}
                        title='Shutdown' />
                    <Button
                        icon={{name: 'autorenew'}}
                        backgroundColor='#03A9F4'
                        onPress={() => this._confirmThenSend("REBOOT")}
                        title='Reboot' />
                </Card>
                
                <Button
                    title="Page Increment"
                    onPress={() => this._sendMessage("PAGE_INCREMENT")}
                />
                <Button
                    title="Page Decrement"
                    onPress={() => this._sendMessage("PAGE_DECREMENT")}
                />
            </ScrollView>
        );
    }
}
