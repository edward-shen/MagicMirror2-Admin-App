import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableHighlight,
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
        flexDirection: 'row',
        alignItems: 'center',
        
    },
    text: {
        marginLeft: 12,
        fontSize: 16,
        
    },
});


const ListItem = (props) => (
    <TouchableHighlight
        style = {styles.container}
        onPress = {console.log(props.name)}
    >
        <Text style = {styles.text}>
            {`${props.name}`}
        </Text>
    </TouchableHighlight>
);

export default ListItem;
