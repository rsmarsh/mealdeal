import React from 'react';

import TopBar from './TopBar'
import DealList from './DealList';

import { Container } from '@material-ui/core';

import './App.css';

const App = () => {
    return (
        <div>
            <TopBar />
            <Container maxWidth="sm">
                <DealList />
            </ Container>
        </div>
    );
}

export default App;