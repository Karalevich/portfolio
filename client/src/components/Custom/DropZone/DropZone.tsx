import React, { useEffect, useMemo } from 'react'
import styles from './DropZone.module.scss'
import { FileWithPath, useDropzone } from 'react-dropzone'
import FileList from './FileList/FileList'
import { DropZoneComponent } from './types'
import { FormHelperText } from '@mui/material'

const DropZone: DropZoneComponent = ({
  fileField,
  resetFileField,
  removeFileFromForm,
  myFiles,
  setMyFiles,
  error,
}) => {
  const { getRootProps, getInputProps, isFocused, isDragAccept } = useDropzone({
    onDrop: (files) => onUploadFile(files),
    multiple: false,
  })

  useEffect(() => {
    if (fileField) {
      setMyFiles([])
      resetFileField(false)
    }
  }, [fileField])

  const onUploadFile = (acceptedFiles: Array<FileWithPath>) => {
    setMyFiles(acceptedFiles)
  }

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(error ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, error]
  )

  return (
    <section className={styles.section}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <div className={styles.message}>
          <span>Drag photos here or click</span>
          <em>(1 photo is the maximum)</em>
        </div>
      </div>
      {error && <FormHelperText error={Boolean(error)}>{error}</FormHelperText>}
      <FileList acceptedFiles={myFiles} removeFile={removeFileFromForm} />
    </section>
  )
}

export default DropZone

const baseStyle = {
  flex: 1,
  display: 'flex',
  alignItems: 'center',
  padding: '5px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#767676',
  borderStyle: 'dashed',
  backgroundColor: 'var(--substrate2)',
  color: '#767676',
  outline: 'none',
  transition: 'border .24s ease-in-out',
}

const focusedStyle = {
  borderColor: '#2196f3',
}

const acceptStyle = {
  borderColor: '#00e676',
}

const rejectStyle = {
  borderColor: 'red',
}
