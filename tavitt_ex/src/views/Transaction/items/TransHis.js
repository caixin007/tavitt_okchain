import React, { useState, useEffect } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Moment from 'moment';

const useStyles = makeStyles((theme) => ({
    table: {
        width: '100%'
    },
    addresscell: {
        // width: 200
    }
}));

const TransHis = (props) => {
    const { transactions, address, ...rest } = props;
    const classes = useStyles()
    return (<Table className={classes.table}>
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
                    (transaction.msg[0].type === "okchain/token/MsgTransfer") ?
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
                        </TableRow> : null
                ))
            }
        </TableBody>
    </Table>)
}

export default TransHis;