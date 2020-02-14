import React from 'react';

class EditDeal extends React.Component {
    state = {
        dealId: null
    };

    componentDidMount() {
        console.log(this.props);
        this.setState({dealId: this.getDealId()});

    }

    getDealId() {
        const { id } = this.props.match.params;
        console.log(id);
        return id;
    }

    renderMessage() {
        if (this.state.dealId) {
            return <div>Editing Deal: { this.state.dealId }</div>
        } else {
            return <div>Deal no longer available or an incorrect ID was entered</div>
        }
    }

    render() {
        return (
            <div>{ this.renderMessage() }</div>
        )

    }
}

export default EditDeal;