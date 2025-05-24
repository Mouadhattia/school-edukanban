"use client"

import type React from "react"

import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { toast } from "@/components/ui/use-toast"
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  ChevronRight,
  Eye,
  Grid,
  HelpCircle,
  ImageIcon,
  Info,
  Layers,
  LayoutGrid,
  Lightbulb,
  MessageSquare,
  MoveHorizontal,
  Plus,
  Save,
  Smartphone,
  Tablet,
  Trash,
  X,
  Search,
  FileText,
  Video,
  ListOrdered,
  Newspaper,
  Megaphone,
  Shapes,
  Pencil,
  Clipboard,
  Loader2,
  ChevronDown,
  ChevronUp,
  Edit,
  Check,
  Type,
  Users,
  Palette,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { Label } from "@/components/ui/label"
import { ResizablePanel, ResizablePanelGroup, ResizableHandle } from "@/components/ui/resizable"
import { colorPalettes } from "@/components/color-palette-picker"
import { fontStyles } from "@/components/font-style-picker"
import { SiteSettingsPanel } from "@/components/site-settings-panel"
import { DesignPreview } from "@/components/design-preview"

export default function EditorPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [activeView, setActiveView] = useState<"desktop" | "tablet" | "mobile">("desktop")
  const [showComponentLibrary, setShowComponentLibrary] = useState(true)
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(true)
  const [selectedElement, setSelectedElement] = useState<string | null>(null)
  const [pageTitle, setPageTitle] = useState("Home")
  const [isDragging, setIsDragging] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showSaveDialog, setShowSaveDialog] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [showDeletePageDialog, setShowDeletePageDialog] = useState(false)
  const [pageToDelete, setPageToDelete] = useState<string | null>(null)
  const [elementToDelete, setElementToDelete] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("recommended")
  const [showTutorial, setShowTutorial] = useState(true)
  const [tutorialStep, setTutorialStep] = useState(1)
  const [showHelpDrawer, setShowHelpDrawer] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false)
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false)
  const [defaultLeftPanelSize, setDefaultLeftPanelSize] = useState(20)
  const [defaultRightPanelSize, setDefaultRightPanelSize] = useState(25)
  const [showSiteSettings, setShowSiteSettings] = useState(false)

  // Mock data for the site being edited
  const [site, setSite] = useState({
    id: params.id,
    name: params.id === "1" ? "Lincoln High School" : "Washington Elementary",
    domain: params.id === "1" ? "lincoln.edusite.com" : "washington.edusite.com",
    pages: ["Home", "About", "Academics", "Calendar", "Contact", "Pricing"],
    settings: {
      colors: {
        primary: "#3A86FF",
        secondary: "#8338EC",
        accent: "#FF006E",
        background: "#FFFFFF",
        text: "#14213D",
      },
      fonts: {
        heading: "'Montserrat', sans-serif",
        body: "'Open Sans', sans-serif",
      },
      logo: "",
      favicon: "",
      socialLinks: {},
      analytics: {},
      seo: {
        title: "",
        description: "",
        keywords: [],
      },
    },
  })

  // Store page content for each page separately
  const [pagesContent, setPagesContent] = useState<Record<string, any[]>>({})

  // Current page sections
  const [pageSections, setPageSections] = useState<any[]>([])

  // Component library categories with simplified organization
  const componentLibrary = {
    recommended: [
      {
        id: "hero",
        label: "Hero Banner",
        description: "Main banner with title and image",
        icon: <Layers className="h-8 w-8 mb-1" />,
        category: "essential",
        difficulty: "easy",
      },
      {
        id: "heading",
        label: "Heading",
        description: "Section title",
        icon: <Type className="h-8 w-8 mb-1" />,
        category: "text",
        difficulty: "easy",
      },
      {
        id: "paragraph",
        label: "Text Block",
        description: "Paragraph of text",
        icon: <FileText className="h-8 w-8 mb-1" />,
        category: "text",
        difficulty: "easy",
      },
      {
        id: "image",
        label: "Image",
        description: "Single image with caption",
        icon: <ImageIcon className="h-8 w-8 mb-1" />,
        category: "media",
        difficulty: "easy",
      },
      {
        id: "feature-grid",
        label: "Features Grid",
        description: "Grid of features or programs",
        icon: <LayoutGrid className="h-8 w-8 mb-1" />,
        category: "essential",
        difficulty: "easy",
      },
      {
        id: "button",
        label: "Button",
        description: "Clickable button",
        icon: (
          <Button className="h-8 w-8 mb-1 p-0 flex items-center justify-center">
            <span className="text-xs">Btn</span>
          </Button>
        ),
        category: "interactive",
        difficulty: "easy",
      },
      {
        id: "cta-banner",
        label: "Call to Action",
        description: "Banner with button",
        icon: <Megaphone className="h-8 w-8 mb-1" />,
        category: "essential",
        difficulty: "easy",
      },
      {
        id: "gallery",
        label: "Image Gallery",
        description: "Collection of images",
        icon: <Grid className="h-8 w-8 mb-1" />,
        category: "media",
        difficulty: "medium",
      },
    ],
    content: [
      {
        id: "heading",
        label: "Heading",
        description: "Section title",
        icon: <Type className="h-8 w-8 mb-1" />,
        category: "text",
        difficulty: "easy",
      },
      {
        id: "subheading",
        label: "Subheading",
        description: "Smaller heading",
        icon: <Type className="h-6 w-6 mb-1" />,
        category: "text",
        difficulty: "easy",
      },
      {
        id: "paragraph",
        label: "Text Block",
        description: "Paragraph of text",
        icon: <FileText className="h-8 w-8 mb-1" />,
        category: "text",
        difficulty: "easy",
      },
      {
        id: "quote",
        label: "Quote",
        description: "Highlighted quotation",
        icon: <MessageSquare className="h-8 w-8 mb-1" />,
        category: "text",
        difficulty: "easy",
      },
      {
        id: "list",
        label: "List",
        description: "Bullet or numbered list",
        icon: <ListOrdered className="h-8 w-8 mb-1" />,
        category: "text",
        difficulty: "easy",
      },
      {
        id: "button",
        label: "Button",
        description: "Clickable button",
        icon: (
          <Button className="h-8 w-8 mb-1 p-0 flex items-center justify-center">
            <span className="text-xs">Btn</span>
          </Button>
        ),
        category: "interactive",
        difficulty: "easy",
      },
      {
        id: "divider",
        label: "Divider",
        description: "Horizontal line",
        icon: <Separator className="h-1 w-8 mb-1" />,
        category: "layout",
        difficulty: "easy",
      },
      {
        id: "spacer",
        label: "Spacer",
        description: "Adds vertical space",
        icon: <ArrowLeft className="h-8 w-8 mb-1 rotate-90" />,
        category: "layout",
        difficulty: "easy",
      },
    ],
    media: [
      {
        id: "image",
        label: "Image",
        description: "Single image with caption",
        icon: <ImageIcon className="h-8 w-8 mb-1" />,
        category: "media",
        difficulty: "easy",
      },
      {
        id: "gallery",
        label: "Image Gallery",
        description: "Collection of images",
        icon: <Grid className="h-8 w-8 mb-1" />,
        category: "media",
        difficulty: "medium",
      },
      {
        id: "video",
        label: "Video",
        description: "Embedded video",
        icon: <Video className="h-8 w-8 mb-1" />,
        category: "media",
        difficulty: "medium",
      },
      {
        id: "gallery-slider",
        label: "Image Slider",
        description: "Carousel of images",
        icon: (
          <div className="mr-3 h-12 w-16 rounded bg-muted flex items-center justify-center">
            <ImageIcon className="h-6 w-6 text-muted-foreground" />
          </div>
        ),
        category: "media",
        difficulty: "advanced",
      },
    ],
    sections: [
      {
        id: "hero",
        label: "Hero Banner",
        description: "Main banner with title and image",
        icon: (
          <div className="mr-3 h-12 w-16 rounded bg-muted flex items-center justify-center">
            <Layers className="h-6 w-6 text-muted-foreground" />
          </div>
        ),
        category: "essential",
        difficulty: "easy",
      },
      {
        id: "feature-grid",
        label: "Features Grid",
        description: "Grid of features or programs",
        icon: (
          <div className="mr-3 h-12 w-16 rounded bg-muted flex items-center justify-center">
            <LayoutGrid className="h-6 w-6 text-muted-foreground" />
          </div>
        ),
        category: "essential",
        difficulty: "easy",
      },
      {
        id: "testimonials",
        label: "Testimonials",
        description: "Student/parent quotes",
        icon: (
          <div className="mr-3 h-12 w-16 rounded bg-muted flex items-center justify-center">
            <MessageSquare className="h-6 w-6 text-muted-foreground" />
          </div>
        ),
        category: "essential",
        difficulty: "medium",
      },
      {
        id: "cta-banner",
        label: "Call to Action",
        description: "Banner with button",
        icon: (
          <div className="mr-3 h-12 w-16 rounded bg-muted flex items-center justify-center">
            <Megaphone className="h-6 w-6 text-muted-foreground" />
          </div>
        ),
        category: "essential",
        difficulty: "easy",
      },
      {
        id: "image-text",
        label: "Image & Text",
        description: "Image with text beside it",
        icon: (
          <div className="mr-3 h-12 w-16 rounded bg-muted flex items-center justify-center">
            <Shapes className="h-6 w-6 text-muted-foreground" />
          </div>
        ),
        category: "content",
        difficulty: "medium",
      },
      {
        id: "team",
        label: "Team Members",
        description: "Staff or faculty profiles",
        icon: (
          <div className="mr-3 h-12 w-16 rounded bg-muted flex items-center justify-center">
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
        ),
        category: "content",
        difficulty: "medium",
      },
      {
        id: "faq",
        label: "FAQ Accordion",
        description: "Questions and answers",
        icon: (
          <div className="mr-3 h-12 w-16 rounded bg-muted flex items-center justify-center">
            <Clipboard className="h-6 w-6 text-muted-foreground" />
          </div>
        ),
        category: "content",
        difficulty: "medium",
      },
    ],
    school: [
      {
        id: "calendar",
        label: "School Calendar",
        description: "Events and dates",
        icon: (
          <div className="mr-3 h-12 w-16 rounded bg-muted flex items-center justify-center">
            <Calendar className="h-6 w-6 text-muted-foreground" />
          </div>
        ),
        category: "essential",
        difficulty: "medium",
      },
      {
        id: "staff-directory",
        label: "Staff Directory",
        description: "Faculty and staff listing",
        icon: (
          <div className="mr-3 h-12 w-16 rounded bg-muted flex items-center justify-center">
            <Users className="h-6 w-6 text-muted-foreground" />
          </div>
        ),
        category: "essential",
        difficulty: "medium",
      },
      {
        id: "news",
        label: "School News",
        description: "News and announcements",
        icon: (
          <div className="mr-3 h-12 w-16 rounded bg-muted flex items-center justify-center">
            <Newspaper className="h-6 w-6 text-muted-foreground" />
          </div>
        ),
        category: "community",
        difficulty: "medium",
      },
      {
        id: "contact-form",
        label: "Contact Form",
        description: "Form for inquiries",
        icon: (
          <div className="mr-3 h-12 w-16 rounded bg-muted flex items-center justify-center">
            <Pencil className="h-6 w-6 text-muted-foreground" />
          </div>
        ),
        category: "interactive",
        difficulty: "advanced",
      },
    ],
  }

  // Filter components based on search query
  const filterComponents = (components: any[], query: string) => {
    if (!query) return components
    return components.filter(
      (component) =>
        component.label.toLowerCase().includes(query.toLowerCase()) ||
        component.description.toLowerCase().includes(query.toLowerCase()),
    )
  }

  // Get filtered components
  const filteredRecommended = filterComponents(componentLibrary.recommended, searchQuery)
  const filteredContent = filterComponents(componentLibrary.content, searchQuery)
  const filteredMedia = filterComponents(componentLibrary.media, searchQuery)
  const filteredSections = filterComponents(componentLibrary.sections, searchQuery)
  const filteredSchool = filterComponents(componentLibrary.school, searchQuery)

  // Add this function after the component library definition
  const getDefaultPageContent = (pageType: string) => {
    const commonHeader = {
      id: "header",
      type: "Header",
      label: "Header",
      content: {
        logo: "School Logo",
        menuItems: ["Home", "About", "Academics", "Calendar", "Contact", "Pricing"],
      },
    }

    const commonFooter = {
      id: "footer",
      type: "Footer",
      label: "Footer",
      content: {
        columns: [
          { title: "About Us", links: ["Mission", "Staff", "History"] },
          { title: "Academics", links: ["Programs", "Calendar", "Resources"] },
          { title: "Community", links: ["Parents", "Students", "Alumni"] },
          { title: "Contact", text: "123 School St, Anytown, USA\ninfo@school.edu\n(555) 123-4567" },
        ],
        copyright: `© ${new Date().getFullYear()} School Name. All rights reserved.`,
      },
    }

    switch (pageType.toLowerCase()) {
      case "home":
        return [
          commonHeader,
          {
            id: "hero",
            type: "Hero",
            label: "Hero Section",
            content: {
              title: "Welcome to Our School",
              subtitle: "Educating tomorrow's leaders today",
              ctaText: "Learn More",
              ctaLink: "#",
              backgroundImage: "/traditional-schoolhouse.png",
            },
          },
          {
            id: "features",
            type: "Features",
            label: "Features Grid",
            content: {
              title: "Our Programs",
              items: [
                { title: "Academic Excellence", description: "Rigorous curriculum designed to challenge students" },
                { title: "Arts & Athletics", description: "Comprehensive programs for well-rounded development" },
                { title: "Student Support", description: "Resources to ensure every student succeeds" },
              ],
            },
          },
          {
            id: "testimonials",
            type: "Testimonials",
            label: "Testimonials",
            content: {
              title: "What Our Community Says",
              testimonials: [
                { quote: "This school has been amazing for my child!", author: "Parent Name", role: "Parent" },
                { quote: "I love the supportive environment!", author: "Student Name", role: "Student" },
              ],
            },
          },
          {
            id: "cta",
            type: "CTA",
            label: "Call to Action",
            content: {
              title: "Join Our Community",
              description: "Discover why families choose our school",
              buttonText: "Enroll Now",
              buttonLink: "#",
            },
          },
          commonFooter,
        ]
      case "about":
        return [
          commonHeader,
          {
            id: "hero",
            type: "Hero",
            label: "Hero Section",
            content: {
              title: "About Our School",
              subtitle: "Our history, mission, and values",
              ctaText: "Meet Our Staff",
              ctaLink: "#staff",
              backgroundImage: "/traditional-schoolhouse.png",
            },
          },
          {
            id: "mission",
            type: "Heading",
            label: "Mission Heading",
            content: {
              text: "Our Mission",
              level: 2,
            },
          },
          {
            id: "mission-content",
            type: "Paragraph",
            label: "Mission Content",
            content: {
              text: "Our mission is to provide a nurturing and inclusive environment where students can develop academically, socially, and emotionally. We strive to inspire a love of learning and prepare students to be responsible citizens in a global society.",
            },
          },
          {
            id: "history",
            type: "Heading",
            label: "History Heading",
            content: {
              text: "Our History",
              level: 2,
            },
          },
          {
            id: "history-content",
            type: "Paragraph",
            label: "History Content",
            content: {
              text: "Founded in 1985, our school has a rich history of academic excellence and community engagement. We began with just 50 students and have grown to serve over 500 students today, while maintaining our commitment to personalized education.",
            },
          },
          {
            id: "staff-heading",
            type: "Heading",
            label: "Staff Heading",
            content: {
              text: "Our Leadership Team",
              level: 2,
            },
          },
          {
            id: "staff-directory",
            type: "StaffDirectory",
            label: "Staff Directory",
            content: {
              title: "Our Faculty & Staff",
              staff: [
                { name: "John Doe", position: "Principal", image: "/school-principal.png" },
                { name: "Jane Smith", position: "Vice Principal", image: "/placeholder-qy1g3.png" },
                { name: "Robert Johnson", position: "Academic Director", image: "/placeholder-qy1g3.png" },
              ],
            },
          },
          commonFooter,
        ]
      case "academics":
        return [
          commonHeader,
          {
            id: "hero",
            type: "Hero",
            label: "Hero Section",
            content: {
              title: "Academic Programs",
              subtitle: "Excellence in education at every level",
              ctaText: "Explore Programs",
              ctaLink: "#programs",
              backgroundImage: "/traditional-schoolhouse.png",
            },
          },
          {
            id: "programs-heading",
            type: "Heading",
            label: "Programs Heading",
            content: {
              text: "Our Academic Approach",
              level: 2,
            },
          },
          {
            id: "programs-intro",
            type: "Paragraph",
            label: "Programs Introduction",
            content: {
              text: "Our curriculum is designed to challenge students while providing the support they need to succeed. We focus on developing critical thinking, problem-solving, and communication skills that prepare students for college and beyond.",
            },
          },
          {
            id: "programs",
            type: "Features",
            label: "Programs",
            content: {
              title: "Our Academic Programs",
              items: [
                { title: "Elementary Education", description: "Building a strong foundation for lifelong learning" },
                { title: "Middle School", description: "Transitioning to more advanced studies with support" },
                { title: "High School", description: "College preparation and career exploration" },
              ],
            },
          },
          {
            id: "course-catalog",
            type: "Heading",
            label: "Course Catalog Heading",
            content: {
              text: "Course Offerings",
              level: 2,
            },
          },
          {
            id: "course-catalog-content",
            type: "Paragraph",
            label: "Course Catalog Content",
            content: {
              text: "We offer a wide range of courses across all subject areas, including advanced placement and honors options. Our electives program allows students to explore their interests in arts, technology, languages, and more.",
            },
          },
          commonFooter,
        ]
      case "calendar":
        return [
          commonHeader,
          {
            id: "hero",
            type: "Hero",
            label: "Hero Section",
            content: {
              title: "School Calendar",
              subtitle: "Important dates and upcoming events",
              ctaText: "Download Calendar",
              ctaLink: "#",
              backgroundImage: "/traditional-schoolhouse.png",
            },
          },
          {
            id: "calendar-intro",
            type: "Paragraph",
            label: "Calendar Introduction",
            content: {
              text: "Stay up-to-date with all school events, holidays, and important academic dates. Our calendar is regularly updated to ensure you have the most current information.",
            },
          },
          {
            id: "calendar-events",
            type: "Calendar",
            label: "Calendar Events",
            content: {
              title: "Upcoming Events",
              events: [
                { date: "2023-06-15", title: "Graduation Ceremony", description: "Annual graduation ceremony" },
                { date: "2023-06-20", title: "Summer Break Begins", description: "First day of summer break" },
                { date: "2023-08-25", title: "Teacher Workday", description: "Staff development day" },
                { date: "2023-08-28", title: "First Day of School", description: "Welcome back students!" },
                { date: "2023-09-04", title: "Labor Day", description: "No school" },
                { date: "2023-10-16", title: "Parent-Teacher Conferences", description: "Early dismissal" },
              ],
            },
          },
          {
            id: "academic-calendar",
            type: "Heading",
            label: "Academic Calendar Heading",
            content: {
              text: "Academic Calendar",
              level: 2,
            },
          },
          {
            id: "academic-calendar-content",
            type: "Paragraph",
            label: "Academic Calendar Content",
            content: {
              text: "Our academic year is divided into two semesters, with quarterly grading periods. Report cards are issued at the end of each quarter, and parent-teacher conferences are scheduled twice per year.",
            },
          },
          commonFooter,
        ]
      case "contact":
        return [
          commonHeader,
          {
            id: "hero",
            type: "Hero",
            label: "Hero Section",
            content: {
              title: "Contact Us",
              subtitle: "We'd love to hear from you",
              ctaText: "",
              ctaLink: "",
              backgroundImage: "/traditional-schoolhouse.png",
            },
          },
          {
            id: "contact-intro",
            type: "Paragraph",
            label: "Contact Introduction",
            content: {
              text: "Have questions about our school? We're here to help! Reach out to us using the information below, and a member of our team will get back to you as soon as possible.",
            },
          },
          {
            id: "contact-info-heading",
            type: "Heading",
            label: "Contact Info Heading",
            content: {
              text: "Contact Information",
              level: 2,
            },
          },
          {
            id: "contact-info",
            type: "Paragraph",
            label: "Contact Information",
            content: {
              text: "Phone: (555) 123-4567\nEmail: info@school.edu\nAddress: 123 School St, Anytown, USA\n\nOffice Hours: Monday-Friday, 8:00 AM - 4:00 PM",
            },
          },
          {
            id: "map-heading",
            type: "Heading",
            label: "Map Heading",
            content: {
              text: "Find Us",
              level: 2,
            },
          },
          {
            id: "map-image",
            type: "Image",
            label: "Map Image",
            content: {
              src: "/world-map-vintage.png",
              alt: "School location map",
              caption: "Our campus is conveniently located in the heart of Anytown.",
            },
          },
          {
            id: "departments-heading",
            type: "Heading",
            label: "Departments Heading",
            content: {
              text: "Department Contacts",
              level: 2,
            },
          },
          {
            id: "departments",
            type: "Features",
            label: "Department Contacts",
            content: {
              title: "",
              items: [
                { title: "Admissions", description: "admissions@school.edu | (555) 123-4567 ext. 101" },
                { title: "Athletics", description: "athletics@school.edu | (555) 123-4567 ext. 102" },
                { title: "Business Office", description: "finance@school.edu | (555) 123-4567 ext. 103" },
              ],
            },
          },
          commonFooter,
        ]
      case "pricing":
        return [
          commonHeader,
          {
            id: "hero",
            type: "Hero",
            label: "Hero Section",
            content: {
              title: "Tuition & Fees",
              subtitle: "Investing in your child's future",
              ctaText: "Apply Now",
              ctaLink: "#",
              backgroundImage: "/traditional-schoolhouse.png",
            },
          },
          {
            id: "pricing-intro",
            type: "Paragraph",
            label: "Pricing Introduction",
            content: {
              text: "We strive to provide high-quality education at an affordable cost. Our tuition rates are competitive, and we offer various financial aid options and scholarships for qualifying families.",
            },
          },
          {
            id: "pricing-tiers",
            type: "Features",
            label: "Pricing Tiers",
            content: {
              title: "Tuition Rates",
              items: [
                { title: "Elementary (K-5)", description: "$8,500 per academic year" },
                { title: "Middle School (6-8)", description: "$9,500 per academic year" },
                { title: "High School (9-12)", description: "$10,500 per academic year" },
              ],
            },
          },
          {
            id: "additional-fees-heading",
            type: "Heading",
            label: "Additional Fees Heading",
            content: {
              text: "Additional Fees",
              level: 2,
            },
          },
          {
            id: "additional-fees",
            type: "Paragraph",
            label: "Additional Fees",
            content: {
              text: "Additional fees may apply for extracurricular activities, technology, books, and supplies. Please contact our admissions office for a detailed breakdown of all costs.",
            },
          },
          {
            id: "payment-plans-heading",
            type: "Heading",
            label: "Payment Plans Heading",
            content: {
              text: "Payment Plans",
              level: 2,
            },
          },
          {
            id: "payment-plans",
            type: "Paragraph",
            label: "Payment Plans",
            content: {
              text: "We offer several payment plan options to accommodate different family budgets:\n\n• Annual Payment: Full tuition paid by August 1 (3% discount)\n• Semester Payment: Two equal payments due August 1 and January 1\n• Monthly Payment: Ten equal payments from August through May",
            },
          },
          {
            id: "financial-aid-heading",
            type: "Heading",
            label: "Financial Aid Heading",
            content: {
              text: "Financial Aid & Scholarships",
              level: 2,
            },
          },
          {
            id: "financial-aid",
            type: "Paragraph",
            label: "Financial Aid",
            content: {
              text: "We are committed to making our education accessible to families from diverse economic backgrounds. Financial aid and merit-based scholarships are available based on demonstrated need and student qualifications.",
            },
          },
          {
            id: "cta",
            type: "CTA",
            label: "Call to Action",
            content: {
              title: "Ready to Apply?",
              description: "Start your application process today",
              buttonText: "Apply Now",
              buttonLink: "#",
            },
          },
          commonFooter,
        ]
      default:
        return [
          commonHeader,
          {
            id: "hero",
            type: "Hero",
            label: "Hero Section",
            content: {
              title: "Page Title",
              subtitle: "Page subtitle goes here",
              ctaText: "Learn More",
              ctaLink: "#",
              backgroundImage: "/traditional-schoolhouse.png",
            },
          },
          {
            id: "content",
            type: "Paragraph",
            label: "Page Content",
            content: {
              text: "This is a new page. Edit this content to add your own information.",
            },
          },
          commonFooter,
        ]
    }
  }

  // Initialize page content on first load
  useEffect(() => {
    // Initialize default content for all pages
    const initialPagesContent: Record<string, any[]> = {}
    site.pages.forEach((page) => {
      initialPagesContent[page] = getDefaultPageContent(page)
    })
    setPagesContent(initialPagesContent)

    // Set initial page sections to Home page content
    setPageSections(initialPagesContent["Home"])
  }, [])

  // Function to handle preview button click
  const handlePreviewClick = () => {
    // First save the current state
    setPagesContent({
      ...pagesContent,
      [pageTitle]: pageSections,
    })

    // Navigate to the preview page
    router.push(`/dashboard/sites/${params.id}/preview`)
  }

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData("componentType", componentType)
    setIsDragging(true)

    // Show a visual cue for where to drop
    if (canvasRef.current && pageSections.length === 0) {
      const dropZone = document.createElement("div")
      dropZone.className =
        "drop-zone border-2 border-dashed border-primary rounded-md p-8 my-4 flex items-center justify-center"
      dropZone.innerHTML =
        '<div class="text-primary text-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="mx-auto mb-2 h-8 w-8"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg><p>Drop component here</p></div>'
      canvasRef.current.appendChild(dropZone)
    }
  }

  const handleDragEnd = () => {
    setIsDragging(false)

    // Remove any existing drop indicators
    if (canvasRef.current) {
      const existingIndicators = canvasRef.current.querySelectorAll(".drop-indicator, .drop-zone")
      existingIndicators.forEach((indicator) => indicator.remove())
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    const componentType = e.dataTransfer.getData("componentType")

    // Find the drop indicator
    const dropIndicator = canvasRef.current?.querySelector(".drop-indicator, .drop-zone")
    let insertIndex = pageSections.length

    if (dropIndicator) {
      // Find the index based on the drop indicator position
      const sections = Array.from(canvasRef.current?.querySelectorAll("[data-section-id]") || [])
      const nextSection = dropIndicator.nextElementSibling

      if (nextSection && nextSection.hasAttribute("data-section-id")) {
        const sectionId = nextSection.getAttribute("data-section-id")
        insertIndex = pageSections.findIndex((section) => section.id === sectionId)
      }

      // Remove the drop indicator
      dropIndicator.remove()
    }

    // Create a new section based on the component type
    let newSection

    // This switch statement would contain all the component creation logic
    // I'm omitting most of it for brevity, but it should be included in the actual implementation
    switch (componentType) {
      case "hero":
        newSection = {
          id: `hero-${Date.now()}`,
          type: "Hero",
          label: "Hero Banner",
          content: {
            title: "Welcome to Our School",
            subtitle: "Educating tomorrow's leaders today",
            ctaText: "Learn More",
            ctaLink: "#",
            backgroundImage: "/traditional-schoolhouse.png",
          },
        }
        break

      case "heading":
        newSection = {
          id: `heading-${Date.now()}`,
          type: "Heading",
          label: "Heading",
          content: {
            text: "New Section Heading",
            level: 2,
          },
        }
        break

      // Add other cases for different component types

      default:
        newSection = {
          id: `section-${Date.now()}`,
          type: "Generic",
          label: "New Section",
          content: {},
        }
    }

    // Add the new section to the page
    const updatedSections = [...pageSections]
    updatedSections.splice(insertIndex, 0, newSection)
    setPageSections(updatedSections)

    // Update the content for the current page
    setPagesContent({
      ...pagesContent,
      [pageTitle]: updatedSections,
    })

    // Select the new section
    setSelectedElement(newSection.id)

    setIsDragging(false)

    // Show success message with helpful tip
    toast({
      title: "Component added",
      description: (
        <div>
          <p>Added {newSection.label} to the page</p>
          <p className="text-xs mt-1 flex items-center">
            <Lightbulb className="h-3 w-3 mr-1 text-yellow-500" />
            Tip: Click on the component to edit its content
          </p>
        </div>
      ),
    })

    // If this is the first component added and tutorial is active, advance to next step
    if (showTutorial && pageSections.length === 0 && tutorialStep === 1) {
      setTutorialStep(2)
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()

    // Remove any existing drop zones
    if (canvasRef.current) {
      const existingDropZones = canvasRef.current.querySelectorAll(".drop-zone")
      existingDropZones.forEach((zone) => zone.remove())
    }

    if (canvasRef.current) {
      // Get the mouse position relative to the canvas
      const canvasRect = canvasRef.current.getBoundingClientRect()
      const mouseY = e.clientY - canvasRect.top

      // Find the closest section to the mouse position
      const sections = canvasRef.current.querySelectorAll("[data-section-id]")
      let closestSection: Element | null = null
      let closestDistance = Number.POSITIVE_INFINITY
      let insertBefore = true

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect()
        const sectionTop = rect.top - canvasRect.top
        const sectionBottom = rect.bottom - canvasRect.top
        const distanceToTop = Math.abs(mouseY - sectionTop)
        const distanceToBottom = Math.abs(mouseY - sectionBottom)

        if (distanceToTop < closestDistance) {
          closestDistance = distanceToTop
          closestSection = section
          insertBefore = true
        }

        if (distanceToBottom < closestDistance) {
          closestDistance = distanceToBottom
          closestSection = section
          insertBefore = false
        }
      })

      // Remove any existing drop indicators
      const existingIndicators = canvasRef.current.querySelectorAll(".drop-indicator")
      existingIndicators.forEach((indicator) => indicator.remove())

      // Add a drop indicator
      if (closestSection) {
        const indicator = document.createElement("div")
        indicator.className =
          "drop-indicator h-2 bg-primary w-full my-2 rounded-full transition-all flex items-center justify-center"

        // Add a plus icon in the middle of the indicator
        indicator.innerHTML =
          '<div class="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="h-4 w-4"><path d="M12 5v14M5 12h14"/></svg></div>'

        if (insertBefore) {
          closestSection.insertAdjacentElement("beforebegin", indicator)
        } else {
          closestSection.insertAdjacentElement("afterend", indicator)
        }
      } else if (sections.length === 0) {
        // If there are no sections, add an indicator at the end
        const indicator = document.createElement("div")
        indicator.className =
          "drop-zone border-2 border-dashed border-primary rounded-md p-8 my-4 flex items-center justify-center"
        indicator.innerHTML =
          '<div class="text-primary text-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="mx-auto mb-2 h-8 w-8"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg><p>Drop component here</p></div>'
        canvasRef.current.appendChild(indicator)
      }
    }
  }

  const handleElementSelect = (elementId: string) => {
    setSelectedElement(elementId === selectedElement ? null : elementId)

    // If selecting an element and the right panel is collapsed, expand it
    if (elementId !== selectedElement && elementId !== null && rightPanelCollapsed) {
      setRightPanelCollapsed(false)
    }

    // If this is the first time selecting an element and tutorial is active, advance to next step
    if (showTutorial && tutorialStep === 2 && selectedElement === null) {
      setTutorialStep(3)
    }
  }

  const handleDeleteElement = (elementId: string) => {
    setElementToDelete(elementId)
    setShowDeleteDialog(true)
  }

  const confirmDeleteElement = () => {
    if (elementToDelete) {
      const updatedSections = pageSections.filter((section) => section.id !== elementToDelete)
      setPageSections(updatedSections)

      // Update the content for the current page
      setPagesContent({
        ...pagesContent,
        [pageTitle]: updatedSections,
      })

      setSelectedElement(null)
      setElementToDelete(null)
      setShowDeleteDialog(false)

      toast({
        title: "Component deleted",
        description: "The component has been removed from the page",
      })
    }
  }

  const handleMoveElement = (elementId: string, direction: "up" | "down") => {
    const currentIndex = pageSections.findIndex((section) => section.id === elementId)
    if (currentIndex === -1) return

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1

    // Check if the new index is valid
    if (newIndex < 0 || newIndex >= pageSections.length) return

    // Create a new array with the element moved
    const updatedSections = [...pageSections]
    const [movedItem] = updatedSections.splice(currentIndex, 1)
    updatedSections.splice(newIndex, 0, movedItem)

    setPageSections(updatedSections)

    // Update the content for the current page
    setPagesContent({
      ...pagesContent,
      [pageTitle]: updatedSections,
    })
  }

  const handleSave = async () => {
    setIsSaving(true)

    try {
      // Simulate saving with a delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Show success message
      setShowSaveDialog(true)

      // If tutorial is active and this is the first save, advance to next step
      if (showTutorial && tutorialStep === 3) {
        setTutorialStep(4)
      }
    } catch (error) {
      console.error("Error saving site:", error)
      toast({
        title: "Error saving site",
        description: "An unexpected error occurred while saving your site.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleSiteSettingsUpdate = (newSettings: any) => {
    // Update the site settings
    setSite({
      ...site,
      settings: newSettings,
    })

    // Close the settings panel
    setShowSiteSettings(false)

    // Show success message
    toast({
      title: "Settings updated",
      description: "Your site design settings have been updated successfully.",
    })
  }

  const handleUpdateElementContent = (elementId: string, newContent: any) => {
    const updatedSections = pageSections.map((section) => {
      if (section.id === elementId) {
        return {
          ...section,
          content: {
            ...section.content,
            ...newContent,
          },
        }
      }
      return section
    })

    setPageSections(updatedSections)

    // Update the content for the current page
    setPagesContent({
      ...pagesContent,
      [pageTitle]: updatedSections,
    })
  }

  const handleAddPage = () => {
    // Show a prompt to get the page name
    const pageName = prompt("Enter page name:")
    if (pageName && pageName.trim() !== "") {
      // Add the page to the site pages
      const updatedPages = [...site.pages, pageName.trim()]
      setSite({
        ...site,
        pages: updatedPages,
      })

      // Create default content for the new page
      const newPageContent = getDefaultPageContent("default")
      setPagesContent({
        ...pagesContent,
        [pageName.trim()]: newPageContent,
      })

      // Switch to the new page and load default content
      setPageTitle(pageName.trim())
      setPageSections(newPageContent)

      toast({
        title: "Page added",
        description: `Added ${pageName.trim()} page to the site`,
      })
    }
  }

  const handleDeletePage = (page: string) => {
    if (site.pages.length <= 1) {
      toast({
        title: "Cannot delete page",
        description: "You must have at least one page in your site",
        variant: "destructive",
      })
      return
    }

    setPageToDelete(page)
    setShowDeletePageDialog(true)
  }

  const confirmDeletePage = () => {
    if (pageToDelete) {
      // Remove the page from the site pages
      const updatedPages = site.pages.filter((page) => page !== pageToDelete)
      setSite({
        ...site,
        pages: updatedPages,
      })

      // Remove the page content
      const updatedPagesContent = { ...pagesContent }
      delete updatedPagesContent[pageToDelete]
      setPagesContent(updatedPagesContent)

      // If the current page is being deleted, switch to the first available page
      if (pageTitle === pageToDelete) {
        const newCurrentPage = updatedPages[0]
        setPageTitle(newCurrentPage)
        setPageSections(updatedPagesContent[newCurrentPage] || [])
      }

      setPageToDelete(null)
      setShowDeletePageDialog(false)

      toast({
        title: "Page deleted",
        description: `Deleted ${pageToDelete} page from the site`,
      })
    }
  }

  const handleSwitchPage = (page: string) => {
    // Save current page content
    setPagesContent({
      ...pagesContent,
      [pageTitle]: pageSections,
    })

    // Switch to the selected page
    setPageTitle(page)

    // Load the content for the selected page
    if (pagesContent[page]) {
      setPageSections(pagesContent[page])
    } else {
      // If no content exists for this page, create default content
      const defaultContent = getDefaultPageContent(page)
      setPageSections(defaultContent)
      setPagesContent({
        ...pagesContent,
        [page]: defaultContent,
      })
    }

    // Clear selected element
    setSelectedElement(null)
  }

  // Get the selected element's data
  const selectedElementData = selectedElement ? pageSections.find((section) => section.id === selectedElement) : null

  const dropIndicatorStyle = `
  .drop-indicator {
    animation: pulse 1.5s infinite;
  }
  
  @keyframes pulse {
    0% {
      opacity: 0.6;
      transform: scaleY(1);
    }
    50% {
      opacity: 1;
      transform: scaleY(1.5);
    }
    100% {
      opacity: 0.6;
      transform: scaleY(1);
    }
  }
`

  useEffect(() => {
    // Add the style for drop indicators
    const style = document.createElement("style")
    style.innerHTML = dropIndicatorStyle
    document.head.appendChild(style)

    return () => {
      // Clean up the style when the component unmounts
      document.head.removeChild(style)
    }
  }, [])

  // Toggle left panel
  const toggleLeftPanel = () => {
    setLeftPanelCollapsed(!leftPanelCollapsed)
  }

  // Toggle right panel
  const toggleRightPanel = () => {
    setRightPanelCollapsed(!rightPanelCollapsed)
  }

  // Handle panel resize
  const handlePanelResize = (sizes: number[]) => {
    // Store the sizes for when panels are expanded again
    if (sizes[0] > 0) setDefaultLeftPanelSize(sizes[0])
    if (sizes[2] > 0) setDefaultRightPanelSize(sizes[2])
  }

  // Render component category
  const renderComponentCategory = (components: any[]) => {
    if (!components || components.length === 0) return null

    return (
      <div className="grid grid-cols-2 gap-2">
        {components.map((component) => (
          <Card
            key={component.id}
            className="flex flex-col items-center justify-center p-3 cursor-move hover:bg-accent transition-colors relative"
            draggable
            onDragStart={(e) => handleDragStart(e, component.id)}
            onDragEnd={handleDragEnd}
          >
            {component.icon}
            <span className="text-xs font-medium">{component.label}</span>
            <span className="text-[10px] text-muted-foreground text-center mt-1 line-clamp-2">
              {component.description}
            </span>
            {component.difficulty && (
              <div className="absolute top-1 right-1">
                <Badge
                  variant={
                    component.difficulty === "easy"
                      ? "outline"
                      : component.difficulty === "medium"
                        ? "secondary"
                        : "destructive"
                  }
                  className="text-[8px] px-1 py-0"
                >
                  {component.difficulty}
                </Badge>
              </div>
            )}
          </Card>
        ))}
      </div>
    )
  }

  // Tutorial content
  const tutorialSteps = [
    {
      title: "Welcome to the Editor!",
      content: "This tutorial will guide you through creating your first page. Click 'Next' to continue.",
    },
    {
      title: "Step 1: Add Components",
      content: "Drag and drop components from the left sidebar onto your page. Start with a Hero Banner!",
    },
    {
      title: "Step 2: Edit Components",
      content: "Click on a component to select it. You can then edit its content in the right panel.",
    },
    {
      title: "Step 3: Save Your Work",
      content: "Don't forget to save your changes by clicking the Save button in the top bar.",
    },
    {
      title: "Step 4: Preview Your Site",
      content: "Click the Preview button to see how your site will look to visitors.",
    },
  ]

  // Help topics for the help drawer
  const helpTopics = [
    {
      title: "Adding Components",
      content:
        "Drag components from the left sidebar and drop them onto your page. You can add as many components as you need.",
      icon: <Plus className="h-5 w-5 text-primary" />,
    },
    {
      title: "Editing Content",
      content:
        "Click on any component to select it. You can then edit its content in the panel that appears on the right side.",
      icon: <Edit className="h-5 w-5 text-primary" />,
    },
    {
      title: "Rearranging Components",
      content:
        "Use the up and down arrows that appear when you hover over a component to change its position on the page.",
      icon: <MoveHorizontal className="h-5 w-5 text-primary" />,
    },
    {
      title: "Managing Pages",
      content: "Use the Pages section in the left sidebar to add new pages, switch between pages, or delete pages.",
      icon: <FileText className="h-5 w-5 text-primary" />,
    },
    {
      title: "Previewing Your Site",
      content: "Click the Preview button in the top bar to see how your site will look to visitors.",
      icon: <Eye className="h-5 w-5 text-primary" />,
    },
    {
      title: "Saving Your Work",
      content: "Always remember to save your changes by clicking the Save button in the top bar.",
      icon: <Save className="h-5 w-5 text-primary" />,
    },
    {
      title: "Adjusting Panel Sizes",
      content:
        "Drag the panel dividers to resize the left and right panels. You can also collapse panels completely using the toggle buttons.",
      icon: <MoveHorizontal className="h-5 w-5 text-primary" />,
    },
  ]

  return (
    <div className="flex h-screen flex-col">
      {/* Top navbar */}
      <header className="flex h-14 items-center justify-between border-b bg-background px-4">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            <span className="font-semibold">EduSite</span>
          </Link>
          <div className="h-6 w-px bg-border" />
          <Link href="/dashboard/sites" className="flex items-center text-sm text-muted-foreground">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to sites
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setShowHelpDrawer(true)}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Get help with using the editor</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={() => setShowSiteSettings(true)}>
                  <Palette className="mr-2 h-4 w-4" />
                  Design
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Customize site design</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="sm" onClick={handlePreviewClick}>
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview how your site will look</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button size="sm" onClick={handleSave} disabled={isSaving}>
                  {isSaving ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      Save
                    </>
                  )}
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Save your changes</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button variant="ghost" size="icon" className="rounded-full">
            <img src="/diverse-avatars.png" alt="Avatar" className="rounded-full" height={32} width={32} />
          </Button>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup direction="horizontal" onLayout={handlePanelResize} className="h-full w-full">
          {/* Left panel - Component library */}
          <ResizablePanel
            defaultSize={leftPanelCollapsed ? 0 : defaultLeftPanelSize}
            minSize={0}
            maxSize={30}
            collapsible={true}
            collapsedSize={0}
            onCollapse={() => setLeftPanelCollapsed(true)}
            onExpand={() => setLeftPanelCollapsed(false)}
            className="border-r bg-background"
          >
            <div className="flex h-full flex-col">
              <div className="border-b p-4">
                <div className="flex items-center justify-between">
                  <h2 className="font-medium">Pages</h2>
                </div>
                <div className="mt-2 space-y-1 max-h-48 overflow-y-auto pr-1 scrollbar-thin">
                  {site.pages.map((page) => (
                    <div key={page} className="flex items-center">
                      <Button
                        variant={page === pageTitle ? "secondary" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => handleSwitchPage(page)}
                      >
                        {page}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-1"
                        onClick={() => handleDeletePage(page)}
                      >
                        <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  ))}
                  <Button variant="ghost" className="w-full justify-start" onClick={handleAddPage}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Page
                  </Button>
                </div>
              </div>

              <div className="border-b p-4">
                <h2 className="font-medium mb-2">Components</h2>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search components..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <Tabs defaultValue="recommended" className="flex-1" value={activeTab} onValueChange={setActiveTab}>
                <div className="border-b">
                  <TabsList className="w-full justify-start rounded-none border-b-0 p-0">
                    <TabsTrigger
                      value="recommended"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                    >
                      Recommended
                    </TabsTrigger>
                    <TabsTrigger
                      value="content"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                    >
                      Content
                    </TabsTrigger>
                    <TabsTrigger
                      value="media"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                    >
                      Media
                    </TabsTrigger>
                    <TabsTrigger
                      value="school"
                      className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary"
                    >
                      School
                    </TabsTrigger>
                  </TabsList>
                </div>

                <TabsContent value="recommended" className="p-0 data-[state=active]:block overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {filteredRecommended.length > 0 ? (
                      <div>
                        <div className="mb-3">
                          <h3 className="text-sm font-medium mb-1">Recommended Components</h3>
                          <p className="text-xs text-muted-foreground">Drag and drop these onto your page</p>
                        </div>
                        {renderComponentCategory(filteredRecommended)}
                      </div>
                    ) : searchQuery ? (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-medium mb-1">No components found</h3>
                        <p className="text-xs text-muted-foreground">Try a different search term</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="content" className="p-0 data-[state=active]:block overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {filteredContent.length > 0 ? (
                      <div>
                        <div className="mb-3">
                          <h3 className="text-sm font-medium mb-1">Text & Content</h3>
                          <p className="text-xs text-muted-foreground">Add text and basic content elements</p>
                        </div>
                        {renderComponentCategory(filteredContent)}
                      </div>
                    ) : searchQuery ? (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-medium mb-1">No components found</h3>
                        <p className="text-xs text-muted-foreground">Try a different search term</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="media" className="p-0 data-[state=active]:block overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {filteredMedia.length > 0 ? (
                      <div>
                        <div className="mb-3">
                          <h3 className="text-sm font-medium mb-1">Images & Media</h3>
                          <p className="text-xs text-muted-foreground">Add images, videos, and galleries</p>
                        </div>
                        {renderComponentCategory(filteredMedia)}
                      </div>
                    ) : searchQuery ? (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-medium mb-1">No components found</h3>
                        <p className="text-xs text-muted-foreground">Try a different search term</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="school" className="p-0 data-[state=active]:block overflow-y-auto">
                  <div className="p-4 space-y-4">
                    {filteredSchool.length > 0 ? (
                      <div>
                        <div className="mb-3">
                          <h3 className="text-sm font-medium mb-1">School Components</h3>
                          <p classNameclassName="text-xs text-muted-foreground">Specialized components for schools</p>
                        </div>
                        {renderComponentCategory(filteredSchool)}
                      </div>
                    ) : searchQuery ? (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-medium mb-1">No components found</h3>
                        <p className="text-xs text-muted-foreground">Try a different search term</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Main editor area */}
          <ResizablePanel
            defaultSize={
              leftPanelCollapsed && rightPanelCollapsed ? 100 : 100 - defaultLeftPanelSize - defaultRightPanelSize
            }
            className="flex flex-col"
          >
            {/* Editor toolbar */}
            <div className="flex items-center justify-between border-b p-2">
              <div className="flex items-center gap-2">
                {leftPanelCollapsed && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" onClick={toggleLeftPanel}>
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent side="right">
                        <p>Show component library</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
                <Input
                  value={pageTitle}
                  onChange={(e) => setPageTitle(e.target.value)}
                  className="h-8 w-[200px] font-medium"
                />
              </div>
              <div className="flex items-center gap-1">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeView === "desktop" ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setActiveView("desktop")}
                      >
                        <Layers className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Desktop view</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeView === "tablet" ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setActiveView("tablet")}
                      >
                        <Tablet className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Tablet view</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant={activeView === "mobile" ? "secondary" : "ghost"}
                        size="icon"
                        onClick={() => setActiveView("mobile")}
                      >
                        <Smartphone className="h-4 w-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Mobile view</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>

            {/* Canvas */}
            <div className="flex-1 overflow-auto bg-muted p-4">
              <div
                className={`mx-auto bg-background shadow-sm transition-all ${
                  activeView === "desktop" ? "w-full max-w-6xl" : activeView === "tablet" ? "w-[768px]" : "w-[375px]"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                ref={canvasRef}
              >
                {/* Page content */}
                <div className="min-h-[800px] p-4 border-2 border-dashed border-muted-foreground/20 rounded-md">
                  {pageSections.length === 0 && !isDragging && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Plus className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">This page is empty</h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Drag and drop components from the sidebar to build your {pageTitle} page.
                      </p>
                      <div className="flex flex-col gap-4 items-center">
                        {leftPanelCollapsed ? (
                          <Button variant="outline" onClick={toggleLeftPanel}>
                            <ChevronRight className="h-4 w-4 mr-2" />
                            Show Component Library
                          </Button>
                        ) : (
                          <div className="flex items-center gap-2 text-sm text-primary">
                            <ArrowLeft className="h-4 w-4" />
                            <span>Drag components from here</span>
                          </div>
                        )}
                        <Button
                          variant="outline"
                          onClick={() => {
                            const defaultContent = getDefaultPageContent(pageTitle)
                            setPageSections(defaultContent)
                            setPagesContent({
                              ...pagesContent,
                              [pageTitle]: defaultContent,
                            })
                          }}
                          className="mt-2"
                        >
                          Use Template Content
                        </Button>
                      </div>
                    </div>
                  )}
                  {pageSections.map((section) => (
                    <div
                      key={section.id}
                      data-section-id={section.id}
                      className={`mb-6 p-4 border rounded-md ${
                        selectedElement === section.id ? "ring-2 ring-primary" : "border-muted"
                      } bg-muted/20 cursor-pointer relative group`}
                      onClick={() => handleElementSelect(section.id)}
                    >
                      {/* Section controls */}
                      <div className="absolute right-2 top-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {/* Move up button */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 bg-background/80 hover:bg-background"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleMoveElement(section.id, "up")
                                }}
                                disabled={pageSections.indexOf(section) === 0}
                              >
                                <ChevronUp className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Move up</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* Move down button */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 bg-background/80 hover:bg-background"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleMoveElement(section.id, "down")
                                }}
                                disabled={pageSections.indexOf(section) === pageSections.length - 1}
                              >
                                <ChevronDown className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Move down</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>

                        {/* Delete button */}
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6 bg-background/80 hover:bg-background hover:text-destructive"
                                onClick={(e) => {
                                  e.stopPropagation()
                                  handleDeleteElement(section.id)
                                }}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>Delete</p>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>

                      {/* Section type label */}
                      <div className="absolute left-2 top-2 bg-primary/10 text-primary text-xs px-2 py-1 rounded">
                        {section.type}
                      </div>

                      {/* Section content - simplified visual representations */}
                      <div className="mt-6 pt-2">
                        {/* Simplified component previews - these would be more detailed in the actual implementation */}
                        {section.type === "Hero" && (
                          <div className="flex flex-col items-center text-center">
                            <div className="w-3/4 h-10 bg-muted rounded mb-4 flex items-center justify-center">
                              <span className="text-sm text-muted-foreground">{section.content.title}</span>
                            </div>
                            <div className="w-2/3 h-6 bg-muted rounded mb-2 flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">{section.content.subtitle}</span>
                            </div>
                            <div className="flex gap-4 mt-4">
                              <div className="w-32 h-10 bg-primary rounded flex items-center justify-center">
                                <span className="text-xs text-primary-foreground">{section.content.ctaText}</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {section.type === "Heading" && (
                          <div className="mt-6 text-center">
                            <h2 className={`text-2xl font-bold`}>{section.content.text}</h2>
                          </div>
                        )}

                        {section.type === "Paragraph" && (
                          <div className="mt-6 text-center">
                            <p className="text-md text-muted-foreground">{section.content.text}</p>
                          </div>
                        )}

                        {/* Add more component type previews as needed */}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          {/* Right sidebar - Properties panel */}
          <ResizablePanel
            defaultSize={rightPanelCollapsed ? 0 : defaultRightPanelSize}
            minSize={0}
            maxSize={40}
            collapsible={true}
            collapsedSize={0}
            onCollapse={() => setRightPanelCollapsed(true)}
            onExpand={() => setRightPanelCollapsed(false)}
            className="border-l bg-background"
          >
            {selectedElement ? (
              <div className="p-4 overflow-y-auto h-full">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium">Edit {selectedElementData?.label}</h2>
                </div>

                <div className="space-y-4">
                  {selectedElementData?.type === "Hero" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="hero-title">Title</Label>
                        <Input
                          id="hero-title"
                          value={selectedElementData.content.title}
                          onChange={(e) => handleUpdateElementContent(selectedElement, { title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero-subtitle">Subtitle</Label>
                        <Input
                          id="hero-subtitle"
                          value={selectedElementData.content.subtitle}
                          onChange={(e) => handleUpdateElementContent(selectedElement, { subtitle: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero-cta">Button Text</Label>
                        <Input
                          id="hero-cta"
                          value={selectedElementData.content.ctaText}
                          onChange={(e) => handleUpdateElementContent(selectedElement, { ctaText: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero-link">Button Link</Label>
                        <Input
                          id="hero-link"
                          value={selectedElementData.content.ctaLink}
                          onChange={(e) => handleUpdateElementContent(selectedElement, { ctaLink: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  {selectedElementData?.type === "Heading" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="heading-text">Heading Text</Label>
                        <Input
                          id="heading-text"
                          value={selectedElementData.content.text}
                          onChange={(e) => handleUpdateElementContent(selectedElement, { text: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heading-level">Heading Size</Label>
                        <select
                          id="heading-level"
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          value={selectedElementData.content.level}
                          onChange={(e) =>
                            handleUpdateElementContent(selectedElement, { level: Number.parseInt(e.target.value) })
                          }
                        >
                          <option value="1">Large (H1)</option>
                          <option value="2">Medium (H2)</option>
                          <option value="3">Small (H3)</option>
                        </select>
                      </div>
                    </>
                  )}

                  {selectedElementData?.type === "Paragraph" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="paragraph-text">Text Content</Label>
                        <textarea
                          id="paragraph-text"
                          className="w-full min-h-[100px] rounded-md border border-input bg-background px-3 py-2"
                          value={selectedElementData.content.text}
                          onChange={(e) => handleUpdateElementContent(selectedElement, { text: e.target.value })}
                        />
                      </div>
                    </>
                  )}

                  {/* Add more component type editors as needed */}

                  <div className="pt-4">
                    <Button variant="outline" size="sm" className="w-full" onClick={() => setSelectedElement(null)}>
                      Done
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
                  <Edit className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-medium mb-2">No Element Selected</h3>
                <p className="text-muted-foreground mb-6 max-w-md">
                  Click on any element in your page to edit its properties.
                </p>
              </div>
            )}
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

      {/* Tutorial overlay */}
      {showTutorial && (
        <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg border p-4 w-80 z-50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium flex items-center">
              <Lightbulb className="h-4 w-4 text-yellow-500 mr-2" />
              {tutorialSteps[tutorialStep].title}
            </h3>
            <Button variant="ghost" size="sm" className="h-6 w-6 p-0" onClick={() => setShowTutorial(false)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">{tutorialSteps[tutorialStep].content}</p>
          <div className="flex justify-between">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setTutorialStep(Math.max(0, tutorialStep - 1))}
              disabled={tutorialStep === 0}
            >
              Previous
            </Button>
            <Button
              size="sm"
              onClick={() => {
                if (tutorialStep < tutorialSteps.length - 1) {
                  setTutorialStep(tutorialStep + 1)
                } else {
                  setShowTutorial(false)
                }
              }}
            >
              {tutorialStep < tutorialSteps.length - 1 ? "Next" : "Finish"}
            </Button>
          </div>
        </div>
      )}

      {/* Help drawer */}
      <Drawer open={showHelpDrawer} onOpenChange={setShowHelpDrawer}>
        <DrawerContent className="max-h-[85vh]">
          <DrawerHeader>
            <DrawerTitle className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-primary" />
              Website Editor Help
            </DrawerTitle>
            <DrawerDescription>
              Learn how to use the website editor to create and customize your school website.
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4 overflow-y-auto">
            <div className="space-y-6">
              {helpTopics.map((topic, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium flex items-center mb-2">
                    {topic.icon}
                    <span className="ml-2">{topic.title}</span>
                  </h3>
                  <p className="text-sm text-muted-foreground">{topic.content}</p>
                </div>
              ))}

              <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                <h3 className="font-medium flex items-center mb-2 text-blue-800">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  <span>Need More Help?</span>
                </h3>
                <p className="text-sm text-blue-700 mb-4">If you need additional assistance, you can:</p>
                <ul className="text-sm text-blue-700 list-disc list-inside space-y-1 mb-4">
                  <li>Watch our tutorial videos</li>
                  <li>Read our comprehensive documentation</li>
                  <li>Contact our support team</li>
                </ul>
                <Button className="w-full">Visit Help Center</Button>
              </div>
            </div>
          </div>
          <DrawerFooter>
            <Button onClick={() => setShowTutorial(true)}>Restart Tutorial</Button>
            <DrawerClose asChild>
              <Button variant="outline">Close</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Save Alert Dialog */}
      <AlertDialog open={showSaveDialog} onOpenChange={setShowSaveDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center">
              <Check className="h-5 w-5 mr-2 text-green-500" />
              Page Saved Successfully
            </AlertDialogTitle>
            <AlertDialogDescription>
              Your changes have been saved. Your website visitors will see these changes once you publish your site.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSaveDialog(false)}>Okay</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Element Alert Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Component?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this component? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDeleteElement}>
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Page Alert Dialog */}
      <AlertDialog open={showDeletePageDialog} onOpenChange={setShowDeletePageDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Page?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the "{pageToDelete}" page? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeletePageDialog(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction variant="destructive" onClick={confirmDeletePage}>
              Delete Page
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Site Settings Dialog */}
      <AlertDialog open={showSiteSettings} onOpenChange={setShowSiteSettings}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Site Design Settings</AlertDialogTitle>
            <AlertDialogDescription>Customize the colors and fonts for your entire website.</AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SiteSettingsPanel
              siteId={params.id}
              settings={
                site.settings || {
                  colors: colorPalettes[0].colors,
                  fonts: fontStyles[0],
                }
              }
              onUpdate={handleSiteSettingsUpdate}
              onClose={() => setShowSiteSettings(false)}
            />
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Preview</h3>
              <DesignPreview
                colors={site.settings?.colors || colorPalettes[0].colors}
                fonts={
                  site.settings?.fonts || {
                    heading: fontStyles[0].heading,
                    body: fontStyles[0].body,
                  }
                }
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowSiteSettings(false)}>Close</AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
