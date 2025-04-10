'use client'

import { useState } from 'react'

export default function AttendancePage() {
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
      <form className='p-6 max-w-md mx-auto shadow-md rounded-lg'>
        <h1 className='text-xl font-semibold mb-4'>Mark Attendance</h1>
        <input
          type='text'
          placeholder='Fingerprint ID'
          value={fingerprintId}
          onChange={(e) => setFingerprintId(e.target.value)}
          className='w-full mb-2 p-2 border border-gray-300 rounded'
        />
        <input
          type='number'
          placeholder='Temperature'
          value={temperature}
          onChange={(e) => setTemperature(e.target.value)}
          className='w-full mb-2 p-2 border border-gray-300 rounded'
        />
        <button
          onClick={handleSubmit}
          className='w-full bg-blue-500 text-white p-2 rounded'
        >
          Submit
        </button>
        {message && <p className='mt-2 text-center text-gray-700'>{message}</p>}
      </form>
    </article>
  )
}
