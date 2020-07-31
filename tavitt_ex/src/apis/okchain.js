//client
import OKChainClient from '@okchain/javascript-sdk';
import { crypto } from '@okchain/javascript-sdk';

const serverUrl = "http://18.163.7.245:26659";
const baseCoin = "tokt"
const mnemonic = "library valid throw garden gym saddle very recall helmet goddess seminar later"

const userAddress = "okchain17wydevafdqc9fxj8q9zlnd0ay9r32htplz7qzr";

export function send_token() {
    return new Promise((resolve, reject) => {
        const client = new OKChainClient(serverUrl);
        const privateKey = crypto.getPrivateKeyFromMnemonic(mnemonic)
        client.setAccountInfo(privateKey)
            .then(() => {
                const addr = crypto.getAddressFromPrivateKey(client.privateKey)
                console.log(addr)
                client.getAccount(addr)
                    .then(res => {
                        client.getSequenceNumberFromAccountInfo(res)
                            .then(sequence => {
                                client.sendSendTransaction(userAddress, "1", baseCoin, "", sequence)
                                    .then(res => resolve(res))
                                    .catch(err => reject(err))
                            })
                            .catch(err => reject(err))
                    })
                    .catch(err => reject(err))
            })
            .catch(err => reject(err))
    })
}

