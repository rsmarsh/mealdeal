import dealsAPI from '../apis/deals';
import history from '../history';

export const fetchDeals = () => async (dispatch, getState) => {
    const response = await dealsAPI.getAll();
    

    dispatch({
        type: 'FETCH_DEALS',
        payload: response
    });
    
}

export const createDeal = formValues => async (dispatch, getState) => {
    const response = await dealsAPI.create(formValues)
        .catch(e => console.log("Deal creation error, ", e));
    
    // for scenarios where the server failed to response or an error occured, the data property may be undefined
    let success = response?.data?.success || false;
    let newDealID = response?.data?.data?.dealId;


    dispatch({
        type: 'CREATE_DEAL',
        payload: {
            success,
            deal: {...formValues, id: newDealID}
        }
    });

}