import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import {albumType} from '../types/albumsType';
import {queryType} from '../types/queryType';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({baseUrl: 'https://jsonplaceholder.typicode.com'}),
  endpoints: builder => ({
    getAlbum: builder.query<albumType[], queryType>({
      query: (item: queryType) => {
        const {page, query = ''} = item;
        const limit = 20;
        return {
          url: `/albums?${!query ? `_page=${page}&_limit=${limit}` : ''}}`,
          method: 'Get',
        };
      },
      transformResponse: (response: albumType[], meta, arg) => {
        const {query = ''} = arg;
        const search = query.toLowerCase();
        return response?.filter(({title}) => title.includes(search));
      },
    }),
  }),
});

export const {useGetAlbumQuery} = api;
