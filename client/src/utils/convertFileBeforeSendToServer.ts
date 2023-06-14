import { FileWithPath } from 'react-dropzone'

export const convertFileBeforeSendToServer = (file: FileWithPath): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()

    reader.onload = async () => {
      const binaryStr = reader.result as string
      const metaData = JSON.stringify({
        path: file.path,
        lastModified: file.lastModified,
        name: file.name,
        webkitRelativePath: file.webkitRelativePath,
      })
      const resultFile = `${binaryStr}#metadata=${metaData}`

      resolve(resultFile)
    }

    reader.onerror = () => {
      reject('file reading has failed')
    }
    reader.onabort = () => {
      reject('file reading was aborted')
    }

    reader.readAsDataURL(file)
  })
}
