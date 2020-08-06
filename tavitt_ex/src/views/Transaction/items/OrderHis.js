import React from 'react';
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
const OrderHis = (props) => {
    const { transactions } = props;
    const classes = useStyles()
    return (<Table className={classes.table}>
        <TableHead>
            <TableRow>
                <TableCell>Product</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Quantity</TableCell>
                <TableCell>Side</TableCell>
                <TableCell>Time</TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            {
                transactions.map((transaction, index) => (
                    (transaction.msg[0].type === "okchain/order/MsgNew") ?
                        <TableRow
                            hover
                            key={index}
                        >
                            <TableCell>
                                {transaction.msg[0].value.order_items[0].product}
                            </TableCell>
                            <TableCell className={classes.addresscell}>
                                {transaction.msg[0].value.order_items[0].price}
                            </TableCell>
                            <TableCell>
                                {transaction.msg[0].value.order_items[0].quantity}
                            </TableCell>
                            <TableCell>
                                {transaction.msg[0].value.order_items[0].side}
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

export default OrderHis;