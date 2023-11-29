'use client'

import * as React from 'react'
import { useState } from 'react'
import { askOllama } from './helper'

const Question = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setQuestion(event.currentTarget.value)
  }
  const handleReset = () => {
    setQuestion('')
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!question) {
      console.error('No question entered')
      setAnswer('No question entered')
      return null
    }

    const abc = await askOllama(question)

    setAnswer(abc)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input autoFocus type='text' value={question} onChange={handleChange} />
        <button type='submit'>Ask</button>
        <button type='reset' onClick={handleReset}>
          Reset
        </button>
      </form>
      <div style={{ width: '500px' }}>{answer}</div>
    </div>
  )
}

export default Question
