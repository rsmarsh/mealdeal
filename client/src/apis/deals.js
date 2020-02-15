import dealListJSON from '../dummydata/deallist';
import axios from 'axios';

const axiosRequester = axios.create({
    baseURL: document.location.origin
});

export const createDeal = (formValues) => {
    console.log(axiosRequester);
    console.log("create deal in apis");
    axiosRequester.post('/deals/create', {
        ...formValues
    });
};

export const getDeals = () => dealListJSON;