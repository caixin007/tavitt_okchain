import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import MatchOrders from './items/MatchOrders';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    }
}))

const Homepage = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid
                container
                spacing={4}
            >
                <Grid
                    item
                    lg={10}
                    md={12}
                    xl={9}
                    xs={12}
                >
                    <MatchOrders />
                </Grid>
            </Grid>
        </div>
    )
}

export default Homepage;