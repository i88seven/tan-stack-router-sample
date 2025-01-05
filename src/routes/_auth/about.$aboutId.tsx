import { createFileRoute, useParams } from '@tanstack/react-router'
import { aboutQueryOptions } from '../../features/about/api/about'

export const Route = createFileRoute('/_auth/about/$aboutId')({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData(aboutQueryOptions),
  component: AboutDetailComponent,
})

function AboutDetailComponent() {
  const { aboutId } = useParams({ from: '/_auth/about/$aboutId' })

  return (
    <div className='p-2'>
      <h3>About #{aboutId}</h3>
    </div>
  )
}
