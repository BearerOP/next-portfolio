'use client'

import { useState, useCallback } from 'react'
import type { ToastVariant, ToastWidth, ToastItem } from '@/components/craft/toast-notification.d'

let toastIdCounter = 0

export function useToast() {
    const [toasts, setToasts] = useState<ToastItem[]>([    ])

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, [])

    const showToast = useCallback(
        (
            variant: ToastVariant,
            title: string,
            message: string,
            width?: ToastWidth,
            duration: number = 7000,
            showCloseButton: boolean = true
        ) => {
            const id = `toast-${Date.now()}-${toastIdCounter++}`
            const newToast: ToastItem = {
                id,
                variant,
                title,
                message,
                width,
                duration,
                showCloseButton,
            }

            setToasts((prev) => [...prev, newToast])

            // Auto-remove after duration
            if (duration > 0) {
                setTimeout(() => {
                    removeToast(id)
                }, duration)
            }
        },
        [removeToast]
    )

    const clearAllToasts = useCallback(() => {
        setToasts([])
    }, [])

    const success = useCallback(
        (title: string, message: string, width?: ToastWidth, duration?: number) => {
            showToast('success', title, message, width, duration)
        },
        [showToast]
    )

    const warning = useCallback(
        (title: string, message: string, width?: ToastWidth, duration?: number) => {
            showToast('warning', title, message, width, duration)
        },
        [showToast]
    )

    const danger = useCallback(
        (title: string, message: string, width?: ToastWidth, duration?: number) => {
            showToast('danger', title, message, width, duration)
        },
        [showToast]
    )

    const info = useCallback(
        (title: string, message: string, width?: ToastWidth, duration?: number) => {
            showToast('info', title, message, width, duration)
        },
        [showToast]
    )

    return {
        toasts,
        showToast,
        success,
        warning,
        danger,
        info,
        removeToast,
        clearAllToasts,
    }
}

export default useToast
