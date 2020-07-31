import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import MatchOrders from './items/MatchOrders';

import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    }
}))

const Homepage = () => {
    const classes = useStyles();
    const store = useSelector(store => store);
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
                    {/* {JSON.stringify(store)} */}
                    <MatchOrders />
                </Grid>
            </Grid>
        </div>
    )
}

export default Homepage;