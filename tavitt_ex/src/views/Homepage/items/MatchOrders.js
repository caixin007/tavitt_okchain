import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
    Card,
    CardActions,
    CardHeader,
    CardContent,
    Button,
    Divider,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Tooltip,
    TableSortLabel
} from '@material-ui/core';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import {
    get_match_order
} from 'apis/index';
import { StatusBullet } from 'components';

const useStyles = makeStyles(theme => ({
    root: {},
    content: {
        padding: 0
    },
    inner: {
        minWidth: 800
    },
    statusContainer: {
        display: 'flex',
        alignItems: 'center'
    },
    status: {
        marginRight: theme.spacing(1)
    },
    actions: {
        justifyContent: 'flex-end'
    }
}));

const statusColors = {
    delivered: 'success',
    pending: 'info',
    refunded: 'danger'
};

const MatchOrders = props => {
    const { className, ...rest } = props;
    const classes = useStyles();
    const [orders, setOrders] = useState([]);
    useEffect(() => {
        get_match_order()
            .then(res => {
                setOrders(res.data);
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <Card
            {...rest}
            className={clsx(classes.root, className)}
        >
            <CardHeader
                title="Match Orders"
            />
            <Divider />
            <CardContent className={classes.content}>
                <PerfectScrollbar>
                    <div className={classes.inner}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Pair ID</TableCell>
                                    <TableCell>Base asset</TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>Price</TableCell>
                                    <TableCell>Quote asset</TableCell>
                                    <TableCell>Minimal trade size</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    orders.map((order, index) => (
                                        <TableRow
                                            hover
                                            key={index}
                                        >
                                            <TableCell>{order.token_pair_id}</TableCell>
                                            <TableCell>{order.base_asset_symbol}</TableCell>
                                            <TableCell>=</TableCell>
                                            <TableCell>{order.price}</TableCell>
                                            <TableCell>{order.quote_asset_symbol}</TableCell>
                                            <TableCell>{order.min_trade_size}</TableCell>
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </div>
                </PerfectScrollbar>
            </CardContent>
        </Card>
    );
};

MatchOrders.propTypes = {
    className: PropTypes.string
};

export default MatchOrders;
