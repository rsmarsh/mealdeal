import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { 
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton
} from '@material-ui/core';

import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        color: "#ffffff"
    }, 
    menuButton: {
        marginRight: theme.spacing(2),
        color: "#ffffff"
    },
    title: {
        flexGrow: 1
    }
}));


const TopBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>

            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} aria-label="menu">
                        <MenuIcon color="inherit" />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Home
                    </Typography>
                    <Button color="inherit">
                        Login
                    </Button>
                </Toolbar>
            </AppBar>

        </div>
    );
};

export default TopBar;