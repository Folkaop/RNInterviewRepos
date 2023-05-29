import React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const AboutScreen = () => (
    <View style={styles.container}>
        <Text style={styles.text}>About Screen</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 24,
        textAlign: 'center',
    },
});

export default AboutScreen;
