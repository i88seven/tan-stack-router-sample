import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { z } from 'zod'
import type { Token, User, loginRequestSchema } from '../types/user'

export const meQuery = {
  queryKey: ['me'],
  queryFn: async () => {
    const accessToken = window.localStorage.getItem('access_token') ?? ''
    const data = accessToken
      ? ({
          email: 'email1',
          username: import.meta.env.VITE_USER_NAME,
        } satisfies User)
      : null
    return data
  },
}

export const useMe = () => {
  return useQuery(meQuery)
}

export const usePostToken = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async ({ email }: z.infer<typeof loginRequestSchema>) => {
      const data = {
        access: `access-token1-${email}`,
        refresh: `refresh-token1-${email}`,
      } satisfies Token
      window.localStorage.setItem('access_token', data.access)
      window.localStorage.setItem('refresh_token', data.refresh)
      await Promise.all([queryClient.invalidateQueries({ queryKey: ['me'] })])
      return data
    },
  })
}

export const useLogout = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: async () => {
      window.localStorage.removeItem('access_token')
      window.localStorage.removeItem('refresh_token')
      await queryClient.invalidateQueries({ queryKey: ['me'] })
      queryClient.removeQueries()
      await Promise.resolve() // TODO revoke token
    },
  })
}
