import React from "react"
import { useRouter } from "blitz"
import Layout from "app/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"

const LoginPage = () => {
  const router = useRouter()

  return (
    <main className="mx-96">
      <LoginForm onSuccess={() => router.push("/")} />
    </main>
  )
}

LoginPage.getLayout = (page) => <Layout title="Login">{page}</Layout>

export default LoginPage
