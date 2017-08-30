import React from 'react';
import {
  AsyncStorage,
  ListView,
  StyleSheet,
  RefreshControl,
  ScrollView,
  Text,
} from 'react-native';
import PropTypes from 'prop-types';
import RowItem from './RowItem';

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
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  constructor() {
    super();

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds,
      refreshing: false,
    };

    this.getModuleDataPromise()
      .then(resp => this.onReadyAsync(resp), this.onFailedModuleDataGet)
      .then(() => this.setState({ refreshing: false }));
  }

    getModuleDataPromise = async () => {
      console.log('getting module data!');
      let address = await AsyncStorage.getItem('MIRROR_IP_ADDRESS');
      const port = await AsyncStorage.getItem('MIRROR_PORT');

      if (address !== null) {
        console.log(`address is ${address}`);
      } else {
        console.log('address is null! defaulting to localloopback');
        address = '127.0.0.1'; // Return loopback
      }

      return fetch(`http://${address}:${port !== null ? port : '8080'}/remote?action=MODULE_DATA`).then(resp => resp.json());
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
        .then(resp => this.onReadyAsync(resp), this.onFailedModuleDataGet)
        .then(() => this.setState({ refreshing: false }));
    }

    onFailedModuleDataGet = () => {
      this.setState({
        dataSource: new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 }),
        refreshing: false,
      });
    }


    render() {
      const refreshControl =
        <RefreshControl
          refreshing={this.state.refreshing}
          onRefresh={this.onRefresh}
        />;

      if (this.state.dataSource.getRowCount() === 0) {
        return (
          <ScrollView refreshControl={refreshControl}>
            <Text>
              PULL DOWN TO REFRESH
            </Text>
          </ScrollView>
        );
      }

      return (
        <ListView
          enableEmptySections={true}
          refreshControl={refreshControl}
          style={styles.container}
          dataSource={this.state.dataSource}
          renderRow={data => <RowItem navigation = {this.props.navigation} {...data} />}
        />
      );
    }
}
