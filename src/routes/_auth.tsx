import { createFileRoute, redirect } from '@tanstack/react-router'
import { meQuery } from '~/features/authentication/api/user'

export const Route = createFileRoute('/_auth')({
  beforeLoad: async ({ context }) => {
    const me = await context.queryClient.fetchQuery(meQuery)
    if (!me) {
      throw redirect({
        to: '/login',
      })
    }

    return {
      user: me,
    }
  },
})
