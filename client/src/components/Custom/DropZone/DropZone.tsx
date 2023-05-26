import React, { useCallback, useEffect, useMemo, useState } from 'react'
import styles from './DropZone.module.scss'
import { FileWithPath, useDropzone } from 'react-dropzone'
import FileList from './FileList/FileList'
import { DropZoneComponent } from './types'
import { FileT } from '../../../reducers/posts/types'

const DropZone: DropZoneComponent = ({
                                       fileField,
                                       resetFileField,
                                       removeFileFromForm,
                                       myFiles,
                                       setMyFiles,
                                     }) => {
  const [isDragReject, setIsDragReject] = useState<boolean>(false)
  const { getRootProps, getInputProps, isFocused, isDragAccept } = useDropzone({
    onDrop: (files) => onUploadFile(files),
    multiple: false,
  })

  useEffect(() => {
    if (fileField) {
      setMyFiles('')
      resetFileField(false)
    }
  }, [fileField])

  const onUploadFile = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      if (myFiles.length) {
        setIsDragReject(true)
        return
      }

      acceptedFiles.forEach((file: FileWithPath) => {
        const reader = new FileReader()

        reader.onabort = () => console.log('file reading was aborted')
        reader.onerror = () => console.error('file reading has failed')
        reader.onload = () => {
          const binaryStr = reader.result as string
          setMyFiles(binaryStr)
        }
        reader.readAsDataURL(file)
      })
    },
    [myFiles],
  )

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isFocused ? focusedStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject && isFocused ? rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject],
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
  borderColor: '#ff1744',
}
