import React, { ReactNode, PropsWithoutRef } from "react"
import { Form as FinalForm, FormProps as FinalFormProps } from "react-final-form"
import * as z from "zod"
export { FORM_ERROR } from "final-form"

type FormProps<S extends z.ZodType<any, any>> = {
  /** All your form fields */
  children: ReactNode
  /** Text to display in the submit button */
  submitText: string
  schema?: S
  onSubmit: FinalFormProps<z.infer<S>>["onSubmit"]
  initialValues?: FinalFormProps<z.infer<S>>["initialValues"]
} & Omit<PropsWithoutRef<JSX.IntrinsicElements["form"]>, "onSubmit">

export function Form<S extends z.ZodType<any, any>>({
  children,
  submitText,
  schema,
  initialValues,
  onSubmit,
  ...props
}: FormProps<S>) {
  return (
    <FinalForm
      initialValues={initialValues}
      validate={(values) => {
        if (!schema) return
        try {
          schema.parse(values)
        } catch (error) {
          return error.formErrors.fieldErrors
        }
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, submitError }) => (
        <form onSubmit={handleSubmit} className="form" {...props}>
          {/* Form fields supplied as children are rendered here */}
          {children}

          {submitError && (
            <div role="alert" style={{ color: "red" }}>
              {submitError}
            </div>
          )}

          <button
            className="px-2 py-1 font-semibold text-white transition duration-200 ease-in-out bg-blue-500 border-2 border-blue-500 rounded hover:bg-white hover:text-blue-500"
            type="submit"
            disabled={submitting}
          >
            {submitText}
          </button>

          <style global jsx>{`
            .form > * + * {
              margin-top: 1rem;
            }
          `}</style>
        </form>
      )}
    />
  )
}

export default Form
