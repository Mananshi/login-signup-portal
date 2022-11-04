const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt')
const db = new PrismaClient()

const hashText = async text => {
    const saltRounds = 10
    const hash = await bcrypt.hash(text, saltRounds)
    return hash
  }
  
  const users = [
    {
      email: 'admin@123.com',
      name: 'admin'
    }
  ]
  
  const seed = async () => {
    try {
      await Promise.all(
        users.map(async user => {
          const emailExits = await db.user.findUnique({
            where: { email: user.email }
          })
          if (!emailExits)
            await db.user.create({
              data: { ...user, password: await hashText('admin') }
            })
        })
      )
  
      process.exit(0)
    } catch (error) {
      console.log(error)
    }
  }
  
  seed()