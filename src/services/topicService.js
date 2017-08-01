import request from './request'

function filterData(res) {
    return res.data
}

export function getTopicsByTab(tab = 'all', params = {}) {
    return request
        .get('/topics', {
            tab,
            page: 1,
            limit: 20,
            ...params,
        })
        .then(filterData)
}

export function getTopicById(id) {
    return request
        .get('/topic/' + id)
        .then(filterData)
        .then(topic => {
            if (topic && topic.id) {
                return topic
            }
            throw 'getTopicById Error...'
        })
}
