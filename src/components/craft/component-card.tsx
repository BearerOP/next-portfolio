'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Eye, BookOpen } from "lucide-react"

interface ComponentCardProps {
  title: string
  description: string
  demoPath: string
  docsPath: string
  tags?: string[]
}

export function ComponentCard({ title, description, demoPath, docsPath, tags }: ComponentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent>
          {tags && (
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs rounded-full bg-secondary text-secondary-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link href={demoPath}>
              <Eye className="w-4 h-4 mr-2" />
              View Demo
            </Link>
          </Button>
          <Button variant="outline" size="sm" asChild>
            <Link href={docsPath}>
              <BookOpen className="w-4 h-4 mr-2" />
              Read Docs
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
} 