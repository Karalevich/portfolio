import { useEffect, useRef, useState, MouseEvent } from 'react'
import styles from './Filter.module.scss'
import { FilterComponent } from './types'
import { alpha, styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import { Button, ButtonProps, ClickAwayListener, Grow } from '@mui/material'
import { Tooltip } from '../../../Custom/Tooltip'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import classnames from 'classnames'

const SELECT = ['By default', 'By title', 'By date', 'By likes']

export const Filter: FilterComponent = () => {
  const filterRef = useRef<HTMLHeadingElement | null>(null)
  const [isOpenSelect, setIsOpenSelect] = useState(false)
  const [selectedItem, setSelectedItem] = useState('By default')


  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => {
        e.target.classList.toggle(styles.filterSticked, e.intersectionRatio < 1)
      },
      { threshold: [1] },
    )

    if (filterRef.current) {
      observer.observe(filterRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleClick = () => {
    setIsOpenSelect((prev) => !prev)
  }

  const onClickAway = () => {
    setIsOpenSelect(false)
  }

  const onChangeItem = (item: string) => () => {
    setSelectedItem(item)
    setIsOpenSelect(false)
  }
  return (
    <article className={styles.filter} ref={filterRef}>
      <div className={styles.search}>
        <div className={styles.searchIconWrapper}>
          <SearchIcon/>
        </div>
        <StyledInputBase placeholder="Search…"/>
      </div>
      <ClickAwayListener onClickAway={onClickAway}>
        <div className={styles.select}>
          <Tooltip title={'Select display order'} placement='top'>
            <Button onClick={handleClick} className={styles.selectButton} disableRipple>
              <p>{selectedItem}</p>
             <KeyboardArrowDownIcon className={classnames(styles.buttonArrow, {[styles.arrowUp]: isOpenSelect} )}/>
            </Button>
          </Tooltip>
          <Grow in={isOpenSelect}>
            <div className={styles.menu}>
              <ul className={styles.list}>
                {SELECT.map(item => (
                  <li key={item} className={styles.item}>
                    <StyledButton className={styles.itemButton} onClick={onChangeItem(item)}>
                      <p>{item}</p>
                    </StyledButton>
                  </li>
                ))}
              </ul>
            </div>
          </Grow>
        </div>
      </ClickAwayListener>
    </article>
  )
}

export default Filter

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    backgroundColor: 'var(--bcg-search-input)',
    border: '1px solid rgba(255, 180, 0, 0.3)',
    borderRadius: '2px',
    width: '100%',

    [theme.breakpoints.up('sm')]: {
      width: '10rem',
      '&:focus': {
        width: '20rem',
      },
    },


  },
}))

const StyledButton = styled(Button)<ButtonProps>(({ theme }) => ({
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.15),
  },
}))


