import React, { useState, useEffect } from 'react';

import './Wallet.css';

import {
    get_latest_blocks,
    get_account
} from 'apis/index';

export function Wallet() {

    const [data, setData] = useState('');
    const [account, setAccount] = useState('');

    useEffect(() => {
        get_latest_blocks()
            .then(res => setData(res.block.header))
            .catch(err => console.log(err))

        get_account()
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="wallet">
            <div>
                latest block height: {data.height}
            </div>
            <div>
                latest block time: {data.time}
            </div>
        </div>
    )
}