import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import styles from './Filter.module.scss'
import { FilterComponent } from './types'
import { styled } from '@mui/material/styles'
import InputBase from '@mui/material/InputBase'
import SearchIcon from '@mui/icons-material/Search'
import Dropdown from '../../../Custom/Dropdown/Dropdown'
import { Button, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks'
import { getUserS } from '../../../../selectors/userSelectors'
import { debounce } from '../../../../utils/debounce'
import { actionsPosts, getPostsBySearchThunk, getPostsThunk } from '../../../../actions/postsAction'
import { getCurrentPageS } from '../../../../selectors/postsSelectors'

const SELECT = ['By default', 'By title', 'By date', 'By likes']

export const Filter: FilterComponent = () => {
  const dispatch = useAppDispatch()
  const filterRef = useRef<HTMLHeadingElement | null>(null)
  const redirect = useNavigate()
  const isTabletOrMobile = useMediaQuery('(max-width:767px)')
  const user = useAppSelector(getUserS)
  const currentPage = useAppSelector(getCurrentPageS)
  const [searchValue, setSearchValue] = useState('')
  const [sortValue, setSortValue] = useState(SELECT[0])

  useEffect(() => {
    /* browser does not provides API to track when element with position sticky reach the fix position, for this used IntersectionObserver */
    const observer = new IntersectionObserver(
      ([e]) => {
        e.target.classList.toggle(styles.filterSticked, e.intersectionRatio < 1)
      },
      { threshold: [1] }
    )

    if (filterRef.current) {
      observer.observe(filterRef.current)
    }

    return () => {
      observer.disconnect()
    }
  }, [])

  const handleRedirect = () => {
    redirect(`/blog/addPost`)
  }

  const debouncedSetSearchValue = useCallback(
    debounce(
      (searchQuery: string, sortQuery: number) =>
        dispatch(getPostsBySearchThunk(searchQuery, sortQuery, currentPage)),
      400
    ),
    [currentPage]
  )

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    dispatch(actionsPosts.setCurrentPageAC(1))

    const sortQuery = SELECT.indexOf(sortValue)
    debouncedSetSearchValue(searchValue.trim(), sortQuery)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const searchQuery = searchValue.trim()
    const sortQuery = SELECT.indexOf(sortValue)
    if (!searchQuery && !sortQuery) {
      dispatch(getPostsThunk())
    } else {
      dispatch(getPostsBySearchThunk(searchQuery, sortQuery, currentPage))
    }
  }

  const onSortPosts = (item: string) => {
    const sortQuery = SELECT.indexOf(item)
    const searchQuery = searchValue.trim()
    dispatch(getPostsBySearchThunk(searchQuery, sortQuery, currentPage))
    setSortValue(item)
  }

  return (
    <article className={styles.filter} ref={filterRef}>
      <form className={styles.search} onSubmit={onSubmit}>
        <div className={styles.searchIconWrapper}>
          <SearchIcon />
        </div>
        <StyledInputBase value={searchValue} onChange={onSearchChange} placeholder='Search…' />
      </form>

      <div className={styles.rightSection}>
        {user && (
          <Button
            className={styles.addPost}
            onClick={handleRedirect}
            sx={{ boxShadow: 0 }}
            variant='outlined'
            disableRipple={isTabletOrMobile}
          >
            {isTabletOrMobile ? '+' : 'Add post'}
          </Button>
        )}
        <Dropdown selects={SELECT} onSelect={onSortPosts} />
      </div>
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
    [theme.breakpoints.down('sm')]: {
      paddingLeft: '3rem',
    },
  },
}))
