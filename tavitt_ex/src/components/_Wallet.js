import React, { useState, useEffect } from 'react';

import './Wallet.css';

import {
    get_latest_blocks,
    get_account
} from 'apis/index';

export function Wallet() {

    const [data, setData] = useState('');
    const [account, setAccount] = useState('');
    const [currencies, setCurrencies] = useState([]);

    useEffect(() => {
        get_latest_blocks()
            .then(res => setData(res.block.header))
            .catch(err => console.log(err))

        get_account()
            .then(res => {
                setAccount(res.data.address);
                setCurrencies(res.data.currencies);
            }
            )
            .catch(err => console.log(err))
    }, [])

    return (
        // <div className="wallet">
        //     <div className="block">
        //         latest block height: {data.height}
        //     </div>
        //     <div className="block">
        //         latest block time: {data.time}
        //     </div>
        //     <div className="account">
        //         address: {account}
        //     </div>
        //     <div className="account">
        //         {currencies.map((element) =>
        //             <div className="mainlist">
        //                 <div className="list">{element.symbol}</div>
        //                 <div className="list">{element.available}</div>
        //             </div>
        //         )}
        //     </div>
        // </div >
    )
}