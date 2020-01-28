import React from 'react';

const MiniDeal = (props) => {
    return (
        <div>
            <h2>{props.title}</h2>
            <h3>{props.venue}</h3>
            <p>{props.description}</p>
        </div>
    )
};

export default MiniDeal;