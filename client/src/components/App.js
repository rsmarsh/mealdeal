import React from 'react';

import TopBar from './TopBar'
import DealList from './DealList';
import CreateDeal from './CreateDeal';
import EditDeal from './EditDeal';

import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from '@material-ui/core';

import './App.css';

const App = () => {
    return (
        <div>
            <Router>
                <TopBar />

                <Container maxWidth="sm">

                    {/* Home page with full deal list */}
                    <Route path="/" exact>
                        <DealList />
                    </Route>

                    {/* Create a deal page */}
                    <Route path="/deals/create" exact>
                        <CreateDeal />
                    </Route>

                    {/* Edit a deal page */}
                    <Route path="/deals/edit/:id?" component={EditDeal} />



                </ Container>
            </Router>
        </div>
    );
}

export default App;