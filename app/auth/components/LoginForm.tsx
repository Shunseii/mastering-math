import React from "react"
import { AuthenticationError, Link, useMutation } from "blitz"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import login from "app/auth/mutations/login"
import { LoginInput } from "app/auth/validations"

type LoginFormProps = {
  onSuccess?: () => void
}

export const LoginForm = (props: LoginFormProps) => {
  const [loginMutation] = useMutation(login)

  return (
    <div className="flex flex-col px-8 pt-2 pb-8 mx-auto mt-16 rounded shadow-md w-min">
      <h1 className="pb-4 text-3xl font-semibold">Login</h1>

      <Form
        submitText="Login"
        schema={LoginInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await loginMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error instanceof AuthenticationError) {
              return { [FORM_ERROR]: "Sorry, those credentials are invalid" }
            } else {
              return {
                [FORM_ERROR]:
                  "Sorry, we had an unexpected error. Please try again. - " + error.toString(),
              }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>

      <div className="mt-4">
        New user?{" "}
        <Link href="/signup">
          <a className="text-blue-500 transition duration-200 ease-in-out hover:text-blue-600">
            Sign up
          </a>
        </Link>
      </div>
    </div>
  )
}

export default LoginForm
