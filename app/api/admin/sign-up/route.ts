import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { connectToDatabase } from '@/lib/db'
import Admin from '@/lib/models/admin'

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    if (!email || !password) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    await connectToDatabase()

    const existingAdmin = await Admin.findOne({ email })
    if (existingAdmin) {
      return NextResponse.json({ error: 'Admin already exists' }, { status: 400 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newAdmin = await Admin.create({ email, password: hashedPassword })

    return NextResponse.json({ message: 'Admin registered successfully' }, { status: 201 })
  } catch (error) {
    return NextResponse.json({ error: 'Signup failed' }, { status: 500 })
  }
}
