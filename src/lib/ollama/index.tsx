'use client'

import type * as React from 'react'
import { useState } from 'react'
import { Model, askOllama } from './helper'

const Question = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [selectedModel, setSelectedModel] = useState(
    Model.LLAMA_3B_3_2
  )

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

    const askOllamaAnswer = await askOllama(question, selectedModel)

    setAnswer(askOllamaAnswer)
  }

  return (
    <div>
      <form style={{ display: 'flex' }} onSubmit={handleSubmit}>
        <div style={{ paddingBottom: '30px', width: '80%' }}>
          <input
            style={{ fontSize: '30px', width: '80%', paddingRight: '30px' }}
            autoFocus
            type='text'
            value={question}
            onChange={handleChange}
          />
          <button style={{ fontSize: '30px' }} type='submit'>
            Ask
          </button>
          <button
            style={{ fontSize: '30px' }}
            type='reset'
            onClick={handleReset}
          >
            Reset
          </button>
          <div style={{ paddingTop: '30px', display: 'flex' }}>
            <div>
              <div style={{ fontSize: '20px' }}>Select your model</div>
              <select
                style={{ fontSize: '30px' }}
                value={selectedModel}
                onChange={(e) =>
                  setSelectedModel(
                    e.target.value as React.SetStateAction<Model>
                  )
                }
              >
                {Object.values(Model).map((modelName) => (
                  <option key={modelName} value={modelName}>
                    {modelName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
      <div style={{ width: '80%', fontSize: '30px' }}>{answer}</div>
    </div>
  )
}

export default Question
