'use client'

import { useEffect, useState } from 'react'
import { ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

export const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false)

  useEffect(() => {
    const toggleVisibility = () => {
      window.scrollY > 500 ? setIsVisible(true) : setIsVisible(false)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => {
      window.removeEventListener('scroll', toggleVisibility)
    }
  }, [])

  const scrollToTop = () => {
    isVisible &&
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
  }

  return (
    <Button
      aria-label='scroll to the top button'
      size='sm'
      className={`text-xs h-10 w-10 bg-gray-100 hover:bg-gray-200 dark:bg-transparent border-2 border-gray-300 dark:border-slate-700 backdrop-blur-md dark:hover:bg-white/5 fixed bottom-4 right-4 rounded-full p-2 outline-none scrollToTheTop transition-all duration-300 hover:scale-110 active:scale-95 text-gray-700 dark:text-white ${
        isVisible ? 'showBtn opacity-100' : 'opacity-0'
      }`}
      onClick={scrollToTop}
    >
      <ChevronUp className="transition-transform duration-200" />
    </Button>
  )
}
