import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import Send from './items/Send';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    }
}))

const Transaction = () => {
    const classes = useStyles();
    const store = useSelector(store => store);
    const address = store.address.address === null ? null : store.address.address.address;

    return (
        <div className={classes.root}>
            {address ?
                <Send
                    address={address}
                />
                :
                <Typography variant="h5">
                    There is no wallet account, please import an account!
                </Typography>
            }
        </div>
    )
}

export default Transaction;