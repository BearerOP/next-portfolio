'use client'

import { useState } from 'react'
import { Toast, ToastProvider } from "@/components/ui/toast"
import { ClipboardCopyIcon } from 'lucide-react'
import { toast } from "sonner"
import { GlareCard } from './ui/glare-card'
import useSound from '@/hooks/use-sound'

export function CopyButton() {
  const [isCopied, setIsCopied] = useState(false)
  const clickSound = useSound("/audio/rizz.mp3");


  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText('npm i -g ankit-cli && ankit')
      setIsCopied(true)
      clickSound();
      toast.success(
        "Command Copied!",

        {
          description: "Make sure to run the command in your terminal.",
        })
      setTimeout(() => setIsCopied(false), 3000)
    } catch (err) {
      toast("Error",
        {
          description: "Failed to copy the command. Please try again.",
        })
    }
  }

  return (
    <ToastProvider>
      <div className="flex items-center justify-center w-fit ">
        <button
          onClick={copyToClipboard}
          aria-label="Copy npm i -g ankit-cli
            ankit to clipboard"
            className="w-fit max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
            >

              
          <GlareCard className=" w-full flex items-center justify-center font-mono text-sm space-x-2  dark:text-white text-white/70 dark:bg-slate-900 bg-slate-800" >
            <ClipboardCopyIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white/70 dark:text-white " />
            <code className="font-mono text-xs sm:text-sm md:text-base text-white/70 dark:text-white">
              npx ankit
            </code>
          </GlareCard>


        </button>
      </div>
      {/* <div className="flex items-center justify-center p-4">
      <Button
        onClick={copyToClipboard}
        aria-label="Copy npx ankit to clipboard"
        className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
      >
        <Card className="w-full bg-slate-800 dark:bg-slate-900 hover:bg-slate-700 dark:hover:bg-slate-800 transition-colors duration-200">
          <div className="flex items-center justify-center space-x-2 py-2 px-3 sm:py-3 sm:px-4">
            <ClipboardCopyIcon className="h-4 w-4 sm:h-5 sm:w-5 text-white/70 dark:text-white" />
            <code className="font-mono text-xs sm:text-sm md:text-base text-white/70 dark:text-white">
              npx ankit
            </code>
          </div>
        </Card>
      </Button>
    </div> */}
      <Toast />
    </ToastProvider>
  )
}