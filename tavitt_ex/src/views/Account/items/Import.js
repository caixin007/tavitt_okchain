import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { addAddress } from 'redux/reducers/actions';
import {
    get_match_order,
    get_account
} from 'apis/index';

// const address_local = 'okchain178nexvc7ewddl43zdqfcjhp23s4ph8sg7x925r';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 400,
        margin: theme.spacing(1),
    }
}))

const Import = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    // const store = useSelector(store => store);
    const [address, setAddress] = useState(null);
    const [error, setError] = useState(null);
    // console.log(address )

    function importWallet(add) {
        // console.log(add)
        get_account(add)
            .then(res => {
                if (res.data === null) setError(JSON.parse(res.msg).message)
                else dispatch(addAddress(res.data))
                // setAccount(res.data);
                console.log(res);
            })
            .catch(err => console.log(err))
        // dispatch(addAddress(add))
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            {/* <div className={classes.root}> */}
            <TextField
                error={error ? true : false}
                id="outlined-error-helper-text"
                onChange={input => setAddress(input.target.value)}
                style={{ width: '100%' }}
                helperText={error ? error : null}
                variant="outlined"
            />
            {/* </div> */}
            <div className={classes.root}>
                <Button
                    style={
                        {
                            backgroundColor: '#eee'
                        }
                    }
                    onClick={() => importWallet(address)}
                >Import</Button>
            </div>
        </form>
    )
}
export default Import;