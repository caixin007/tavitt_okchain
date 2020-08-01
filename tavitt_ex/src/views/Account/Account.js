import React from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import Typography from '@material-ui/core/Typography';
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
                        <div>
                            <Typography variant="h5">
                                Address for testing:
                                </Typography>
                            <Typography variant="h4" style={{ paddingBottom: 15, color: 'red' }}>
                                okchain178nexvc7ewddl43zdqfcjhp23s4ph8sg7x925r
                            </Typography>
                            <Typography variant="h5">
                                To create an account,
                                visit <a>https://www.okex.com/dex-test/wallet/create</a> to genarate.
                            </Typography>
                            <Typography variant="h5" style={{ paddingTop: 15, color: 'darkgray' }}>
                                * Import address is just a temporary plan,
                                in the furture, the privite key or the mnemonic words is required.
                                </Typography>
                            <Typography variant="h5" style={{ paddingBottom: 15, color: 'darkgray' }}>
                                It will be imported with password,
                                and will be stored in local storage after encrypted.
                            </Typography>
                            <Import />
                        </div>
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