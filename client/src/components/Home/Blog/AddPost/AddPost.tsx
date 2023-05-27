import React from 'react'
import styles from './AddPost.module.scss'
import { AddPostComponent, CreatePostWithArrayImgT } from './types'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { actionsPosts, createPostThunk } from '../../../../actions/postsAction'
import { getFetchingFormS, getOpenedPostIdS, getOpenedPostS } from '../../../../selectors/postsSelectors'
import { Box, Button, FormHelperText } from '@mui/material'
import DropZone from '../../../Custom/DropZone/DropZone'
import Input from '../../../Custom/Inputs/Input'
import SectionHeader from '../../SectionHeader/SectionHeader'
import Breadcrumbs from '../../../Custom/Breadcrumbs/Breadcrumbs'
import * as yup from 'yup'
import { useFormik } from 'formik'
import { FileWithPath } from 'react-dropzone'
import classname from 'classnames'

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
  content: '',
}

const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/webp',
  'image/png',
]

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
    .min(3, 'Description should be at least 3 symbols'),
  tags: yup.string().required('Tags is required').max(16, 'Title is too long'),
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
    .test(
      'fileFormat',
      'Unsupported Format',
      img => img && SUPPORTED_FORMATS.includes(img[0]?.type),
    ),
})
export const AddPost: AddPostComponent = () => {
  const dispatch = useAppDispatch()
  const openedPostId = useAppSelector(getOpenedPostIdS)
  const post = useAppSelector(getOpenedPostS)
  const isFetchingForm = useAppSelector(getFetchingFormS)

  const initialValues = post ? { ...post, img: post.img ? [post.img as FileWithPath] : [] } : initialState

  const formikSubmit = useFormik({
    initialValues,
    validationSchema: validationPostSchema,
    onSubmit: (values: CreatePostWithArrayImgT, { resetForm }) => {
      if (openedPostId === null) {
        dispatch(createPostThunk(values))
      } else {
        // here will be dispath to update Post
      }
      resetForm()
    },
  })

  const clear = () => {
    dispatch(actionsPosts.changeOpenedPostIdAC(''))
    formikSubmit.resetForm()
  }

  const putSelectedFiles = (file: Array<FileWithPath>) => {
    formikSubmit.setFieldValue('img', [...formikSubmit.values.img, ...file])
  }

  const removeFile = (file: string) => {
    const newFiles = formikSubmit.values.img.filter((e) => e.path !== file)
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
            maxRows={2}
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
            error={formikSubmit.touched.img && formikSubmit.errors.img as string}
          />
          <div>
            <ReactQuill
              value={formikSubmit.values.content}
              id={'content'}
              theme={'snow'}
              onChange={(content) => formikSubmit.setFieldValue('content', content)}
              modules={modules}
              className={classname(styles.quill, { [styles.error]: formikSubmit.touched.content && formikSubmit.errors.content })}
            />
            {formikSubmit.touched.content && formikSubmit.errors.content &&
              <FormHelperText error>{formikSubmit.errors.content}</FormHelperText>}
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
              Submit
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
