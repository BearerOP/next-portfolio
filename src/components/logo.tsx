import Link from 'next/link';
import React from 'react'
import * as motion from "framer-motion/client"
const Logo: React.FC = () => {
  return (
    <>
      <motion.div
        initial={{ scale: 0 }}
        animate={{ rotate: 360, scale: 1.2 }}
        transition={{
          type: "spring",
          stiffness: 360,
          damping: 40
        }}
      >
        <Link href={'/'} className='font-extrabold text-3xl dark:bg-white/80 dark:text-background bg-foreground/80 text-background size-[50px] leading-[1.35] rounded-lg text-center align-middle shadow-inner	
    '>
          ay.
          
        </Link>
      </motion.div>
      
    </>
  )
}

export default Logo;
