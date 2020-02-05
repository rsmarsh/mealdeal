import React from 'react';

import DealList from './DealList';

import { Container } from '@material-ui/core';

import './App.css';

const App = () => {
    return (
        <Container maxWidth="sm">
            <DealList />
        </ Container>
    );
}

export default App;