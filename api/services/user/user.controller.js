const { PrismaClient } = require('@prisma/client')
const { hashText } = require('../../utils/auth.js')

const db = new PrismaClient()

const signup = async (req, res) => {
    try {
      let { email, name, password } = req.body
      // // check if email address is alreay registered
      const emailExits = await db.user.findUnique({ where: { email } })
      if (emailExits) {
        return res.error('User Already registered')
      }
      const hashPassword = await hashText(password)
  
      await db.user.create({
        data: {
          email: email,
          name: name,
          password: hashPassword
        }
      })
      res.ok('User Registered')
    } catch (error) {
      console.log('Error', error)
      res.error(error)
    }
  }
  
  // export const getMany = async (req, res) => {
  //   console.log('Req body', req.user)
  //   const users = await db.user.findMany({})
  //   res.ok(users)
  // }

  module.exports = { signup }