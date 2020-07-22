import React, { useState } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';

import { makeStyles } from '@material-ui/styles';
import { Sidebar, Topbar, Footer } from './items';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        paddingTop: 56,
        height: '100%',
        [theme.breakpoints.up('sm')]: {
            paddingTop: 64
        }
    },
    shiftContent: {
        paddingLeft: 240
    },
    content: {
        height: '100%'
    }
}))

const Main = props => {
    const { children } = props;
    const classes = useStyles();

    return (
        <div
            className={clsx({
                [classes.root]: true,
                [classes.shiftContent]: true
            })}
        >
            <Topbar />
            <Sidebar
                open={true}
                variant={'persistent'}
            />
            <main className={classes.content}>
                {children}
                <Footer />
            </main>
        </div>
    )
}

Main.propTypes = {
    children: PropTypes.node
};

export default Main;