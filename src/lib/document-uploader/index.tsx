'use client'

import * as React from 'react'
import { useState } from 'react'
import { DocumentProps } from './types'

const DocumentUploader = ({ onUpload }: DocumentProps) => {
  const [file, setFile] = useState<File | null>(null)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return
    }

    setFile(event.target.files[0])
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    if (!file) {
      console.error('No file selected')
      return
    }

    onUpload(file)
  }

  return (
    <form onSubmit={handleSubmit}>
      <input key={1} type='file' accept='.pdf,.docx' onChange={handleChange} />
      <button type='submit'>Upload</button>
    </form>
  )
}

export default DocumentUploader
