//client
import OKChainClient from '@okchain/javascript-sdk';
import { crypto } from '@okchain/javascript-sdk';
import Transaction from '@okchain/javascript-sdk/lib/transaction';
import { formatNumber } from 'apis/helper';
import { fn } from 'moment';

const serverUrl = "http://18.163.7.245:26659";
const baseCoin = "tokt";
// const mnemonic_test = "library valid throw garden gym saddle very recall helmet goddess seminar later"
const chainId = "okchain"
const bech32Head = "okchain"
const mode = "block"
const nativeDenom = "tokt"

var defaultFee = {
    amount: [{
        amount: "0.02000000",
        denom: nativeDenom,

    }],
    gas: "200000",
}

export function buildTrans(address, to, amount, denom, mnemonic) {
    return new Promise((resolve, reject) => {
        const coin = {
            amount: formatNumber(amount),
            denom: denom,
        }
        const msg = [{
            type: "okchain/token/MsgTransfer",
            value: {
                amount: [coin],
                from_address: address,
                to_address: to,
            },
        }]
        const signMsg = msg;
        const client = new OKChainClient(serverUrl);
        const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
        client.setAccountInfo(privateKey)
            .then(() => {
                const addr = crypto.getAddressFromPrivateKey(client.privateKey)
                // console.log(addr)
                client.getAccount(addr)
                    .then(res => {
                        // console.log(res)
                        async function get_tx() {
                            const sequenceNumber = await client.getSequenceNumberFromAccountInfo(res)
                            const account_number = await client.getAccountNumberFromAccountInfo(res)

                            const params = {
                                account_number: parseInt(account_number),
                                chain_id: chainId,
                                memo: "",
                                msg,
                                sequence: parseInt(sequenceNumber),
                                fee: defaultFee,
                            }

                            const tx = new Transaction(params)
                            console.log(privateKey)
                            return tx.sign(privateKey, signMsg)
                        }
                        const tx = get_tx();
                        resolve(tx)
                    })
                    .catch(err => reject(err))
            })
            .catch(err => reject(err))
    })
}


export function buildExTrans(address, tpair, price, quantity, side, mnemonic) {
    return new Promise((resolve, reject) => {
        var order_items = [{
            price: formatNumber(price),
            product: tpair,
            quantity: formatNumber(quantity),
            side: side,
        }]
        const msg = [{
            type: "okchain/order/MsgNew",
            value: {
                order_items: order_items,
                sender: address,
            },

        }]
        const signMsg = msg;
        async function get_ex_tx() {
            const symbol = tpair
            const client = new OKChainClient(serverUrl)
            const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
            await client.setAccountInfo(privateKey)
            const addr = crypto.getAddressFromPrivateKey(client.privateKey)
            const account = await client.getAccount(addr)
            const sequence = parseInt((await client.getSequenceNumberFromAccountInfo(account)))

            const sequenceNumber = await client.getSequenceNumberFromAccountInfo(account)
            const account_number = await client.getAccountNumberFromAccountInfo(account)

            const params = {
                account_number: parseInt(account_number),
                chain_id: chainId,
                memo: "",
                msg,
                sequence: parseInt(sequenceNumber),
                fee: defaultFee,
            }

            const tx = new Transaction(params)
            return tx.sign(privateKey, signMsg)
        }

        const tx = get_ex_tx();
        resolve(tx)
    })
}