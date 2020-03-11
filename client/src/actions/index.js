import dealsAPI from '../apis/deals';

export const fetchDeals = () => async (dispatch, getState) => {
    const response = await dealsAPI.getAll();
    

    dispatch({
        type: 'FETCH_DEALS',
        payload: response
    });
    
}
// DONEXT parse the CREATE_DEAL response from the reducer
export const createDeal = formValues => async (dispatch, getState) => {
    
    const response = await dealsAPI.create(formValues);
    // for scenarios where the server failed to response or an error occured, the data property may be undefined
    const resData = response?.data?.success || false;

    dispatch({
        type: 'CREATE_DEAL',
        payload: resData
    })
}