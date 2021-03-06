import React from 'react';
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
    const address = store.address === null ? null : store.address.address;

    return (
        <div className={classes.root}>
            {address === null ?
                <Typography variant="h5">
                    There is no wallet account, please import an account!
                </Typography>
                :
                <Send
                    address={address}
                />
            }
        </div>
    )
}

export default Transaction;