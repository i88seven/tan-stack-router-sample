import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useLogout } from '../../features/authentication/api/user'
import { Button } from '@mui/material'

export const Route = createFileRoute('/_auth/home')({
  component: HomeComponent,
})

function HomeComponent() {
  const router = useRouter()
  const { user } = Route.useRouteContext()
  const { mutateAsync: logout } = useLogout()

  return (
    <div className='p-2'>
      <h3>Welcome {user?.username}!</h3>
      <Button
        onClick={async () => {
          await logout()
          router.invalidate()
        }}
      >
        ログアウト
      </Button>
    </div>
  )
}
