import React from 'react'

export default function OutlineFooter() {
    return (<div
        className="relative w-screen h-[35rem] overflow-hidden bg-gradient-to-b from-black to-gray-300/80 text-[395px] font-semibold leading-none dark:from-gray-300/30 dark:to-slate-900/10 text-background text-center flex items-center justify-between"
        style={{
            WebkitTextStroke: '.85px transparent',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
        }}
    >
        <span>A</span>
        <span>N</span>
        <span>K</span>
        <span>I</span>
        <span>T</span>
    </div>
    )
}
