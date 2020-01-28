export default (state = [], action) => {

    switch(action.type) {
        case 'FETCH_DEALS':
            return action.payload;
        default:
            return state;
    }
    
};