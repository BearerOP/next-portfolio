'use client'

import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedContainer } from "@/components/ui/animated-container"

// export const metadata: Metadata = {
//   title: "Button Demo | Resources",
//   description: "Interactive demo of the Button component with various variants and states.",
// }

const variants = [
  { name: "Default", variant: "default" },
  { name: "Destructive", variant: "destructive" },
  { name: "Outline", variant: "outline" },
  { name: "Secondary", variant: "secondary" },
  { name: "Ghost", variant: "ghost" },
  { name: "Link", variant: "link" },
]

const sizes = ["default", "sm", "lg", "icon"]

export default function ButtonDemoPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedContainer className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Button Component</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A versatile button component with multiple variants, sizes, and states.
            Built with accessibility in mind and fully customizable.
          </p>
        </div>

        {/* Variants Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Variants</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {variants.map(({ name, variant }) => (
              <Card key={variant}>
                <CardHeader>
                  <CardTitle>{name}</CardTitle>
                  <CardDescription>Variant: {variant}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                  <Button variant={variant as any}>Button</Button>
                  <Button variant={variant as any} disabled>
                    Disabled
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Sizes Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Sizes</h2>
          <Card>
            <CardHeader>
              <CardTitle>Available Sizes</CardTitle>
              <CardDescription>From small to large, including icon-only variant</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">
              {sizes.map((size) => (
                <Button key={size} size={size as any}>
                  {size === "icon" ? "🔍" : `Size: ${size}`}
                </Button>
              ))}
            </CardContent>
          </Card>
        </section>

        {/* Interactive Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Interactive Example</h2>
          <Card>
            <CardHeader>
              <CardTitle>Try it out</CardTitle>
              <CardDescription>Click the buttons to see different states</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button>Click me</Button>
              <Button variant="outline">Hover me</Button>
              <Button variant="secondary">Focus me</Button>
              <Button variant="destructive">Press me</Button>
            </CardContent>
          </Card>
        </section>
      </AnimatedContainer>
    </div>
  )
} 