import React, { FormEvent, useEffect, useState } from 'react'
import styles from './AddPost.module.scss'
import { AddPostComponent, CreatePostWithArrayImgT } from './types'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { actionsPosts, createPostThunk } from '../../../../actions/postsAction'
import { FileT } from '../../../../reducers/posts/types'
import { getFetchingFormS, getOpenedPostIdS, getOpenedPostS } from '../../../../selectors/postsSelectors'
import { Box, Button } from '@mui/material'
import DropZone from '../../../Custom/DropZone/DropZone'
import Input from '../../../Custom/Inputs/Input'
import SectionHeader from '../../SectionHeader/SectionHeader'
import Breadcrumbs from '../../../Custom/Breadcrumbs/Breadcrumbs'

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
  tags: '',
  img: [],
}
export const AddPost: AddPostComponent = () => {
  const dispatch = useAppDispatch()

  const [postData, setPostData] = useState<CreatePostWithArrayImgT>(initialState)
  const [content, setContent] = useState<string>('')
  const [fileField, setFileField] = useState<boolean>(false)
  const openedPostId = useAppSelector(getOpenedPostIdS)
  const post = useAppSelector(getOpenedPostS)
  const isFetchingForm = useAppSelector(getFetchingFormS)

  useEffect(() => {
    if (post) {
      setPostData({ ...post, img: [post.img] })
    }
  }, [post])

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    if (openedPostId === null) {
      dispatch(createPostThunk({ ...postData, img: postData.img[0], content }))
    } else {
      // here will be dispath to update Post
    }
    clear()
  }

  const clear = () => {
    dispatch(actionsPosts.changeOpenedPostIdAC(null))
    setPostData(initialState)
    setContent('')
    setFileField(true)
  }

  const putSelectedFiles = (file: string, post: CreatePostWithArrayImgT) => {
    setPostData({ ...post, img: [...post.img, file] })
  }

  const removeFile = (post: CreatePostWithArrayImgT, files: Array<FileT>) => {
    setPostData({ ...post, img: files })
  }
  const links = [{ name: 'Home', link: '/home' }, {
    name: 'Blog',
    link: '/blog',
  }, { name: openedPostId ? 'Edit post' : 'Create post' }]
  return (
    <section className={styles.addPost}>
      <SectionHeader
        title={openedPostId ? 'Edit post' : 'Create post'}
        introduction={`Share your exciting story with other by using an editor presented below.`}
      />
      <Breadcrumbs links={links} />
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
            disabled={isFetchingForm}
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
            disabled={isFetchingForm}
            onChange={(e) => setPostData({ ...postData, description: e.target.value })}
          />
          <Input
            value={postData.tags}
            name={'tags'}
            label={'Tags'}
            fullWidth
            size={'small'}
            disabled={isFetchingForm}
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
            value={content}
            theme={'snow'}
            onChange={(content) => setContent(content)}
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
              disabled={isFetchingForm}
            >
              Submit
            </Button>
            <Button variant='outlined' size={'large'} onClick={clear} fullWidth disabled={isFetchingForm}>
              Clear
            </Button>
          </div>
        </form>
      </Box>
    </section>
  )
}

export default AddPost
