import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import moment from 'moment';
import PerfectScrollbar from 'react-perfect-scrollbar';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';

import { List, ListItem } from '@material-ui/core';
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
    get_match_order,
    get_account
} from 'apis/index';

const useStyles = makeStyles(theme => ({
    root: {
        margin: 10
    },
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

// const address = 'okchain178nexvc7ewddl43zdqfcjhp23s4ph8sg7x925r';

const GetAccount = props => {
    const { className, address, ...rest } = props;
    const classes = useStyles();
    const [currencies, setCurrencies] = useState([]);
    const [hideToken, setHideToken] = useState(true);

    // console.log(hideToken)

    useEffect(() => {
        get_account(address)
            .then(res => {
                setCurrencies(res.data.currencies);
                console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [])
    return (
        <div className={classes.content}>
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
                <CardHeader
                    title="Address"
                />
                <CardContent>
                    {address}
                </CardContent>
            </Card>
            <Card
                {...rest}
                className={clsx(classes.root, className)}
            >
                <CardHeader
                    title="Currencies"
                    action={
                        <Button
                            color="primary"
                            size="small"
                            variant="outlined"
                            onClick={() => setHideToken(!hideToken)}
                        >
                            {hideToken ? 'Show all tokens' : 'Hide Balance 0 tokens'}
                        </Button>
                    }
                />
                <CardContent>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Token Name</TableCell>
                                <TableCell>Balance</TableCell>
                                <TableCell>Locked</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {currencies.map((currency, index) => (
                                hideToken && currency.available === "0" ? null :
                                    <TableRow
                                        hover
                                        key={index}
                                    >
                                        <TableCell>{currency.symbol}</TableCell>
                                        <TableCell>{currency.available}</TableCell>
                                        <TableCell>{currency.locked}</TableCell>
                                    </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
};

GetAccount.propTypes = {
    className: PropTypes.string
};

export default GetAccount;
