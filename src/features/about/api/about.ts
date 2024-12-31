import { queryOptions } from '@tanstack/react-query'

export const aboutQueryOptions = queryOptions({
  queryKey: ['about'],
  queryFn: async () => {
    return [
      {
        id: 1,
        title: 'タイトル1',
      },
    ]
  },
})
