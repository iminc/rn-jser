import React, { Component } from 'react'

import {
    StyleSheet,
    ToastAndroid,
    DrawerLayoutAndroid,
} from 'react-native'

import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view'
import NavigationBar from './NavigationBar'

import connectComponent from '../utils/connectComponent'
import Menu from './Menu'
import * as TopicListComponent from './TopicList'

const TopicList = connectComponent(TopicListComponent)

class Home extends Component {
    constructor(props) {
        super(props)

        this.state = {}
    }

    componentDidMount() {
        this.setState({
            currentPage: <TopicList tab="all" navigator={this.props.navigator}/>,
        })
    }

    renderTopicList() {
        const tabs = {
            all: '全部',
            good: '精华',
            ask: '问答',
            share: '分享',
            job: '招聘',
        }
        const items = ['all', 'good', 'ask', 'share', 'job']

        return items.map(item => {
            return (
                <TopicList 
                    key={item} 
                    tab={item} 
                    tabLabel={tabs[item]}
                    navigator={this.props.navigator}/>
            )
        })
    }

    render() {
        const self = this

        const title = {
            text: '首页',
        }
        const icon = {
            src: require('../images/menu.png'),
            style: {
                marginTop: 0,
            },
            onPress() {
                self.refs.drawerLayoutAndroid.openDrawer()
            },
        }

        return (
            <DrawerLayoutAndroid
                ref="drawerLayoutAndroid"
                drawerWidth={300}
                drawerPosition={DrawerLayoutAndroid.positions.Left}
                renderNavigationView={() => <Menu/>}>
                <NavigationBar
                    icon={icon}
                    title={title}/>
                <ScrollableTabView 
                    scrollWithoutAnimation={true}
                    tabBarBackgroundColor="#333"
                    tabBarActiveTextColor="#FFF"
                    tabBarInactiveTextColor="#FFF"
                    tabBarUnderlineStyle={styles.underline}
                    renderTabBar={() => <DefaultTabBar style={styles.tabBar}/>}>
                    {this.renderTopicList()}
                </ScrollableTabView>
            </DrawerLayoutAndroid>
        )
    }
}

const styles = StyleSheet.create({
    tabBar: {
        borderColor: '#333',
    },
    underline: {
        backgroundColor: '#F8F8F8',
    },
})

export const component = Home
export function mapStateToProps(state) {
    return {
        ui: state.cnode,
        topic: state.topic,
    }
}
