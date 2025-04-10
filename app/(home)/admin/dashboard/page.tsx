import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return redirect('/admin/dashboard/')
  }

  return (
    <div className='p-6'>
      <h1>Welcome, {session.user?.email}</h1>
    </div>
  )
}
