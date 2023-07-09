import React from 'react'
import Custom404 from './404'
import { useAuth } from '../utils/authHandler'

export default function Admin() {
  const user = useAuth()

  if (user && user.email === process.env.ADMIN_EMAIL) {
    return <div>This div is visible to certain IP addresses.</div>
  }
  return <Custom404 />
}