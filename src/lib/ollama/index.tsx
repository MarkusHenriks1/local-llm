'use client'

import type * as React from 'react'
import { useState, useRef, useEffect } from 'react'
import { Model, askOllama } from './helper'
import { toast, ToastContainer } from 'react-toastify'
import styles from './index.module.css'

const Question = () => {
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [selectedModel, setSelectedModel] = useState(Model.LLAMA_3B_3_2)
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
            placeholder='write your text here'
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
      <div className={styles.answer}>{answer}</div>
    </div>
  )
}

export default Question
