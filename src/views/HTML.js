import React, { Component } from 'react'

import {
    Linking,
    ToastAndroid,
} from 'react-native'

import PureRenderMixin from 'react-addons-pure-render-mixin'
import WebViewBridge from 'react-native-webview-bridge'

import connectComponent from '../utils/connectComponent'
import * as ImageViewComponent from './ImageView'

class HTML extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isRefreshing: false,
        }

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    onBridgeMessage(message) {
        if (message.indexOf('img:') === 0) {
            this.props.navigator.push({
                name: 'ImageView',
                title: 'ImageView',
                component: connectComponent(ImageViewComponent),
                params: {
                    src: message.substr(4),
                },
            })
        } else if (message.indexOf('href:') === 0) {
            Linking.openURL(message.substr(5)).catch(err => console.error('An error occurred', err))
        } else if (message === 'refreshed') {
            this.props.onRefreshed()
            ToastAndroid.show(message, 3000)
        } else {
            ToastAndroid.show(message + 'aaa', 3000)
        }
    }

    render() {
        const { value, style = {}, isWeb = true, renderLoading, renderFunction, refreshControl } = this.props

        if (refreshControl) {
            return React.cloneElement(
                refreshControl, 
                { style: { flex: 1 } },
                <WebViewBridge
                    ref={view => this.webView = view}
                    onBridgeMessage={this.onBridgeMessage.bind(this)}
                    source={{ html: renderFunction.call(null, value, style.backgroundColor) }}
                    scalesPageToFit={false}
                    domStorageEnabled={true}
                    javaScriptEnabled={true}
                    injectedJavaScript={injectScript}
                    startInLoadingState={true}
                    renderLoading={renderLoading}
                    />
            )
        }
        return (
            <WebViewBridge
                ref={view => this.webView = view}
                onBridgeMessage={this.onBridgeMessage.bind(this)}
                source={{ html: renderFunction.call(null, value, style.backgroundColor) }}
                scalesPageToFit={false}
                domStorageEnabled={true}
                javaScriptEnabled={true}
                injectedJavaScript={injectScript}
                startInLoadingState={true}
                renderLoading={renderLoading}
                />
        )
    }
}

const injectScript = `
(function () {
    if (WebViewBridge) {
        WebViewBridge.onMessage = function(message) {
            if (message === 'refresh') {
                WebViewBridge.send('refreshed');
            } else {
                WebViewBridge.send(message);
            }
        };
    }
}());
`

export default HTML
