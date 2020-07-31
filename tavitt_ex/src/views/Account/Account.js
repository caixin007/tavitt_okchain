import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';

import Import from './items/Import';
import AccInfo from './items/AccInfo';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    }
}))

const Account = () => {
    const classes = useStyles();
    const store = useSelector(store => store);
    const currencies = store.address.address === null ? null : store.address.address.currencies;
    const address = store.address.address === null ? null : store.address.address.address;

    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={8}
                    md={12}
                    xl={9}
                    xs={12}
                >
                    {address ?
                        <AccInfo
                            address={address}
                            currencies={currencies}
                        />
                        :
                        <Import />
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default Account;