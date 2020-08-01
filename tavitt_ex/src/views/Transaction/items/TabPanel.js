import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import TransHis from './TransHis';
import OrderHis from './OrderHis';

function TabItem(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}
function a11yProps(index) {
    return {
        id: `wrapped-tab-${index}`,
        'aria-controls': `wrapped-tabpanel-${index}`,
    };
}
const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
    },
    tabHeader: {
        width: '100%',
    }
}));

const TabPanel = (props) => {
    const { address, transactions, ...rest } = props;
    const classes = useStyles();
    const [value, setValue] = React.useState('one');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <div className={classes.root}>
            <Tabs value={value} onChange={handleChange} >
                <Tab value="one" label="Transaction History" wrapped {...a11yProps('one')} />
                <Tab value="two" label="Order History" {...a11yProps('two')} />
            </Tabs>
            <TabItem value={value} index="one">
                <TransHis
                    address={address}
                    transactions={transactions}
                />
            </TabItem>
            <TabItem value={value} index="two">
                <OrderHis
                    address={address}
                    transactions={transactions}
                />
            </TabItem>
        </div>
    )
}

export default TabPanel;