import React from 'react';
import {
  ScrollView,
  Text,
} from 'react-native';
import {
  Card,
  Button,
} from 'react-native-elements';
import PropTypes from 'prop-types';

export default class ModuleSettingsPage extends React.Component {
  static propTypes = {
    navigation: PropTypes.object.isRequired,
  }

  static navigationOptions = ({ navigation }) => ({
    title: `Module Settings: ${navigation.state.params.name}`,
  })

  toTitleCase = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

  render() {
    const { params } = this.props.navigation.state;
    return (
      <ScrollView>
        <Card title = 'General properties'>
          <Text>
            <Text style = {{ fontWeight: 'bold' }}>Name: </Text>
            <Text>{ params.name }</Text>
          </Text>
          <Text>
            <Text style = {{ fontWeight: 'bold' }}>Visible: </Text>
            <Text>{ params.hidden ? 'No' : 'Yes'}</Text>
          </Text>
          <Text>
            <Text style = {{ fontWeight: 'bold' }}>Identifier: </Text>
            <Text>{ params.identifier }</Text>
          </Text>
          { 'position' in params &&
            <Text>
              <Text style = {{ fontWeight: 'bold' }}>Position: </Text>
              <Text>{ this.toTitleCase(params.position.replace('_', ' ')) }</Text>
            </Text>
          }
        </Card>

        <Card title = "Visibility">
          <Text>Currently locked by {params.lockStrings}</Text>
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
      </ScrollView>
    );
  }
}
