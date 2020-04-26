import dealsAPI from '../apis/deals';
import history from '../history';

export const fetchDeals = () => async (dispatch, getState) => {
    const response = await dealsAPI.getAll();
    

    dispatch({
        type: 'FETCH_DEALS',
        payload: response
    });
    
}
// DONEXT parse the CREATE_DEAL response from the reducer
export const createDeal = formValues => async (dispatch, getState) => {
    const response = await dealsAPI.create(formValues)
        .catch(e => console.log("Deal creation error, ", e));
    
        // for scenarios where the server failed to response or an error occured, the data property may be undefined
    let resData = response?.data?.success || false;

    dispatch({
        type: 'CREATE_DEAL',
        payload: resData
    });

    if (resData !== false) {
        // programmatically push the user back to the homepage after a creation
        history.push('/');
    } else {
        // TODO: let the create form page and user know that the deal creation request failed 
    }
}