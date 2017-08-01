import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    ActivityIndicator,
} from 'react-native'

class Loading extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const { backgroundColor = 'white', color = '#333', showText = true } = this.props
        return (
            <View style={[styles.container, { backgroundColor }]}>
                <ActivityIndicator size ="large" color={color} />
                { showText ? <Text>loading...</Text> : null }
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})

export default Loading
