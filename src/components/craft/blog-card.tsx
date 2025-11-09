'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Tag } from "lucide-react"

interface BlogCardProps {
  title: string
  description: string
  date: string
  tags: string[]
  slug: string
}

export function BlogCard({ title, description, date, tags, slug }: BlogCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="line-clamp-2">{title}</CardTitle>
          <CardDescription className="line-clamp-2">{description}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Tag className="w-4 h-4" />
              <span>{tags.join(", ")}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link
            href={`/craft/blogs/${slug}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            Read more →
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
} 