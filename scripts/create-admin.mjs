import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const email = 'soultailsinfo@gmail.com'
  const password = 'Soultails2024!'

  const hashed = await bcrypt.hash(password, 12)

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashed },
    create: {
      email,
      password: hashed,
      name: 'Dr. Claudia Fioravanti',
      role: 'ADMIN',
    },
  })

  console.log('✅ Admin user created:', user.email)
  console.log('📧 Email:', email)
  console.log('🔑 Password: Soultails2024!')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
