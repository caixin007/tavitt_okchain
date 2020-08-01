import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import MatchOrders from './items/MatchOrders';
import Typography from '@material-ui/core/Typography';

import { useSelector, useDispatch } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    },
    title: {
        // color: '#eee'
        width: '100%',
        alignItems: 'center',
        padding: theme.spacing(4)
    },
    items: {
        padding: theme.spacing(2)
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
                    {/* <MatchOrders /> */}
                    <Typography variant="h1" className={classes.title}>
                        This is why we can go everywhere
                    </Typography>
                    <Typography variant="h3" className={classes.items}>
                        1. About Tavitt
                    </Typography>
                    <Typography variant="h3" className={classes.items}>
                        2. Issue Token Tavitt-128 on OKChain
                    </Typography>
                    <Typography variant="h3" className={classes.items}>
                        3. Tavitt-128 can make pairs with tokens on OKChain
                    </Typography>
                    <Typography variant="h3" className={classes.items}>
                        4. The users on OKChain can enjoy the services on Tavitt Platform
                    </Typography>
                </Grid>
            </Grid>
        </div>
    )
}

export default Homepage;