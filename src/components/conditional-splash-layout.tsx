'use client'

import { usePathname } from 'next/navigation'
import { SplashScreen } from './splash-screen'

interface ConditionalSplashLayoutProps {
  children: React.ReactNode
}

export function ConditionalSplashLayout({ children }: ConditionalSplashLayoutProps) {
  const pathname = usePathname()
  const isRootRoute = pathname === '/'

  return (
    <>
      {children}
      {isRootRoute && <SplashScreen />}
    </>
  )
}
