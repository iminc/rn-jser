import * as Types from '../actions/types'

const tabs = ['all', 'ask', 'share', 'job', 'good']

let initialState = {}

tabs.forEach(item => {
    initialState[item] = {
        page: 1,
        limit: 20,
    }
})

export default function(state = initialState, action) {
    const { error, meta = {}, type } = action
    const { tab } = meta

    switch (type) {
        case Types.GET_TOPICS_BY_TAB:
            return {
                ...state,
                [tab]: {
                    ...state[tab],
                    page: (!error) ? state[tab].page + 1 : state[tab].page,
                },
            }
        case Types.UPDATE_TOPICS_BY_TAB:
            return {
                ...state,
                [tab]: {
                    ...state[tab],
                    page: initialState[tab].page,
                },
            }
        default:
            return state
    }
}
