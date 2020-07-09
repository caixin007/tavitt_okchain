const axios = require('axios');
const baseurl = 'http://18.163.7.245:26659/okchain/v1/'
const config = {
    get: {
        headers: {
            'Content-Type': 'application/json'
        }
    },
    post: {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }
    // multi: {
    //     headers: {
    //         'Content-Type': 'multipart/form-data'
    //     }/okchain/v1/accounts/{address}
    // }
}

const address = 'okchain178nexvc7ewddl43zdqfcjhp23s4ph8sg7x925r';


export function get_latest_blocks() {
    return new Promise((resolve, reject) => {
        axios.get(baseurl + 'blocks/latest', config.get)
            .then(res => {
                // console.log(res.data)
                resolve(res.data)
            }
            )
            .catch(err => reject(err))
    })
}

export function get_account() {
    return new Promise((resolve, reject) => {
        axios.get(baseurl + 'accounts/okchain178nexvc7ewddl43zdqfcjhp23s4ph8sg7x925r?show=all', config.get)
            .then(res => {
                // console.log(res.data)
                resolve(res.data)
            }
            )
            .catch(err => reject(err))
    })
}