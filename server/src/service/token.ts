import jwt from 'jsonwebtoken'
import Token from '../models/refresh-token'

type PayloadT = {
  email: string,
  id: string,
  isActivated: boolean
}

export type TokensT = {
  accessToken: string,
  refreshToken: string
}

class TokenService {
  async generateTokens(payload: PayloadT): Promise<TokensT> {
    const accessToken = jwt.sign(payload, process.env.SECRET as string, { expiresIn: '30min' })
    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH as string, { expiresIn: '3d' })

    return {
      accessToken,
      refreshToken,
    }
  }

  async saveToken(userId: string, refreshToken: string) {
    const token = await Token.findOne({ user: userId })
    if (token) {
      token.refreshToken = refreshToken
      return token.save()
    }
    return await Token.create({ user: userId, refreshToken })
  }

  async removeToken(refreshToken: string, userId: string) {
    return Token.deleteOne({ refreshToken, user: userId })
  }

  validateRefreshToken(token: string): PayloadT | null {
    try {
      return jwt.verify(token, process.env.SECRET_REFRESH as string) as PayloadT
    } catch (e) {
      return null
    }
  }

  validateAccessToken(token: string): PayloadT | null {
    try {
      return jwt.verify(token, process.env.SECRET as string) as PayloadT
    } catch (e) {
      return null
    }
  }


  async findToken(refreshToken: string) {
    return Token.findOne({ refreshToken })
  }
}

export default new TokenService()