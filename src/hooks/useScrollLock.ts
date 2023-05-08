import { useCallback, useState } from 'react'

type UseScrollLockT = {
  lockScroll: () => void
  unlockScroll: () => void
  isScrollLocked: boolean
}
export const useScrollLock = (): UseScrollLockT => {
  const [isScrollLocked, setIsScrollLock] = useState<boolean>(false)
  const lockScroll = useCallback(() => {
    setIsScrollLock((prevIsScrollLocked) => {
      if (prevIsScrollLocked) {
        return prevIsScrollLocked
      }
      document.body.style.overflow = 'hidden'
      return true
    })
  }, [])

  const unlockScroll = useCallback(() => {
    setIsScrollLock((prevIsScrollLocked) => {
      if (!prevIsScrollLocked) {
        return prevIsScrollLocked
      }
      document.body.style.overflow = ''
      return false
    })
  }, [])

  return {
    lockScroll,
    unlockScroll,
    isScrollLocked,
  }
}
