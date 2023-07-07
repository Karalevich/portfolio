import { NextFunction, Request, Response } from 'express'
import userService from '../service/user'
import { validationResult } from 'express-validator'
import { tokenOptions } from '../constants'

export const signin = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).json(errors)
    }

    const userData = await userService.signin(email, password)

    res.cookie('refreshToken', userData.refreshToken, tokenOptions)
    res.status(200).json({ user: userData.user, token: userData.accessToken })
  } catch (e) {
    next(e)
  }
}

export const signup = async (req: Request, res: Response, next: NextFunction) => {
  const { email, password, name } = req.body
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }

    const userData = await userService.signup(email, password, name)

    res.cookie('refreshToken', userData.refreshToken, tokenOptions)
    res.status(200).json({ user: userData.user, token: userData.accessToken })
  } catch (e) {
    next(e)
  }
}

export const googleSign = async (req: Request, res: Response, next: NextFunction) => {
  const { email, name, imageUrl } = req.body
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }

    const userData = await userService.googleSign(email, name, imageUrl)

    res.cookie('refreshToken', userData.refreshToken, tokenOptions)
    res.status(200).json({ user: userData.user, token: userData.accessToken })
  } catch (e) {
    next(e)
  }
}

export const logOut = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refreshToken } = req.cookies

    const token = await userService.logOut(req.userId as string, refreshToken)

    res.clearCookie('refreshToken')
    return res.status(200).json(token)
  } catch (e) {
    next(e)
  }
}

export const activate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { link } = req.params

    await userService.activate(link)

    return res.redirect(process.env.CLIENT_URL as string)
  } catch (e) {
    next(e)
  }
}

export const resentActivateLink = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body

    await userService.resentActivateLink(email)

    return res.status(200).json({ message: 'Link sent' })
  } catch (e) {
    next(e)
  }
}

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userData = await userService.refresh(req.cookies.refreshToken)

    res.cookie('refreshToken', userData.refreshToken, tokenOptions)
    res.status(200).json({ user: userData.user, token: userData.accessToken })
  } catch (e) {
    next(e)
  }
}

// export const update = async (req: Request, res: Response) => {
//   const { email } = req.body
//   try {
//     const user = await User.findOne({ email })
//
//     if (!user) {
//       return res.status(404).json({ message: 'User doesn`t exist.' })
//     }
//
//     const updatedUser = await User.findOneAndUpdate({ email }, req.body, { new: true })
//
//     res.status(200).json({ user: updatedUser })
//   } catch (e) {
//     res.status(500).json({ message: 'Something went wrong' })
//   }
// }
//
// export const updateUserImage = async (req: Request, res: Response) => {
//   const { newUserImage, email } = req.body
//   try {
//     const user = await User.findOne({ email })
//
//     if (!user) {
//       return res.status(404).json({ message: 'User doesn`t exist.' })
//     }
//     console.log(user)
//     const updatedUser = await User.findOneAndUpdate({ email }, { imageUrl: newUserImage }, { new: true })
//
//     res.status(200).json({ user: updatedUser })
//   } catch (e) {
//     res.status(500).json({ message: 'Something went wrong' })
//   }
// }




