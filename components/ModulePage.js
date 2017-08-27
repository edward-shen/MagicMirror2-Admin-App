import React, { Component } from 'react';
import {
    Button,
    ScrollView,
    AsyncStorage,
    ListView,
    View,
    Text,
    StyleSheet
} from 'react-native';
import LoadingContainer from 'react-native-loading-container';

import ListItem from './ListItem';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
    height: 100,
  },
});

export default class ModulePage extends React.Component {
    constructor() {
        super();
        
        this._getModuleDataPromise = this._getModuleDataPromise.bind(this);
        this._onReadyAsync = this._onReadyAsync.bind(this);
        
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([{name: "test"} , {name: "test1" } ])
        };
        
    }
    
    async _getModuleDataPromise() {
        return await fetch("http://192.168.1.133:8080/remote?action=MODULE_DATA").then(
            (resp) => {return resp.json()}
        );  
        
        const self = this;
        try {
            const address = await AsyncStorage.getItem("MIRROR_IP_ADDRESS");
            const port = await AsyncStorage.getItem("MIRROR_PORT");
            if (address !== null) {
                // Fetch returns a promise, which contains our json data
                // the json data returned is actually still a promise, so we need to use another .then()
                // properly parse it
                return await fetch("http://" + address + ":" + (port ? port !== null : "8080") + "/remote?action=MODULE_DATA").json();
            } else {
                console.log("address is null!")
            }
        } catch (err) {
            console.log(err);
        }
        
    }
    
    async _onReadyAsync( {moduleData: data} ) {
        let dataSource = this.state.dataSource.cloneWithRows(data);
        console.log("setting datasource!");
        return new Promise((resolve) => {
            this.setState({dataSource}, resolve);
        });
        
    }
    
    render() {
        const self = this;
        return (
            <LoadingContainer
                style={styles.container}
                onLoadStartAsync = { this._getModuleDataPromise }
                onReadyAsync = { this._onReadyAsync } >
                {
                    <ListView
                        style={styles.container}    
                        dataSource = { this.state.dataSource }
                        renderRow = { data => <ListItem {...data} /> }
                    />
                }
            </LoadingContainer>
        );
    }
}
