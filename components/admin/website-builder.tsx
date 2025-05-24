"use client"

import { useState, useEffect, useCallback } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Layout,
  Image,
  Save,
  Users,
  Calendar,
  Trash2,
  ChevronUp,
  ChevronDown,
  Edit,
  Info,
  Phone,
  Newspaper,
  MessageCircle,
  DollarSign,
  Check,
  X,
  ExternalLink,
  Globe2,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

const availableComponents = [
  { id: "hero", name: "Hero Banner", icon: Layout },
  { id: "about", name: "About Section", icon: Info },
  { id: "faculty", name: "Faculty Showcase", icon: Users },
  { id: "events", name: "Events Calendar", icon: Calendar },
  { id: "gallery", name: "Photo Gallery", icon: Image },
  { id: "contact", name: "Contact Form", icon: Phone },
  { id: "news", name: "News & Updates", icon: Newspaper },
  { id: "testimonials", name: "Testimonials", icon: MessageCircle },
  { id: "pricing", name: "Course Pricing", icon: DollarSign },
]

type WebsiteBuilderProps = {}

export function WebsiteBuilder({}: WebsiteBuilderProps) {
  const { toast } = useToast()
  const [websiteName, setWebsiteName] = useState("My School Website")
  const [components, setComponents] = useState<{ id: string; type: string; props?: any; editing?: boolean }[]>([])
  const [loading, setLoading] = useState(true)
  const [publishStatus, setPublishStatus] = useState<"draft" | "published" | "publishing">("draft")
  const [lastPublished, setLastPublished] = useState<string | null>(null)

  const router = useRouter()

  // Load data from local storage
  useEffect(() => {
    const storedWebsiteName = localStorage.getItem("websiteName")
    const storedComponents = localStorage.getItem("components")
    const storedPublishStatus = localStorage.getItem("publishStatus")
    const storedLastPublished = localStorage.getItem("lastPublished")

    if (storedWebsiteName) {
      setWebsiteName(storedWebsiteName)
    }
    if (storedComponents) {
      try {
        setComponents(JSON.parse(storedComponents))
      } catch (error) {
        console.error("Error parsing components from localStorage:", error)
      }
    }
    if (storedPublishStatus) {
      setPublishStatus(storedPublishStatus as "draft" | "published" | "publishing")
    }
    if (storedLastPublished) {
      setLastPublished(storedLastPublished)
    }
    setLoading(false)
  }, [])

  // Save data to local storage
  useEffect(() => {
    if (!loading) {
      localStorage.setItem("websiteName", websiteName)
      localStorage.setItem("components", JSON.stringify(components.map((c) => ({ ...c, editing: false }))))
      localStorage.setItem("publishStatus", publishStatus)
      if (lastPublished) {
        localStorage.setItem("lastPublished", lastPublished)
      }
    }
  }, [websiteName, components, loading, publishStatus, lastPublished])

  const handleAddComponent = useCallback((componentType: string) => {
    setComponents((prevComponents) => [...prevComponents, { id: Date.now().toString(), type: componentType }])
  }, [])

  const handleSave = () => {
    localStorage.setItem("components", JSON.stringify(components.map((c) => ({ ...c, editing: false }))))
    toast({
      title: "Website saved",
      description: "Your website changes have been saved.",
    })
  }

  const handleDeleteComponent = (componentId: string) => {
    setComponents((prevComponents) => prevComponents.filter((component) => component.id !== componentId))
  }

  const handleMoveComponent = (componentId: string, direction: "up" | "down") => {
    const index = components.findIndex((c) => c.id === componentId)
    if ((direction === "up" && index === 0) || (direction === "down" && index === components.length - 1)) {
      return
    }

    const newComponents = [...components]
    const newIndex = direction === "up" ? index - 1 : index + 1

    // Swap components
    ;[newComponents[index], newComponents[newIndex]] = [newComponents[newIndex], newComponents[index]]

    setComponents(newComponents)
  }

  const toggleEditComponent = (componentId: string) => {
    setComponents((prevComponents) =>
      prevComponents.map((component) => {
        if (component.id === componentId) {
          return { ...component, editing: !component.editing }
        }
        // Close other editing components
        return { ...component, editing: false }
      }),
    )
  }

  const updateComponentProps = (componentId: string, newProps: any) => {
    setComponents((prevComponents) =>
      prevComponents.map((component) => {
        if (component.id === componentId) {
          return {
            ...component,
            props: { ...component.props, ...newProps },
          }
        }
        return component
      }),
    )
  }

  const openPreviewInNewTab = () => {
    // Save current state to localStorage
    localStorage.setItem("components", JSON.stringify(components.map((c) => ({ ...c, editing: false }))))
    localStorage.setItem("websiteName", websiteName)

    // Open preview in new tab
    window.open("/admin/website-preview", "_blank")
  }

  const handlePublish = () => {
    setPublishStatus("publishing")

    // Simulate publishing process
    setTimeout(() => {
      setPublishStatus("published")
      setLastPublished(new Date().toISOString())

      toast({
        title: "Website published",
        description: "Your website has been successfully published.",
      })
    }, 2000)
  }

  const renderComponentWithControls = (
    component: { id: string; type: string; props?: any; editing?: boolean },
    index: number,
  ) => {
    return (
      <div key={component.id} className="relative border rounded-lg mb-4 group">
        {!component.editing && (
          <div className="absolute top-2 right-2 z-10 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity bg-white/80 p-1 rounded-md">
            <Button variant="ghost" size="icon" onClick={() => toggleEditComponent(component.id)} className="h-8 w-8">
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleMoveComponent(component.id, "up")}
              disabled={index === 0}
              className="h-8 w-8"
            >
              <ChevronUp className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleMoveComponent(component.id, "down")}
              disabled={index === components.length - 1}
              className="h-8 w-8"
            >
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleDeleteComponent(component.id)}
              className="h-8 w-8 text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}

        {component.editing ? (
          <div className="p-4 border-2 border-primary rounded-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium">Edit {component.type}</h3>
              <div className="flex space-x-2">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => toggleEditComponent(component.id)}
                  className="h-8 w-8 p-0"
                >
                  <X className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="default"
                  onClick={() => toggleEditComponent(component.id)}
                  className="h-8 w-8 p-0"
                >
                  <Check className="h-4 w-4" />
                </Button>
              </div>
            </div>
            {renderComponentEditor(component)}
          </div>
        ) : (
          renderComponent(component, index)
        )}
      </div>
    )
  }

  const renderComponentEditor = (component: { id: string; type: string; props?: any }) => {
    switch (component.type) {
      case "Hero Banner":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="hero-title">Title</Label>
              <Input
                id="hero-title"
                placeholder="Enter title"
                defaultValue={component.props?.title || "Welcome to Our School"}
                onChange={(e) => updateComponentProps(component.id, { title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-subtitle">Subtitle</Label>
              <Input
                id="hero-subtitle"
                placeholder="Enter subtitle"
                defaultValue={component.props?.subtitle || "Empowering minds for a brighter future"}
                onChange={(e) => updateComponentProps(component.id, { subtitle: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="hero-bg">Background Image URL</Label>
              <Input
                id="hero-bg"
                placeholder="Enter background image URL"
                defaultValue={component.props?.backgroundImage || "/placeholder.svg?height=400&width=1200"}
                onChange={(e) => updateComponentProps(component.id, { backgroundImage: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="hero-cta-text">Button Text</Label>
                <Input
                  id="hero-cta-text"
                  placeholder="Enter button text"
                  defaultValue={component.props?.ctaText || "Learn More"}
                  onChange={(e) => updateComponentProps(component.id, { ctaText: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="hero-cta-link">Button Link</Label>
                <Input
                  id="hero-cta-link"
                  placeholder="Enter button link"
                  defaultValue={component.props?.ctaLink || "#"}
                  onChange={(e) => updateComponentProps(component.id, { ctaLink: e.target.value })}
                />
              </div>
            </div>
          </div>
        )

      case "About Section":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="about-title">Title</Label>
              <Input
                id="about-title"
                placeholder="Enter title"
                defaultValue={component.props?.title || "About Our School"}
                onChange={(e) => updateComponentProps(component.id, { title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about-content">Content</Label>
              <Textarea
                id="about-content"
                placeholder="Enter content"
                rows={4}
                defaultValue={
                  component.props?.content ||
                  "Founded in 1995, our school has been dedicated to providing quality education to students from all backgrounds. We believe in nurturing not just academic excellence but also character development and life skills."
                }
                onChange={(e) => updateComponentProps(component.id, { content: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="about-image">Image URL</Label>
              <Input
                id="about-image"
                placeholder="Enter image URL"
                defaultValue={component.props?.image || "/placeholder.svg?height=400&width=600"}
                onChange={(e) => updateComponentProps(component.id, { image: e.target.value })}
              />
            </div>
          </div>
        )

      case "Faculty Showcase":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="faculty-title">Title</Label>
              <Input
                id="faculty-title"
                placeholder="Enter title"
                defaultValue={component.props?.title || "Our Expert Faculty"}
                onChange={(e) => updateComponentProps(component.id, { title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Faculty Members</Label>
              <div className="space-y-4">
                {(
                  component.props?.faculty || [
                    {
                      name: "Dr. Jane Smith",
                      position: "Principal",
                      image: "/placeholder.svg?height=200&width=200",
                      bio: "Ph.D in Education with 15 years of experience",
                    },
                    {
                      name: "Prof. John Doe",
                      position: "Science Department Head",
                      image: "/placeholder.svg?height=200&width=200",
                      bio: "Former NASA researcher with passion for teaching",
                    },
                    {
                      name: "Ms. Emily Johnson",
                      position: "Arts Teacher",
                      image: "/placeholder.svg?height=200&width=200",
                      bio: "Award-winning artist bringing creativity to the classroom",
                    },
                  ]
                ).map((member, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4 space-y-2">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          defaultValue={member.name}
                          onChange={(e) => {
                            const updatedFaculty = [...(component.props?.faculty || [])]
                            updatedFaculty[idx] = { ...updatedFaculty[idx], name: e.target.value }
                            updateComponentProps(component.id, { faculty: updatedFaculty })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Position</Label>
                        <Input
                          defaultValue={member.position}
                          onChange={(e) => {
                            const updatedFaculty = [...(component.props?.faculty || [])]
                            updatedFaculty[idx] = { ...updatedFaculty[idx], position: e.target.value }
                            updateComponentProps(component.id, { faculty: updatedFaculty })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Image URL</Label>
                        <Input
                          defaultValue={member.image}
                          onChange={(e) => {
                            const updatedFaculty = [...(component.props?.faculty || [])]
                            updatedFaculty[idx] = { ...updatedFaculty[idx], image: e.target.value }
                            updateComponentProps(component.id, { faculty: updatedFaculty })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Bio</Label>
                        <Textarea
                          defaultValue={member.bio}
                          onChange={(e) => {
                            const updatedFaculty = [...(component.props?.faculty || [])]
                            updatedFaculty[idx] = { ...updatedFaculty[idx], bio: e.target.value }
                            updateComponentProps(component.id, { faculty: updatedFaculty })
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case "Events Calendar":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="events-title">Title</Label>
              <Input
                id="events-title"
                placeholder="Enter title"
                defaultValue={component.props?.title || "Upcoming Events"}
                onChange={(e) => updateComponentProps(component.id, { title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Events</Label>
              <div className="space-y-4">
                {(
                  component.props?.events || [
                    {
                      title: "Annual Sports Day",
                      date: "2023-06-15",
                      description: "A day of athletic competitions and team sports",
                    },
                    {
                      title: "Science Fair",
                      date: "2023-07-10",
                      description: "Students showcase their innovative science projects",
                    },
                    {
                      title: "Parent-Teacher Meeting",
                      date: "2023-07-25",
                      description: "Discuss student progress and development",
                    },
                  ]
                ).map((event, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4 space-y-2">
                      <div className="space-y-2">
                        <Label>Event Title</Label>
                        <Input
                          defaultValue={event.title}
                          onChange={(e) => {
                            const updatedEvents = [...(component.props?.events || [])]
                            updatedEvents[idx] = { ...updatedEvents[idx], title: e.target.value }
                            updateComponentProps(component.id, { events: updatedEvents })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Date (YYYY-MM-DD)</Label>
                        <Input
                          defaultValue={event.date}
                          onChange={(e) => {
                            const updatedEvents = [...(component.props?.events || [])]
                            updatedEvents[idx] = { ...updatedEvents[idx], date: e.target.value }
                            updateComponentProps(component.id, { events: updatedEvents })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                          defaultValue={event.description}
                          onChange={(e) => {
                            const updatedEvents = [...(component.props?.events || [])]
                            updatedEvents[idx] = { ...updatedEvents[idx], description: e.target.value }
                            updateComponentProps(component.id, { events: updatedEvents })
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case "Photo Gallery":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="gallery-title">Title</Label>
              <Input
                id="gallery-title"
                placeholder="Enter title"
                defaultValue={component.props?.title || "School Gallery"}
                onChange={(e) => updateComponentProps(component.id, { title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="gallery-images">Images (comma separated URLs)</Label>
              <Textarea
                id="gallery-images"
                placeholder="Enter image URLs, separated by commas"
                rows={4}
                defaultValue={(
                  component.props?.images || [
                    "/placeholder.svg?height=300&width=400",
                    "/placeholder.svg?height=300&width=400",
                    "/placeholder.svg?height=300&width=400",
                    "/placeholder.svg?height=300&width=400",
                    "/placeholder.svg?height=300&width=400",
                    "/placeholder.svg?height=300&width=400",
                  ]
                ).join(",")}
                onChange={(e) => {
                  const urls = e.target.value.split(",").map((url) => url.trim())
                  updateComponentProps(component.id, { images: urls })
                }}
              />
            </div>
          </div>
        )

      case "Contact Form":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="contact-title">Title</Label>
              <Input
                id="contact-title"
                placeholder="Enter title"
                defaultValue={component.props?.title || "Get in Touch"}
                onChange={(e) => updateComponentProps(component.id, { title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-address">Address</Label>
              <Input
                id="contact-address"
                placeholder="Enter address"
                defaultValue={component.props?.address || "123 Education Street, Learning City, 54321"}
                onChange={(e) => updateComponentProps(component.id, { address: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Email</Label>
              <Input
                id="contact-email"
                placeholder="Enter email"
                defaultValue={component.props?.email || "info@schoolname.edu"}
                onChange={(e) => updateComponentProps(component.id, { email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-phone">Phone</Label>
              <Input
                id="contact-phone"
                placeholder="Enter phone"
                defaultValue={component.props?.phone || "(555) 123-4567"}
                onChange={(e) => updateComponentProps(component.id, { phone: e.target.value })}
              />
            </div>
          </div>
        )

      case "News & Updates":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="news-title">Title</Label>
              <Input
                id="news-title"
                placeholder="Enter title"
                defaultValue={component.props?.title || "Latest News"}
                onChange={(e) => updateComponentProps(component.id, { title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>News Items</Label>
              <div className="space-y-4">
                {(
                  component.props?.news || [
                    {
                      title: "New Computer Lab Inaugurated",
                      date: "2023-05-20",
                      summary: "State-of-the-art computer lab with 30 new workstations",
                    },
                    {
                      title: "Students Win National Debate",
                      date: "2023-05-15",
                      summary: "Our debate team secured first place in the national competition",
                    },
                    {
                      title: "Summer Camp Registration Open",
                      date: "2023-05-10",
                      summary: "Register now for our annual summer camp featuring sports, arts, and science activities",
                    },
                  ]
                ).map((item, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4 space-y-2">
                      <div className="space-y-2">
                        <Label>Title</Label>
                        <Input
                          defaultValue={item.title}
                          onChange={(e) => {
                            const updatedNews = [...(component.props?.news || [])]
                            updatedNews[idx] = { ...updatedNews[idx], title: e.target.value }
                            updateComponentProps(component.id, { news: updatedNews })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Date (YYYY-MM-DD)</Label>
                        <Input
                          defaultValue={item.date}
                          onChange={(e) => {
                            const updatedNews = [...(component.props?.news || [])]
                            updatedNews[idx] = { ...updatedNews[idx], date: e.target.value }
                            updateComponentProps(component.id, { news: updatedNews })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Summary</Label>
                        <Textarea
                          defaultValue={item.summary}
                          onChange={(e) => {
                            const updatedNews = [...(component.props?.news || [])]
                            updatedNews[idx] = { ...updatedNews[idx], summary: e.target.value }
                            updateComponentProps(component.id, { news: updatedNews })
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case "Testimonials":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="testimonials-title">Title</Label>
              <Input
                id="testimonials-title"
                placeholder="Enter title"
                defaultValue={component.props?.title || "What Parents & Students Say"}
                onChange={(e) => updateComponentProps(component.id, { title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Testimonials</Label>
              <div className="space-y-4">
                {(
                  component.props?.testimonials || [
                    {
                      name: "Sarah Johnson",
                      role: "Parent",
                      quote: "The teachers truly care about each student's success. My daughter has thrived here.",
                      avatar: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      name: "Michael Chen",
                      role: "Student, Grade 12",
                      quote: "The opportunities for growth both academically and personally are incredible.",
                      avatar: "/placeholder.svg?height=100&width=100",
                    },
                    {
                      name: "Rebecca Williams",
                      role: "Parent",
                      quote: "The school's focus on character development alongside academics sets it apart.",
                      avatar: "/placeholder.svg?height=100&width=100",
                    },
                  ]
                ).map((testimonial, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4 space-y-2">
                      <div className="space-y-2">
                        <Label>Name</Label>
                        <Input
                          defaultValue={testimonial.name}
                          onChange={(e) => {
                            const updatedTestimonials = [...(component.props?.testimonials || [])]
                            updatedTestimonials[idx] = { ...updatedTestimonials[idx], name: e.target.value }
                            updateComponentProps(component.id, { testimonials: updatedTestimonials })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Role</Label>
                        <Input
                          defaultValue={testimonial.role}
                          onChange={(e) => {
                            const updatedTestimonials = [...(component.props?.testimonials || [])]
                            updatedTestimonials[idx] = { ...updatedTestimonials[idx], role: e.target.value }
                            updateComponentProps(component.id, { testimonials: updatedTestimonials })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Avatar URL</Label>
                        <Input
                          defaultValue={testimonial.avatar}
                          onChange={(e) => {
                            const updatedTestimonials = [...(component.props?.testimonials || [])]
                            updatedTestimonials[idx] = { ...updatedTestimonials[idx], avatar: e.target.value }
                            updateComponentProps(component.id, { testimonials: updatedTestimonials })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Quote</Label>
                        <Textarea
                          defaultValue={testimonial.quote}
                          onChange={(e) => {
                            const updatedTestimonials = [...(component.props?.testimonials || [])]
                            updatedTestimonials[idx] = { ...updatedTestimonials[idx], quote: e.target.value }
                            updateComponentProps(component.id, { testimonials: updatedTestimonials })
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      case "Course Pricing":
        return (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="pricing-title">Title</Label>
              <Input
                id="pricing-title"
                placeholder="Enter title"
                defaultValue={component.props?.title || "Our Programs & Tuition"}
                onChange={(e) => updateComponentProps(component.id, { title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Courses</Label>
              <div className="space-y-4">
                {(
                  component.props?.courses || [
                    {
                      name: "Elementary Education",
                      price: "$8,500",
                      features: ["Small class sizes", "Personalized attention", "Comprehensive curriculum"],
                    },
                    {
                      name: "Middle School Program",
                      price: "$9,500",
                      features: [
                        "Specialized subject teachers",
                        "Advanced learning opportunities",
                        "Career exploration",
                      ],
                    },
                    {
                      name: "High School Diploma",
                      price: "$10,500",
                      features: ["College preparation", "AP/IB courses available", "Career counseling"],
                    },
                  ]
                ).map((course, idx) => (
                  <Card key={idx}>
                    <CardContent className="p-4 space-y-2">
                      <div className="space-y-2">
                        <Label>Course Name</Label>
                        <Input
                          defaultValue={course.name}
                          onChange={(e) => {
                            const updatedCourses = [...(component.props?.courses || [])]
                            updatedCourses[idx] = { ...updatedCourses[idx], name: e.target.value }
                            updateComponentProps(component.id, { courses: updatedCourses })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Price</Label>
                        <Input
                          defaultValue={course.price}
                          onChange={(e) => {
                            const updatedCourses = [...(component.props?.courses || [])]
                            updatedCourses[idx] = { ...updatedCourses[idx], price: e.target.value }
                            updateComponentProps(component.id, { courses: updatedCourses })
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Features (one per line)</Label>
                        <Textarea
                          defaultValue={course.features.join("\n")}
                          onChange={(e) => {
                            const features = e.target.value.split("\n").filter((f) => f.trim() !== "")
                            const updatedCourses = [...(component.props?.courses || [])]
                            updatedCourses[idx] = { ...updatedCourses[idx], features }
                            updateComponentProps(component.id, { courses: updatedCourses })
                          }}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        )

      default:
        return <div>No editor available for this component type</div>
    }
  }

  const renderComponent = (component: { id: string; type: string; props?: any }, index: number) => {
    switch (component.type) {
      case "Hero Banner":
        return (
          <HeroBanner
            title={component.props?.title || "Welcome to Our School"}
            subtitle={component.props?.subtitle || "Empowering minds for a brighter future"}
            backgroundImage={component.props?.backgroundImage || "/placeholder.svg?height=400&width=1200"}
            ctaText={component.props?.ctaText || "Learn More"}
            ctaLink={component.props?.ctaLink || "#"}
          />
        )
      case "About Section":
        return (
          <AboutSection
            title={component.props?.title || "About Our School"}
            content={
              component.props?.content ||
              "Founded in 1995, our school has been dedicated to providing quality education to students from all backgrounds. We believe in nurturing not just academic excellence but also character development and life skills."
            }
            image={component.props?.image || "/placeholder.svg?height=400&width=600"}
          />
        )
      case "Faculty Showcase":
        return (
          <FacultyShowcase
            title={component.props?.title || "Our Expert Faculty"}
            faculty={
              component.props?.faculty || [
                {
                  name: "Dr. Jane Smith",
                  position: "Principal",
                  image: "/placeholder.svg?height=200&width=200",
                  bio: "Ph.D in Education with 15 years of experience",
                },
                {
                  name: "Prof. John Doe",
                  position: "Science Department Head",
                  image: "/placeholder.svg?height=200&width=200",
                  bio: "Former NASA researcher with passion for teaching",
                },
                {
                  name: "Ms. Emily Johnson",
                  position: "Arts Teacher",
                  image: "/placeholder.svg?height=200&width=200",
                  bio: "Award-winning artist bringing creativity to the classroom",
                },
              ]
            }
          />
        )
      case "Events Calendar":
        return (
          <EventsCalendar
            title={component.props?.title || "Upcoming Events"}
            events={
              component.props?.events || [
                {
                  title: "Annual Sports Day",
                  date: "2023-06-15",
                  description: "A day of athletic competitions and team sports",
                },
                {
                  title: "Science Fair",
                  date: "2023-07-10",
                  description: "Students showcase their innovative science projects",
                },
                {
                  title: "Parent-Teacher Meeting",
                  date: "2023-07-25",
                  description: "Discuss student progress and development",
                },
              ]
            }
          />
        )
      case "Photo Gallery":
        return (
          <PhotoGallery
            title={component.props?.title || "School Gallery"}
            images={
              component.props?.images || [
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
                "/placeholder.svg?height=300&width=400",
              ]
            }
          />
        )
      case "Contact Form":
        return (
          <ContactForm
            title={component.props?.title || "Get in Touch"}
            address={component.props?.address || "123 Education Street, Learning City, 54321"}
            email={component.props?.email || "info@schoolname.edu"}
            phone={component.props?.phone || "(555) 123-4567"}
          />
        )
      case "News & Updates":
        return (
          <NewsUpdates
            title={component.props?.title || "Latest News"}
            news={
              component.props?.news || [
                {
                  title: "New Computer Lab Inaugurated",
                  date: "2023-05-20",
                  summary: "State-of-the-art computer lab with 30 new workstations",
                },
                {
                  title: "Students Win National Debate",
                  date: "2023-05-15",
                  summary: "Our debate team secured first place in the national competition",
                },
                {
                  title: "Summer Camp Registration Open",
                  date: "2023-05-10",
                  summary: "Register now for our annual summer camp featuring sports, arts, and science activities",
                },
              ]
            }
          />
        )
      case "Testimonials":
        return (
          <Testimonials
            title={component.props?.title || "What Parents & Students Say"}
            testimonials={
              component.props?.testimonials || [
                {
                  name: "Sarah Johnson",
                  role: "Parent",
                  quote: "The teachers truly care about each student's success. My daughter has thrived here.",
                  avatar: "/placeholder.svg?height=100&width=100",
                },
                {
                  name: "Michael Chen",
                  role: "Student, Grade 12",
                  quote: "The opportunities for growth both academically and personally are incredible.",
                  avatar: "/placeholder.svg?height=100&width=100",
                },
                {
                  name: "Rebecca Williams",
                  role: "Parent",
                  quote: "The school's focus on character development alongside academics sets it apart.",
                  avatar: "/placeholder.svg?height=100&width=100",
                },
              ]
            }
          />
        )
      case "Course Pricing":
        return (
          <CoursePricing
            title={component.props?.title || "Our Programs & Tuition"}
            courses={
              component.props?.courses || [
                {
                  name: "Elementary Education",
                  price: "$8,500",
                  features: ["Small class sizes", "Personalized attention", "Comprehensive curriculum"],
                },
                {
                  name: "Middle School Program",
                  price: "$9,500",
                  features: ["Specialized subject teachers", "Advanced learning opportunities", "Career exploration"],
                },
                {
                  name: "High School Diploma",
                  price: "$10,500",
                  features: ["College preparation", "AP/IB courses available", "Career counseling"],
                },
              ]
            }
          />
        )
      default:
        return <div key={component.id}>Unknown component: {component.type}</div>
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-2xl font-bold">Website Builder</h1>
        <div className="flex items-center space-x-2">
          <div className="flex items-center mr-4">
            <div
              className={`h-3 w-3 rounded-full mr-2 ${
                publishStatus === "published"
                  ? "bg-green-500"
                  : publishStatus === "publishing"
                    ? "bg-yellow-500"
                    : "bg-gray-400"
              }`}
            ></div>
            <span className="text-sm text-muted-foreground">
              {publishStatus === "published" ? "Published" : publishStatus === "publishing" ? "Publishing..." : "Draft"}
            </span>
            {lastPublished && publishStatus === "published" && (
              <span className="text-xs text-muted-foreground ml-2">{new Date(lastPublished).toLocaleString()}</span>
            )}
          </div>
          <Button variant="outline" onClick={openPreviewInNewTab}>
            <ExternalLink className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save
          </Button>
          <Button variant="default" onClick={handlePublish} disabled={publishStatus === "publishing"}>
            <Globe2 className="mr-2 h-4 w-4" />
            {publishStatus === "publishing" ? "Publishing..." : "Publish"}
          </Button>
        </div>
      </div>

      <div className="flex flex-1">
        {/* Left Sidebar - Component Palette */}
        <div className="w-64 border-r p-4">
          <h3 className="text-lg font-medium mb-4">Components</h3>
          <div className="space-y-2">
            {availableComponents.map((component) => (
              <Button
                key={component.id}
                variant="outline"
                className="w-full justify-start"
                onClick={() => handleAddComponent(component.name)}
              >
                <component.icon className="h-4 w-4 mr-2" />
                {component.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Main Content - Page Layout */}
        <div className="flex-1 p-4 overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Page Layout</h3>
            <div className="space-x-2">
              <Input
                className="w-64 inline-block"
                placeholder="Website Name"
                value={websiteName}
                onChange={(e) => setWebsiteName(e.target.value)}
              />
            </div>
          </div>
          <div className="space-y-4">
            {components.map((component, index) => renderComponentWithControls(component, index))}
          </div>
          {components.length === 0 && (
            <div className="text-center p-8 border rounded-md bg-muted/20">
              <p className="text-muted-foreground">Add components from the left sidebar to build your page.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Component definitions for the website builder
function HeroBanner({ title, subtitle, backgroundImage, ctaText, ctaLink }) {
  return (
    <section className="relative h-96 bg-gray-200 flex items-center justify-center">
      {backgroundImage && (
        <img
          src={backgroundImage || "/placeholder.svg"}
          alt="Hero background"
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center text-white p-6 max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-xl mb-6">{subtitle}</p>
        {ctaText && ctaLink && (
          <a
            href={ctaLink}
            className="px-6 py-3 rounded-md font-medium bg-primary text-white hover:bg-primary/90 inline-block"
          >
            {ctaText}
          </a>
        )}
      </div>
    </section>
  )
}

function AboutSection({ title, content, image }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1">
            <img
              src={image || "/placeholder.svg"}
              alt="About our school"
              className="rounded-lg w-full h-auto shadow-md"
            />
          </div>
          <div className="flex-1">
            <p className="text-lg leading-relaxed">{content}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function FacultyShowcase({ title, faculty }) {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {faculty.map((member, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex flex-col items-center">
                <img
                  src={member.image || "/placeholder.svg"}
                  alt={member.name}
                  className="w-32 h-32 rounded-full object-cover mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-primary font-medium mb-2">{member.position}</p>
                <p className="text-center text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function EventsCalendar({ title, events }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
        <div className="space-y-4">
          {events.map((event, index) => {
            const date = new Date(event.date)
            const formattedDate = date.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })

            return (
              <div key={index} className="flex border rounded-lg overflow-hidden">
                <div className="bg-primary text-white p-4 flex flex-col items-center justify-center min-w-24">
                  <span className="text-2xl font-bold">{date.getDate()}</span>
                  <span>{date.toLocaleDateString("en-US", { month: "short" })}</span>
                </div>
                <div className="p-4 flex-1">
                  <h3 className="text-xl font-semibold">{event.title}</h3>
                  <p className="text-gray-600 mb-2">{formattedDate}</p>
                  <p>{event.description}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function PhotoGallery({ title, images }) {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {images.map((image, i) => (
            <img
              key={i}
              src={image || "/placeholder.svg"}
              alt={`Gallery image ${i + 1}`}
              className="rounded-lg w-full h-64 object-cover shadow-sm hover:shadow-md transition-shadow"
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ContactForm({ title, address, email, phone }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p>{address}</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
              <p>Email: {email}</p>
              <p>Phone: {phone}</p>
            </div>
          </div>
          <div className="flex-1">
            <form className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name</Label>
                  <Input id="name" placeholder="Your name" />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="Your email" />
                </div>
              </div>
              <div>
                <Label htmlFor="subject">Subject</Label>
                <Input id="subject" placeholder="Subject" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea id="message" placeholder="Your message" rows={5} />
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

function NewsUpdates({ title, news }) {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
        <div className="space-y-6">
          {news.map((item, index) => {
            const date = new Date(item.date)
            const formattedDate = date.toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })

            return (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-3">{formattedDate}</p>
                <p>{item.summary}</p>
                <a href="#" className="text-primary font-medium mt-2 inline-block">
                  Read more
                </a>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function Testimonials({ title, testimonials }) {
  return (
    <section className="py-16 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <div className="mb-4">
                <svg className="h-8 w-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
              </div>
              <p className="flex-1 italic mb-4">{testimonial.quote}</p>
              <div className="flex items-center">
                <img
                  src={testimonial.avatar || "/placeholder.svg"}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="font-semibold">{testimonial.name}</h4>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function CoursePricing({ title, courses }) {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-10">{title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md flex flex-col">
              <h3 className="text-xl font-semibold mb-2">{course.name}</h3>
              <div className="text-3xl font-bold text-primary mb-4">{course.price}</div>
              <ul className="space-y-2 mb-6 flex-1">
                {course.features.map((feature, i) => (
                  <li key={i} className="flex items-start">
                    <svg
                      className="h-5 w-5 text-green-500 mr-2 mt-0.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <Button className="w-full">Enroll Now</Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
