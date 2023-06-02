import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import { Request, Response } from 'express'

export const signin = async (req: Request, res: Response) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, `${user.password}`)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const token = jwt.sign({ email: user.email, id: user._id }, process.env.SECRET as string, { expiresIn: '1h' })
    res.status(200).json({ user: user.transform(), token })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const signup = async (req: Request, res: Response) => {
  const { email, password, confirmPassword, name } = req.body
  try {
    const user = await User.findOne({ email })
    if (user) {
      return res.status(400).json({ message: 'User already exist' })
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Password don`t match' })
    }

    const hashPassword = await bcrypt.hash(password, 12)
    const newUser = await User.create({
      password: hashPassword,
      name,
      imageUrl: '',
      email,
    })
    const token = jwt.sign({ email: newUser.email, id: newUser._id }, process.env.SECRET as string, { expiresIn: '1h' })

    res.status(200).json({ user: newUser.transform(), token })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
  }
}

export const googleSign = async (req: Request, res: Response) => {
  const { email, name, imageUrl, id } = req.body
  try {
    let newUser = await User.findOne({ email })
    if (!newUser) {
      newUser = await User.create({
        name,
        imageUrl,
        email,
        id
      })
    }
    res.status(200).json({ user: newUser.transform() })
  } catch (e) {
    res.status(500).json({ message: 'Something went wrong' })
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




