import React, { Component } from 'react'

import {
    StyleSheet,
    Text,
    View,
    Image,
    Vibration,
    StatusBar,
    Dimensions,
    ToastAndroid,
    TouchableOpacity,
    InteractionManager,
} from 'react-native'

import PureRenderMixin from 'react-addons-pure-render-mixin'
import ImageZoom from 'react-native-image-pan-zoom'
import Loading from './Loading'

const WIDTH = Dimensions.get('window').width
const HEIGHT = Dimensions.get('window').height

class ImageView extends Component {
    constructor(props) {
        super(props)

        const { src } = this.props
        // 设置图片信息，首先检查缓存
        this.state = global.images[src] || {
            src,
            width: 0,
            height: 0,
            status: 'loading',
        }

        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    componentDidMount() {
        InteractionManager.runAfterInteractions(() => {
            this.loadImage()
        })
    }

    loadImage() {
        let image = Object.assign({}, this.state),
            imageLoaded = false,
            sizeLoaded = false,
            updateImage = () => {
                this.setState(image)
                // 更新缓存图片的加载状态
                global.images[image.src] = image
            }

        if (this.state.status === 'success') {
            return
        }

        Image.prefetch(this.state.src)
            .then(() => {
                imageLoaded = true
                image.status = 'success'
                updateImage()
            }, () => {
                image.status = 'fail'
                updateImage()
            })

        if (image.width && image.height) {
            sizeLoaded = true
            if (imageLoaded) {
                image.status = 'success'
                updateImage()
            }
        } else {
            Image.getSize(this.state.src, (width, height) => {
                sizeLoaded = true
                image.width = width
                image.height = height
                updateImage()
            }, () => {
                image.status = 'fail'
                updateImage()
            })
        }
    }

    reloadImage() {
        this.setState({
            status: 'loading',
        }, () => {
            setTimeout(() => {
                this.loadImage()
            }, 500)
        })
    }

    renderImage() {
        let { status, width, height, src } = this.state

        if (status === 'success' && width && height) {
            if (width > WIDTH) {
                let WidthPixel = WIDTH / width;
                width *= WidthPixel;
                height *= WidthPixel;
            }
            if (height > HEIGHT) {
                let HeightPixel = HEIGHT / height;
                width *= HeightPixel;
                height *= HeightPixel;
            }
            return (
                <ImageZoom
                    cropWidth={WIDTH}
                    cropHeight={HEIGHT}
                    imageWidth={width}
                    imageHeight={height}
                    onLongPress={() => {
                        Vibration.vibrate(30)
                    }}
                    onCancel={() => {
                        this.props.navigator.pop()
                    }}>
                    <Image style={{ width, height }} source={{ uri: src }}/>
                </ImageZoom>
            )
        } else if (status === 'fail') {
            return (
                <TouchableOpacity
                    style={styles.failContainer}
                    activeOpacity={1}
                    onPress={this.reloadImage.bind(this)}>
                    <Text style={styles.failText}>点击重新加载</Text>
                </TouchableOpacity>
            )
        }
        
        return <Loading backgroundColor="#000" color="white" showText={false}/>
    }

    renderMenu() {
        let { status, width, height, src } = this.state

        if (status === 'success' && width && height) {
            return (
                <TouchableOpacity
                    style={styles.menuContainer}
                    activeOpacity={1}
                    onPress={this.reloadImage.bind(this)}>
                    <Image source={require('../images/menu2.png')} style={styles.menuIcon}/>
                </TouchableOpacity>
            )
        }
    }

    showMenu() {
        // TODO 打开一个菜单，操作图片本地保存...
    }

    render() {
        const { style = {}, src, navigator } = this.props

        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor = 'transparent'
                    translucent = { true }/>
                {this.renderImage()}
                {this.renderMenu()}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000',
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        width: WIDTH,
        height: HEIGHT,
    },
    failContainer: {
        height: 30,
        justifyContent: 'center',
    },
    failText: {
        color: 'white',
        fontSize: 12,
    },
    menuContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        width: 30,
        height: 30,
    },
    menuIcon: {
        width: 30,
        height: 30,
    },
})

export const component = ImageView
