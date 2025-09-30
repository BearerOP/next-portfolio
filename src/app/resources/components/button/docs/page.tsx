'use client';

import { Metadata } from "next"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AnimatedContainer } from "@/components/ui/animated-container"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// export const metadata: Metadata = {
//   title: "Button Documentation | Resources",
//   description: "Complete documentation for the Button component including usage, props, and examples.",
// }

const codeExample = `import { Button } from "@/components/ui/button"

export function MyComponent() {
  return (
    <Button variant="default" size="default">
      Click me
    </Button>
  )
}`

export default function ButtonDocsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedContainer className="space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Button Documentation</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive guide to using the Button component in your projects.
          </p>
        </div>

        {/* Installation Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Installation</h2>
          <Card>
            <CardHeader>
              <CardTitle>Getting Started</CardTitle>
              <CardDescription>
                The Button component is part of the UI components library. Make sure you have the
                required dependencies installed.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                <code>npm install @radix-ui/react-slot</code>
              </pre>
            </CardContent>
          </Card>
        </section>

        {/* Usage Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Usage</h2>
          <Card>
            <CardHeader>
              <CardTitle>Basic Example</CardTitle>
              <CardDescription>
                Here&apos;s a simple example of how to use the Button component.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Button>Default Button</Button>
                <Button variant="outline">Outline Button</Button>
              </div>
              <pre className="p-4 bg-muted rounded-lg overflow-x-auto">
                <code>{codeExample}</code>
              </pre>
            </CardContent>
          </Card>
        </section>

        {/* Props Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Props</h2>
          <Card>
            <CardHeader>
              <CardTitle>Component Props</CardTitle>
              <CardDescription>
                The Button component accepts the following props:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">variant</h3>
                  <p className="text-sm text-muted-foreground">
                    The visual style of the button. Can be one of: default, destructive, outline,
                    secondary, ghost, or link.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">size</h3>
                  <p className="text-sm text-muted-foreground">
                    The size of the button. Can be one of: default, sm, lg, or icon.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">asChild</h3>
                  <p className="text-sm text-muted-foreground">
                    Whether to render the button as a child component. Useful for custom button
                    implementations.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Examples Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Examples</h2>
          <Tabs defaultValue="variants" className="space-y-4">
            <TabsList>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="sizes">Sizes</TabsTrigger>
              <TabsTrigger value="states">States</TabsTrigger>
            </TabsList>
            <TabsContent value="variants" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Button Variants</CardTitle>
                  <CardDescription>Different visual styles available</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                  <Button>Default</Button>
                  <Button variant="destructive">Destructive</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="secondary">Secondary</Button>
                  <Button variant="ghost">Ghost</Button>
                  <Button variant="link">Link</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="sizes" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Button Sizes</CardTitle>
                  <CardDescription>Available size options</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap items-center gap-4">
                  <Button size="sm">Small</Button>
                  <Button size="default">Default</Button>
                  <Button size="lg">Large</Button>
                  <Button size="icon">🔍</Button>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="states" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Button States</CardTitle>
                  <CardDescription>Different interactive states</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-wrap gap-4">
                  <Button>Normal</Button>
                  <Button disabled>Disabled</Button>
                  <Button className="opacity-50">Loading</Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </section>
      </AnimatedContainer>
    </div>
  )
} 