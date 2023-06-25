import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './AddPost.module.scss'
import { AddPostComponent, PostFromFormWithArrayImgT } from './types'
import hljs from 'highlight.js'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { Box, Button, FormHelperText } from '@mui/material'
import DropZone from '../../../Custom/DropZone/DropZone'
import Input from '../../../Custom/Input/Input'
import SectionHeader from '../../SectionHeader/SectionHeader'
import Breadcrumbs from '../../../Custom/Breadcrumbs/Breadcrumbs'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { FileWithPath } from 'react-dropzone'
import classname from 'classnames'
import { createPostThunk, postActions, updatePostThunk } from '../../../../actions/postAction'
import {
  getFetchingFormS,
  getOpenedPostIdS,
  getPostDataForFormS,
} from '../../../../selectors/postSelector'

hljs.configure({
  languages: ['jsx', 'javascript', 'python', 'bash', 'css', 'typescript'],
})

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code'],
    [{ list: 'ordered' }, { list: 'bullet' }, { indent: '-1' }, { indent: '+1' }],
    [{ color: [] }, { background: [] }],
    ['link', 'image'],
    ['clean'],
  ],
  syntax: {
    highlight: (text: string) => hljs.highlightAuto(text).value,
  },
}

const resetState = {
  title: '',
  description: '',
  tags: '',
  img: [],
  content: '',
}

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/webp', 'image/png']

const validationPostSchema = yup.object({
  title: yup
    .string()
    .required('Title is required')
    .max(64, 'Title is too long')
    .min(3, 'Title should be at least 3 symbols'),
  description: yup
    .string()
    .required('Description is required')
    .max(150, 'Description is too long')
    .min(90, 'Description should be at least 90 symbols'),
  tags: yup.string().required('Tags is required').max(48, 'Title is too long'),
  content: yup.string().required('Content is required'),
  img: yup
    .array()
    .min(1, 'Image is required')
    .max(1, 'You can load only one picture')
    .test('fileSize', 'File exceeds 0.5MB', (img) => {
      let valid = true
      if (img) {
        const size = img[0]?.size / 1024 / 1024
        if (size > 0.5) {
          valid = false
        }
      }
      return valid
    })
    .test('fileFormat', 'Unsupported Format', (img) => img && SUPPORTED_FORMATS.includes(img[0]?.type)),
})
export const AddPost: AddPostComponent = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const openedPostId = useAppSelector(getOpenedPostIdS)
  const post = useAppSelector(getPostDataForFormS)
  const isFetchingForm = useAppSelector(getFetchingFormS)

  const formikSubmit = useFormik({
    initialValues: post,
    validationSchema: validationPostSchema,
    onSubmit: (values: PostFromFormWithArrayImgT, {}) => {
      const trimmedValue = {
        ...values,
        title: values.title.trim(),
        description: values.description.trim(),
      }
      if (openedPostId) {
        dispatch(updatePostThunk(openedPostId, trimmedValue, navigate))
      } else {
        dispatch(createPostThunk(trimmedValue, navigate))
      }
    },
  })

  useEffect(() => {
    return () => {
      clear()
    }
  }, [])

  const clear = () => {
    dispatch(postActions.resetPostAC())
    formikSubmit.setFormikState((form) => {
      return { ...form, values: resetState }
    })
    formikSubmit.setErrors({})
  }

  const putSelectedFiles = (file: Array<FileWithPath>) => {
    formikSubmit.setFieldValue('img', [...formikSubmit.values.img, ...file])
  }

  const removeFile = (file: string) => {
    const newFiles = formikSubmit.values.img.filter((e) => e.name !== file)
    formikSubmit.setFieldValue('img', newFiles)
  }

  const links = [
    { name: 'Home', link: '/home' },
    {
      name: 'Blog',
      link: '/blog',
    },
    { name: openedPostId ? 'Edit post' : 'Create post' },
  ]

  return (
    <section className={styles.addPost}>
      <SectionHeader
        title={openedPostId ? 'Edit Post' : 'Create Post'}
        introduction={`Share your exciting story with other by using an editor presented below.`}
      />
      <Breadcrumbs links={links} className={styles.breadcrumbs} />
      <Box
        sx={{
          backgroundColor: 'var(--background)',
          transition: 'background-color 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
          padding: '2.8rem 2.43vw',
          borderRadius: '2px',
        }}
      >
        <form onSubmit={formikSubmit.handleSubmit} className={styles.form}>
          <Input
            fullWidth
            value={formikSubmit.values.title}
            label={'Title'}
            name={'title'}
            id={'title'}
            size={'small'}
            onChange={formikSubmit.handleChange}
            disabled={isFetchingForm}
            error={formikSubmit.touched.title && Boolean(formikSubmit.errors.title)}
            helperText={formikSubmit.touched.title && formikSubmit.errors.title}
          />
          <Input
            value={formikSubmit.values.description}
            name={'description'}
            label={'Description'}
            id={'description'}
            size={'small'}
            fullWidth
            multiline
            minRows={2}
            maxRows={4}
            disabled={isFetchingForm}
            onChange={formikSubmit.handleChange}
            error={formikSubmit.touched.description && Boolean(formikSubmit.errors.description)}
            helperText={formikSubmit.touched.description && formikSubmit.errors.description}
          />
          <Input
            value={formikSubmit.values.tags}
            name={'tags'}
            label={'Tags'}
            id={'tags'}
            fullWidth
            size={'small'}
            disabled={isFetchingForm}
            onChange={formikSubmit.handleChange}
            error={formikSubmit.touched.tags && Boolean(formikSubmit.errors.tags)}
            helperText={formikSubmit.touched.tags && formikSubmit.errors.tags}
          />
          <DropZone
            myFiles={formikSubmit.values.img}
            setMyFiles={putSelectedFiles}
            removeFileFromForm={removeFile}
            error={formikSubmit.touched.img && (formikSubmit.errors.img as string)}
          />
          <div>
            <ReactQuill
              value={formikSubmit.values.content}
              id={'content'}
              theme={'snow'}
              onChange={(content) => formikSubmit.setFieldValue('content', content)}
              modules={modules}
              className={classname(styles.quill, {
                [styles.error]: formikSubmit.touched.content && formikSubmit.errors.content,
              })}
            />
            {formikSubmit.touched.content && formikSubmit.errors.content && (
              <FormHelperText error>{formikSubmit.errors.content}</FormHelperText>
            )}
          </div>
          <div className={styles.buttonGroup}>
            <Button
              className={styles.buttonSubmit}
              variant='contained'
              size={'large'}
              type={'submit'}
              fullWidth
              disabled={isFetchingForm}
            >
              {openedPostId ? 'Update' : 'Submit'}
            </Button>
            <Button
              variant='outlined'
              size={'large'}
              onClick={clear}
              fullWidth
              disabled={isFetchingForm}
            >
              Clear
            </Button>
          </div>
        </form>
      </Box>
    </section>
  )
}

export default AddPost
