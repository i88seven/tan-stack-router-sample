import { createFileRoute, useRouter } from '@tanstack/react-router'
import { useLogout } from '../../features/authentication/api/user'

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
      <button
        type='button'
        onClick={async () => {
          await logout()
          router.invalidate()
        }}
      >
        ログアウト
      </button>
    </div>
  )
}
