import * as React from 'react'
import styles from './FileList.module.scss'
import { FileWithPath } from 'react-dropzone'
import ImageIcon from '@mui/icons-material/Image'
import { Avatar, IconButton, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { FileListComponent } from './types'

const FileList: FileListComponent = ({ acceptedFiles, removeFile }) => {
  const onClick = (filePath?: string) => () => {
    removeFile(filePath || '')
  }

  return (
    <aside className={styles.container}>
      <List className={styles.list}>
        {acceptedFiles.map((file: FileWithPath) => (
          <ListItem key={file.path} className={styles.item}>
            <ListItemAvatar className={styles.itemAvatar}>
              <Avatar className={styles.avatar}>
                <ImageIcon className={styles.icon} />
              </Avatar>
            </ListItemAvatar>
            <ListItemText className={styles.itemText} secondary={file.path} />
            <IconButton aria-label={'delete'} size={'small'} onClick={onClick(file.path)}>
              <DeleteIcon fontSize={'inherit'} />
            </IconButton>
          </ListItem>
        ))}
      </List>
    </aside>
  )
}

export default FileList
