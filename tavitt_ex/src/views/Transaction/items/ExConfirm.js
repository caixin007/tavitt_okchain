import React, { useState } from 'react';
import { makeStyles } from '@material-ui/styles';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';

import {
    buildExTrans
} from 'apis/okchain';
import {
    send_transaction
} from 'apis/index'


const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    },
    circular: {
        display: 'flex',
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
}))

const ExConfirm = (props) => {
    const { open, address, price, quantity, cancel, side, tpair, ...rest } = props;
    const classes = useStyles();
    const [mnemonic, setMnemonic] = useState(null);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    function placeOrder() {
        buildExTrans(address, tpair, price, quantity, side, mnemonic)
            .then(res => {
                const buf = res.serializeTransactionWithJson("block")
                send_transaction(buf)
                    .then(res => {
                        setLoading(false)
                        cancel();
                        console.log(res);
                    })
                    .catch(err => console.log(err))
                console.log('return:', buf)
            })
            .catch(err => {
                setLoading(false);
                setErr(typeof err);
                console.error('SendConfirmErr: ', err);
            })
    }

    return (
        <div className={classes.root}>
            <Dialog open={open}>
                <DialogTitle id="form-dialog-title">Send Confirm</DialogTitle>
                <DialogContent>
                    {(price !== 0 && quantity !== 0 && tpair !== null) ?
                        <div>
                            <DialogContentText>
                                Are you sure to place {tpair} this order?
                                The PRICE is {price}, and the QUANTITY is {quantity}.
                            </DialogContentText>
                            <TextField
                                error={err ? true : false}
                                helperText={err ? err : null}
                                autoFocus
                                margin="dense"
                                id="mnemonic-order"
                                label="mnemonic words"
                                // type="email"
                                fullWidth
                                onChange={(input) => setMnemonic(input.target.value)}
                            />
                        </div>
                        :
                        <DialogContentText>
                            The price, quantity or the tpair is empty,
                            Please Confirm and try again.
                        </DialogContentText>
                    }
                </DialogContent>
                <DialogActions>
                    {loading ? <div className={classes.root}><CircularProgress /></div> : <div>
                        <Button onClick={() => cancel()} color="primary">
                            Cancel
                    </Button>
                        <Button
                            onClick={() => {
                                placeOrder();
                                setLoading(true)
                            }}
                            color="primary"
                            disabled={(price !== 0 && quantity !== 0 && tpair !== null) ? false : true}
                        >
                            Place
                    </Button>
                    </div>}
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default ExConfirm;