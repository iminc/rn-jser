import { createAction } from 'redux-actions'

import * as Types from './types'
import * as Service from '../services/topicService'

export const getTopicsByTab = createAction(Types.GET_TOPICS_BY_TAB, async(tab, params) => {
    return await Service.getTopicsByTab(tab, params)
}, tab => {
    return {
        tab,
    }
})

export const updateTopicBysTab = createAction(Types.UPDATE_TOPICS_BY_TAB, async(tab) => {
    return await Service.getTopicsByTab(tab, {
        page: 1,
    })
}, tab => {
    return {
        tab,
    }
})

export const getTopicById = createAction(Types.GET_TOPIC_BY_ID, Service.getTopicById, (id) => {
    return {
        id,
        sync: 'topic',
    }
})
