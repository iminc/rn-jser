import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
    ToastAndroid,
    RefreshControl,
} from 'react-native'

import PureRenderMixin from 'react-addons-pure-render-mixin'

import NavigationBar from './NavigationBar'
import HTML from './HTML'
import Loading from './Loading'

import * as CNode from '../utils/cnode'

const { width, height } = Dimensions.get('window')

class Comment extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isRefreshing: false,
        }

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    renderNavigationBar(style) {
        const { navigator } = this.props

        const icon = {
            src: require('../images/return.png'),
            style: {
                marginTop: 5,
                width: 22,
                height: 22,
            },
            onPress() {
                navigator.pop()
            },
        }

        const actions = [{
            src: require('../images/edit.png'),
            onPress() {
                ToastAndroid.show('reply', 3000)
            },
        }]

        return (
            <NavigationBar
                icon = { icon }
                style = { style }
                actions = { actions }
                />
        )
    }

    onRefresh() {
        this.setState({
            isRefreshing: true,
        }, () => {
            this.refs.web.webView.sendToBridge('refresh')
        })
    }

    onRefreshed() {
        this.setState({
            isRefreshing: false,
        })
    }

    render() {
        const { style, topic, navigator } = this.props
        
        return (
            <View style = { styles.container }>
                { this.renderNavigationBar(style) }
                <ScrollView contentContainerStyle={ styles.contentContainer }>
                    <HTML 
                        ref={'web'}
                        value={topic}
                        style={style}
                        navigator={navigator}
                        renderFunction={CNode.toComment}
                        renderLoading={() => <Loading/> }
                        onRefreshed={this.onRefreshed.bind(this)}
                        refreshControl={
                            <RefreshControl
                                refreshing={this.state.isRefreshing}
                                onRefresh={() => this.onRefresh() }
                                colors={['#333']}
                                />
                        }/>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        minHeight: height - 80,
    },
})

export const component = Comment
export function mapStateToProps(state, props) {
    const { id = '0' } = props
    const topic = state.topic.topic[id] || props.topic
    return {
        topic,
    }
}
