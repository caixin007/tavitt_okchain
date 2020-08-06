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
    buildTrans
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

const SendConfirm = (props) => {
    const { open, address, to, amount, cancel, denom } = props;
    const classes = useStyles();
    const [mnemonic, setMnemonic] = useState(null);
    const [err, setErr] = useState(null);
    const [loading, setLoading] = useState(false);

    function Send() {
        buildTrans(address, to, amount, denom, mnemonic)
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
                    {(to !== null && amount !== 0 && denom !== null) ?
                        <div>
                            <DialogContentText>
                                Are you sure to send {amount} {denom} to {to}?
                            </DialogContentText>
                            <TextField
                                error={err ? true : false}
                                helperText={err ? err : null}
                                autoFocus
                                margin="dense"
                                id="mnemonic"
                                label="mnemonic words"
                                // type="email"
                                fullWidth
                                onChange={(input) => setMnemonic(input.target.value)}
                            />
                        </div>
                        :
                        <DialogContentText>
                            The to address is empty or the amount is 0.
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
                                Send();
                                setLoading(true)
                            }}
                            color="primary"
                            disabled={(to !== null && amount !== 0 && denom !== null) ? false : true}>
                            Send
                    </Button>
                    </div>}


                </DialogActions>
            </Dialog>
        </div>
    )
}

export default SendConfirm;