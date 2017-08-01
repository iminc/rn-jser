import React, { Component } from 'react'

import {
    StyleSheet,
    View,
    Text,
    Image,
    ListView,
    StatusBar,
    ToastAndroid,
    RefreshControl,
    TouchableHighlight,
} from 'react-native'

import PureRenderMixin from 'react-addons-pure-render-mixin'

import connectComponent from '../utils/connectComponent'
import commonStyles from '../styles'
import Utils from '../utils'

import * as TopicComponent from './Topic'

class TopicList extends Component {
    constructor(props) {
        super(props)

        let dataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
        this.state = {
            isRefreshing: true,
            dataSource: dataSource.cloneWithRows(props.data),
        }

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    componentDidMount() {
        const { actions, tab } = this.props
        actions.getTopicsByTab(tab)
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.setState({
                isRefreshing: false,
                dataSource: this.state.dataSource.cloneWithRows(nextProps.data),
            })
        }
    }

    renderItem(item) {
        let tipText, tipColor, avatar = Utils.parseUrl(item.author.avatar_url)

        if (item.good) {
            tipText = '精华'
            tipColor = '#e67e22'
        } else if (item.top) {
            tipText = '置顶'
            tipColor = '#e74c3c'
        } else {
            if (item.tab === 'share') {
                tipText = '分享'
                tipColor = '#1abc9c'
            } else if (item.tab === 'job') {
                tipText = '招聘'
                tipColor = '#9b59b6'
            } else if (item.tab === 'ask') {
                tipText = '问答'
                tipColor = '#3498db'
            } else {
                tipText = '问答'
                tipColor = '#3498db'
            }
        }

        return (
            <TouchableHighlight
                underlayColor='#F5FCFF'
                onPress={() => this.onPress(item.id, item) }>
                <View style={styles.item}>
                    <View style={styles.titleContainer}>
                        <View style={[styles.tipContainer, { backgroundColor: tipColor }]}>
                            <Text style={styles.tipText}>
                                {tipText}
                            </Text>
                        </View>
                        <Text style={styles.titleText}>
                            {item.title}
                        </Text>
                    </View>
                    <View style={[styles.info, commonStyles.flexRow]}>
                        <Image style={styles.avatar} source={{ uri: avatar }}/>
                        <View style={styles.user}>
                            <Text>{item.author.loginname}</Text>
                            <Text style={styles.time}>{Utils.parseTime(item.create_at) }</Text>
                        </View>
                        <View style={styles.reply}>
                            <Text style={styles.right}>
                                <Text style={{ color: 'green' }}>{item.reply_count}</Text>
                                /{item.visit_count}
                            </Text>
                            <Text style={[styles.time, styles.right]}>
                                {Utils.parseTime(item.last_reply_at) }
                            </Text>
                        </View>
                    </View>
                </View>
            </TouchableHighlight>
        )
    }

    onPress(id, topic) {
        this.props.navigator.push({
            name: 'Topic',
            title: 'Topic',
            component: connectComponent(TopicComponent),
            params: {
                id,
                topic,
            },
        })
    }

    onRefresh() {
        const { actions, tab } = this.props
        this.setState({
            isRefreshing: true,
        })
        actions.updateTopicBysTab(tab)
    }

    onEndReached() {
        const { tab, limit, page, actions, data } = this.props
        if (data.length) {
            actions.getTopicsByTab(tab, {
                page: page + 1,
                limit,
            })
        }
    }

    render() {
        return (
            <View style={[commonStyles.container, commonStyles.bgColor]}>
                <ListView
                    enableEmptySections
                    dataSource={this.state.dataSource}
                    renderRow={(item) => this.renderItem(item) }
                    scrollRenderAheadDistance={200}
                    onEndReachedThreshold={200}
                    onEndReached={() => this.onEndReached() }
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.isRefreshing}
                            onRefresh={() => this.onRefresh() }
                            colors={['#333']}
                            />
                    }/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    nav: {
        height: 50,
        backgroundColor: '#333',
    },
    item: {
        padding: 10,
        paddingTop: 20,
        paddingBottom: 20,
        borderBottomWidth: 1,
        borderColor: '#F1F1F1',
    },
    titleContainer: {
        minHeight: 45,
    },
    titleText: {
        paddingTop: 1,
        paddingLeft: 50,
    },
    tipContainer: {
        width: 40,
        height: 25,
        borderRadius: 3,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
    },
    tipText: {
        color: 'white',
        fontSize: 12,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 3,
    },
    time: {
        fontSize: 12,
    },
    user: {
        marginLeft: 10,
        paddingTop: 5,
    },
    reply: {
        position: 'absolute',
        right: 0,
        top: 5,
    },
    right: {
        alignSelf: 'flex-end',
    },
})

export const component = TopicList
export function mapStateToProps(state, props) {
    const { tab } = props
    const cnode = state.cnode[tab]

    return {
        data: state.topic[tab],
        ...cnode,
    }
}
