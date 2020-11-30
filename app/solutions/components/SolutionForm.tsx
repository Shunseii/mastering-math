import React, { useState } from "react"

import Latex from "react-latex"

type SolutionFormProps = {
  initialValues: any
  onSubmit: React.FormEventHandler<HTMLFormElement>
}

const SolutionForm = ({ initialValues, onSubmit }: SolutionFormProps) => {
  const [bodyText, setBodyText] = useState("")

  return (
    <form
      className="flex flex-col"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit(event)
      }}
    >
      <button
        className="self-start mb-2 text-xs"
        onClick={(e) => {
          e.preventDefault()
          setBodyText(bodyText + "$ $")
        }}
      >
        <span className="mr-1 text-base">Add</span>
        <Latex>$\LaTeX$</Latex>
      </button>
      <textarea
        className="p-4 mb-4 bg-gray-100 border border-gray-200 rounded-lg bg-opacity-40 focus:ring-1 focus:outline-none"
        value={bodyText}
        rows={10}
        onChange={(e) => setBodyText(e.target.value)}
        placeholder="Enter your solution here."
      />
      <button className="self-start px-2 py-1 font-bold text-white transition duration-200 ease-in-out bg-blue-500 border-2 border-blue-500 rounded hover:text-blue-500 hover:bg-white">
        Submit
      </button>
    </form>
  )
}

export default SolutionForm
