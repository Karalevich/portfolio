import React, { FormEvent, useEffect, useState } from 'react'
import styles from './AddPost.module.scss'
import { AddPostComponent, CreatePostWithArrayImgT } from './types'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { actionsPosts, createPostThunk } from '../../../../actions/postsAction'
import { FileT } from '../../../../reducers/posts/types'
import { getOpenedPostIdS, getOpenedPostS } from '../../../../selectors/postsSelectors'
import { Box, Button } from '@mui/material'
import DropZone from '../../../Custom/DropZone/DropZone'
import Input from '../../../Custom/Inputs/Input'
import SectionHeader from '../../SectionHeader/SectionHeader'

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    ['link', 'image'],
    ['clean'],
  ],
}

const initialState = {
  title: '',
  description: '',
  content: '',
  tags: '',
  img: [],
}
export const AddPost: AddPostComponent = () => {
  const dispatch = useAppDispatch()

  const [postData, setPostData] = useState<CreatePostWithArrayImgT>(initialState)
  const [fileField, setFileField] = useState<boolean>(false)
  const openedPostId = useAppSelector(getOpenedPostIdS)
  const post = useAppSelector(getOpenedPostS)

  useEffect(() => {
    if (post) {
      setPostData({ ...post, img: [post.img] })
    }
  }, [post])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (openedPostId === null) {
      dispatch(createPostThunk({ ...postData, img: postData.img[0] }))
    }
    clear()
  }

  const clear = () => {
    dispatch(actionsPosts.changeOpenedPostIdAC(null))
    setPostData(initialState)
    setFileField(true)
  }

  const putSelectedFiles = (file: string, post: CreatePostWithArrayImgT) => {
    setPostData({ ...post, img: [...post.img, file] })
  }

  const removeFile = (post: CreatePostWithArrayImgT, files: Array<FileT>) => {
    setPostData({ ...post, img: files })
  }

  return (
    <section className={styles.addPost}>
      <SectionHeader
        title={openedPostId ? 'Edit post' : 'Create post'}
        introduction={`Share your exciting story with other by using an editor presented below.`}
      />
      <Box
        sx={{
          backgroundColor: 'var(--background)',
          transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          padding: '2.8rem 2.43vw',
          borderRadius: '2px',
        }}
      >
        <form onSubmit={onSubmit} className={styles.form}>
          <Input
            value={postData.title}
            name={'title'}
            label={'Title'}
            fullWidth
            size={'small'}
            onChange={(e) => setPostData({ ...postData, title: e.target.value })}
          />
          <Input
            value={postData.description}
            name={'description'}
            label={'Description'}
            size={'small'}
            fullWidth
            multiline
            minRows={2}
            maxRows={2}
            onChange={(e) => setPostData({ ...postData, description: e.target.value })}
          />
          <Input
            value={postData.tags}
            name={'tags'}
            label={'Tags'}
            fullWidth
            size={'small'}
            onChange={(e) => setPostData({ ...postData, tags: e.target.value })}
          />
          <DropZone
            onChange={putSelectedFiles}
            postData={postData}
            fileField={fileField}
            resetFileField={setFileField}
            removeFileFromForm={removeFile}
          />
          <ReactQuill
            value={postData.content}
            theme={'snow'}
            onChange={(content) => setPostData({ ...postData, content })}
            modules={modules}
            className={styles.quill}
          />
          <div className={styles.buttonGroup}>
            <Button
              className={styles.buttonSubmit}
              variant='contained'
              size={'large'}
              type={'submit'}
              fullWidth
            >
              Submit
            </Button>
            <Button variant='outlined' size={'large'} onClick={clear} fullWidth>
              Clear
            </Button>
          </div>
        </form>
      </Box>
    </section>
  )
}

export default AddPost
