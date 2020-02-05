import React from 'react';

import { connect } from 'react-redux';
import { fetchDeals } from '../actions';

import Typography from '@material-ui/core/Typography';

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
                <Typography>Deal List</Typography>
                <Typography>Offers: {this.props.deals.length}</Typography>

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