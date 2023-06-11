import jwt from 'jsonwebtoken'
import Token from '../models/refresh-token'

type PayloadT = {
  email: string,
  id: string,
  isActivated: boolean
}

class TokenService {
  async generateTokens(payload: PayloadT): Promise<{
    accessToken: string,
    refreshToken: string
  }> {
    const accessToken = jwt.sign(payload, process.env.SECRET as string, { expiresIn: '1h' })
    const refreshToken = jwt.sign(payload, process.env.SECRET_REFRESH as string, { expiresIn: '30d' })

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

    return  await Token.create({ user: userId, refreshToken })
  }
}

export default new TokenService()