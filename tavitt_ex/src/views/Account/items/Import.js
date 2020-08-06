import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import { addAddress } from 'redux/reducers/actions';
import { get_account } from 'apis/index';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 400,
        margin: theme.spacing(1),
    }
}))

const Import = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [address, setAddress] = useState(null);
    const [error, setError] = useState(null);

    function importWallet(add) {
        // console.log(add)
        get_account(add)
            .then(res => {
                if (res.data === null) setError(JSON.parse(res.msg).message)
                else dispatch(addAddress(res.data.address))
                console.log(res);
            })
            .catch(err => console.log(err))
    }

    return (
        <form className={classes.root} noValidate autoComplete="off">
            <TextField
                error={error ? true : false}
                id="outlined-error-helper-text"
                onChange={input => setAddress(input.target.value)}
                style={{ width: '100%' }}
                helperText={error ? error : null}
                variant="outlined"
            />
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