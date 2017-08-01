import React, {
    Component,
} from 'react'

import { Provider } from 'react-redux'

import Navigation from './views/Navigation'
import configureStore from './store'

const store = configureStore()

// 定义全局变量，用于缓存图片状态
global.images = {}

class App extends Component {
    render() {
        return (
            <Provider store={store}>
				<Navigation/>
			</Provider>
        )
    }
}

export default App
