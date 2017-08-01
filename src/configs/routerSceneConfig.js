import {
    Navigator,
    Dimensions,
} from 'react-native'

const { width } = Dimensions.get('window')

const baseConfig = Navigator.SceneConfigs.FloatFromRight

const popGestureConfig = Object.assign({}, baseConfig.gestures.pop, {
    // 可滑动的距离
    edgeHitWidth: width / 3,
    // 滑动10%就pop
    stillCompletionRatio: 0.1,
})

const fullPopGestureConfig = Object.assign({}, Navigator.SceneConfigs.FloatFromBottom.gestures.pop, {
    edgeHitWidth: width,
})

export const customFloatFromRight = Object.assign({}, baseConfig, {
    gestures: {
        pop: popGestureConfig,
    },
})

export const customFloatFromBottom = Object.assign({}, Navigator.SceneConfigs.FloatFromBottom, {
    gestures: {
        pop: fullPopGestureConfig,
    },
})
