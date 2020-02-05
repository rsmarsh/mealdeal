import React from 'react';

import {Typography, Paper, Button}  from '@material-ui/core';

import './MiniDeal.css';

const MiniDeal = (props) => {
    return (
        <Paper elevation={1} className="deal-wrapper">
            <Typography variant="h5">{props.title}</Typography>
            <Typography variant="subtitle2">{props.venue}</Typography>
            <Typography variant="body2">{props.description}</Typography>
            <Button className="view-deal" variant="contained" color="primary">
                View Deal
            </Button>

        </Paper>
    )
};

export default MiniDeal;