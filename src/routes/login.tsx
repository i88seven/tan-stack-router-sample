import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useLayoutEffect, useState } from 'react'
import { usePostToken } from '../features/authentication/api/user'
import { Button, OutlinedInput } from '@mui/material'

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  const router = useRouter()
  const { user } = Route.useRouteContext()
  const { mutateAsync: postToken } = usePostToken()
  const [email, setEmail] = useState('')

  useLayoutEffect(() => {
    if (user) {
      router.history.push('/home')
    }
  }, [user])

  return (
    <div className='p-2'>
      <div>ログインしてください</div>
      <form
        onSubmit={async (e) => {
          e.preventDefault()
          await postToken({ email })
          router.invalidate()
        }}
        className='flex gap-2'
      >
        <OutlinedInput
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='Email'
        />
        <Button type='submit'>ログイン</Button>
      </form>
    </div>
  )
}
