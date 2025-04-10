'use client'

import { AdminAuthDialog } from '@/components/shared/dialog-form'
import { useState } from 'react'

export default function Home() {
  const [fingerprintId, setFingerprintId] = useState('')
  const [temperature, setTemperature] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async () => {
    const res = await fetch('/api/mark-attendance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ fingerprintId, temperature }),
    })

    const data = await res.json()
    setMessage(data.message || data.error)
  }

  return (
    <article className='bg-white flex place-items-center h-screen'>
      <main className='flex flex-col items-center justify-center w-full shadow-md rounded-lg max-w-max mx-auto p-6 space-y-10'>
        <h1 className='text-3xl font-bold capitalize mb-4 p6 text-[#1b263b]'>
          welcome to the students attendance{' '}
          <span className='flex justify-center capitalize'>
            {' '}
            management system
          </span>
        </h1>

        <p className='mt-8 text-lg text-[#415a77]'>
          Effortlessly manage Student Attendance with fingerprint verification
          <span className='flex justify-center capitalize'>
            {' '}
            and real-time time temperature monitoring
          </span>
        </p>
        <div className=''>
          <AdminAuthDialog />
        </div>
      </main>
    </article>
  )
}
