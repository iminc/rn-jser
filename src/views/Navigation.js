import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Platform,
    StatusBar,
    Navigator,
    BackAndroid,
    DrawerLayoutAndroid,
} from 'react-native'

import commonStyles from '../styles'
import connectComponent from '../utils/connectComponent'
import * as routerConfig from '../configs/routerSceneConfig'

import * as HomeComponent from './Home'
import Splash from './Splash'

const initialRoute = {
	name: 'Home',
	index: 0,
	component: connectComponent(HomeComponent),
	id: 0,
}

class Navigation extends Component {
    constructor(props) {
        super(props)

        this.state = {
            splashed: false,
        }
    }

    componentDidMount() {
        setTimeout(() => {
            this.setState({
                splashed: true,
            })
            this.navigator.navigationContext.addListener('didfocus', e => {
                let name = e.data.route.name
                this[name] && this[name].getWrappedInstance().componentDidFocus && this[name].getWrappedInstance().componentDidFocus()
            })
        }, 3000)

        if (Platform.OS === 'android') {
            BackAndroid.addEventListener('hardwareBackPress', () => this.onBackAndroid())
        }
    }

    onBackAndroid() {
        let routers = this.nav.getCurrentRoutes()
        if (this.nav && routers.length > 1) {
            this.nav.pop()
            return true
        }
        return false
    }

    renderScene(route, navigator) {
        this.nav = navigator

        const { name, component, params } = route

        if (component) {
            return React.createElement(component, {
                ref: view => this[name] = view,
                navigator: navigator,
                route: route,
                ...params,
            })
        }
    }

    configureScene(route) {
        if (route.sceneConfig) {
            return route.sceneConfig
        }
        return routerConfig.customFloatFromRight
    }

    render() {
        if (this.state.splashed) {
            return (
                <Navigator
                    ref = {view => this.navigator = view}
                    style = {[commonStyles.container, commonStyles.bgColor]}
                    initialRoute = {initialRoute}
                    configureScene = {this.configureScene.bind(this) }
                    renderScene = {(route, navigator) => this.renderScene(route, navigator) }
                    />
            )
        }

        return (
            <View style = { styles.container } >
                <StatusBar
                    backgroundColor = 'transparent'
                    translucent = { true }/>
                <Splash/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
    },
})

export default Navigation
