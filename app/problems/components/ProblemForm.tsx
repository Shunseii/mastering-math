import React from "react"

type ProblemFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const ProblemForm = ({ initialValues, onSubmit }: ProblemFormProps) => {
  return (
    <form
      className="flex flex-col"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <div>
        <label htmlFor="problemName" className="mr-2 font-semibold">
          Problem Name:
        </label>

        <input
          id="problemName"
          className="self-start px-2 py-1 mb-2 border rounded border-bg-gray-200 w-72 focus:ring-1"
          placeholder="Enter a problem name"
        />
      </div>
      <textarea
        className="p-4 mb-4 bg-gray-100 border border-gray-200 rounded-lg bg-opacity-40 focus:ring-1 focus:outline-none"
        rows={5}
        placeholder="Enter your problem here."
      />
      <button className="self-start px-2 py-1 font-bold text-white transition duration-200 ease-in-out bg-blue-500 border-2 border-blue-500 rounded hover:text-blue-500 hover:bg-white">
        Submit
      </button>
    </form>
  )
}

export default ProblemForm
