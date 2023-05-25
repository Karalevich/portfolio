import React, { FormEvent, useState } from 'react'
import styles from './AddPost.module.scss'
import { AddPostComponent } from './types'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { useAppDispatch } from '../../../../hooks/hooks'
import { createPostThunk } from '../../../../actions/postsAction'
import { SelectedFileT } from '../../../../reducers/posts/types'
import { AuthorT } from '../types'

const modules = {
  toolbar: [
    [{ header: [1, 2, false] }],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [
      { list: 'ordered' },
      { list: 'bullet' },
      { indent: '-1' },
      { indent: '+1' },
    ],
    ['link', 'image'],
    ['clean'],
  ],
}
export const AddPost: AddPostComponent = () => {
  const [title, setTitle] = useState('')
  const [tags, setTags] = useState('')
  const [content, setContent] = useState('')
  const [description, setDescription] = useState('')
  const [files, setFiles] = useState<SelectedFileT>(null)

  const dispatch = useAppDispatch()
  const createNewPost = (e: FormEvent) => {
    e.preventDefault()
    const postData = {
      img: files,
      title,
      description,
      content,
      tags
    }
    dispatch(createPostThunk(postData))

  }


  return (
    <section className={styles.addPost}>
      <form onSubmit={createNewPost}>
        <input type='text'
               placeholder={'Title'}
               value={title}
               onChange={ev => setTitle(ev.target.value)} />
        <input type='text'
               placeholder={'Description'}
               value={description}
               onChange={ev => setDescription(ev.target.value)} />
        <input type='text'
               placeholder={'Tags'}
               value={description}
               onChange={ev => setTags(ev.target.value)} />
        <input type='file'
               onChange={ev => setFiles(ev.target.files)} />
        <ReactQuill
          value={content}
          theme={'snow'}
          onChange={setContent}
          modules={modules} />
        <button>Create post</button>
      </form>
    </section>
  )
}

export default AddPost