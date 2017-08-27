import React from 'react';
import {
  AsyncStorage,
  ListView,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import LoadingContainer from 'react-native-loading-container';

import RowItem from './ListItem';


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

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows([{ name: 'test' }, { name: 'testt' }]),
      refreshing: false,
    };
  }

    getModuleDataPromise = async () => {
      console.log('getting module data!');

      try {
        const address = await AsyncStorage.getItem('MIRROR_IP_ADDRESS');
        const port = await AsyncStorage.getItem('MIRROR_PORT');
        if (address !== null) {
          // Fetch returns a promise, which contains our json data
          // the json data returned is actually still a promise, so we need to use another .then()
          // properly parse it
          return await fetch(`http://${address}:${port ? port !== null : '8080'}/remote?action=MODULE_DATA`).json();
        }
        console.log('address is null!');
      } catch (err) {
        console.log(err);
      }

      return fetch('http://192.168.1.133:8080/remote?action=MODULE_DATA')
        .then(resp => resp.json());
    }

    onReadyAsync = async ({ moduleData: data }) => {
      console.log('setting module data!');
      const newDataSource = this.state.dataSource.cloneWithRows(data);
      return new Promise((resolve) => {
        this.setState({ dataSource: newDataSource }, resolve);
      });
    }

    onRefresh = () => {
      this.setState({ refreshing: true });

      this.getModuleDataPromise()
        .then(resp => this.onReadyAsync(resp))
        .then(() => { this.setState({ refreshing: false }); });
    }

    render() {
      return (
        <LoadingContainer
          style={styles.container}
          onLoadStartAsync = { this.getModuleDataPromise }
          onReadyAsync = { this.onReadyAsync } >
          {
            <ListView
              refreshControl = {
                <RefreshControl
                  refreshing = { this.state.refreshing }
                  onRefresh = { this.onRefresh }
                />
              }
              style = {styles.container}
              dataSource = { this.state.dataSource }
              renderRow = { data => <RowItem {...data} /> }
            />
          }
        </LoadingContainer>
      );
    }
}
