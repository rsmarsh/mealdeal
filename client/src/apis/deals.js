import dealListJSON from '../dummydata/deallist';
import axios from 'axios';

const serverPort = '3001';
const axiosRequester = axios.create({
    baseURL: `${document.location.protocol}//${document.location.hostname}:${serverPort}/api`;
});

export const createDeal = (formValues) => {
    axiosRequester.post('/deals/create', {
        ...formValues
    });
};

export const getDeals = () => dealListJSON;