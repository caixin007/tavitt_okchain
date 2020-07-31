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


    const address = (store.address === null) ? null : store.address.address;
    // console.log(address)
    // const currencies = address ? [] : store.address.address.currencies;

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
                    {address === null ?
                        <Import />
                        :
                        <AccInfo
                            address={address}
                        // currencies={currencies}
                        />
                    }
                </Grid>
            </Grid>
        </div>
    )
}

export default Account;