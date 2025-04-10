import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { connectToDatabase } from "@/lib/db"
import Admin from "@/lib/models/admin"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        await connectToDatabase()

        const admin = await Admin.findOne({ email: credentials?.email })
        if (!admin) throw new Error("No admin found")

        const isValid = await bcrypt.compare(credentials!.password, admin.password)
        if (!isValid) throw new Error("Invalid password")

        return { id: admin._id.toString(), email: admin.email }
      }
    })
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/admin/login",
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
