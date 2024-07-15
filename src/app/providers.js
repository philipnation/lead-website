"use client";


import { AuthProvider } from '@/context/AuthContext.context';
import React from 'react'

const Providers = ({children}) => {
  return (
    <AuthProvider>
        {children}
    </AuthProvider>
  )
}

export default Providers