import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import Moment from 'moment';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import {
    get_history,
    get_token_pair
} from 'apis/index';
import {
    send_token
} from 'apis/okchain';

import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

import {
    Card,
    // CardActions,
    CardHeader,
    CardContent,
    Button,
    // Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Grid
    // Tooltip,
    // TableSortLabel
} from '@material-ui/core';

import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(12, 1fr)',
        gridGap: theme.spacing(3),
    },
    paper: {
        padding: theme.spacing(1),
        // textAlign: 'center',
        color: theme.palette.text.secondary,
        whiteSpace: 'nowrap',
        marginBottom: theme.spacing(1),
    },
    divider: {
        margin: theme.spacing(2, 0),
    },
    button: {
        padding: theme.spacing(1),
        textAlign: 'center',
    },
    title: {
        textAlign: 'center',
        padding: theme.spacing(1),
    },
    table: {
        width: '100%'
    },
    addresscell: {
        // width: 200
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

    const [to, setTo] = useState(null);
    const [amount, setAmount] = useState(null);
    const [exAmount, setExAmount] = useState(null);
    const [tpair, setTpair] = useState(null);

    const sendToken = () => {
        send_token()
            .then(res => {
                console.log('return:', res)
            })
            .catch(err => console.log(err))
    }

    const exchangeToken = () => {
        console.log(tpair, exAmount);
    }

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
    }, [])

    return (
        <form className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs={4}>
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
                            style={{ width: '100%' }}
                            // helperText={error ? error : null}
                            variant="outlined"
                        />
                        {/* </div> */}
                        <div className={classes.button}>
                            <Button
                                style={
                                    { backgroundColor: '#eee' }
                                }
                                onClick={() => sendToken()}
                            >Send</Button>
                        </div>
                        {/* </CardContent>
                        </Card> */}
                    </Paper>
                </Grid>
                <Grid item xs={4}>
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
                        <Typography variant="h5">
                            Amount:
                                </Typography>
                        <TextField
                            // error={error ? true : false}
                            type="number"
                            id="trans-amount"
                            onChange={input => setExAmount(input.target.value)}
                            style={{ width: '100%' }}
                            // helperText={error ? error : null}
                            variant="outlined"
                        />
                        {/* </div> */}
                        <div className={classes.button}>
                            <Button
                                style={
                                    { backgroundColor: '#eee' }
                                }
                                onClick={() => exchangeToken()}
                            >Exchange</Button>
                        </div>
                    </Paper>
                </Grid>
                <Grid item xs={8}>
                    <Paper className={classes.paper}>
                        <Typography variant="h4" className={classes.title}>
                            Transaction History
                        </Typography>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Send/Receive</TableCell>
                                    <TableCell>Address</TableCell>
                                    <TableCell>Amount</TableCell>
                                    <TableCell>Token</TableCell>
                                    <TableCell>Time</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    transactions.map((transaction, index) => (
                                        <TableRow
                                            hover
                                            key={index}
                                        >
                                            <TableCell>
                                                {
                                                    transaction.msg[0].value.to_address === address ?
                                                        'Receive' : 'To'
                                                }
                                            </TableCell>
                                            <TableCell className={classes.addresscell}>
                                                {
                                                    transaction.msg[0].value.to_address === address ?
                                                        `From: 
                                                        ${transaction.msg[0].value.from_address}`
                                                        :
                                                        `To:${transaction.msg[0].value.to_address}`
                                                }
                                            </TableCell>
                                            <TableCell>
                                                {transaction.msg[0].value.amount[0].amount}
                                            </TableCell>
                                            <TableCell>
                                                {transaction.msg[0].value.amount[0].denom}
                                            </TableCell>
                                            <TableCell>
                                                <div>
                                                    {Moment.parseZone(transaction.timestamp).local().format('DD MMM YYYY')}
                                                </div>
                                                <div>
                                                    {Moment.parseZone(transaction.timestamp).local().format('LT')}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </form >
    )
}
export default Send;