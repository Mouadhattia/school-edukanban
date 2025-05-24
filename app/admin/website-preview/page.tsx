"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Save, Globe2, ArrowLeft } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

// Import all the component renderers
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
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input type="text" className="w-full p-2 border rounded-md" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input type="email" className="w-full p-2 border rounded-md" placeholder="Your email" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Subject</label>
                <input type="text" className="w-full p-2 border rounded-md" placeholder="Subject" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Message</label>
                <textarea className="w-full p-2 border rounded-md" placeholder="Your message" rows={5}></textarea>
              </div>
              <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90">
                Send Message
              </button>
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
              <button className="w-full bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90">
                Enroll Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function WebsitePreview() {
  const { toast } = useToast()
  const router = useRouter()
  const [websiteName, setWebsiteName] = useState("My School Website")
  const [components, setComponents] = useState([])
  const [publishStatus, setPublishStatus] = useState<"draft" | "published" | "publishing">("draft")
  const [lastPublished, setLastPublished] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Load data from localStorage
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

  const handleSave = () => {
    toast({
      title: "Website saved",
      description: "Your website changes have been saved.",
    })
  }

  const handlePublish = () => {
    setPublishStatus("publishing")

    // Simulate publishing process
    setTimeout(() => {
      setPublishStatus("published")
      setLastPublished(new Date().toISOString())
      localStorage.setItem("publishStatus", "published")
      localStorage.setItem("lastPublished", new Date().toISOString())

      toast({
        title: "Website published",
        description: "Your website has been successfully published.",
      })
    }, 2000)
  }

  const renderComponent = (component: { id: string; type: string; props?: any }, index: number) => {
    switch (component.type) {
      case "Hero Banner":
        return (
          <HeroBanner
            key={component.id}
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
            key={component.id}
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
            key={component.id}
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
            key={component.id}
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
            key={component.id}
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
            key={component.id}
            title={component.props?.title || "Get in Touch"}
            address={component.props?.address || "123 Education Street, Learning City, 54321"}
            email={component.props?.email || "info@schoolname.edu"}
            phone={component.props?.phone || "(555) 123-4567"}
          />
        )
      case "News & Updates":
        return (
          <NewsUpdates
            key={component.id}
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
            key={component.id}
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
            key={component.id}
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

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading preview...</div>
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Fixed control bar */}
      <div className="fixed top-0 left-0 right-0 bg-white z-50 shadow-md">
        <div className="max-w-screen-xl mx-auto px-4 py-2 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => window.close()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Editor
            </Button>
            <h1 className="text-xl font-bold ml-4">{websiteName}</h1>
          </div>
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
                {publishStatus === "published"
                  ? "Published"
                  : publishStatus === "publishing"
                    ? "Publishing..."
                    : "Draft"}
              </span>
              {lastPublished && publishStatus === "published" && (
                <span className="text-xs text-muted-foreground ml-2">{new Date(lastPublished).toLocaleString()}</span>
              )}
            </div>
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
      </div>

      {/* Website content with padding for the fixed header */}
      <div className="pt-14">
        <header className="bg-primary text-white py-4">
          <div className="max-w-6xl mx-auto px-4 flex justify-between items-center">
            <div className="text-2xl font-bold">{websiteName}</div>
            <nav>
              <ul className="flex space-x-6">
                <li>
                  <a href="#" className="hover:underline">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Programs
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Events
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:underline">
                    Contact
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        <main>{components.map((component, index) => renderComponent(component, index))}</main>

        <footer className="bg-gray-800 text-white py-8">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-xl font-bold mb-4">{websiteName}</h3>
                <p>Providing quality education since 1995.</p>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="hover:underline">
                      Home
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      About Us
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Programs
                    </a>
                  </li>
                  <li>
                    <a href="#" className="hover:underline">
                      Contact
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-4">Connect With Us</h3>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-primary">
                    Facebook
                  </a>
                  <a href="#" className="hover:text-primary">
                    Twitter
                  </a>
                  <a href="#" className="hover:text-primary">
                    Instagram
                  </a>
                  <a href="#" className="hover:text-primary">
                    LinkedIn
                  </a>
                </div>
              </div>
            </div>
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p>
                &copy; {new Date().getFullYear()} {websiteName}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
