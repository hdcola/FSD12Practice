import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import reactHook from 'alova/react';

export const userAlova = createAlova({
  requestAdapter: adapterFetch(),
  responded: (response) => response.json(),
  baseURL: 'http://localhost:3000',
  statesHook: reactHook,
});

export const blogAlova = createAlova({
  requestAdapter: adapterFetch(),
  responded: (response) => response.json(),
  baseURL: 'http://localhost:3000',
  statesHook: reactHook,
});

export * from './user';