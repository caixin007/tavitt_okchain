import React, { useState, useEffect } from 'react';

import './Wallet.css';

import { get_latest_blocks } from 'apis/index';

export function Wallet() {

    const [data, setData] = useState('')

    useEffect(() => {
        get_latest_blocks()
            .then(res => setData(JSON.stringify(res.data)))
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="wallet">
            block height: {data}
        </div>
    )
}