import bcrypt from 'bcryptjs'
import * as uuid from 'uuid'
import User from '../models/user.js'
import { Request, Response } from 'express'
import mailService from '../service/mail'
import tokenService from '../service/token'
import { validationResult } from 'express-validator'

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(401).json(errors)
    }
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password', code: 4011 })
    }

    const isPasswordCorrect = await bcrypt.compare(password, `${user.password}`)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password', code: 4011 })
    }

    const tokens = await tokenService.generateTokens({ email, id: user._id, isActivated: user.isActivated })
    await tokenService.saveToken(user._id, tokens.refreshToken)

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    res.status(200).json({ user: user.transform(), token: tokens.accessToken })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong during sign in', code: 5001 })
  }
}

export const signup = async (req: Request, res: Response) => {
  const { email, password, name } = req.body
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exist', code: 4001 })
    }

    const hashPassword = await bcrypt.hash(password, 12)
    const activationLink = uuid.v4()

    const newUser = await User.create({
      password: hashPassword,
      name,
      imageUrl: '',
      email,
      activationLink,
    })

    await mailService.sendActivationMail(email, `${process.env.API_URL}/user/activate/${activationLink}`)
    const tokens = await tokenService.generateTokens({ email, id: newUser._id, isActivated: newUser.isActivated })
    await tokenService.saveToken(newUser._id, tokens.refreshToken)

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    res.status(200).json({ user: newUser.transform(), token: tokens.accessToken })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong during sign up', code: 5002 })
  }
}

export const googleSign = async (req: Request, res: Response) => {
  const { email, name, imageUrl } = req.body
  try {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json(errors)
    }
    let newUser = await User.findOne({ email })
    if (!newUser) {
      newUser = await User.create({
        name,
        imageUrl,
        email,
        isActivated: true,
      })
    }

    const tokens = await tokenService.generateTokens({ email, id: newUser._id, isActivated: newUser.isActivated })
    await tokenService.saveToken(newUser._id, tokens.refreshToken)

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    res.status(200).json({ user: newUser.transform(), token: tokens.accessToken })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong during google auth', code: 5003 })
  }
}

export const logOut = async (req: Request, res: Response) => {
  try {
    let user = await User.findById(req.userId)
    if (!user) {
      return res.status(401).json({ message: 'User does not exist in database' })
    }
    const { refreshToken } = req.cookies
    const token = await tokenService.removeToken(refreshToken, req.userId as string)
    res.clearCookie('refreshToken')
    return res.status(200).json(token)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const activate = async (req: Request, res: Response) => {
  try {
    const { link } = req.params
    let user = await User.findOne({ activationLink: link })
    if (!user) {
      return res.status(404).json({ message: 'User with this activation link not found', code: 4041 })
    }
    user.isActivated = true
    await user.save()
    return res.redirect(process.env.CLIENT_URL as string)
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const resentActivateLink = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    let user = await User.findOne({ email })
    if (!user) {
      return res.status(404).json({ message: 'User with this email not found', code: 4042 })
    }

    await mailService.sendActivationMail(email, `${process.env.API_URL}/user/activate/${user.activationLink}`)
    return res.status(200).json({ message: 'Link sent' })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.cookies
    if (!refreshToken) {
      return res.status(498).json({ message: 'User is unauthorized', code: 4981 })
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      return res.status(498).json({ message: 'User is unauthorized', code: 4981 })
    }

    let user = await User.findById(userData.id)
    if (!user) {
      return res.status(401).json({ message: 'User does not exist in database', code: 4013 })
    }


    const tokens = await tokenService.generateTokens({ email: user.email, id: user._id, isActivated: user.isActivated })
    await tokenService.saveToken(user._id, tokens.refreshToken)

    res.cookie('refreshToken', tokens.refreshToken, {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      sameSite: 'none',
      secure: true,
    })
    res.status(200).json({ user: user.transform(), token: tokens.accessToken })
  } catch (e) {

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




