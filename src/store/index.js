import { applyMiddleware, createStore } from 'redux'
import { persistStore, autoRehydrate } from 'redux-persist'
import { AsyncStorage, ToastAndroid } from 'react-native'
import promiseMiddleware from 'redux-promise'
import thunkMiddleware from 'redux-thunk'

import reducers from '../reducers'

let middlewares = [
    thunkMiddleware,
    promiseMiddleware,
]

let createAppStore = applyMiddleware(...middlewares)(createStore)

export default function configureStore() {
    // const store = autoRehydrate()(createAppStore)(reducers)
    // let opt = {
    //     storage: AsyncStorage,
    //     transform: [],
    //     whitelist: ['aaa'],
    // }
    // persistStore(store, opt)

    return applyMiddleware(...middlewares)(createStore)(reducers)
}
