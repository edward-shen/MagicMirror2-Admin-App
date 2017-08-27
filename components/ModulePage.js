import React, { Component } from 'react';
import {
    Button,
    ScrollView,
    AsyncStorage,
    ListView,
    View,
    Text,
    StyleSheet,
    RefreshControl,
} from 'react-native';
import LoadingContainer from 'react-native-loading-container';

import ListItem from './ListItem';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 100,
  },
  separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
  },
});

export default class ModulePage extends React.Component {
    constructor() {
        super();
        
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.state = {
            dataSource: ds.cloneWithRows([{name: "test"}, {name: "testt"}]),
            refreshing: false
        };
        
    }
    
    _getModuleDataPromise = async () => {
        console.log("getting module data!");
        return await fetch("http://192.168.1.133:8080/remote?action=MODULE_DATA")
            .then(resp => {return resp.json()});  
        
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
    
    _onReadyAsync = async ({moduleData: data}) => {
        console.log("setting module data!");
        let newDataSource = this.state.dataSource.cloneWithRows(data);
        return new Promise((resolve) => {
            this.setState({ dataSource: newDataSource }, resolve)
        });
        
    }
    
    _onRefresh = () => {
        this.setState(prevSource => { refreshing: true });
        
        this._getModuleDataPromise()
            .then( resp => { return this._onReadyAsync(resp) })
            .then( () => { this.setState( () => {refreshing: false}) });
        
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
                        refreshControl = {
                            <RefreshControl
                                refreshing = { this.state.refreshing }
                                onRefresh = { this._onRefresh }
                            />
                        }
                        style = {styles.container}    
                        dataSource = { this.state.dataSource }
                        renderRow = { data => <ListItem {...data} /> }
                        renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
                    />
                }
            </LoadingContainer>
        );
    }
}
