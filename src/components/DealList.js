import React from 'react';

import { connect } from 'react-redux';
import { fetchDeals } from '../actions';

import MiniDeal from './MiniDeal';



class DealList extends React.Component {
    componentDidMount() {
        // initiate data retrieval 
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
                <h1>Deal List</h1>
                <h2>Offers: {this.props.deals.length}</h2>

                {this.renderList()}
            </div>
        );
    }

}

const mapStateToProps = (state, ownProps) => {
    return {deals: state.deals};
};

export default connect(
    mapStateToProps,
    { fetchDeals }
    )(DealList);