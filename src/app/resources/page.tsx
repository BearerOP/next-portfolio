import { Metadata } from "next"
import { ComponentCard } from "@/components/resources/component-card"
import { BlogCard } from "@/components/resources/blog-card"
import { AnimatedContainer } from "@/components/ui/animated-container"

export const metadata: Metadata = {
  title: "Resources | Portfolio",
  description: "Explore components, blogs, and documentation for my portfolio projects.",
}

const sampleComponents = [
  {
    title: "Button",
    description: "A versatile button component with multiple variants and animations.",
    demoPath: "/resources/components/button/demo",
    docsPath: "/resources/components/button/docs",
    tags: ["react", "ui", "interactive"],
  },
  {
    title: "Modal",
    description: "Accessible modal dialog with focus trap and keyboard navigation.",
    demoPath: "/resources/components/modal/demo",
    docsPath: "/resources/components/modal/docs",
    tags: ["react", "ui", "accessibility"],
  },
  {
    title: "Tooltip",
    description: "Customizable tooltip component with positioning and animations.",
    demoPath: "/resources/components/tooltip/demo",
    docsPath: "/resources/components/tooltip/docs",
    tags: ["react", "ui", "interactive"],
  },
]

const sampleBlogs = [
  {
    title: "Why I ditched Passport for Google/GitHub OAuth in Node",
    description: "A deep dive into modern authentication strategies and why I chose to build my own OAuth solution.",
    date: "March 15, 2024",
    tags: ["node", "authentication", "oauth"],
    slug: "why-i-ditched-passport",
  },
  {
    title: "Image Upload to Cloudinary via React without Third-Party Libraries",
    description: "Learn how to implement direct image uploads to Cloudinary using React and the Fetch API.",
    date: "March 10, 2024",
    tags: ["react", "cloudinary", "upload"],
    slug: "image-upload-cloudinary",
  },
]

export default function ResourcesPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <AnimatedContainer className="space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">Resources</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore my collection of reusable components, technical blog posts, and interactive demos.
            Everything is open source and ready to use in your projects.
          </p>
        </div>

        {/* Components Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Components</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sampleComponents.map((component) => (
              <ComponentCard key={component.title} {...component} />
            ))}
          </div>
        </section>

        {/* Blog Section */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold tracking-tight">Blog Posts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sampleBlogs.map((blog) => (
              <BlogCard key={blog.slug} {...blog} />
            ))}
          </div>
        </section>
      </AnimatedContainer>
    </div>
  )
} 