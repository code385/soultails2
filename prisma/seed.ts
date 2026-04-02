import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
const prisma = new PrismaClient()
async function main() {
  const hashed = await bcrypt.hash("Admin@Soultails2024!", 12)
  await prisma.user.upsert({
    where: { email: "admin@soultails.com" },
    update: {},
    create: { email: "admin@soultails.com", password: hashed, name: "Dr. Claudia", role: "ADMIN" },
  })
  console.log("Seed complete. Login: admin@soultails.com / Admin@Soultails2024!")
  console.log("IMPORTANT: Change password immediately after first login!")
}
main().catch(console.error).finally(() => prisma.$disconnect())
