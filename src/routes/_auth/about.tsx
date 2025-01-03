import { useSuspenseQuery } from '@tanstack/react-query'
import { createFileRoute } from '@tanstack/react-router'
import { aboutQueryOptions } from '../../features/about/api/about'

export const Route = createFileRoute('/_auth/about')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(aboutQueryOptions),
  component: AboutComponent,
})

function AboutComponent() {
  const aboutQuery = useSuspenseQuery(aboutQueryOptions)
  const about = aboutQuery.data

  return (
    <div className='p-2'>
      <h3>About</h3>
      <ul>
        {about.map((item) => (
          <li key={item.id}>{item.title}</li>
        ))}
      </ul>
    </div>
  )
}
