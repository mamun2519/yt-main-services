import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

//* create token
const createToken = (
  payload: Record<string, unknown>,
  secret: Secret,
  expireTime: string,
): string => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  })
}

//* verify token
const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload
}

export const jwtHelpers = {
  createToken,
  verifyToken,
}
