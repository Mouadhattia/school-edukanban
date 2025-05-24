"use client"

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import {
  CheckCircle2,
  Users,
  Calendar,
  BarChart3,
  BookOpen,
  Award,
  ArrowRight,
  CheckCircle,
  Sparkles,
  GraduationCap,
} from "lucide-react"

// First, import the DemoVideoModal component and useState at the top of the file
import { useState } from "react"
import { DemoVideoModal } from "./demo-video-modal"

export function LandingPage() {
  // Then, inside the LandingPage component, add this state before the return statement:
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false)

  return (
   <div className="flex flex-col min-h-screen mx-auto max-w-screen-2xl">
      {/* Navigation */}
      <header className=" border-b bg-background sticky top-0 z-50">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <BookOpen className="h-6 w-6 text-primary" />
            <span>EduKanban</span>
          </div>
          <nav className="hidden md:flex gap-6">
            <Link href="#features" className="text-sm font-medium hover:underline underline-offset-4">
              Features
            </Link>
            <Link href="#benefits" className="text-sm font-medium hover:underline underline-offset-4">
              Benefits
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:underline underline-offset-4">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:underline underline-offset-4">
              Testimonials
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline">Log In</Button>
            </Link>
            <Link href="/signup">
              <Button>Sign Up</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
                  Transforming Education
                </div>
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Collaborate, Create, and <span className="text-primary">Transform</span> Education Together
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Join thousands of educators on EduKanban - the collaborative platform where curriculum designers,
                    teachers, and schools connect to create better learning experiences.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="px-8">
                      Get Started Free
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" className="px-8" onClick={() => setIsDemoModalOpen(true)}>
                    See Demo
                  </Button>
                </div>
                <div className="flex items-center gap-4 mt-4">
                  <div className="flex -space-x-2">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">
                      JD
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">
                      SR
                    </div>
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-xs text-primary font-medium">
                      KT
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Powering collaboration for 10,000+ educators and 500+ schools worldwide
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -top-4 -left-4 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
                  <div className="absolute -bottom-4 -right-4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                  <Image
                    src="/placeholder.svg?height=550&width=750"
                    width={550}
                    height={400}
                    alt="EduKanban Dashboard Preview"
                    className="rounded-lg object-cover border shadow-lg relative z-10"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Core Features</div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Built for Educational Collaboration</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Our platform brings together curriculum designers, teachers, and students in a seamless collaborative
                  environment.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-3">
              <Card className="border-2 border-primary/20 overflow-hidden group hover:border-primary/50 transition-all">
                <div className="h-1 bg-primary/50 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">School Storefronts</h3>
                  <p className="text-muted-foreground">
                    Schools create branded websites with customizable templates to showcase programs, faculty, and
                    student achievements.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20 overflow-hidden group hover:border-primary/50 transition-all">
                <div className="h-1 bg-primary/50 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <Calendar className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">Curriculum Marketplace</h3>
                  <p className="text-muted-foreground">
                    Browse, purchase, and instantly access ready-made lesson plans, digital courses, and educational
                    materials.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary/20 overflow-hidden group hover:border-primary/50 transition-all">
                <div className="h-1 bg-primary/50 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                  <div className="p-2 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">On-Demand Learning</h3>
                  <p className="text-muted-foreground">
                    Students discover courses by subject or skill level, while schools can order custom curriculum
                    designs.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Marketplace Highlight Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="relative flex items-center justify-center lg:order-last">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
                <Image
                  src="/placeholder.svg?height=550&width=750"
                  width={550}
                  height={400}
                  alt="Curriculum Marketplace"
                  className="rounded-xl object-cover shadow-lg relative z-10 border border-muted"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
                  Marketplace
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Curriculum Marketplace</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Our digital marketplace connects curriculum designers with educators. Browse, purchase, and
                    instantly access ready-made lesson plans, digital courses, and educational materials.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span>Sell your curriculum and teaching materials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span>Purchase ready-made lesson plans and save time</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span>Instant delivery of digital educational resources</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span>Bundle offerings (e.g., "STEM Package for Grade 5")</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/marketplace">
                    <Button size="lg" className="group">
                      Explore Marketplace
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/sell">
                    <Button size="lg" variant="outline">
                      Start Selling
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* School Storefront Section */}
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[500px_1fr] lg:gap-12 xl:grid-cols-[550px_1fr]">
              <div className="relative flex items-center justify-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
                <Image
                  src="/placeholder.svg?height=550&width=750"
                  width={550}
                  height={400}
                  alt="School Storefront"
                  className="rounded-xl object-cover shadow-lg relative z-10 border border-muted"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
                  School Websites
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">School Storefronts</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Schools can create their own branded websites with customizable templates to showcase programs,
                    faculty, and student work - just like Shopify for businesses.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span>Customizable templates for different education levels</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span>Integrated payment gateways for tuition and donations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span>Showcase programs, faculty, and student achievements</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span>Built-in analytics to track engagement and conversions</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/templates">
                    <Button size="lg" className="group">
                      Browse Templates
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Button size="lg" variant="outline" onClick={() => setIsDemoModalOpen(true)}>
                    Watch Demo
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Collaboration Features Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted/50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="relative flex items-center justify-center lg:order-last">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary/5 rounded-full blur-3xl"></div>
                <Image
                  src="/placeholder.svg?height=550&width=750"
                  width={550}
                  height={400}
                  alt="Collaboration Features"
                  className="rounded-xl object-cover shadow-lg relative z-10 border border-muted"
                />
              </div>
              <div className="flex flex-col justify-center space-y-4">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary w-fit">
                  Collaboration
                </div>
                <div className="space-y-2">
                  <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Real-Time Collaboration</h2>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Work together seamlessly with your team. Create, share, and improve curriculum with powerful
                    collaboration tools designed specifically for education.
                  </p>
                </div>
                <ul className="grid gap-2 py-4">
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span>Real-time board sharing and editing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span>Comment and feedback system on tasks</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span>Version history for curriculum templates</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <div className="rounded-full bg-primary/10 p-1">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                    </div>
                    <span>Team workspaces with customizable permissions</span>
                  </li>
                </ul>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/signup">
                    <Button size="lg" className="group">
                      Start Collaborating
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/templates">
                    <Button size="lg" variant="outline">
                      Explore Templates
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Role-Based Benefits */}
        <section id="benefits" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">For Everyone</div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Benefits for Everyone</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  EduKanban is designed to support all educational stakeholders with role-specific features.
                </p>
              </div>
            </div>
            <div className="grid gap-8 px-4 md:px-6 lg:grid-cols-3 lg:gap-12 mt-12">
              <Card className="border-none shadow-lg bg-gradient-to-br from-background to-muted">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">For Teachers</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Reduce administrative workload</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Track student progress at a glance</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Create reusable curriculum templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Provide timely feedback to students</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Sell your curriculum and teaching materials</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Collaborate with other educators on curriculum</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg bg-gradient-to-br from-background to-muted">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">For Students</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Visualize assignment progress</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Never miss a deadline with clear tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Submit work directly through the platform</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Receive immediate feedback on submissions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Discover courses by subject or skill level</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              <Card className="border-none shadow-lg bg-gradient-to-br from-background to-muted">
                <CardContent className="p-6 space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold">For Administrators</h3>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Oversee all classroom activities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Generate comprehensive reports</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Manage teacher and student accounts</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Implement standardized curriculum templates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Create branded school websites</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Foster collaboration between departments</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Loved by Educators</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  See what teachers and administrators are saying about EduKanban.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <Card className="border-2 border-muted relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-primary/10"></div>
                      <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <p className="italic text-center">
                    "EduKanban has transformed how I organize my classroom. My students are more engaged and I spend
                    less time on administrative tasks."
                  </p>
                  <div className="text-center">
                    <p className="font-medium">Sarah Johnson</p>
                    <p className="text-sm text-muted-foreground">High School English Teacher</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-primary relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-primary/10"></div>
                      <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <p className="italic text-center">
                    "As a curriculum designer, EduKanban has revolutionized how I collaborate with schools. I can create
                    templates once and share them with thousands of teachers, getting valuable feedback to improve my
                    materials."
                  </p>
                  <div className="text-center">
                    <p className="font-medium">David Wilson</p>
                    <p className="text-sm text-muted-foreground">Curriculum Designer & Educational Consultant</p>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-2 border-muted relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-full h-1 bg-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
                <CardContent className="p-6 space-y-4">
                  <div className="flex justify-center mb-4">
                    <div className="relative">
                      <div className="w-16 h-16 rounded-full bg-primary/10"></div>
                      <div className="absolute -bottom-1 -right-1 bg-primary text-white rounded-full p-1">
                        <CheckCircle className="h-4 w-4" />
                      </div>
                    </div>
                  </div>
                  <p className="italic text-center">
                    "I love being able to see all my assignments in one place. The visual layout helps me prioritize my
                    work and stay on track."
                  </p>
                  <div className="text-center">
                    <p className="font-medium">Emma Chen</p>
                    <p className="text-sm text-muted-foreground">Middle School Student</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="w-full py-12 md:py-24 lg:py-32 bg-muted/40">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Pricing</div>
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">Simple, Transparent Pricing</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl">
                  Choose the plan that's right for your school or district.
                </p>
              </div>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mt-12">
              <Card className="border-2 border-muted flex flex-col">
                <CardContent className="p-6 flex-1">
                  <div className="space-y-2 mb-4">
                    <h3 className="text-2xl font-bold">Free</h3>
                    <p className="text-muted-foreground">For individual teachers</p>
                  </div>
                  <div className="text-4xl font-bold mb-4">$0</div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Up to 3 Kanban boards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Basic assignment tracking</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Up to 30 students</span>
                    </li>
                  </ul>
                  <Button className="w-full mt-auto" variant="outline">
                    Get Started
                  </Button>
                </CardContent>
              </Card>
              <Card className="border-2 border-muted flex flex-col">
                <CardContent className="p-6 flex-1">
                  <div className="space-y-2 mb-4">
                    <h3 className="text-2xl font-bold">Enterprise</h3>
                    <p className="text-muted-foreground">For districts and organizations</p>
                  </div>
                  <div className="text-4xl font-bold mb-4">Custom</div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Everything in Pro</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Custom integrations</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>Dedicated account manager</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>On-premise deployment option</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                      <span>SLA guarantees</span>
                    </li>
                  </ul>
                  <Button
                    className="w-full mt-auto"
                    variant="outline"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Contact Sales
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
                  Join Our Collaborative Education Community
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Whether you're a curriculum designer looking to share your expertise, a teacher seeking better tools,
                  or a school wanting to improve collaboration - become part of our growing community today.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link href="/signup">
                  <Button size="lg" className="px-8 group">
                    Join Our Community
                    <Sparkles className="ml-2 h-4 w-4 transition-all group-hover:rotate-12" />
                  </Button>
                </Link>
                <Link href="/partners">
                  <Button size="lg" variant="outline" className="px-8">
                    Become a Collaborator
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
     

      {/* Footer */}
      <footer className="border-t bg-muted/40">
        <div className="container flex flex-col gap-6 py-8 md:py-12 px-4 md:px-6">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5">
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Product</h3>
              <Link href="#features" className="text-sm text-muted-foreground hover:underline">
                Features
              </Link>
              <Link href="#pricing" className="text-sm text-muted-foreground hover:underline">
                Pricing
              </Link>
              <Link href="/marketplace" className="text-sm text-muted-foreground hover:underline">
                Marketplace
              </Link>
              <Link href="/templates" className="text-sm text-muted-foreground hover:underline">
                Templates
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Resources</h3>
              <Link href="/help" className="text-sm text-muted-foreground hover:underline">
                Documentation
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:underline">
                Blog
              </Link>
              <Link href="/tutorials" className="text-sm text-muted-foreground hover:underline">
                Tutorials
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
                Support
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Company</h3>
              <Link href="/about" className="text-sm text-muted-foreground hover:underline">
                About
              </Link>
              <Link href="/careers" className="text-sm text-muted-foreground hover:underline">
                Careers
              </Link>
              <Link href="/contact" className="text-sm text-muted-foreground hover:underline">
                Contact
              </Link>
              <Link href="/partners" className="text-sm text-muted-foreground hover:underline">
                Partners
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="text-lg font-medium">Legal</h3>
              <Link href="/privacy" className="text-sm text-muted-foreground hover:underline">
                Privacy
              </Link>
              <Link href="/terms" className="text-sm text-muted-foreground hover:underline">
                Terms
              </Link>
              <Link href="/security" className="text-sm text-muted-foreground hover:underline">
                Security
              </Link>
              <Link href="/accessibility" className="text-sm text-muted-foreground hover:underline">
                Accessibility
              </Link>
            </div>
            <div className="flex flex-col gap-2 md:col-span-2 lg:col-span-1">
              <h3 className="text-lg font-medium">Subscribe to our newsletter</h3>
              <p className="text-sm text-muted-foreground">Get the latest updates and educational resources.</p>
              <form className="flex gap-2 mt-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
                <Button type="submit" size="sm">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row items-center justify-between">
            <div className="flex items-center gap-2 font-bold text-xl">
              <BookOpen className="h-6 w-6 text-primary" />
              <span>EduKanban</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} EduKanban. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
      <DemoVideoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
    </div>
  )
}
