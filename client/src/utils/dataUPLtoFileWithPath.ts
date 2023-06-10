import { FileWithPath } from 'react-dropzone'

export const dataURLtoFileWithPath = (dataURL: string): FileWithPath => {
  const standardDataURL = dataURL.split('#metadata=')
  const arr = standardDataURL[0].split(',')
  const mime = arr[0].match(/:(.*?);/)?.[1] ?? ''
  const metadata = JSON.parse(standardDataURL[1])

  const bstr = atob(arr[1])
  let n = bstr.length
  const u8arr = new Uint8Array(n)

  while (n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }

  const options: FileWithPath = {
    ...metadata,
    lastModified: Date.now(),
    type: mime,
  }

  return new File([u8arr], metadata.name, options)
}
