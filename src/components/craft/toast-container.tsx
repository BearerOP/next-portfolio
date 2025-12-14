'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Toast, ToastProps } from './toast-notification'

export interface ToastItem extends Omit<ToastProps, 'isOpen' | 'onClose'> {
    id: string
}

interface ToastContainerProps {
    toasts: ToastItem[]
    onClose: (id: string) => void
    maxVisible?: number
}

export function ToastContainer({ toasts, onClose, maxVisible = 3 }: ToastContainerProps) {
    const [isHovered, setIsHovered] = useState(false)

    // Show only the most recent toasts
    const visibleToasts = toasts.slice(-maxVisible)
    const hiddenCount = Math.max(0, toasts.length - maxVisible)

    return (
        <div
            className="pointer-events-none fixed bottom-4 sm:bottom-6 left-1/2 z-[60] -translate-x-1/2 w max-w-[calc(100%-2rem)] px-4 sm:px-0"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className="relative pointer-events-auto">
                <AnimatePresence mode="popLayout">
                    {visibleToasts.map((toast, index) => {
                        const isTop = index === visibleToasts.length - 1
                        const stackIndex = visibleToasts.length - 1 - index

                        // Calculate stacked position
                        const yOffset = isHovered ? index * 80 : stackIndex * 12
                        const scale = isHovered ? 1 : 1 - (stackIndex * 0.05)
                        const opacity = isHovered ? 1 : (isTop ? 1 : 0.6 - (stackIndex * 0.2))
                        const zIndex = visibleToasts.length - stackIndex

                        return (
                            <motion.div
                                key={toast.id}
                                layout
                                initial={{ opacity: 0, y: 100, scale: 0.9 }}
                                animate={{
                                    opacity,
                                    y: -yOffset,
                                    scale,
                                    zIndex,
                                }}
                                exit={{ opacity: 0, y: 100, scale: 0.9 }}
                                transition={{
                                    duration: 0.5,
                                    ease: [0.32, 0.72, 0, 1],
                                    layout: {
                                        duration: 0.5,
                                        ease: [0.32, 0.72, 0, 1],
                                    }
                                }}
                                className="absolute bottom-0 left-0 right-0"
                                style={{
                                    pointerEvents: isHovered || isTop ? 'auto' : 'none',
                                }}
                            >
                                <Toast
                                    isOpen={true}
                                    onClose={() => onClose(toast.id)}
                                    variant={toast.variant}
                                    title={toast.title}
                                    message={toast.message}
                                    duration={toast.duration}
                                    showCloseButton={toast.showCloseButton}
                                    width={toast.width}
                                    standalone={false}
                                />
                            </motion.div>
                        )
                    })}
                </AnimatePresence>

                {/* Hidden count indicator */}
                {hiddenCount > 0 && !isHovered && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute -top-8 left-1/2 -translate-x-1/2 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full px-3 py-1 text-xs text-white/70"
                    >
                        +{hiddenCount} more
                    </motion.div>
                )}
            </div>
        </div>
    )
}
