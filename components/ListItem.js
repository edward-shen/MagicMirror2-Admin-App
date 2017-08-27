import React from 'react';
import {
    StyleSheet,
    Text,
    View,
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
    <View style = {styles.container}>
        <Text style = {styles.text}>
            {`${props.name}`}
        </Text>
    </View>
);

export default ListItem;
