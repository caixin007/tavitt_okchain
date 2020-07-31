import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import clsx from 'clsx';
import Moment from 'moment';

import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';

import { addAddress } from 'redux/reducers/actions';
import {
    get_match_order,
    get_account,
    get_history,
    get_transaction
} from 'apis/index';

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

// const address_local = 'okchain178nexvc7ewddl43zdqfcjhp23s4ph8sg7x925r';

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
    }
}));

const Send = props => {
    const { className, address, ...rest } = props;
    const classes = useStyles();
    const dispatch = useDispatch();
    // const store = useSelector(store => store);
    // const [address, setAddress] = useState(null);
    // const [error, setError] = useState(null);

    const [to, setTo] = useState(null);
    const [amount, setAmount] = useState(null);
    const [transactions, setTransactions] = useState([]);
    // console.log(address )className={classes.root} noValidate autoComplete="off"

    function sendToken(to, amount) {
        console.log(to, amount);
    }

    useEffect(() => {
        get_history(address)
            .then(res => {
                // console.log(res);
                setTransactions(res);
                // if (res.data === null) setError(JSON.parse(res.msg).message)
                // else dispatch(addAddress(res.data))
                // setAccount(res.data);
                // if (Array.isArray(res.data.data)) setTransactions(res.data.data);
            })
            .catch(err => console.log(err))
    }, [])

    // console.log(transactions)
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
                                onClick={() => sendToken(to, amount)}
                            >Send</Button>
                        </div>
                        {/* </CardContent>
                        </Card> */}
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
                                    {/* <TableCell></TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quote asset</TableCell>
                                    <TableCell>Minimal trade size</TableCell> */}
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