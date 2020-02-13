import dealList from '../apis/deals';

export const fetchDeals = () => async (dispatch, getState) => {
    const response = await dealList.getDeals();

    dispatch({
        type: 'FETCH_DEALS',
        payload: response
    });
    
}