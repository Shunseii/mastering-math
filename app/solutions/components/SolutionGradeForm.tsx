import React from "react"

type SolutionGradeFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const SolutionGradeForm = ({ initialValues, onSubmit }: SolutionGradeFormProps) => {
  return (
    <form
      className="flex flex-col"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <div className="flex flex-row">
        <label htmlFor="userGrade" className="mr-2 font-semibold">
          Grade:
        </label>
        <input
          id="userGrade"
          placeholder="0"
          className="self-start w-8 mb-2 mr-1 border border-gray-200 rounded focus:ring-1 focus:outline-none"
        />
        %
      </div>
      <textarea
        className="p-4 mb-4 bg-gray-100 border border-gray-200 rounded-lg bg-opacity-40 focus:ring-1 focus:outline-none"
        placeholder="Enter user feedback."
      />
      <button className="self-start px-2 py-1 font-bold text-white transition duration-200 ease-in-out bg-blue-500 border-2 border-blue-500 rounded hover:text-blue-500 hover:bg-white">
        Submit
      </button>
    </form>
  )
}

export default SolutionGradeForm
