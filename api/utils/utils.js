import { compareHash, generateJWTToken, verifyJWTToken } from './auth'
import { authSchema } from './validation'

export const login = async (req, res) => {
  try {
    await authSchema.validateAsync(req.body)

    let { email, password } = req.body

    const user = await db.user.findUnique({
      where: {
        email
      }
    })
    if(!user) {
        return res.unauthorized('User not found')
    }
    const validatePassword = await compareHash(password, user.password)
    if (!validatePassword) {
      return res.unauthorized('Either email or password is invalid')
    }
    const token = await generateJWTToken({ id: user.id })

    res.ok({ message: 'Login Success', token })
  } catch (error) {
    res.error(error)
  }
}

export const protect = async (req, res, next) => {
  const bearer = req.headers.authorization || req.headers.Authorization
  if (!bearer || !bearer.startsWith('Bearer ')) {
    return res.unauthorized()
  }
  const token = bearer.split('Bearer ')[1].trim()

  const payload = verifyJWTToken(token)
  if (!payload) {
    return res.unauthorized()
  }
  const user = await db.user.findUnique({
    where: { id: payload.id },
    select: {
      email: true,
      name: true,
      id: true
    }
  })

  req.user = user
  next()
}