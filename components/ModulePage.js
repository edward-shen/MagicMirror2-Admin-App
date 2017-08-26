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

export default class ModulePage extends React.Component {
    constructor() {
        super();
        this._getModuleData();
        
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
    
    render() {
        const self = this;
        return (
            <ScrollView>
                <Button
                    raised
                    icon = {{name: "refresh"}}
                    onPress = { () => this._getModuleData() }
                    title = "Refresh Module Data" />
                    
                <List>
                    {
                        self._moduleData.map((item, i) => (
                            <ListItem
                                key={i}
                                title={item.name}
                                subtitle={item.identifier} 
                            />
                        ))
                    }
                </List>
                </ScrollView>
        );
    }
}
