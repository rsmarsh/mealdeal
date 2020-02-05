import React from 'react';

import Button from '@material-ui/core/Button';

const MiniDeal = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            <h3>{props.venue}</h3>
            <p>{props.description}</p>
            <Button variant="contained" color="primary">
                View Deal
            </Button>

        </div>
    )
};

export default MiniDeal;