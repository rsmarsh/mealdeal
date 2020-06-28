import React from 'react';

import { connect } from 'react-redux';
import { fetchDeals } from '../actions';

import { Link } from 'react-router-dom';

import Typography from '@material-ui/core/Typography';

import MiniDeal from './MiniDeal';


class DealList extends React.Component {
    componentDidMount() {
        // initiate data retrieval 
        // TODONEXT: fetch a new deal list each time the home is visited
        this.props.fetchDeals();
    }

    renderList() {
        
        return this.props.deals.map(deal => {
            return (
                <MiniDeal
                    key={deal.id}
                    title={deal.title}
                    venue={deal.venue}
                    description={deal.description}
                />
            )
        });
    }
    
    render() {
        return (
            <div>
                <Typography variant="h3">Deal List</Typography>
                <Typography variant="subtitle1">Offers: {this.props.deals.length}</Typography>

                {this.renderList()}
                <Link to="/deals/create">
                    Create A Deal
                </Link>
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {
        deals: Object.values(state.deals)
    };
};

export default connect(
    mapStateToProps,
    { fetchDeals }
    )(DealList);