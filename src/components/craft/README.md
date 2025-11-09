# Origin Aware Cards Component

A beautiful, interactive card component with origin-aware animations powered by Framer Motion.

![Demo](https://via.placeholder.com/800x400?text=Origin+Aware+Cards+Demo)

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)
- [Customization](#customization)
- [Accessibility](#accessibility)
- [Browser Support](#browser-support)
- [License](#license)

## 🎯 Overview

The Origin Aware Cards component creates smooth, visually engaging transitions when cards are clicked. It uses Framer Motion's `layoutId` feature to animate cards from their original position to a centered modal view, maintaining visual continuity throughout the animation.

## ✨ Features

- **Origin-aware animations** - Cards smoothly expand from their exact position
- **Customizable colors** - Set different colors for collapsed and expanded states
- **Dark mode support** - Fully styled for both light and dark themes
- **Keyboard accessible** - Full keyboard navigation with ESC to close
- **Responsive design** - Works seamlessly across all device sizes
- **Backdrop blur** - Elegant backdrop overlay with blur effect
- **TypeScript support** - Fully typed for better developer experience
- **Zero dependencies** - Only requires Framer Motion (which you probably already have)

## 📦 Installation

1. Ensure you have Framer Motion installed:

```bash
npm install framer-motion
# or
yarn add framer-motion
# or
pnpm add framer-motion
```

2. Copy the component file:

```bash
# Copy the component to your project
cp src/components/craft/origin-aware-cards.tsx your-project/components/
```

## 🚀 Usage

### Basic Usage

```tsx
import { OriginAwareCards } from "@/components/craft/origin-aware-cards";

export default function MyPage() {
  return (
    <div className="min-h-screen p-8">
      <OriginAwareCards />
    </div>
  );
}
```

### Custom Cards

```tsx
import { OriginAwareCards, Card } from "@/components/craft/origin-aware-cards";

const myCards: Card[] = [
  {
    id: 1,
    title: "Feature 1",
    description: "This is an amazing feature with lots of details",
    color: "bg-blue-200 dark:bg-blue-900",
    expandedColor: "bg-blue-400 dark:bg-blue-700",
  },
  {
    id: 2,
    title: "Feature 2",
    description: "Another great feature to showcase",
    color: "bg-purple-200 dark:bg-purple-900",
    expandedColor: "bg-purple-400 dark:bg-purple-700",
  },
];

export default function MyPage() {
  return <OriginAwareCards cards={myCards} />;
}
```

### With Custom Styling

```tsx
<OriginAwareCards
  cards={myCards}
  containerClassName="bg-gradient-to-br from-slate-200 to-slate-400"
  cardClassName="border-2 border-zinc-400 shadow-xl"
  expandedClassName="border-4 border-white shadow-2xl"
/>
```

## 📖 Props

### OriginAwareCards

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `cards` | `Card[]` | `defaultCards` | Array of card objects to display |
| `containerClassName` | `string` | `""` | Additional Tailwind classes for the container |
| `cardClassName` | `string` | `""` | Additional Tailwind classes for cards in collapsed state |
| `expandedClassName` | `string` | `""` | Additional Tailwind classes for expanded modal state |

### Card Interface

```typescript
interface Card {
  id: number;                // Unique identifier (required)
  title: string;             // Card title (required)
  description: string;       // Card description (required)
  color?: string;            // Tailwind classes for collapsed card
  expandedColor?: string;    // Tailwind classes for expanded modal
}
```

## 💡 Examples

### Product Tiers

```tsx
const productTiers = [
  {
    id: 1,
    title: "Starter",
    description: "Perfect for individuals and small projects",
    color: "bg-emerald-200 dark:bg-emerald-900",
    expandedColor: "bg-emerald-400 dark:bg-emerald-700",
  },
  {
    id: 2,
    title: "Professional",
    description: "For growing teams and businesses",
    color: "bg-blue-200 dark:bg-blue-900",
    expandedColor: "bg-blue-400 dark:bg-blue-700",
  },
  {
    id: 3,
    title: "Enterprise",
    description: "Custom solutions for large organizations",
    color: "bg-purple-200 dark:bg-purple-900",
    expandedColor: "bg-purple-400 dark:bg-purple-700",
  },
];
```

### Team Members

```tsx
const teamMembers = [
  {
    id: 1,
    title: "John Doe",
    description: "CEO & Founder - Leading the vision",
    color: "bg-cyan-200 dark:bg-cyan-900",
  },
  {
    id: 2,
    title: "Jane Smith",
    description: "CTO - Building the future",
    color: "bg-pink-200 dark:bg-pink-900",
  },
];
```

### Feature Highlights

```tsx
const features = [
  {
    id: 1,
    title: "⚡ Lightning Fast",
    description: "Optimized performance for instant load times",
  },
  {
    id: 2,
    title: "🔒 Secure by Default",
    description: "Enterprise-grade security built in",
  },
];
```

## 🎨 Customization

### Changing Container Background

```tsx
<OriginAwareCards
  containerClassName="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"
/>
```

### Adding Borders to Cards

```tsx
<OriginAwareCards
  cardClassName="border-4 border-dashed border-zinc-700"
/>
```

### Custom Expanded Modal Size

Modify the component directly or use `expandedClassName`:

```tsx
<OriginAwareCards
  expandedClassName="!w-[500px] !h-[500px]"
/>
```

### Animation Duration

Wrap in a LayoutGroup to control animation timing:

```tsx
import { LayoutGroup } from "framer-motion";

<LayoutGroup>
  <OriginAwareCards cards={myCards} />
</LayoutGroup>
```

## ♿ Accessibility

The component is built with accessibility in mind:

- ✅ Proper ARIA labels and roles
- ✅ Keyboard navigation (Tab, Enter, ESC)
- ✅ Focus management
- ✅ Semantic HTML (h1, h2)
- ✅ Screen reader friendly

### Keyboard Shortcuts

- `Tab` - Navigate between cards
- `Enter` - Open selected card
- `ESC` - Close expanded modal
- `Click outside` - Close modal

## 🌐 Browser Support

- ✅ Chrome (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Edge (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Details

### How It Works

1. Each card has a unique `layoutId` prop
2. When clicked, the card's state is stored
3. Framer Motion matches the `layoutId` between collapsed and expanded states
4. It automatically animates the position, size, and other properties
5. The backdrop appears with a fade animation
6. Clicking outside or pressing ESC reverses the animation

### Performance

- Uses GPU-accelerated transforms
- Minimal re-renders with proper state management
- Optimized with Framer Motion's layout animations
- No layout thrashing

## 📝 Notes

- Cards require unique IDs for proper animation
- Colors should be Tailwind CSS classes
- The component uses `position: fixed` for the modal
- Backdrop uses `backdrop-blur` which requires browser support

## 🤝 Contributing

Feel free to open issues or submit pull requests with improvements!

## 📄 License

MIT © Ankit Yadav

## 🙏 Credits

- Built with [Framer Motion](https://www.framer.com/motion/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)

---

**Live Demo:** [View Demo](/craft/demo/origin-aware-cards)

**Documentation:** [Full Docs](/docs/origin-aware-cards.mdx)
