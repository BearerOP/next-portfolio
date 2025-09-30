'use client'

import { usePathname } from 'next/navigation'
import { SplashLayout } from './splash-layout'

interface ConditionalSplashLayoutProps {
  children: React.ReactNode
}

export function ConditionalSplashLayout({ children }: ConditionalSplashLayoutProps) {
  const pathname = usePathname()
  const isRootRoute = pathname === '/'

  if (isRootRoute) {
    return <SplashLayout>{children}</SplashLayout>
  }

  return <>{children}</>
} 