import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import reactHook from 'alova/react';
import { ApiError } from '../error/ApiError';

export const userAlova = createAlova({
  requestAdapter: adapterFetch(),
  responded: async (response) => {
    if (response.ok) {
      return await response.json()
    } else {
      const { message, status, errors } = await response.json();
      throw new ApiError(message, status, errors);
    }
  },
  baseURL: 'http://localhost:3000/api',
  statesHook: reactHook,
});

export const todoAlova = createAlova({
  requestAdapter: adapterFetch(),
  responded: async (response) => {
    if (response.ok) {
      return await response.json()
    } else {
      const { message, status, errors } = await response.json();
      throw new ApiError(message, status, errors);
    }
  },
  baseURL: 'http://localhost:3000/api',
  statesHook: reactHook,
});

export * from './user';