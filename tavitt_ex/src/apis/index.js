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

export function get_match_order() {
    return new Promise((resolve, reject) => {
        axios.get(baseurl + 'products', config.get)
            .then(res => {
                // console.log(res.data)
                resolve(res.data)
            }
            )
            .catch(err => reject(err))
    })
}

export function get_account(address) {
    return new Promise((resolve, reject) => {
        axios.get(baseurl + `accounts/${address}?show=all`, config.get)
            .then(res => {
                // console.log(res.data)
                resolve(res.data)
            })
            .catch(err => reject(err))
    })
}

export function get_history(address) {
    return new Promise((resolve, reject) => {
        axios.get(baseurl + `transactions?address=${address}`, config.get)
            .then(res => {
                // console.log(res.data)
                resolve(res.data)
            })
            .catch(err => reject(err))
    })
}
// export function place_order(){
//     return new Promise((resolve, reject) => {
//         axios.post()
//     })
// }