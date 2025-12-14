'use client'

import { useToast } from '@/hooks/use-toast-notification'
import { ToastContainer } from '@/components/craft/toast-container'

export function ToastProvider() {
    const { toasts, removeToast } = useToast()

    return <ToastContainer toasts={toasts} onClose={removeToast} />
}
