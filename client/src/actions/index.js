import { getDeals } from '../apis/deals';

export const fetchDeals = () => async (dispatch, getState) => {
    const response = await getDeals();

    dispatch({
        type: 'FETCH_DEALS',
        payload: response
    });
    
}