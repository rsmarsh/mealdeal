export default (state = {}, action) => {

    switch(action.type) {
        case 'FETCH_DEALS':
            const dealList = {...state};
            action.payload.forEach( deal => dealList[deal.id] = deal );
            return dealList;

        case 'CREATE_DEAL':
            // if the deal creation failed, no change to the state occured
            if (action.payload === false) {
                return state;
            }
            
            return {...state, [action.payload.id]: action.payload};
        default:
            return state;
    }
    
};