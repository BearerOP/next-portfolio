# Toast Notification System

A beautiful, interactive toast notification component with support for multiple toasts, stacking animations, and hover effects powered by Motion for React.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
- [Animation Details](#animation-details)
- [Styling](#styling)
- [Best Practices](#best-practices)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)

## 🎯 Overview

The Toast Notification System provides a complete solution for showing toast notifications in your application. It supports multiple simultaneous toasts with elegant stacking animations, hover-to-expand behavior, and automatic dismissal.

## ✨ Features

- **Multiple Toasts** - Show multiple notifications simultaneously
- **Stacked Animation** - Toasts stack with a card-deck effect (scale + opacity)
- **Hover to Expand** - Hover over toasts to see all notifications vertically
- **Auto-dismiss** - Configurable auto-dismiss duration (default: 5s)
- **Customizable Width** - Four width options (sm, md, lg, full)
- **Smooth Animations** - Motion for React powered transitions
- **Mobile Responsive** - Automatically adjusts to screen size
- **Hidden Counter** - Shows "+N more" when more than 3 toasts exist
- **Dark Mode Support** - Fully styled for dark backgrounds
- **TypeScript Support** - Fully typed for better developer experience
- **4 Variants** - Success, Warning, Danger, and Info styles

## 📦 Installation

1. Ensure you have Motion for React and Lucide React installed:

```bash
npm install motion lucide-react
# or
yarn add motion lucide-react
# or
pnpm add motion lucide-react
```

2. Copy the component files to your project:

```bash
# Copy the components
cp src/components/craft/toast-notification.tsx your-project/components/
cp src/components/craft/toast-container.tsx your-project/components/
cp src/hooks/use-toast-notification.tsx your-project/hooks/
cp src/components/toast-provider.tsx your-project/components/
```

## 🚀 Usage

### Basic Usage (Single Toast)

```tsx
import { useState } from 'react'
import { Toast } from '@/components/craft/toast-notification'

export default function MyComponent() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <button onClick={() => setIsOpen(true)}>
        Show Toast
      </button>
      
      <Toast
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        variant="success"
        title="Success!"
        message="Your action was completed successfully"
      />
    </>
  )
}
```

### Recommended: Global Usage with ToastProvider

```tsx
// Step 1: Create toast-provider.tsx
'use client'

import { useToast } from '@/hooks/use-toast-notification'
import { ToastContainer } from '@/components/craft/toast-container'

export function ToastProvider() {
    const { toasts, removeToast } = useToast()
    return <ToastContainer toasts={toasts} onClose={removeToast} />
}

// Step 2: Add to your root layout
import { ToastProvider } from '@/components/toast-provider'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <ToastProvider />
      </body>
    </html>
  )
}

// Step 3: Use in any component
'use client'

import { useToast } from '@/hooks/use-toast-notification'

export default function MyComponent() {
  const { success, warning, danger, info } = useToast()
  
  return (
    <button onClick={() => success('Success!', 'Your action was completed')}>
      Show Toast
    </button>
  )
}
```

### Component-Level Usage

```tsx
import { useToast } from '@/hooks/use-toast-notification'
import { ToastContainer } from '@/components/craft/toast-container'

export default function MyComponent() {
  const { toasts, success, warning, danger, info, removeToast } = useToast()
  
  const handleMultipleToasts = () => {
    success('Success!', 'First notification')
    warning('Warning!', 'Second notification')
    danger('Error!', 'Third notification')
    info('Info', 'Fourth notification')
  }
  
  return (
    <>
      <button onClick={handleMultipleToasts}>
        Show Multiple Toasts
      </button>
      
      <ToastContainer toasts={toasts} onClose={removeToast} />
    </>
  )
}
```

### Custom Width and Duration

```tsx
// Small width, 3 second duration
success('Quick!', 'This disappears quickly', 'sm', 3000)

// Large width, 10 second duration
info('Important', 'Read this carefully', 'lg', 10000)

// Full width, default duration
warning('Wide Alert', 'This spans the full width', 'full')
```

## 📖 Props

### Toast Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `isOpen` | `boolean` | - | Controls whether the toast is visible (required) |
| `onClose` | `() => void` | - | Callback function when toast is closed (required) |
| `variant` | `'success' \| 'warning' \| 'danger' \| 'info'` | `'info'` | Visual variant of the toast |
| `title` | `string` | - | Main title of the toast (required) |
| `message` | `string` | - | Descriptive message of the toast (required) |
| `duration` | `number` | `5000` | Auto-dismiss duration in milliseconds (0 = no auto-dismiss) |
| `showCloseButton` | `boolean` | `true` | Whether to show the close button |
| `width` | `'sm' \| 'md' \| 'lg' \| 'full'` | `'md'` | Width configuration of the toast |
| `standalone` | `boolean` | `true` | Whether the toast is standalone or in a container |

### ToastContainer Component

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `toasts` | `ToastItem[]` | - | Array of toast items to display (required) |
| `onClose` | `(id: string) => void` | - | Callback when a toast is closed (required) |
| `maxVisible` | `number` | `3` | Maximum number of visible toasts |

### useToast Hook

Returns an object with the following properties:

| Property | Type | Description |
|----------|------|-------------|
| `toasts` | `ToastItem[]` | Array of active toasts |
| `success` | `(title, message, width?, duration?) => void` | Show a success toast |
| `warning` | `(title, message, width?, duration?) => void` | Show a warning toast |
| `danger` | `(title, message, width?, duration?) => void` | Show a danger/error toast |
| `info` | `(title, message, width?, duration?) => void` | Show an info toast |
| `removeToast` | `(id: string) => void` | Remove a specific toast by ID |
| `clearAllToasts` | `() => void` | Clear all toasts |

## 💡 Examples

### Success Notification

```tsx
const { success } = useToast()

success('Payment Successful', 'Your payment has been processed')
```

### Warning Notification

```tsx
const { warning } = useToast()

warning('Low Storage', 'You are running out of storage space')
```

### Error Notification

```tsx
const { danger } = useToast()

danger('Upload Failed', 'Failed to upload file. Please try again')
```

### Info Notification

```tsx
const { info } = useToast()

info('New Update', 'A new version is available')
```

### Custom Duration

```tsx
// Show for 10 seconds
success('Important!', 'Please read this carefully', 'md', 10000)

// No auto-dismiss
danger('Critical Error', 'Manual dismissal required', 'lg', 0)
```

## 🎨 Animation Details

### Stacking Animation (Default State)

- **Top Toast**: Full opacity (1), no offset, full scale (1)
- **2nd Toast**: 60% opacity, 12px offset down, 95% scale
- **3rd Toast**: 40% opacity, 24px offset down, 90% scale
- **Hidden Toasts**: Not rendered, shown in "+N more" indicator

### Hover State

- **All Toasts**: Full opacity (1), full scale (1)
- **Vertical Spacing**: 80px between each toast
- **Transition**: Smooth 300ms ease-out animation

### Entry/Exit Animations

- **Entry**: Slide up from bottom (y: 100 → 0) with fade in
- **Exit**: Slide down to bottom (y: 0 → 100) with fade out
- **Duration**: 400ms with custom easing curve `[0.32, 0.72, 0, 1]`

## 🎨 Styling

### Color Variants (Theme-Aware)

**Success** (Green):
- Light Mode:
  - Toast Background: `bg-green-50`
  - Toast Text: `text-green-900`
  - Toast Border: `border-green-200`
  - Icon Background: `bg-green-500/15`
  - Icon Color: `text-green-600`
- Dark Mode:
  - Toast Background: `bg-green-950/90`
  - Toast Text: `text-green-50`
  - Toast Border: `border-green-500/20`
  - Icon Background: `bg-green-500/20`
  - Icon Color: `text-green-300`

**Warning** (Yellow):
- Light Mode:
  - Toast Background: `bg-yellow-50`
  - Toast Text: `text-yellow-900`
  - Toast Border: `border-yellow-200`
  - Icon Background: `bg-yellow-500/15`
  - Icon Color: `text-yellow-600`
- Dark Mode:
  - Toast Background: `bg-yellow-950/90`
  - Toast Text: `text-yellow-50`
  - Toast Border: `border-yellow-500/20`
  - Icon Background: `bg-yellow-500/20`
  - Icon Color: `text-yellow-300`

**Danger** (Red):
- Light Mode:
  - Toast Background: `bg-red-50`
  - Toast Text: `text-red-900`
  - Toast Border: `border-red-200`
  - Icon Background: `bg-red-500/15`
  - Icon Color: `text-red-600`
- Dark Mode:
  - Toast Background: `bg-red-950/90`
  - Toast Text: `text-red-50`
  - Toast Border: `border-red-500/20`
  - Icon Background: `bg-red-500/20`
  - Icon Color: `text-red-300`

**Info** (Blue):
- Light Mode:
  - Toast Background: `bg-blue-50`
  - Toast Text: `text-blue-900`
  - Toast Border: `border-blue-200`
  - Icon Background: `bg-blue-500/15`
  - Icon Color: `text-blue-600`
- Dark Mode:
  - Toast Background: `bg-blue-950/90`
  - Toast Text: `text-blue-50`
  - Toast Border: `border-blue-500/20`
  - Icon Background: `bg-blue-500/20`
  - Icon Color: `text-blue-300`

### Toast Card Style

```css
/* Dynamic based on variant and theme */
backdrop-filter: blur(xl)
box-shadow: 0 18px 60px rgba(0, 0, 0, 0.25)
border-radius: 12px (mobile) / 16px (desktop)
padding: 10px 12px (mobile) / 12px 16px (desktop)
```

### Width Configuration

| Size   | Desktop Max-Width | Tailwind Class  | Use Case                    |
|--------|-------------------|-----------------|------------------------------|
| `sm`   | 384px            | `sm:max-w-sm`   | Short messages              |
| `md`   | 448px            | `sm:max-w-md`   | Standard notifications (default) |
| `lg`   | 512px            | `sm:max-w-lg`   | Longer content              |
| `full` | 672px            | `sm:max-w-2xl`  | Maximum content display     |

**Mobile**: All toasts use `max-w-[calc(100%-2rem)]` for proper padding

## ✅ Best Practices

### Do's ✅

- Use appropriate variants for different message types
- Keep titles short and descriptive (max 50 characters)
- Use custom durations for important messages (longer) or quick updates (shorter)
- Test with multiple toasts to ensure stacking works correctly
- Use the hover effect to let users review multiple notifications

### Don'ts ❌

- Don't spam toasts - batch similar notifications
- Don't use very long messages (use modals for detailed content)
- Don't set duration to 0 unless you want permanent toasts
- Don't forget to render the ToastContainer component
- Don't use toasts for critical errors (use modals instead)

## ♿ Accessibility

The component is built with accessibility in mind:

- ✅ Close button includes `aria-label="Close notification"`
- ✅ Keyboard navigation - Close button is keyboard accessible
- ✅ Screen readers - Title and message are properly structured
- ✅ Focus management - Toasts don't trap focus
- ✅ Color contrast - All text meets WCAG AA standards

### Keyboard Shortcuts

- `Tab` - Navigate to close button
- `Enter` / `Space` - Close toast when button is focused
- `Click outside` - Does not close toast (by design)

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Details

### How It Works

1. **useToast Hook**: Manages toast state and provides helper methods
2. **ToastContainer**: Renders multiple toasts with stacking logic
3. **Toast Component**: Individual toast with animations
4. **Auto-dismiss**: Uses setTimeout for automatic removal
5. **Stacking**: Uses Motion's layout animations for smooth transitions
6. **Hover Detection**: Mouse enter/leave events trigger expansion

### Performance

- Uses GPU-accelerated transforms (translateY, scale)
- Minimal re-renders with proper state management
- Optimized with Motion's layout animations
- No layout thrashing
- Efficient cleanup with useEffect

## 📝 Notes

- Toasts require unique IDs for proper animation (auto-generated)
- The component uses `position: fixed` for positioning
- Backdrop uses `backdrop-blur` which requires browser support
- Maximum of 3 visible toasts by default (configurable)
- Hidden toasts are removed from DOM for performance

## 🤝 Contributing

Feel free to open issues or submit pull requests with improvements!

## 📄 License

MIT © Ankit Yadav

## 🙏 Credits

- Built with [Motion for React](https://motion.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Live Demo:** [View Demo](/craft)

**Documentation:** [Full Docs](/craft)
