const axios = require('axios');
const baseurl = 'https://www.okex.com/okchain/v1/'
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
export function get_tokens() {
    return new Promise((resolve, reject) => {
        axios.get(baseurl + 'tokens', config.get)
            .then(res => {
                // console.log(res.data)
                resolve(res.data)
            }
            )
            .catch(err => reject(err))
    })
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
export function get_token_pair() {
    return new Promise((resolve, reject) => {
        axios.get(baseurl + 'match_order', config.get)
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
                // console.log(res.data.data.data)
                var promises = [];
                res.data.data.data.forEach((element, idx) => {
                    promises.push(
                        get_transaction(element.txhash)
                            .then(res => {
                                // console.log(res)
                                var format_res = {};
                                format_res.timestamp = res.timestamp;
                                format_res.txhash = res.txhash;
                                format_res.msg = res.tx.value.msg;
                                return format_res
                            })
                            .catch(err => reject(err))
                    )
                })
                return Promise.all(promises)
                    .then(res => resolve(res))
                    .catch(err => reject(err))
                // console.log(res.data)
                // resolve(res.data)
            })
            .catch(err => reject(err))
    })
}

export function get_transaction(txhash) {
    return new Promise((resolve, reject) => {
        axios.get(baseurl + `txs/${txhash}`, config.get)
            .then(res => {
                // console.log(res.data)
                resolve(res.data)
            })
            .catch(err => reject(err))
    })
}