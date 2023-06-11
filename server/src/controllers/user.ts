import bcrypt from 'bcryptjs'
import * as uuid from 'uuid'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { Request, Response } from 'express'
import mailService from '../service/mail'
import tokenService from '../service/token'

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password', code: 4011 })
    }

    const isPasswordCorrect = await bcrypt.compare(password, `${user.password}`)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password', code: 4012 })
    }

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET as string, { expiresIn: '1h' })
    res.status(200).json({ user: user.transform(), token })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong during sign in', code: 5001 })
  }
}

export const signup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, name } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exist', code: 4001 })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password don`t match', code: 4002 })
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
    const tokens = await tokenService.generateTokens({email, id: newUser._id, isActivated: newUser.isActivated})
    await tokenService.saveToken(newUser._id, tokens.refreshToken)

    res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
    res.status(200).json({ user: newUser.transform(), token: tokens.accessToken })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong during sign up', code: 5002 })
  }
}

export const googleSign = async (req: Request, res: Response) => {
  const { email, name, imageUrl } = req.body
  try {
    let newUser = await User.findOne({ email })
    if (!newUser) {
      newUser = await User.create({
        name,
        imageUrl,
        email,
      })
    }
    const token = jwt.sign({ email, id: newUser._id }, process.env.SECRET as string, { expiresIn: '1h' })
    res.status(200).json({ user: newUser.transform(), token })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong during google auth', code: 5003 })
  }
}

export const logOut = async (req: Request, res: Response) => {

  try {

  } catch (e) {

  }
}

export const activate = async (req: Request, res: Response) => {

  try {

  } catch (e) {

  }
}

export const refresh = async (req: Request, res: Response) => {

  try {

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




