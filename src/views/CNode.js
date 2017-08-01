import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    Linking,
    WebView,
    Dimensions,
    ToastAndroid,
} from 'react-native'

import PureRenderMixin from 'react-addons-pure-render-mixin'
import Loading from './Loading'

import Utils from '../utils'
import * as CnodeUtil from '../utils/cnode'

const { width, height } = Dimensions.get('window')

class CNode extends Component {
    constructor(props) {
        super(props)
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    onShouldStartLoadWithRequest(e) {
        if (Utils.isUrl(e.url)) {
            Linking.openURL(e.url).catch(err => console.error('An error occurred', err))
            this.webView.stopLoading()
            return false
        }
        return true
    }

    render() {
        const { value, style = {}, isWeb = true, renderLoading } = this.props

        return (
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <WebView
                    ref={view => this.webView = view}
                    source={{ html: CnodeUtil.toContent(value, style.backgroundColor) }}
                    scalesPageToFit={false}
                    javaScriptEnabled={true}
                    startInLoadingState={true}
                    onNavigationStateChange={this.onShouldStartLoadWithRequest.bind(this)}
                    onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest.bind(this)}
                    renderLoading={() => {
                        return <Loading/>
                    }}/>
            </ScrollView>
        )
    }
}

class CommentView extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        
    }
}

const styles = StyleSheet.create({
    contentContainer: {
        minHeight: height - 80,
    },
})

export default {
    ContentView,
    CommentView,
}
