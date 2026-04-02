import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma"
import bcrypt from "bcryptjs"

const attempts = new Map<string, { n: number; t: number }>()

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt", maxAge: 8 * 3600 },
  pages: { signIn: "/admin/login", error: "/admin/login" },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: { email: { type: "email" }, password: { type: "password" } },
      async authorize(creds, req) {
        if (!creds?.email || !creds?.password) throw new Error("Missing credentials")
        const ip = (req?.headers as any)?.["x-forwarded-for"] ?? "unknown"
        const key = `${ip}:${creds.email}`
        const now = Date.now()
        const rec = attempts.get(key)
        if (rec && rec.n >= 5 && now - rec.t < 15 * 60000) throw new Error("Too many attempts. Wait 15 minutes.")
        const user = await prisma.user.findUnique({ where: { email: creds.email.toLowerCase().trim() } })
        if (!user || !(await bcrypt.compare(creds.password, user.password))) {
          attempts.set(key, { n: (rec?.n ?? 0) + 1, t: now })
          throw new Error("Invalid credentials")
        }
        attempts.delete(key)
        return { id: user.id, email: user.email, name: user.name, role: user.role }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) { if (user) { token.role = (user as any).role; token.id = user.id } return token },
    async session({ session, token }) { if (session.user) { (session.user as any).role = token.role; (session.user as any).id = token.id } return session },
  },
}
