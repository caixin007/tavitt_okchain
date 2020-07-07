const axios = require('axios');
const baseurl = 'http://18.163.7.245:26659/okchain/v1/'
// const baseurl = '/cas_v2?'
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
    //     }
    // }
}
export function get_latest_blocks() {
    return new Promise((resolve, reject) => {
        axios.get(baseurl + 'blocks/latest', config.get)
            .then(res => {
                console.log(res.data)
                resolve(res.data)
            }
            )
            .catch(err => reject(err))
    })
}