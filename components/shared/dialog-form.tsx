'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { Eye, EyeOff } from 'lucide-react'

const schema = z.object({
  email: z.string().email({ message: 'Enter a valid email' }),
  password: z.string().min(6, { message: 'Minimum 6 characters' }),
})

type FormValues = z.infer<typeof schema>

export function AdminAuthDialog() {
  const [mode, setMode] = useState<'login' | 'sign-up'>('login')
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const router = useRouter()

  const [showPassword, setShowPassword] = useState(false)

  const onSubmit = async (values: FormValues) => {
    try {
      const res = await fetch(`/api/admin/${mode}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Auth failed')

      toast.success(data.message)

      if (mode === 'sign-up') {
        // After signup, switch to login mode
        setMode('login')
        form.reset()
      } else {
        // After login, redirect to dashboard
        router.push('/admin/dashboard')
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='cursor-pointer '>
          {mode === 'login' ? 'Admin Login' : 'Admin Signup'}
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {mode === 'login' ? 'Login as Admin' : 'Register as Admin'}
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type='email'
                      placeholder='admin@example.com'
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        placeholder='********'
                        {...field}
                      />
                      <button
                        type='button'
                        onClick={() => setShowPassword(!showPassword)}
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground'
                      >
                        {showPassword ? (
                          <EyeOff size={18} />
                        ) : (
                          <Eye size={18} />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type='submit' className='w-full cursor-pointer'>
              {mode === 'login' ? 'Login' : 'Sign Up'}
            </Button>

            <Button
              variant='link'
              type='button'
              onClick={() => setMode(mode === 'login' ? 'sign-up' : 'login')}
              className='w-full cursor-pointer'
            >
              {mode === 'login'
                ? "Don't have an account? Sign Up"
                : 'Already registered? Login'}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
