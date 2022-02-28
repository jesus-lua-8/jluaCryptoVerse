import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

/**
 * This header contains the host and key that give us the access to the
 * api data.
 */
const cryptoApiHeaders = {
    'x-rapidapi-host': process.env.REACT_APP_CRYPTO_RAPIDOT_HOST,
    'x-rapidapi-key': process.env.REACT_APP_RAPIDAPI_KEY
}

const createRequest = (url) => ({ url, headers: cryptoApiHeaders})

/**
 * From reduxjs toolkit, two hooks are used, createApi and fetchBaseQuery. This function
 * will contain four endpoints from were the data will be coming from. To have access to
 * those endpoints we build a fetchBaseQuery. As part of the function we also must provide
 * a reducer path to allow to the use of the data to the app by Provider or store.
 */
export const cryptoApi = createApi({
    reducerPath: 'cryptoApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_CRYPTO_API_URL }),
    endpoints: (builder) => ({
        getCryptos: builder.query({
            query: (count) => createRequest(`/coins?limit=${count}`)
        }),
        getCryptoDetails: builder.query({
            query: (coinId) => createRequest(`/coin/${coinId}`)
        }),
        getCryptoHistory: builder.query({
            query: ({coinId, timePeriod}) => createRequest(`coin/${coinId}/history?timePeriod=${timePeriod}`)
        }),
        getExchanges: builder.query({
            query: () => createRequest('/exchanges'),
        })
    })
})

//In order to have access to the endpoints we must export them with correct syntax.
//For example, lets look at one of the endpoints, in order to export getCryptos
//We must place the word "use" in front of it, then we must use pascal case for getCryptos
//And finally we end it with the word Query so it looks like this: use + GetCryptos + Query giving use useGetCryptosQuery
//This process is repeated for every endpoint to be exported 
export const {
    useGetCryptosQuery, 
    useGetCryptoDetailsQuery, 
    useGetCryptoHistoryQuery,
    useGetExchangesQuery
} = cryptoApi;