import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider, createRouter } from '@tanstack/react-router'
import { useEffect } from 'react'
import ReactDOM from 'react-dom/client'
import { useMe } from './features/authentication/api/user'
import { routeTree } from './routeTree.gen'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      staleTime: 1000 * 60 * 60 * 24, // 24h
    },
  },
})
const router = createRouter({
  routeTree,
  context: {
    user: undefined, // We'll inject this when we render
    queryClient,
  },
  defaultPreload: 'intent',
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

function App() {
  const user = useMe()
  useEffect(() => {
    router.invalidate()
  }, [user.data])

  return (
    <RouterProvider
      router={router}
      context={{ user: user.data ?? undefined }}
    />
  )
}

const rootElement = document.getElementById('app')
if (rootElement && !rootElement.innerHTML) {
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  )
}
