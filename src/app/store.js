import { configureStore } from "@reduxjs/toolkit/";
import { cryptoApi } from '../services/cryptoApi';
import { cryptoNewsApi } from "../services/cryptoNewsApi";

/** 
 * This function will represent the store of the app and give our fron-end application
 * the access to the data of the API.
 */
export default configureStore({
    reducer: {
        [cryptoApi.reducerPath]: cryptoApi.reducer,
        [cryptoNewsApi.reducerPath] : cryptoNewsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cryptoApi.middleware),
});