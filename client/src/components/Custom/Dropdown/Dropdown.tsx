import React, { useState } from 'react'
import styles from './Dropdown.module.scss'
import { DropdownComponent } from './types'
import { Tooltip } from '../Tooltip'
import { alpha, Button, ButtonProps, ClickAwayListener, Grow, styled } from '@mui/material'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import classnames from 'classnames'

export const Dropdown: DropdownComponent = ({ selects, onSelect }) => {
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [selectedItem, setSelectedItem] = useState(selects[0])
  const handleClick = () => {
    setIsOpenSelect((prev) => !prev)
  }

  const onClickAway = () => {
    setIsOpenSelect(false)
  }

  const onChangeItem = (item: string) => () => {
    setSelectedItem(item)
    onSelect && onSelect(item)
    setIsOpenSelect(false)
  }
  return (
    <ClickAwayListener onClickAway={onClickAway}>
      <div className={styles.select}>
        <Tooltip title={'Select display order'} placement='top'>
          <Button onClick={handleClick} className={styles.selectButton} disableRipple>
            <p>{selectedItem}</p>
            <KeyboardArrowDownIcon
              className={classnames(styles.buttonArrow, { [styles.arrowUp]: isOpenSelect })}
            />
          </Button>
        </Tooltip>
        <Grow in={isOpenSelect}>
          <div className={styles.menu}>
            <ul className={styles.list}>
              {selects.map((item) => (
                <li key={item} className={styles.item}>
                  <StyledButton className={styles.itemButton} onClick={onChangeItem(item)}>
                    <p className={styles.text}>{item}</p>
                  </StyledButton>
                </li>
              ))}
            </ul>
          </div>
        </Grow>
      </div>
    </ClickAwayListener>
  )
}

export default Dropdown

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
  },
}))
