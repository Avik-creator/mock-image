'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Code, Image, Globe, Sparkles, ArrowRight, Moon, Sun } from 'lucide-react'
import { ModeToggle } from '@/components/mode-toggle'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 sticky top-0 z-50">
        <div className="w-full flex items-center justify-center px-4">
          <div className="w-full max-w-7xl flex h-16 items-center justify-between">
            <div className="flex items-center gap-2 font-semibold text-lg">
              <span>{'</>'}</span>
              <span>Snippet</span>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/editor">
                <Button variant="ghost" size="sm">
                  Editor
                </Button>
              </Link>
              <div className="flex items-center gap-2">
            <ModeToggle />
          </div>
            </div>
            
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="w-full flex items-center justify-center px-4 pt-8 pb-12 md:pt-16 md:pb-24">
        <div className="w-full max-w-4xl text-center flex flex-col items-center justify-center">
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border bg-muted px-4 py-1.5 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            <span>Turn your code into beautiful images</span>
          </div>

          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl leading-tight">
            Create stunning code
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              screenshots
            </span>
          </h1>

          <p className="mb-10 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto leading-relaxed">
            A minimalist tool for turning your code, images, and websites into beautiful,
            shareable images. Perfect for documentation, social media, and presentations.
          </p>

          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center items-center">
            <Link href="/editor" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto shadow-lg hover:shadow-xl transition-shadow">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto border-2 hover:bg-accent/50 transition-colors"
              onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="w-full flex items-center justify-center px-4 py-20 md:py-32">
        <div className="w-full max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Everything you need
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Powerful features in a simple, elegant interface
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20">
                <Code className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Code Screenshots</h3>
              <p className="text-muted-foreground">
                Transform your code snippets into beautiful images with syntax highlighting,
                custom themes, and flexible styling options.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/20">
                <Image className="h-6 w-6 text-pink-600 dark:text-pink-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Image Editor</h3>
              <p className="text-muted-foreground">
                Upload and customize images with animations, backgrounds, and effects.
                Create engaging visual content effortlessly.
              </p>
            </div>

            <div className="rounded-lg border bg-card p-6">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20">
                <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-xl font-semibold">Website Screenshots</h3>
              <p className="text-muted-foreground">
                Capture screenshots of any website by URL. Perfect for showcasing web projects
                and creating documentation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full flex items-center justify-center px-4 py-20 md:py-32">
        <div className="w-full max-w-3xl rounded-2xl border bg-card p-8 md:p-12 text-center shadow-lg">
          <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to create?
          </h2>
          <p className="mb-8 text-lg text-muted-foreground">
            Start creating beautiful screenshots in seconds. No sign-up required.
          </p>
          <Link href="/editor">
            <Button size="lg" className="shadow-lg hover:shadow-xl transition-shadow">
              Open Editor
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t">
        <div className="w-full flex items-center justify-center px-4 py-12">
          <div className="w-full max-w-7xl flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="flex items-center gap-2 font-semibold">
              <span>{'</>'}</span>
              <span>Snippet</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Snippet. Built with Next.js and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}