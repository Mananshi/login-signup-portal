import jwt from 'jsonwebtoken'

const bcrypt = require('bcrypt')

// hash password
export const hashText = async text => {
  try {
    const saltRounds = 10
    const hash = await bcrypt.hash(text, saltRounds)
    return hash
  } catch (error) {
    console.log(error)
  }
}

// compare hash
export const compareHash = async (text, hash) => {
  try {
    const match = await bcrypt.compare(text, hash)
    return match
  } catch (error) {
    console.log(error)
  }
}

export const generateJWTToken = async obj => {
  return (
    'Bearer ' +
    jwt.sign(obj, process.env.SECRETS.JWT, {
      expiresIn: process.env.SECRETS.JWTEXP
    })
  )
}

export const verifyJWTToken = token => {
  try {
    return jwt.verify(token, process.env.SECRETS.JWT)
  } catch (error) {
    console.log(error)
    return false
  }
}