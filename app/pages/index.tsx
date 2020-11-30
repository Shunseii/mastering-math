import { BlitzPage, useRouter } from "blitz"
import { useCurrentUser } from "app/hooks/useCurrentUser"
import { Suspense } from "react"
import Layout from "app/layouts/Layout"

import "katex/dist/katex.min.css"

const Home = () => {
  const router = useRouter()
  const user = useCurrentUser()

  if (user) router.push("/courses")

  router.push("/signup")

  return (
    <div>
      <main className="mx-96">Hello World!</main>
    </div>
  )
}

const HomePage: BlitzPage = () => (
  <Suspense fallback="Loading...">
    <Home />
  </Suspense>
)

HomePage.getLayout = (page) => <Layout title="Home">{page}</Layout>

export default HomePage
