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
      async authorize(creds) {
        try {
          if (!creds?.email || !creds?.password) return null
          const key = creds.email.toLowerCase().trim()
          const now = Date.now()
          const rec = attempts.get(key)
          if (rec && rec.n >= 5 && now - rec.t < 15 * 60000) return null
          const user = await prisma.user.findUnique({ where: { email: key } })
          if (!user) {
            attempts.set(key, { n: (rec?.n ?? 0) + 1, t: now })
            return null
          }
          const valid = await bcrypt.compare(creds.password, user.password)
          if (!valid) {
            attempts.set(key, { n: (rec?.n ?? 0) + 1, t: now })
            return null
          }
          attempts.delete(key)
          return { id: user.id, email: user.email, name: user.name, role: user.role }
        } catch (err) {
          console.error('[auth] authorize error:', err)
          return null
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) { if (user) { token.role = (user as any).role; token.id = user.id } return token },
    async session({ session, token }) { if (session.user) { (session.user as any).role = token.role; (session.user as any).id = token.id } return session },
  },
}
