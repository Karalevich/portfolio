import React, { ChangeEvent, FormEvent, useCallback, useEffect, useRef } from 'react'
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
import { actionsPosts, getPostsThunk } from '../../../../actions/postsAction'
import { SELECT } from 'src/constants/posts'
import { getSearchValueS, getSortValueS } from '../../../../selectors/postsSelectors'
import { modalActions } from '../../../../actions/modalAction'
import { MODAL_TYPE } from '../../../../reducers/modal/types'

export const Filter: FilterComponent = () => {
  const dispatch = useAppDispatch()
  const filterRef = useRef<HTMLHeadingElement | null>(null)
  const redirect = useNavigate()
  const isTabletOrMobile = useMediaQuery('(max-width:767px)')
  const user = useAppSelector(getUserS)
  const searchValue = useAppSelector(getSearchValueS)
  const sortValue = useAppSelector(getSortValueS)

  useEffect(() => {
    /* browser does not provide API to track when element with position sticky reach the fix position, for this used IntersectionObserver */
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
      dispatch(actionsPosts.setSortValueAC(0))
      dispatch(actionsPosts.setSearchValueAC(''))
    }
  }, [])

  const handleRedirect = () => {
    if(!user?.isActivated){
        dispatch(modalActions.openModalAC(MODAL_TYPE.ACTIVATE_ACCOUNT_INFO))
    }else if(user && user.isActivated){
      redirect(`/blog/addPost`)
    }

  }

  const debouncedSetSearchValue = useCallback(
    debounce(
      (searchQuery: string, sortQuery: number) => {
        window.scrollTo({ top: 0 })
        dispatch(actionsPosts.setCurrentPageAC(1))
        dispatch(getPostsThunk(searchQuery, sortQuery, 1))
      },
      400
    ),
    []
  )

  const onSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(actionsPosts.setSearchValueAC(e.target.value))
    debouncedSetSearchValue(searchValue.trim(), sortValue)
  }

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    window.scrollTo({ top: 0})
    const searchQuery = searchValue.trim()

    dispatch(actionsPosts.setCurrentPageAC(1))
    dispatch(getPostsThunk(searchQuery, sortValue, 1))
  }

  const onSortPosts = (item: string) => {
    window.scrollTo({ top: 0})
    const sortQuery = SELECT.includes(item) ? SELECT.indexOf(item) : 0
    const searchQuery = searchValue.trim()
    dispatch(actionsPosts.setCurrentPageAC(1))
    dispatch(getPostsThunk(searchQuery, sortQuery, 1))
    dispatch(actionsPosts.setSortValueAC(sortQuery))
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
