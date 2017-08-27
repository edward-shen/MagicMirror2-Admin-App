import React, { Component } from 'react';
import {
    Button,
    ScrollView,
    AsyncStorage,
} from 'react-native';
import {
    List,
    ListItem,
} from 'react-native-elements';
import LoadingContainer from 'react-native-loading-container';

export default class ModulePage extends React.Component {
    constructor() {
        super();
        
        this._getModuleDataPromise = this._getModuleDataPromise.bind(this);
        this._onReadyAsync = this._onReadyAsync.bind(this);
        
        this.state = {
            moduleData: [],
        };
        
    }
    
    _moduleData = [];
    
    async _getModuleData() {
        const self = this;
        console.log("trying to get data");
        try {
            const address = await AsyncStorage.getItem("MIRROR_IP_ADDRESS");
            const port = await AsyncStorage.getItem("MIRROR_PORT");
            if (address !== null) {
                // Fetch returns a promise, which contains our json data
                // the json data returned is actually still a promise, so we need to use another .then()
                // properly parse it
                fetch("http://" + address + ":" + (port ? port !== null : "8080") + "/remote?action=MODULE_DATA")
                    .then(function(resp) { return resp.json() })
                    .then(function(data) {
                        this._moduleData = data["moduleData"];
                        
                    });
            } else {
                console.log("address is null!")
            }
            
            fetch("http://192.168.1.133:8080/remote?action=MODULE_DATA")
                .then(function(resp) { return resp.json() })
                .then(function(data) {
                    self._moduleData = data.moduleData;
                    
                    // calling forceUpdate() is discouraged as it creates an anti-pattern.
                    // This function could likely be avoided if I extended the List class.
                    // For now, this is sufficient and doesn't hinder performance.
                    self.forceUpdate();
                });
        } catch (err) {
            console.log(err);
        }
        
        console.log ("testa " + this._moduleData);
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
        const self = this;
        return new Promise((resolve) => {
            self.setState({ moduleData: data }, resolve);
        });
        
    }
    render() {
        const self = this;
        return (
            <ScrollView>
                <Button
                    raised
                    icon = {{name: "refresh"}}
                    onPress = { () => this._getModuleData() }
                    title = "Refresh Module Data" />
                    
                <LoadingContainer
                    onLoadStartAsync = { this._getModuleDataPromise }
                    onReadyAsync = { this._onReadyAsync } >
                    
                    <List>
                        {
                            self.state.moduleData.map((item, i) => (
                                <ListItem
                                    key={item.identifier}
                                    title={item.name}
                                    subtitle={item.identifier} 
                                />
                            ))
                        }
                    </List>
                </LoadingContainer>
            </ScrollView>
        );
    }
}
