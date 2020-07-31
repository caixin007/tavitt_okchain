import React, { useState, useEffect } from 'react';

import { Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';

import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import Typography from '@material-ui/core/Typography';

// import MatchOrders from './items/MatchOrders';

import { useSelector, useDispatch } from 'react-redux';
import {
    get_tokens,
} from 'apis/index';



const useStyles = makeStyles((theme) => ({
    root: {
        padding: theme.spacing(4)
    },
    list: {
        width: '100%',
        // maxWidth: 360,
    },
    listitem: {
        margin: theme.spacing(1),
        backgroundColor: "#eee",
    },
    title: {
        padding: theme.spacing(4),
        // backgroundColor: 
    }
}))

const Projects = () => {
    const classes = useStyles();
    const [projects, setProjects] = useState([]);
    // console.log(projects)
    // const store = useSelector(store => store);

    useEffect(() => {
        get_tokens()
            .then(res => {
                setProjects(res.data);
                // console.log(res.data);
            })
            .catch(err => console.log(err))
    }, [])

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
                    <Typography variant="h4" className={classes.title}>
                        Projects List on OKChain
                    </Typography>
                    <Typography variant="h6" className={classes.title}>
                        <div>You can link to other objects from this list to check the details.</div>
                        <div>There will be more exchange pair between tavitt coin and other currencies on OKChain.</div>
                        <div>Check https://tavittwallet.io/ to see what can be done by tavitt coin.</div>
                    </Typography>
                    <List className={classes.list}>
                        {projects.map((project, index) => (
                            <ListItem
                                key={index}
                                className={classes.listitem}
                                button
                                onClick={() => alert(`Jump to project ${project.whole_name}`)}
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        <ImageIcon />
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText primary={project.whole_name} />
                                <ListItemText primary={project.symbol} />
                                <ListItemText primary={project.description} />
                            </ListItem>
                        ))
                        }
                    </List>
                </Grid>
            </Grid>
        </div >
    )
}

export default Projects;