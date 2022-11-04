const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();

const check = async (req, res, next) => {
    res.send({ message: 'Awesome user check ✅' })
}

module.exports = { check }