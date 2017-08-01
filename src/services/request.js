import qs from 'query-string'
import config from '../configs'

const urlPrefix = config.domain + config.apiPath

function toJson(res) {
    return res.json()
}

function catchFn(err) {
    throw new Error(err)
}

function get(url, params) {
    let uri = urlPrefix + url

    if (params) {
        uri += `?${qs.stringify(params)}`
    }

    return fetch(uri).then(toJson).catch(catchFn)
}

function post(url, body) {
    let uri = urlPrefix + url

    const options = {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
    }

    return fetch(uri, options).then(toJson).catch(catchFn)
}

export default {
    get,
    post,
}
