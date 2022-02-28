import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cryptoApi } from "./cryptoApi";

/**
 * This header contains the host and key that give us the access to the
 * api data.
 */
const cryptoNewsHeaders = {
    'x-bingapis-sdk': 'true',
    'x-rapidapi-host': process.env.REACT_APP_NEWS_RAPIDAPI_HOST,
    'x-rapidapi-key': process.env.REACT_APP_NEWS_RAPIDAPI_KEY
  }

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders});

/**
 * cryptoNewsApi is the api needed to grab data for crypto news. As part of the reduxjs toolkit
 * we use createApi to create the api along with fetchBaseQuery that allows us get the desired
 * data from the API. Using a reducerPath for the application store and naming properly to the
 * Api functionality. Once we create our fetchBaseQuery we can then move on to get the endpoints
 * of the API and include them for further use. Any parameters that need to be used can be passed
 * through the query.
 */
export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_NEWS_API_URL}),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({newsCategory, count}) => createRequest(`/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`),
        })
    })
})

export const { useGetCryptoNewsQuery } = cryptoNewsApi;