import { CookieOptions } from 'express'

export const LIMIT_CARDS_ON_PAGE = 9
export const LIMIT_COMMENTS_ON_PAGE = 6

export const tokenOptions: CookieOptions = {
  maxAge: 30 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  sameSite: 'none',
  secure: true,
}
