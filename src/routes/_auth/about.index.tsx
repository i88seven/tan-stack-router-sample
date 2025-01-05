import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { aboutQueryOptions } from '~/features/about/api/about'

export const Route = createFileRoute('/_auth/about/')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(aboutQueryOptions),
  component: AboutComponent,
})

function AboutComponent() {
  const aboutQuery = useSuspenseQuery(aboutQueryOptions)
  const about = aboutQuery.data
  const navigate = useNavigate()

  return (
    <div className='p-2'>
      <h3>About</h3>
      <ul>
        {about.map((item) => (
          <div key={item.id}>
            <li key={item.id}>{item.title}</li>
            <button
              type='button'
              onClick={() => {
                navigate({
                  to: '/about/$aboutId',
                  params: { aboutId: item.id.toString() },
                })
              }}
            >
              Detail
            </button>
          </div>
        ))}
      </ul>
    </div>
  )
}
