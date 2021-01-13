import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

const Card = props => {
    return (
        <View style = {{...styles.card, ...props.style}}>{props.children}</View>
    );
};

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOffset: { width: 2, height: 2},
        shadowRadius: 6,
        shadowOpacity: 0.26,
        elevation: 8,
        backgroundColor: 'white',
        width: '50%',
        padding: 20,
        borderRadius: 20,
    }
});

export default Card;