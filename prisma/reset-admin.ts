import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  const email = "soultailsinfo@gmail.com"
  const password = "Admin@Soultails2024!"

  const hashed = await bcrypt.hash(password, 12)

  const user = await prisma.user.upsert({
    where: { email },
    update: { password: hashed },
    create: { email, password: hashed, name: "Dr. Claudia", role: "ADMIN" },
  })

  console.log("✅ Password reset done!")
  console.log("   Email   :", user.email)
  console.log("   Password:", password)
}

main()
  .catch(e => { console.error("❌ Error:", e); process.exit(1) })
  .finally(() => prisma.$disconnect())
