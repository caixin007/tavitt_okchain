import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { Button } from '@material-ui/core';

import AccInfo from './items/AccInfo';

// import { LatestOrders, MatchOrders } from './items';
const address = 'okchain178nexvc7ewddl43zdqfcjhp23s4ph8sg7x925r';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    }
}))

const Account = () => {
    const classes = useStyles();
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
                    {address ? <AccInfo address={address} /> : null}
                </Grid>
            </Grid>
        </div>
    )
}

export default Account;