import * as Types from '../actions/types'

const initialState = {
    all: [],
    good: [],
    ask: [],
    share: [],
    job: [],
    topic: {},
}

export default function(state = initialState, action) {
    const { payload, error, meta = {}, type } = action
    const { tab, id } = meta

    switch (type) {
        case Types.GET_TOPICS_BY_TAB:
            return {
                ...state,
                [tab]: state[tab].concat(payload),
            }
        case Types.UPDATE_TOPICS_BY_TAB:
            return {
                ...state,
                [tab]: payload,
            }
        case Types.GET_TOPIC_BY_ID:
            return {
                ...state,
                topic: {
                    [id]: payload,
                },
            }
        default:
            return state
    }
}
