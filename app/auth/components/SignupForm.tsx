import React from "react"
import { useMutation, Link } from "blitz"
import { LabeledTextField } from "app/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/components/Form"
import signup from "app/auth/mutations/signup"
import { SignupInput } from "app/auth/validations"

type SignupFormProps = {
  onSuccess?: () => void
}

export const SignupForm = (props: SignupFormProps) => {
  const [signupMutation] = useMutation(signup)

  return (
    <div className="flex flex-col px-8 pt-2 pb-8 mx-auto mt-16 rounded shadow-md w-min">
      <h1 className="pb-4 text-3xl font-semibold">Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={SignupInput}
        initialValues={{ email: "", password: "" }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return { email: "This email is already being used" }
            } else {
              return { [FORM_ERROR]: error.toString() }
            }
          }
        }}
      >
        <LabeledTextField name="email" label="Email" placeholder="Email" />
        <LabeledTextField name="password" label="Password" placeholder="Password" type="password" />
      </Form>

      <div className="mt-4">
        Existing user?{" "}
        <Link href="/login">
          <a className="text-blue-500 transition duration-200 ease-in-out hover:text-blue-600">
            Login
          </a>
        </Link>
      </div>
    </div>
  )
}

export default SignupForm
