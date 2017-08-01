import React, { Component } from 'react'

import {
    StyleSheet,
    Dimensions,
    Image,
    Animated,
} from 'react-native'

const { width, height } = Dimensions.get('window')

class Splash extends Component {
    constructor(props) {
        super(props)

        this.state = {
            fadeAnim: new Animated.Value(0),
        }
    }

    componentDidMount() {
        Animated.timing(
            this.state.fadeAnim, {
                toValue: 1,
                duration: 2000,
            }
        ).start()
    }

    render() {
        return (
            <Animated.View style={[styles.flex, { opacity: this.state.fadeAnim }]}>
                <Image source={require('../images/splash.jpg') } style={styles.img}></Image>
            </Animated.View>
        )
    }
}

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    img: {
        flex: 1,
        width: width,
        height: height,
    },
})

export default Splash
