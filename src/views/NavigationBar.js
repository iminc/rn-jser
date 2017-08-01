import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    StatusBar,
    TouchableOpacity,
} from 'react-native'

import PureRenderMixin from 'react-addons-pure-render-mixin'

class NavigationBar extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    renderNavIcon() {
        const { icon = {} } = this.props
        const { src, style, onPress } = icon

        return (
            <TouchableOpacity
                style={styles.iconContainer}
                activeOpacity={1}
                onPress={onPress}>
                <Image source={src} style={[styles.icon, style]}/>
            </TouchableOpacity>
        )
    }

    renderTitle() {
        const { title = {} } = this.props
        const { text, style } = title

        return (
            <Text style={[styles.title, style]}>
                {text}
            </Text>
        )
    }

    renderActions() {
        let items = []
        const { actions = [] } = this.props

        actions.forEach((action, i) => {
            items.push(
                <TouchableOpacity
                    key={i}
                    style={[styles.iconContainer, styles.action]}
                    activeOpacity={1}
                    onPress={action.onPress}>
                    <Image source={action.src} style={[styles.icon, action.style]}/>
                </TouchableOpacity>
            )
        })

        return <View style={styles.actions}>{ items }</View>
    }

    render() {
        return (
            <View style={[styles.nav, this.props.style]}>
                <StatusBar
                    backgroundColor = 'transparent'
                    translucent = { true }/>
                {this.renderNavIcon()}
                {this.renderTitle()}
                {this.renderActions()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nav: {
        padding: 20,
        paddingTop: 35,
        height: 80,
        backgroundColor: '#333',
        flexDirection: 'row',
    },
    title: {
        fontSize: 20,
        color: 'white',
    },
    icon: {
        width: 23,
        height: 29,
        marginTop: 3,
        marginRight: 15,
    },
    iconContainer: {
        height: 80,
    },
    actions: {
        justifyContent: 'center',
        flexDirection: 'row',
        position: 'absolute',
        right: 0,
    },
    action: {
        paddingHorizontal: 5,
    },
})

export default NavigationBar
