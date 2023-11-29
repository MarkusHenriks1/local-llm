'use client'

import DocumentUploader from '../lib/document-uploader'

const MyPage = () => {
  const handleUpload = (file: File) => {
    // Handle file upload here
  }

  return <DocumentUploader onUpload={handleUpload} />
}

export default MyPage
