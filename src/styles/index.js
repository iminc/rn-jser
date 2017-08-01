'use strict'

import React from 'react'

import {
    StyleSheet,
    Dimensions,
} from 'react-native'

const { width, htight } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    bgColor: {
        backgroundColor: 'white',
    },
    flexRow: {
        flexDirection: 'row',
    },
})

export default styles
