import { createApi } from '@reduxjs/toolkit/query/react';
import { feathersBaseQuery } from './baseQueryFeathers';
import { baseQueryWithReAuth } from './baseQuery';
import _ from 'lodash';

const endpoint = import.meta.env.VITE_API_ENDPOINT;
// Define a service using a base URL and expected endpoints

export const baseApi = createApi({
  baseQuery: !_.isEmpty(endpoint) ? baseQueryWithReAuth : feathersBaseQuery,
  endpoints: () => ({}),
  tagTypes: ['User', 'Auth'],
});

export default baseApi;
// Export hooks for usage in functional components, which are
