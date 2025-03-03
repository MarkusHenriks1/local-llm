'use client'

import type * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Model, askOllama } from '@/lib/ollama/helper'
import { toast, ToastContainer } from 'react-toastify'
import styles from './question.module.css'

const Question = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [selectedModel, setSelectedModel] = useState<Model>(Model.DOLPHIN3)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleChange = (event: React.FormEvent<HTMLInputElement>) => {
    setQuestion(event.currentTarget.value)
  }
  const handleReset = () => {
    setQuestion('')
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!question) {
      toast.error('No question entered')
      return null
    }

    const askOllamaAnswer = await askOllama(question, selectedModel)

    setAnswer(askOllamaAnswer)
  }

  return (
    <div className={styles.container}>
      <ToastContainer />
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.inputContainer}>
          <input
            className={styles.input}
            type='text'
            value={question}
            placeholder='Insert question here'
            onChange={handleChange}
            ref={inputRef}
          />
          <button className={styles.button} type='submit'>
            Ask
          </button>
          <button className={`${styles.button} ${styles.resetButton}`} type='reset' onClick={handleReset}>
            Reset
          </button>
          <div className={styles.selectContainer}>
            <div>
              <div className={styles.selectLabel}>Select your model</div>
              <select
                className={styles.select}
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value as React.SetStateAction<Model>)}
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
      <div className={styles.answer}>
        {answer}
        {answer && (
          <button
            type='button'
            className={styles.copyButton}
            onClick={() => {
              navigator.clipboard.writeText(answer)
              toast.success('Copied to clipboard!')
            }}
          >
            <svg className={styles.copyIcon} xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'>
              <title>Copy to clipboard</title>
              <path d='M16 1H4C2.897 1 2 1.897 2 3V17H4V3H16V1ZM19 5H7C5.897 5 5 5.897 5 7V19C5 20.103 5.897 21 7 21H19C20.103 21 21 20.103 21 19V7C21 5.897 20.103 5 19 5ZM19 19H7V7H19V19Z' />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export default Question
