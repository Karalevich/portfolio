import User from '../models/user'
import bcrypt from 'bcryptjs'
import tokenService from './token'
import ApiError from '../exceptions/api-error'
import * as uuid from 'uuid'
import mailService from './mail'

class UserService {
  async signin(email: string, password: string) {

    const user = await User.findOne({ email })

    if (!user) {
      throw ApiError.UnauthorizedError('Invalid email or password', 4011)
    }

    const isPasswordCorrect = await bcrypt.compare(password, `${user.password}`)
    if (!isPasswordCorrect) {
      throw ApiError.UnauthorizedError('Invalid email or password', 4011)
    }

    const tokens = await tokenService.generateTokens({ email, id: user._id, isActivated: user.isActivated })
    await tokenService.saveToken(user._id, tokens.refreshToken)

    return { ...tokens, user: user.transform() }
  }

  async signup(email: string, password: string, name: string) {
    const user = await User.findOne({ email })
    if (user) {
      throw ApiError.BadRequest('User already exist', 4001)
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

    return { ...tokens, user: newUser.transform() }

  }

  async googleSign(email: string, name: string, imageUrl: string) {
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

    return { ...tokens, user: newUser.transform() }
  }

  async logOut(userId: string, refreshToken: string) {
    let user = await User.findById(userId)
    if (!user) {
      throw ApiError.UnauthorizedError('User does not exist in database')
    }

    const token = await tokenService.removeToken(refreshToken, userId)

    return token
  }

  async activate(link: string) {
    let user = await User.findOne({ activationLink: link })
    if (!user) {
      throw ApiError.NotFound('User with this activation link not found', 4041)
    }
    user.isActivated = true
    await user.save()
  }

  async resentActivateLink(email: string) {
    let user = await User.findOne({ email })
    if (!user) {
      throw ApiError.NotFound('User with this email not found', 4042)
    }

    await mailService.sendActivationMail(email, `${process.env.API_URL}/user/activate/${user.activationLink}`)
  }

  async refresh(refreshToken: string) {
    if (!refreshToken) {
      throw ApiError.InvalidToken()
    }
    const userData = tokenService.validateRefreshToken(refreshToken)
    const tokenFromDb = await tokenService.findToken(refreshToken)
    if (!userData || !tokenFromDb) {
      throw ApiError.InvalidToken()
    }

    let user = await User.findById(userData.id)
    if (!user) {
      throw ApiError.UnauthorizedError('User does not exist in database', 4013)
    }


    const tokens = await tokenService.generateTokens({ email: user.email, id: user._id, isActivated: user.isActivated })
    await tokenService.saveToken(user._id, tokens.refreshToken)

    return { ...tokens, user: user.transform() }

  }
}

export default new UserService()