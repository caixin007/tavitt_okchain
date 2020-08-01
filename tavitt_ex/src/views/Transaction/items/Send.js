import React, { useState, useEffect } from 'react';
// import { useSelector, useDispatch } from 'react-redux';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Typography from '@material-ui/core/Typography';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import {
    Button,
    Grid
} from '@material-ui/core';

import {
    get_history,
    get_token_pair,
    get_account_available
} from 'apis/index';

import SendConfirm from './SendConfirm';
import ExConfirm from './ExConfirm';
import TransHis from './TransHis';
import OrderHis from './OrderHis';

import TabPanel from './TabPanel';

const useStyles = makeStyles((theme) => ({
    paper: {
        padding: theme.spacing(1),
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
    button: {
        padding: theme.spacing(1),
        textAlign: 'center',
    },
    title: {
        textAlign: 'center',
        padding: theme.spacing(1),
    },
    formControl: {
        width: '100%',
        marginTop: theme.spacing(2.5),
    }
}));

const Send = props => {
    const { className, address, ...rest } = props;
    const classes = useStyles();
    // const dispatch = useDispatch();
    const [transactions, setTransactions] = useState([]);
    const [tokenPairs, setTokenPairs] = useState([]);
    const [tokens, setTokens] = useState([]);
    // okchain17wydevafdqc9fxj8q9zlnd0ay9r32htplz7qzr
    const [openSend, setOpenSend] = useState(false);
    const [to, setTo] = useState(null);
    const [amount, setAmount] = useState(0);
    const [denom, setDenom] = useState(null);

    const [openEx, setOpenEx] = useState(false);
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [tpair, setTpair] = useState(null);

    useEffect(() => {
        get_history(address)
            .then(res => {
                console.log(res)
                setTransactions(res);
            })
            .catch(err => console.log(err))
        get_token_pair()
            .then(res => {
                setTokenPairs(res.data);
            })
            .catch(err => console.log(err));
        get_account_available(address)
            .then(res => {
                // console.log(res.data.currencies)
                setTokens(res.data.currencies);
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <form className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" className={classes.title}>
                            Send
                        </Typography>
                        <Typography variant="h5">
                            To:
                        </Typography>
                        <TextField
                            // error={error ? true : false}
                            id="to-account"
                            onChange={input => setTo(input.target.value)}
                            style={{ width: '100%' }}
                            // helperText={error ? error : null}
                            variant="outlined"
                        />
                        <Typography variant="h5">
                            Amount:
                        </Typography>
                        <TextField
                            type="number"
                            // error={error ? true : false}
                            id="trans-amount"
                            onChange={input => setAmount(input.target.value)}
                            style={{ width: '60%' }}
                            // helperText={error ? error : null}
                            variant="outlined"
                        />
                        <FormControl variant="outlined" style={{ width: '40%' }}>
                            <InputLabel htmlFor="outlined-token-pair-native-simple">Token Name</InputLabel>
                            <Select
                                native
                                // value={denom}
                                onChange={(input) => { setDenom(input.target.value) }}
                                label="Token name"
                                variant="outlined"
                                inputProps={{
                                    name: 'Token name',
                                    id: 'outlined-token-name-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {tokens.map((token, index) => (
                                    <option key={index} value={token.symbol}>{token.symbol}</option>
                                ))}
                            </Select>

                        </FormControl>
                        {/* </div> */}
                        <div className={classes.button}>
                            <Button
                                style={
                                    { backgroundColor: '#eee' }
                                }
                                onClick={() => setOpenSend(true)}
                            >Send</Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" className={classes.title}>
                            DEX
                        </Typography>

                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel htmlFor="outlined-token-pair-native-simple">Token Pair</InputLabel>
                            <Select
                                native
                                // value={state.age}
                                onChange={(input) => { setTpair(input.target.value) }}
                                label="Token Pair"
                                inputProps={{
                                    name: 'Token Pair',
                                    id: 'outlined-token-pair-native-simple',
                                }}
                            >
                                <option aria-label="None" value="" />
                                {tokenPairs.map((tokenPair, index) => (
                                    <option key={index} value={tokenPair}>{tokenPair}</option>
                                ))}
                            </Select>
                        </FormControl>
                        <div>
                            <TextField
                                placeholder="Price"
                                // error={error ? true : false}
                                type="number"
                                id="order-price"
                                onChange={input => setPrice(input.target.value)}
                                style={{ width: '50%', paddingTop: 20 }}
                                // helperText={error ? error : null}
                                variant="outlined"
                            />
                            <TextField
                                placeholder="Quantity"
                                // error={error ? true : false}
                                type="number"
                                id="order-quantity"
                                onChange={input => setQuantity(input.target.value)}
                                style={{ width: '50%', paddingTop: 20 }}
                                // helperText={error ? error : null}
                                variant="outlined"
                            />
                        </div>
                        <div className={classes.button}>
                            <Button
                                style={
                                    { backgroundColor: '#eee' }
                                }
                                onClick={() => setOpenEx(true)}
                            // onClick={() => test()}
                            >Exchange</Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper className={classes.paper}>
                        <TabPanel
                            address={address}
                            transactions={transactions}
                        />
                        {/* <Typography variant="h4" className={classes.title}>
                            Transaction History
                        </Typography>
                        <TransHis
                            address={address}
                            transactions={transactions}
                        /> */}
                    </Paper>
                </Grid>
            </Grid>
            <SendConfirm
                open={openSend}
                address={address}
                to={to}
                amount={amount}
                cancel={() => setOpenSend(false)}
                denom={denom}
            />
            <ExConfirm
                open={openEx}
                address={address}
                price={price}
                quantity={quantity}
                side="BUY"
                cancel={() => setOpenEx(false)}
                tpair={tpair}
            />
        </form >
    )
}
export default Send;