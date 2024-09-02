import Link from 'next/link';
import React from 'react'

const Logo:React .FC = () => {
  return (
    <>
    <Link href={'/'} className='font-extrabold text-3xl dark:bg-white/80 dark:text-background bg-foreground/80 text-background size-[50px] leading-[1.35] rounded-lg text-center align-middle shadow-inner	
    '>
      ay.
    </Link>
    </>
  )
}

export default Logo;
