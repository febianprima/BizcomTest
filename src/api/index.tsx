import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {albumType} from '../types/albumsType';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
  endpoints: builder => ({
    getAlbum: builder.query<albumType[], number | void>({
      query: (page = 1) => {
        const limit = 20;
        return {
          url: `/albums?_page=${page}&_limit=${limit}`,
          method: 'Get',
        };
      },
    }),
  }),
});

export const {useGetAlbumQuery} = api;
