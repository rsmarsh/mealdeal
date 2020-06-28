import dealListJSON from '../dummydata/deallist'; // TODO replace this with real data from the database
import axios from 'axios';

const serverPort = '3001';
const axiosRequester = axios.create({
    baseURL: `${document.location.protocol}//${document.location.hostname}:${serverPort}/api`
});

export const create = (formValues) => {
    return axiosRequester.post('/deals/create', {
        ...formValues
    });
};

// TODONEXT: switch the json file for the database
export const getAll = () => dealListJSON;

export default {create, getAll};