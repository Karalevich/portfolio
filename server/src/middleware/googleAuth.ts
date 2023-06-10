import { OAuth2Client } from 'google-auth-library'
import { TokenPayload } from 'google-auth-library/build/src/auth/loginticket'

export const googleAuth = async (token: string): Promise<TokenPayload | undefined> => {
  try {
    const client = new OAuth2Client(process.env.CLIENT_ID)

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.CLIENT_ID,
    })
    const payload = ticket.getPayload()
    return payload
  }catch (e){
    return Promise.resolve(undefined)
  }
}