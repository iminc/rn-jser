import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Text,
    ScrollView,
    Dimensions,
    ToastAndroid,
    InteractionManager,
} from 'react-native'

import PureRenderMixin from 'react-addons-pure-render-mixin'

import NavigationBar from './NavigationBar'
import HTML from './HTML'
import Loading from './Loading'
import * as CommentComponent from './Comment'
import * as routerConfig from '../configs/routerSceneConfig'

import connectComponent from '../utils/connectComponent'
import Utils from '../utils'
import * as CNode from '../utils/cnode'

const { width, height } = Dimensions.get('window')

class Topic extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isLoading: true,
            color: Utils.randomColor(),
        }

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            const { actions, id } = this.props
            if (id) {
                actions.getTopicById(id)
            }

            this.setState({
                isLoading: false,
            })
        })
    }

    renderNavigationBar(style) {
        const { navigator, id, topic } = this.props

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
            src: require('../images/comment.png'),
            onPress() {
                navigator.push({
                    name: 'Comment',
                    title: 'Comment',
                    component: connectComponent(CommentComponent),
                    // sceneConfig: routerConfig.customFloatFromBottom,
                    params: {
                        id,
                        topic,
                        style,
                    },
                })
            },
        }, {
            src: require('../images/share3.png'),
            style: {
                marginTop: 5,
                height: 25,
            },
            onPress() {
                ToastAndroid.show('share', 3000)
            },
        }, ]

        return ( 
            <NavigationBar icon = { icon }
                style = { style }
                actions = { actions }
                />
        )
    }

    render() {
        const { topic, navigator } = this.props
        const style = {
            backgroundColor: this.state.color,
        }

        if (topic) {

            return ( 
                <View style = { styles.container }> 
                    { this.renderNavigationBar(style) } 
                    <ScrollView contentContainerStyle = { styles.contentContainer } >
                        <HTML navigator = { navigator }
                        value = { topic }
                        style = { style }
                        renderFunction = { CNode.toContent }
                        renderLoading = {
                            () => <Loading /> }
                        />
                    </ScrollView> 
                </View>
            )
        }

        return <Loading />
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        minHeight: height - 80,
    },
    container: {
        flex: 1,
        width: width,
        height: height,
        backgroundColor: 'white',
    },
})

export const component = Topic
export function mapStateToProps(state, props) {
    const { id = '0' } = props
    const topic = state.topic.topic[id] || props.topic
    return {
        topic,
    }
}