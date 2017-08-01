import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
} from 'react-native'

import PureRenderMixin from 'react-addons-pure-render-mixin'

import commonStyles from '../styles';

class Menu extends Component {
    constructor(props) {
        super(props)

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        return (
            <View style={commonStyles.container}>
                <View>
                    <Image source={require('../images/bg.jpg')} style={styles.bg}/>
                    <Image source={require('../images/avatar.jpg')} style={styles.img}/>
                    <Text style={styles.name}>Dev Fang</Text>
                </View>
                <Text>Menu</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    bg: {
        width: 300,
        height: 200,
        resizeMode: Image.resizeMode.stretch,
    },
    img: {
        position: 'absolute',
        left: 20,
        bottom: 60,
        width: 70,
        height: 70,
        borderRadius: 40,
    },
    name: {
        color: 'white',
        position: 'absolute',
        left: 20,
        bottom: 25,
        fontSize: 18,
    },
})

export default Menu
