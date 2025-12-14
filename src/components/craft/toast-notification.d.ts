/**
 * Toast Notification Component Types
 * 
 * A comprehensive toast notification system with support for multiple toasts,
 * stacking animations, and hover effects.
 */

export type ToastVariant = 'success' | 'warning' | 'danger' | 'info'
export type ToastWidth = 'sm' | 'md' | 'lg' | 'full'

export interface ToastProps {
    /** Controls whether the toast is visible */
    isOpen: boolean

    /** Callback function when toast is closed */
    onClose: () => void

    /** Visual variant of the toast */
    variant?: ToastVariant

    /** Main title of the toast */
    title: string

    /** Descriptive message of the toast */
    message: string

    /** Auto-dismiss duration in milliseconds (0 = no auto-dismiss) */
    duration?: number

    /** Whether to show the close button */
    showCloseButton?: boolean

    /** Width configuration of the toast */
    width?: ToastWidth

    /** Whether the toast is standalone or in a container */
    standalone?: boolean
}

export interface ToastItem extends Omit<ToastProps, 'isOpen' | 'onClose'> {
    /** Unique identifier for the toast */
    id: string
}

export interface ToastContainerProps {
    /** Array of toast items to display */
    toasts: ToastItem[]

    /** Callback when a toast is closed */
    onClose: (id: string) => void

    /** Maximum number of visible toasts (default: 3) */
    maxVisible?: number
}

export interface UseToastReturn {
    /** Array of active toasts */
    toasts: ToastItem[]

    /** Show a toast with custom configuration */
    showToast: (
        variant: ToastVariant,
        title: string,
        message: string,
        width?: ToastWidth,
        duration?: number,
        showCloseButton?: boolean
    ) => void

    /** Show a success toast */
    success: (title: string, message: string, width?: ToastWidth, duration?: number) => void

    /** Show a warning toast */
    warning: (title: string, message: string, width?: ToastWidth, duration?: number) => void

    /** Show a danger/error toast */
    danger: (title: string, message: string, width?: ToastWidth, duration?: number) => void

    /** Show an info toast */
    info: (title: string, message: string, width?: ToastWidth, duration?: number) => void

    /** Remove a specific toast by ID */
    removeToast: (id: string) => void

    /** Clear all toasts */
    clearAllToasts: () => void
}
