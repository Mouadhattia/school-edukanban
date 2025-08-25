"use client";

import type React from "react";
import { ReactNode, use, useMemo } from "react";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

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
  ChevronLeft,
  Edit,
  Check,
  Type,
  Users,
  Palette,
  ShoppingBag,
  Star,
  Shield,
  Target,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Label } from "@/components/ui/label";
import {
  ResizablePanel,
  ResizablePanelGroup,
  ResizableHandle,
} from "@/components/ui/resizable";
import { colorPalettes } from "@/components/color-palette-picker";
import { fontStyles } from "@/components/font-style-picker";
import { SiteSettingsPanel } from "@/components/site-settings-panel";
import { DesignPreview } from "@/components/design-preview";
import { useOrganizationData } from "@/contexts/organization-data-context";
import { useToast } from "@/components/ui/toast";
import { Page, Section, SectionType } from "@/lib/types";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Component {
  id: string;
  label: string;
  description: string;
  icon: ReactNode;
  category: string;
  difficulty: string;
}

interface ComponentLibrary {
  recommended: Component[];
  content: Component[];
  media: Component[];
  school: Component[];
}

export default function EditorPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { addToast } = useToast();
  const {
    selectedSite,
    getSiteById,
    sitePages,
    createNewPage,
    updatePageData,
    deletePageData,
    updateSiteData,
    updateSiteSettingsData,
    createNewSection,
    deleteSectionData,
    setCurrentPage,
    updateSectionsOrder,
    updateSectionData,
    currentPage,
    pageSections: pageSectionsContext,
    getAllCourses,
    courses,
    user,
    uploadImage,
  } = useOrganizationData();
  const router = useRouter();
  const [activeView, setActiveView] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  useEffect(() => {
    if (token && user) {
      getAllCourses(token, {
        schoolId: user?.schoolIds?.[0] || "",
        search: "",
        page: 1,
        limit: 999,
      });
    }
  }, [token, user]);
  const selectPagesData = useMemo(() => {
    return sitePages?.concat([
      {
        _id: "signup",
        title: "Sign Up",
        slug: "signup",
        site_id: "",
        is_homepage: false,
        order_index: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        _id: "signin",
        title: "Sign In",
        slug: "signin",
        site_id: "",
        is_homepage: false,
        order_index: 0,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  }, [sitePages]);
  const textColor = selectedSite?.settings?.colors?.text;
  const primaryColor = selectedSite?.settings?.colors?.primary;
  const coursesList = courses?.courses || [];

  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [tempContent, setTempContent] = useState<any>(null);
  const [pageTitle, setPageTitle] = useState("Home");
  const [isDragging, setIsDragging] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showDeletePageDialog, setShowDeletePageDialog] = useState(false);
  const [pageToDelete, setPageToDelete] = useState<string | null>(null);
  const [elementToDelete, setElementToDelete] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("recommended");
  const [showTutorial, setShowTutorial] = useState(true);
  const [tutorialStep, setTutorialStep] = useState(1);
  const [showHelpDrawer, setShowHelpDrawer] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  const [leftPanelCollapsed, setLeftPanelCollapsed] = useState(false);
  const [rightPanelCollapsed, setRightPanelCollapsed] = useState(false);
  const [defaultLeftPanelSize, setDefaultLeftPanelSize] = useState(20);
  const [defaultRightPanelSize, setDefaultRightPanelSize] = useState(25);
  const [showSiteSettings, setShowSiteSettings] = useState(false);
  const [pageId, setPageId] = useState<string | null>(null);
  const [productCarouselIndex, setProductCarouselIndex] = useState(0);
  const [carouselStates, setCarouselStates] = useState<Record<string, number>>(
    {}
  );
  const [allProductsStates, setAllProductsStates] = useState<
    Record<
      string,
      {
        searchTerm: string;
        sortBy: string;
        layout: string;
        currentPage: number;
      }
    >
  >({});

  // Common Lucide React icons for autocomplete
  const commonLucideIcons = [
    "BookOpen",
    "Users",
    "Building",
    "Star",
    "Heart",
    "CheckCircle",
    "Award",
    "Zap",
    "Target",
    "Shield",
    "Globe",
    "Lightbulb",
    "Rocket",
    "Crown",
    "Diamond",
    "Gift",
    "Home",
    "MapPin",
    "Phone",
    "Mail",
    "Calendar",
    "Clock",
    "Camera",
    "Image",
    "Video",
    "Music",
    "Play",
    "Pause",
    "Download",
    "Upload",
    "Share",
    "Link",
    "Search",
    "Filter",
    "Settings",
    "Menu",
    "Plus",
    "Minus",
    "Edit",
    "Trash",
    "Save",
    "Copy",
    "Cut",
    "Paste",
    "Undo",
    "Redo",
    "Archive",
    "Folder",
    "File",
    "FileText",
    "Database",
    "Server",
    "Cloud",
    "Wifi",
    "Bluetooth",
    "Smartphone",
    "Tablet",
    "Laptop",
    "Monitor",
    "Printer",
    "Mouse",
    "Keyboard",
    "Headphones",
    "Mic",
    "AlertTriangle",
    "AlertCircle",
    "Info",
    "HelpCircle",
    "CheckSquare",
    "X",
    "Lock",
    "Unlock",
    "Eye",
    "EyeOff",
    "ThumbsUp",
    "ThumbsDown",
    "MessageSquare",
    "MessageCircle",
    "Bell",
    "BellOff",
  ];

  // Component library categories with simplified organization
  const componentLibrary: ComponentLibrary = {
    recommended: [
      {
        id: "hero",
        label: "Hero Banner",
        description: "Main banner with title and image",
        icon: (<Layers className="h-8 w-8 mb-1" />) as ReactNode,
        category: "essential",
        difficulty: "easy",
      },
      {
        id: "heading",
        label: "Heading",
        description: "Section title",
        icon: (<Type className="h-8 w-8 mb-1" />) as ReactNode,
        category: "text",
        difficulty: "easy",
      },
      {
        id: "paragraph",
        label: "Text Block",
        description: "Paragraph of text",
        icon: (<FileText className="h-8 w-8 mb-1" />) as ReactNode,
        category: "text",
        difficulty: "easy",
      },
      {
        id: "image",
        label: "Image",
        description: "Single image with caption",
        icon: (<ImageIcon className="h-8 w-8 mb-1" />) as ReactNode,
        category: "media",
        difficulty: "easy",
      },
      {
        id: "feature-grid",
        label: "Features Grid",
        description: "Grid of features or programs",
        icon: (<LayoutGrid className="h-8 w-8 mb-1" />) as ReactNode,
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
        ) as ReactNode,
        category: "interactive",
        difficulty: "easy",
      },
      {
        id: "cta-banner",
        label: "Call to Action Banner",
        description: "Banner with button",
        icon: (<Megaphone className="h-8 w-8 mb-1" />) as ReactNode,
        category: "essential",
        difficulty: "easy",
      },
      {
        id: "cta",
        label: "Call to Action",
        description: "Simple CTA with title, description and button",
        icon: (<Megaphone className="h-8 w-8 mb-1" />) as ReactNode,
        category: "essential",
        difficulty: "easy",
      },
      {
        id: "contact",
        label: "Contact Information",
        description: "Contact details with image and text",
        icon: (<MessageSquare className="h-8 w-8 mb-1" />) as ReactNode,
        category: "essential",
        difficulty: "easy",
      },
      {
        id: "courses",
        label: "Courses Grid",
        description: "Display courses with pricing and details",
        icon: (<BookOpen className="h-8 w-8 mb-1" />) as ReactNode,
        category: "essential",
        difficulty: "medium",
      },
      {
        id: "products",
        label: "Products Grid",
        description:
          "Display products from courses data with auto-mapped content",
        icon: (<ShoppingBag className="h-8 w-8 mb-1" />) as ReactNode,
        category: "essential",
        difficulty: "easy",
      },
      {
        id: "carousel",
        label: "Animated Carousel",
        description: "Interactive carousel with animated text and buttons",
        icon: (<LayoutGrid className="h-8 w-8 mb-1" />) as ReactNode,
        category: "essential",
        difficulty: "medium",
      },
      {
        id: "allProducts",
        label: "All Products Page",
        description:
          "Complete products showcase with search, filters, and sorting",
        icon: (<Grid className="h-8 w-8 mb-1" />) as ReactNode,
        category: "essential",
        difficulty: "advanced",
      },
      {
        id: "gallery",
        label: "Image Gallery",
        description: "Collection of images",
        icon: (<Grid className="h-8 w-8 mb-1" />) as ReactNode,
        category: "media",
        difficulty: "medium",
      },
      {
        id: "testimonials",
        label: "Testimonials",
        description: "Customer testimonials grid",
        icon: (<MessageSquare className="h-8 w-8 mb-1" />) as ReactNode,
        category: "social",
        difficulty: "medium",
      },
    ],
    content: [
      {
        id: "heading",
        label: "Heading",
        description: "Section title",
        icon: (<Type className="h-8 w-8 mb-1" />) as ReactNode,
        category: "text",
        difficulty: "easy",
      },
      {
        id: "subheading",
        label: "Subheading",
        description: "Smaller heading",
        icon: (<Type className="h-6 w-6 mb-1" />) as ReactNode,
        category: "text",
        difficulty: "easy",
      },
      {
        id: "paragraph",
        label: "Text Block",
        description: "Paragraph of text",
        icon: (<FileText className="h-8 w-8 mb-1" />) as ReactNode,
        category: "text",
        difficulty: "easy",
      },
      {
        id: "quote",
        label: "Quote",
        description: "Highlighted quotation",
        icon: (<MessageSquare className="h-8 w-8 mb-1" />) as ReactNode,
        category: "text",
        difficulty: "easy",
      },
      {
        id: "list",
        label: "List",
        description: "Bullet or numbered list",
        icon: (<ListOrdered className="h-8 w-8 mb-1" />) as ReactNode,
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
        ) as ReactNode,
        category: "interactive",
        difficulty: "easy",
      },
      {
        id: "divider",
        label: "Divider",
        description: "Horizontal line",
        icon: (<Separator className="h-1 w-8 mb-1" />) as ReactNode,
        category: "layout",
        difficulty: "easy",
      },
      {
        id: "spacer",
        label: "Spacer",
        description: "Adds vertical space",
        icon: (<ArrowLeft className="h-8 w-8 mb-1 rotate-90" />) as ReactNode,
        category: "layout",
        difficulty: "easy",
      },
    ],
    media: [
      {
        id: "image",
        label: "Image",
        description: "Single image with caption",
        icon: (<ImageIcon className="h-8 w-8 mb-1" />) as ReactNode,
        category: "media",
        difficulty: "easy",
      },
      {
        id: "gallery",
        label: "Image Gallery",
        description: "Collection of images",
        icon: (<Grid className="h-8 w-8 mb-1" />) as ReactNode,
        category: "media",
        difficulty: "medium",
      },
      {
        id: "video",
        label: "Video",
        description: "Embedded video",
        icon: (<Video className="h-8 w-8 mb-1" />) as ReactNode,
        category: "media",
        difficulty: "medium",
      },
    ],
    school: [
      {
        id: "calendar",
        label: "School Calendar",
        description: "Events and dates",
        icon: (<Calendar className="h-8 w-8 mb-1" />) as ReactNode,
        category: "essential",
        difficulty: "medium",
      },
      {
        id: "staff-directory",
        label: "Staff Directory",
        description: "Faculty and staff listing",
        icon: (<Users className="h-8 w-8 mb-1" />) as ReactNode,
        category: "essential",
        difficulty: "medium",
      },
      {
        id: "news",
        label: "School News",
        description: "News and announcements",
        icon: (<Newspaper className="h-8 w-8 mb-1" />) as ReactNode,
        category: "community",
        difficulty: "medium",
      },
      {
        id: "contact_form",
        label: "Contact Form",
        description: "Form for inquiries",
        icon: (<Pencil className="h-8 w-8 mb-1" />) as ReactNode,
        category: "interactive",
        difficulty: "advanced",
      },
      {
        id: "courses",
        label: "Courses Grid",
        description: "Display courses with pricing and details",
        icon: (<BookOpen className="h-8 w-8 mb-1" />) as ReactNode,
        category: "essential",
        difficulty: "medium",
      },
    ],
  };

  // Filter components based on search query
  const filterComponents = (components: any[], query: string) => {
    if (!query) return components;
    return components.filter(
      (component) =>
        component.label.toLowerCase().includes(query.toLowerCase()) ||
        component.description.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Get filtered components
  const filteredRecommended = filterComponents(
    componentLibrary.recommended,
    searchQuery
  );
  const filteredContent = filterComponents(
    componentLibrary.content,
    searchQuery
  );
  const filteredMedia = filterComponents(componentLibrary.media, searchQuery);
  const filteredSchool = filterComponents(componentLibrary.school, searchQuery);

  // Add getDefaultPageContent function
  const getDefaultPageContent = (pageType: string) => {
    const commonHeader = {
      id: "header",
      type: "Header",
      label: "Header",
      content: {
        logo: "School Logo",
        menuItems: [
          "Home",
          "About",
          "Academics",
          "Calendar",
          "Contact",
          "Pricing",
        ],
      },
    };

    const commonFooter = {
      id: "footer",
      type: "Footer",
      label: "Footer",
      content: {
        columns: [
          { title: "About Us", links: ["Mission", "Staff", "History"] },
          { title: "Academics", links: ["Programs", "Calendar", "Resources"] },
          { title: "Community", links: ["Parents", "Students", "Alumni"] },
          {
            title: "Contact",
            text: "123 School St, Anytown, USA\ninfo@school.edu\n(555) 123-4567",
          },
        ],
        copyright: `© ${new Date().getFullYear()} School Name. All rights reserved.`,
      },
    };

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
              ctaLink: {
                pageId: "",
                link: "#",
              },
              backgroundImage: "/traditional-schoolhouse.png",
              backgroundColor: "",
            },
          },
          {
            id: "features",
            type: "Features",
            label: "Features Grid",
            content: {
              title: "Our Programs",
              items: [
                {
                  title: "Academic Excellence",
                  description:
                    "Rigorous curriculum designed to challenge students",
                },
                {
                  title: "Arts & Athletics",
                  description:
                    "Comprehensive programs for well-rounded development",
                },
                {
                  title: "Student Support",
                  description: "Resources to ensure every student succeeds",
                },
              ],
            },
          },
          {
            id: "contact",
            type: "contact_form",
            label: "Contact Form",
            content: {
              title: "Get in Touch",
              address: "123 Education Street, Learning City, 54321",
              email: "info@schoolname.edu",
              phone: "(555) 123-4567",
              emailSubject: "Inquiry from School Website",
              emailContent:
                "Hello, I would like to know more about your school.",
            },
          },
          commonFooter,
        ];
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
              ctaLink: {
                pageId: "",
                link: "#",
              },
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
        ];
    }
  };

  // Initialize site data from context
  const { id } = use(params);
  useEffect(() => {
    if (id) {
      getSiteById(id);
    }
  }, []);
  useEffect(() => {
    if (selectedSite && sitePages) {
      setCurrentPage(sitePages[0]);
      setPageTitle(sitePages[0]?.title);
    }
  }, [selectedSite, sitePages]);

  // Store page content for each page separately
  const [pagesContent, setPagesContent] = useState<Record<string, any[]>>({});

  // Current page sections
  const [pageSections, setPageSections] = useState<any[]>([]);

  // Initialize page content on first load
  useEffect(() => {
    if (selectedSite && sitePages) {
      // Initialize default content for all pages
      const initialPagesContent: Record<string, any[]> = {};

      sitePages.forEach((page) => {
        initialPagesContent[page.title] = getDefaultPageContent(page.title);
      });
      setPagesContent(initialPagesContent);

      // Set initial page sections to Home page content
      const homePage = sitePages.find((p) => p.is_homepage);
      if (homePage) {
        setPageTitle(homePage.title);
        setPageSections(initialPagesContent[homePage.title]);
      }
    }
  }, [selectedSite, sitePages]);

  // Function to handle preview button click
  const handlePreviewClick = async () => {
    router.push(`/preview/${id}`);
  };

  const handleDragStart = (e: React.DragEvent, componentType: string) => {
    e.dataTransfer.setData("componentType", componentType);
    setIsDragging(true);

    // Show a visual cue for where to drop
    if (canvasRef.current && pageSections.length === 0) {
      const dropZone = document.createElement("div");
      dropZone.className =
        "drop-zone border-2 border-dashed border-primary rounded-md p-8 my-4 flex items-center justify-center";
      dropZone.innerHTML =
        '<div class="text-primary text-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="mx-auto mb-2 h-8 w-8"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg><p>Drop component here</p></div>';
      canvasRef.current.appendChild(dropZone);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);

    // Remove any existing drop indicators
    if (canvasRef.current) {
      const existingIndicators = canvasRef.current.querySelectorAll(
        ".drop-indicator, .drop-zone"
      );
      existingIndicators.forEach((indicator) => indicator.remove());
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();

    const componentType = e.dataTransfer.getData("componentType");
    const sourceIndexStr = e.dataTransfer.getData("sourceIndex");
    const sourceIndex = sourceIndexStr ? parseInt(sourceIndexStr, 10) : null;

    // Find the drop indicator
    const dropIndicator = canvasRef.current?.querySelector(
      ".drop-indicator, .drop-zone"
    );
    let insertIndex = pageSectionsContext.length; // Default to end of the list

    if (dropIndicator) {
      const sections = Array.from(
        canvasRef.current?.querySelectorAll("[data-section-id]") || []
      );
      const nextSection = dropIndicator.nextElementSibling;

      if (nextSection && nextSection.hasAttribute("data-section-id")) {
        const sectionId = nextSection.getAttribute("data-section-id");
        insertIndex = pageSectionsContext.findIndex(
          (section) => section._id === sectionId
        );
      }

      // Remove the drop indicator
      dropIndicator.remove();
    }

    // Create a new section based on the component type
    let newSection;

    switch (componentType) {
      case "hero":
        newSection = {
          type: "hero",
          label: "Hero Banner",
          content: {
            title: "Welcome to Our School",
            subtitle: "Educating tomorrow's leaders today",
            ctaText: "Learn More",
            ctaLink: {
              pageId: "",
              link: "#",
            },
            backgroundColor: "",
            backgroundImage: {
              hide: false,
              src: "/traditional-schoolhouse.png",
              alt: "Traditional schoolhouse",
            },
          },
        };
        break;

      case "heading":
        newSection = {
          type: "heading",
          label: "Heading",
          content: {
            text: "New Section Heading",
            level: 2,
            backgroundColor: "",
            backgroundImage: {
              hide: true,
              src: "",
              alt: "",
            },
          },
        };
        break;

      case "feature-grid":
        newSection = {
          type: "features",
          label: "Features Grid",
          content: {
            title: "Features Section",
            backgroundColor: "#f8fafc",
            items: [
              {
                title: "Quality Education",
                description:
                  "Providing excellent education with modern teaching methods",
                icon: "BookOpen",
              },
              {
                title: "Expert Teachers",
                description: "Learn from experienced and qualified educators",
                icon: "Users",
              },
              {
                title: "Modern Facilities",
                description:
                  "State-of-the-art classrooms and learning environments",
                icon: "Building",
              },
            ],
          },
        };
        break;

      case "testimonials":
        newSection = {
          type: "testimonials",
          label: "Testimonials",
          content: {
            title: "What Our Students Say",
            backgroundColor: "",
            backgroundImage: {
              hide: true,
              src: "",
              alt: "",
            },
            testimonials: [
              {
                quote:
                  "This school has transformed my learning experience. The teachers are amazing!",
                author: "Sarah Johnson",
                role: "Student",
                image: "",
                rating: 5,
              },
              {
                quote:
                  "The best decision I made was choosing this school for my education.",
                author: "Michael Chen",
                role: "Graduate",
                image: "",
                rating: 5,
              },
              {
                quote:
                  "Outstanding facilities and dedicated staff. Highly recommended!",
                author: "Emily Rodriguez",
                role: "Parent",
                image: "",
                rating: 5,
              },
            ],
          },
        };
        break;

      case "cta":
        newSection = {
          type: "cta",
          label: "Call to Action",
          content: {
            title: "Ready to Get Started?",
            description:
              "Join our school community and start your educational journey today.",
            buttonText: "Apply Now",
            buttonLink: {
              pageId: "",
              link: "#",
            },
          },
        };
        break;

      case "contact_form":
        newSection = {
          type: "contact_form",
          label: "Contact Form",
          content: {
            backgroundColor: "",
            backgroundImage: {
              hide: true,
              src: "",
              alt: "",
            },
            textPosition: "left",
            image: {
              hide: false,
              src: "/placeholder.svg?height=400&width=400",
              alt: "Contact us",
            },
            title: "Get in Touch",
            address: "123 Education Street, Learning City, 54321",
            email: "info@schoolname.edu",
            phone: "(555) 123-4567",
            description:
              "We'd love to hear from you. Send us a message and we'll respond as soon as possible.",
            buttonText: "Send Message",
            buttonLink: {
              pageId: "",
              link: "#",
            },
          },
        };
        break;

      case "courses":
        newSection = {
          type: "courses",
          label: "Courses Grid",
          content: {
            title: "Our Courses",
            description:
              "Explore our comprehensive range of educational programs",
            courses: [
              {
                name: "Mathematics Excellence",
                description:
                  "Advanced mathematics program covering algebra, geometry, and calculus",
                image: "/placeholder.svg?height=300&width=400",
                video: "",
                price: "299",
                duration: "12",
              },
              {
                name: "Science Discovery",
                description:
                  "Comprehensive science program covering physics, chemistry, and biology",
                image: "/placeholder.svg?height=300&width=400",
                video: "",
                price: "349",
                duration: "16",
              },
              {
                name: "Language Arts",
                description:
                  "Complete language arts program focusing on reading, writing, and communication",
                image: "/placeholder.svg?height=300&width=400",
                video: "",
                price: "249",
                duration: "10",
              },
            ],
          },
        };
        break;

      case "products":
        newSection = {
          type: "products",
          label: "Products Grid",
          content: {
            title: "Our Products",
            description: "Explore our range of educational products",
            showAllButton: {
              show: false,
              text: "Show more",
              link: "",
              pageId: "",
            },
          },
        };
        break;

      case "carousel":
        newSection = {
          type: "carousel",
          label: "Animated Carousel",
          content: {
            backgroundColor: "#f0f9ff",
            textPosition: "left",
            items: [
              {
                title: "Welcome to Our School",
                descriptions: [
                  "Discover excellence in education",
                  "Building tomorrow's leaders today",
                  "Join our community of learners",
                ],
                image: "/placeholder.svg?height=400&width=600",
                buttons: [
                  {
                    text: "Learn More",
                    link: "#about",
                    pageId: "",
                  },
                  {
                    text: "Apply Now",
                    link: "#apply",
                    pageId: "",
                  },
                ],
              },
              {
                title: "Academic Excellence",
                descriptions: [
                  "Innovative curriculum design",
                  "Expert faculty guidance",
                  "State-of-the-art facilities",
                ],
                image: "/placeholder.svg?height=400&width=600",
                buttons: [
                  {
                    text: "View Programs",
                    link: "#programs",
                    pageId: "",
                  },
                ],
              },
            ],
          },
        };
        break;

      case "allProducts":
        newSection = {
          type: "allProducts",
          label: "All Products Page",
          content: {
            title: "All Products",
            description:
              "Browse our complete collection of educational products",
            showSearch: true,
            showFilters: true,
            showSorting: true,
            itemsPerPage: 12,
            layout: "grid", // grid or list (default: grid)
          },
        };
        break;

      case "video":
        newSection = {
          type: "video",
          label: "Video",
          content: {
            backgroundColor: "",
            backgroundImage: {
              hide: true,
              src: "",
              alt: "",
            },
            title: "Video Section",
            description: "Watch our featured video content",
            textPosition: "center",
            video: "https://www.youtube.com/embed/v3n2kr8nHVw",
          },
        };
        break;

      // Add additional component types here...

      default:
        newSection = {
          type: "generic",
          label: "New Section",
          content: {},
        };
    }

    if (currentPage) {
      createNewSection({
        page_id: currentPage._id,
        type: newSection.type as SectionType,
        label: newSection.label,
        content: newSection.content,
        order_index: insertIndex, // 🔥 Use the drop index here!
      });
    }

    setIsDragging(false);

    addToast({
      title: "Component added",
      description: `Added ${newSection.label} to the page. Click on the component to edit its content.`,
    });

    if (showTutorial && pageSections.length === 0 && tutorialStep === 1) {
      setTutorialStep(2);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();

    // Remove any existing drop zones
    if (canvasRef.current) {
      const existingDropZones =
        canvasRef.current.querySelectorAll(".drop-zone");
      existingDropZones.forEach((zone) => zone.remove());
    }

    if (canvasRef.current) {
      // Get the mouse position relative to the canvas
      const canvasRect = canvasRef.current.getBoundingClientRect();
      const mouseY = e.clientY - canvasRect.top;

      // Find the closest section to the mouse position
      const sections = canvasRef.current.querySelectorAll("[data-section-id]");
      let closestSection: Element | null = null;
      let closestDistance = Number.POSITIVE_INFINITY;
      let insertBefore = true;

      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top - canvasRect.top;
        const sectionBottom = rect.bottom - canvasRect.top;
        const distanceToTop = Math.abs(mouseY - sectionTop);
        const distanceToBottom = Math.abs(mouseY - sectionBottom);

        if (distanceToTop < closestDistance) {
          closestDistance = distanceToTop;
          closestSection = section;
          insertBefore = true;
        }

        if (distanceToBottom < closestDistance) {
          closestDistance = distanceToBottom;
          closestSection = section;
          insertBefore = false;
        }
      });

      // Remove any existing drop indicators
      const existingIndicators =
        canvasRef.current.querySelectorAll(".drop-indicator");
      existingIndicators.forEach((indicator) => indicator.remove());

      // Add a drop indicator
      if (closestSection) {
        const indicator = document.createElement("div");
        indicator.className =
          "drop-indicator h-2 bg-primary w-full my-2 rounded-full transition-all flex items-center justify-center";

        // Add a plus icon in the middle of the indicator
        indicator.innerHTML =
          '<div class="bg-primary text-white rounded-full h-6 w-6 flex items-center justify-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="h-4 w-4"><path d="M12 5v14M5 12h14"/></svg></div>';

        if (insertBefore) {
          (closestSection as HTMLElement).insertAdjacentElement(
            "beforebegin",
            indicator
          );
        } else {
          (closestSection as HTMLElement).insertAdjacentElement(
            "afterend",
            indicator
          );
        }
      } else if (sections.length === 0) {
        // If there are no sections, add an indicator at the end
        const indicator = document.createElement("div");
        indicator.className =
          "drop-zone border-2 border-dashed border-primary rounded-md p-8 my-4 flex items-center justify-center";
        indicator.innerHTML =
          '<div class="text-primary text-center"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" class="mx-auto mb-2 h-8 w-8"><path d="M12 5v14"></path><path d="M5 12h14"></path></svg><p>Drop component here</p></div>';
        canvasRef.current.appendChild(indicator);
      }
    }
  };

  const handleElementSelect = (elementId: string) => {
    const section = pageSectionsContext.find((s) => s._id === elementId);
    if (section) {
      setSelectedElement(elementId === selectedElement ? null : elementId);
      setTempContent(section.content);

      // If selecting an element and the right panel is collapsed, expand it
      if (
        elementId !== selectedElement &&
        elementId !== null &&
        rightPanelCollapsed
      ) {
        setRightPanelCollapsed(false);
      }

      // If this is the first time selecting an element and tutorial is active, advance to next step
      if (showTutorial && tutorialStep === 2 && selectedElement === null) {
        setTutorialStep(3);
      }
    }
  };

  const handleContentChange = (field: string, value: any) => {
    setTempContent((prev: any) => {
      if (field.includes(".")) {
        // Handle nested object properties
        const keys = field.split(".");
        const newContent = { ...prev };
        let current = newContent;

        // Navigate to the nested object
        for (let i = 0; i < keys.length - 1; i++) {
          if (!current[keys[i]]) {
            current[keys[i]] = {};
          }
          current = current[keys[i]];
        }

        // Set the final value
        current[keys[keys.length - 1]] = value;
        return newContent;
      } else {
        // Handle simple properties
        return {
          ...prev,
          [field]: value,
        };
      }
    });
  };

  const handleUpdateElementContent = async () => {
    if (!selectedElement || !tempContent) return;

    try {
      await updateSectionData(selectedElement, {
        content: tempContent,
      });

      // Update local state
      setPageSections((prev) =>
        prev.map((s) =>
          s._id === selectedElement
            ? {
                ...s,
                content: tempContent,
              }
            : s
        )
      );

      // Clear selection
      setSelectedElement(null);
      setTempContent(null);
    } catch (error) {
      console.error("Error updating section content:", error);
      addToast({
        title: "Error",
        description: "Failed to update section content",
        variant: "destructive",
      });
    }
  };

  const handleDeleteElement = (elementId: string) => {
    setElementToDelete(elementId);
    setShowDeleteDialog(true);
  };

  const confirmDeleteElement = () => {
    if (elementToDelete) {
      // const updatedSections = pageSections.filter(
      //   (section) => section.id !== elementToDelete
      // );
      // setPageSections(updatedSections);

      // // Update the content for the current page
      // setPagesContent({
      //   ...pagesContent,
      //   [pageTitle]: updatedSections,
      // });
      deleteSectionData(elementToDelete);
      setSelectedElement(null);
      setElementToDelete(null);
      setShowDeleteDialog(false);

      addToast({
        title: "Component deleted",
        description: "The component has been removed from the page",
      });
    }
  };

  const handleMoveElement = async (
    element: Section,
    direction: "up" | "down"
  ) => {
    const currentIndex = element.order_index;

    if (!element) return;

    const newIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    // Check if the new index is valid
    if (newIndex < 0 || newIndex >= pageSections.length) return;

    await updateSectionsOrder(element._id, newIndex);
    // Create a new array with the element moved
  };

  // const handleSave = async () => {
  //   if (!pageId) {
  //     console.log("No page selected");
  //     addToast({
  //       title: "Error",
  //       description: "No page selected",
  //       variant: "destructive",
  //     });
  //     return;
  //   }

  //   setIsSaving(true);

  //   try {
  //     // Save the current page data
  //     await updatePageData(pageId, {
  //       title: pageTitle,
  //       slug: pageTitle.toLowerCase().replace(/\s+/g, "-"),
  //       is_homepage: pageTitle.toLowerCase() === "home",
  //     });

  //     // Save all sections for the current page
  //     for (const section of pageSections) {
  //       await createNewSection({
  //         page_id: pageId,
  //         type: section.type,
  //         label: section.label,
  //         order_index: pageSections.indexOf(section),
  //         content: section.content,
  //       });
  //     }

  //     // Show success message
  //     setShowSaveDialog(true);

  //     // If tutorial is active and this is the first save, advance to next step
  //     if (showTutorial && tutorialStep === 3) {
  //       setTutorialStep(4);
  //     }
  //   } catch (error) {
  //     console.error("Error saving site:", error);
  //     addToast({
  //       title: "Error saving site",
  //       description: "An unexpected error occurred while saving your site.",
  //       variant: "destructive",
  //     });
  //   } finally {
  //     setIsSaving(false);
  //   }
  // };

  const handleSiteSettingsUpdate = async (newSettings: any) => {
    try {
      // Update the site settings
      await updateSiteSettingsData(id, newSettings);

      // Close the settings panel
      setShowSiteSettings(false);

      // Show success message
      addToast({
        title: "Settings updated",
        description:
          "Your site design settings have been updated successfully.",
      });
    } catch (error) {
      console.error("Error updating settings:", error);
      addToast({
        title: "Error updating settings",
        description:
          "An unexpected error occurred while updating your settings.",
        variant: "destructive",
      });
    }
  };

  const handleAddPage = async () => {
    // Show a prompt to get the page name
    const pageName = prompt("Enter page name:");
    if (pageName && pageName.trim() !== "") {
      try {
        // Create new page in the context
        await createNewPage({
          site_id: id,
          title: pageName.trim(),
          slug: pageName.trim().toLowerCase().replace(/\s+/g, "-"),
          is_homepage: false,
          order_index: sitePages.length,
        });

        // Create default content for the new page
        const newPageContent = getDefaultPageContent(pageName.trim());
        setPagesContent({
          ...pagesContent,
          [pageName.trim()]: newPageContent,
        });

        // Switch to the new page and load default content
        setPageTitle(pageName.trim());
        setPageSections(newPageContent);

        addToast({
          title: "Page added",
          description: `Added ${pageName.trim()} page to the site`,
        });
      } catch (error) {
        console.error("Error adding page:", error);
        addToast({
          title: "Error adding page",
          description: "An unexpected error occurred while adding the page.",
          variant: "destructive",
        });
      }
    }
  };

  const handleDeletePage = async (page: string) => {
    if (sitePages.length <= 1) {
      addToast({
        title: "Cannot delete page",
        description: "You must have at least one page in your site",
        variant: "destructive",
      });
      return;
    }

    setPageToDelete(page);
    setShowDeletePageDialog(true);
  };

  const confirmDeletePage = async () => {
    if (pageToDelete) {
      try {
        // Find the page ID
        const pageToDeleteObj = sitePages.find((p) => p.title === pageToDelete);
        if (!pageToDeleteObj) return;

        // Delete the page
        await deletePageData(pageToDeleteObj._id);

        // Remove the page content
        const updatedPagesContent = { ...pagesContent };
        delete updatedPagesContent[pageToDelete];
        setPagesContent(updatedPagesContent);

        // If the current page is being deleted, switch to the first available page
        if (pageTitle === pageToDelete) {
          const newCurrentPage = sitePages[0].title;
          setPageTitle(newCurrentPage);
          setPageSections(updatedPagesContent[newCurrentPage] || []);
        }

        setPageToDelete(null);
        setShowDeletePageDialog(false);

        addToast({
          title: "Page deleted",
          description: `Deleted ${pageToDelete} page from the site`,
        });
      } catch (error) {
        console.error("Error deleting page:", error);
        addToast({
          title: "Error deleting page",
          description: "An unexpected error occurred while deleting the page.",
          variant: "destructive",
        });
      }
    }
  };

  const handleSwitchPage = async (page: Page) => {
    if (!page._id) {
      addToast({
        title: "Error",
        description: "No page selected",
        variant: "destructive",
      });
      return;
    }

    try {
      // Save current page data
      // await updatePageData(page._id, {
      //   title: page.title,
      //   slug: page.title.toLowerCase().replace(/\s+/g, "-"),
      //   is_homepage: page.title.toLowerCase() === "home",
      // });

      // // Save all sections for the current page
      // for (const section of pageSections) {
      //   await createNewSection({
      //     page_id: page._id,
      //     type: section.type,
      //     label: section.label,
      //     order_index: pageSections.indexOf(section),
      //     content: section.content,
      //   });
      // }
      setCurrentPage(page);
      // Switch to the selected page
      setPageTitle(page.title);

      // Load the content for the selected page
      if (pagesContent[page.title]) {
        setPageSections(pagesContent[page.title]);
      } else {
        // If no content exists for this page, create default content
        const defaultContent = getDefaultPageContent(page.title);
        setPageSections(defaultContent);
        setPagesContent({
          ...pagesContent,
          [page.title]: defaultContent,
        });
      }

      // Clear selected element
      setSelectedElement(null);
    } catch (error) {
      console.error("Error switching pages:", error);
      addToast({
        title: "Error switching pages",
        description: "An unexpected error occurred while switching pages.",
        variant: "destructive",
      });
    }
  };

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
`;

  useEffect(() => {
    // Add the style for drop indicators
    const style = document.createElement("style");
    style.innerHTML = dropIndicatorStyle;
    document.head.appendChild(style);

    return () => {
      // Clean up the style when the component unmounts
      document.head.removeChild(style);
    };
  }, []);

  // Toggle left panel
  const toggleLeftPanel = () => {
    setLeftPanelCollapsed(!leftPanelCollapsed);
  };

  // Toggle right panel
  const toggleRightPanel = () => {
    setRightPanelCollapsed(!rightPanelCollapsed);
  };

  // Handle panel resize
  const handlePanelResize = (sizes: number[]) => {
    // Store the sizes for when panels are expanded again
    if (sizes[0] > 0) setDefaultLeftPanelSize(sizes[0]);
    if (sizes[2] > 0) setDefaultRightPanelSize(sizes[2]);
  };

  // Render component category
  const renderComponentCategory = (components: any[]) => {
    if (!components || components.length === 0) return null;

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
    );
  };

  // Tutorial content
  const tutorialSteps = [
    {
      title: "Welcome to the Editor!",
      content:
        "This tutorial will guide you through creating your first page. Click 'Next' to continue.",
    },
    {
      title: "Step 1: Add Components",
      content:
        "Drag and drop components from the left sidebar onto your page. Start with a Hero Banner!",
    },
    {
      title: "Step 2: Edit Components",
      content:
        "Click on a component to select it. You can then edit its content in the right panel.",
    },
    {
      title: "Step 3: Save Your Work",
      content:
        "Don't forget to save your changes by clicking the Save button in the top bar.",
    },
    {
      title: "Step 4: Preview Your Site",
      content:
        "Click the Preview button to see how your site will look to visitors.",
    },
  ];

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
      content:
        "Use the Pages section in the left sidebar to add new pages, switch between pages, or delete pages.",
      icon: <FileText className="h-5 w-5 text-primary" />,
    },
    {
      title: "Previewing Your Site",
      content:
        "Click the Preview button in the top bar to see how your site will look to visitors.",
      icon: <Eye className="h-5 w-5 text-primary" />,
    },
    {
      title: "Saving Your Work",
      content:
        "Always remember to save your changes by clicking the Save button in the top bar.",
      icon: <Save className="h-5 w-5 text-primary" />,
    },
    {
      title: "Adjusting Panel Sizes",
      content:
        "Drag the panel dividers to resize the left and right panels. You can also collapse panels completely using the toggle buttons.",
      icon: <MoveHorizontal className="h-5 w-5 text-primary" />,
    },
  ];

  // Get the selected element's data
  const selectedElementData = selectedElement
    ? pageSectionsContext.find((section) => section._id === selectedElement)
    : null;

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
          <Link
            href="/admin/sites"
            className="flex items-center text-sm text-muted-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to sites
          </Link>
        </div>
        <div className="flex items-center gap-2">
          {/* <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowHelpDrawer(true)}
                >
                  <HelpCircle className="mr-2 h-4 w-4" />
                  Help
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Get help with using the editor</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider> */}

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowSiteSettings(true)}
                >
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
                <Button
                  // variant="outline"
                  size="sm"
                  onClick={handlePreviewClick}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Preview
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Preview how your site will look</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          {/* <TooltipProvider>
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
          </TooltipProvider> */}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        <ResizablePanelGroup
          direction="horizontal"
          onLayout={handlePanelResize}
          className="h-full w-full"
        >
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
                  {sitePages.map((page) => (
                    <div key={page._id} className="flex items-center">
                      <Button
                        variant={
                          page.title === pageTitle ? "secondary" : "ghost"
                        }
                        className="w-full justify-start"
                        onClick={() => {
                          handleSwitchPage(page);

                          setPageTitle(page.title);
                        }}
                      >
                        {page.title}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 ml-1"
                        onClick={() => handleDeletePage(page.title)}
                      >
                        <X className="h-4 w-4 text-muted-foreground hover:text-destructive" />
                      </Button>
                    </div>
                  ))}
                  <Button
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={handleAddPage}
                  >
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

              <Tabs
                defaultValue="recommended"
                className="flex-1"
                value={activeTab}
                onValueChange={setActiveTab}
              >
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

                <TabsContent
                  value="recommended"
                  className="p-0 data-[state=active]:block overflow-y-auto"
                >
                  <div className="p-4 space-y-4">
                    {filteredRecommended.length > 0 ? (
                      <div>
                        <div className="mb-3">
                          <h3 className="text-sm font-medium mb-1">
                            Recommended Components
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Drag and drop these onto your page
                          </p>
                        </div>
                        {renderComponentCategory(filteredRecommended)}
                      </div>
                    ) : searchQuery ? (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-medium mb-1">
                          No components found
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Try a different search term
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent
                  value="content"
                  className="p-0 data-[state=active]:block overflow-y-auto"
                >
                  <div className="p-4 space-y-4">
                    {filteredContent.length > 0 ? (
                      <div>
                        <div className="mb-3">
                          <h3 className="text-sm font-medium mb-1">
                            Text & Content
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Add text and basic content elements
                          </p>
                        </div>
                        {renderComponentCategory(filteredContent)}
                      </div>
                    ) : searchQuery ? (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-medium mb-1">
                          No components found
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Try a different search term
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent
                  value="media"
                  className="p-0 data-[state=active]:block overflow-y-auto"
                >
                  <div className="p-4 space-y-4">
                    {filteredMedia.length > 0 ? (
                      <div>
                        <div className="mb-3">
                          <h3 className="text-sm font-medium mb-1">
                            Images & Media
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Add images, videos, and galleries
                          </p>
                        </div>
                        {renderComponentCategory(filteredMedia)}
                      </div>
                    ) : searchQuery ? (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-medium mb-1">
                          No components found
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Try a different search term
                        </p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center py-4">
                        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent
                  value="school"
                  className="p-0 data-[state=active]:block overflow-y-auto"
                >
                  <div className="p-4 space-y-4">
                    {filteredSchool.length > 0 ? (
                      <div>
                        <div className="mb-3">
                          <h3 className="text-sm font-medium mb-1">
                            School Components
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            Specialized components for schools
                          </p>
                        </div>
                        {renderComponentCategory(filteredSchool)}
                      </div>
                    ) : searchQuery ? (
                      <div className="text-center py-8">
                        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-muted mb-4">
                          <Search className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <h3 className="text-sm font-medium mb-1">
                          No components found
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          Try a different search term
                        </p>
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
              leftPanelCollapsed && rightPanelCollapsed
                ? 100
                : 100 - defaultLeftPanelSize - defaultRightPanelSize
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
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleLeftPanel}
                        >
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
                        variant={
                          activeView === "desktop" ? "secondary" : "ghost"
                        }
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
                        variant={
                          activeView === "tablet" ? "secondary" : "ghost"
                        }
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
                        variant={
                          activeView === "mobile" ? "secondary" : "ghost"
                        }
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
                  activeView === "desktop"
                    ? "w-full max-w-6xl"
                    : activeView === "tablet"
                    ? "w-[768px]"
                    : "w-[375px]"
                }`}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                ref={canvasRef}
              >
                {/* Page content */}
                <div className="min-h-[800px] p-4 border-2 border-dashed border-muted-foreground/20 rounded-md">
                  {pageSectionsContext.length === 0 && !isDragging && (
                    <div className="h-full flex flex-col items-center justify-center text-center p-8">
                      <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                        <Plus className="h-8 w-8 text-primary" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">
                        This page is empty
                      </h3>
                      <p className="text-muted-foreground mb-6 max-w-md">
                        Drag and drop components from the sidebar to build your{" "}
                        {pageTitle} page.
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
                            const defaultContent =
                              getDefaultPageContent(pageTitle);
                            setPageSections(defaultContent);
                            setPagesContent({
                              ...pagesContent,
                              [pageTitle]: defaultContent,
                            });
                          }}
                          className="mt-2"
                        >
                          Use Template Content
                        </Button>
                      </div>
                    </div>
                  )}
                  {pageSectionsContext.map((section) => (
                    <div
                      key={section._id}
                      data-section-id={section._id}
                      className={`mb-6 p-4 border rounded-md ${
                        selectedElement === section._id
                          ? "ring-2 ring-primary"
                          : "border-muted"
                      } bg-muted/20 cursor-pointer relative group`}
                      onClick={() => handleElementSelect(section._id)}
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
                                  e.stopPropagation();
                                  handleMoveElement(section, "up");
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
                                  e.stopPropagation();
                                  handleMoveElement(section, "down");
                                }}
                                disabled={
                                  pageSections.indexOf(section) ===
                                  pageSections.length - 1
                                }
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
                                  e.stopPropagation();
                                  handleDeleteElement(section._id);
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
                        {section.type === "hero" && (
                          <div
                            className="p-8 rounded-lg"
                            style={{
                              backgroundColor:
                                section.content.backgroundColor ||
                                "transparent",
                              backgroundImage:
                                section.content.backgroundImage?.hide ===
                                  false && section.content.backgroundImage?.src
                                  ? `url(${section.content.backgroundImage.src})`
                                  : "none",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <div className="flex flex-col items-center text-center">
                              <h2
                                className="text-4xl font-bold mb-4"
                                style={{
                                  color:
                                    section.content.backgroundColor ||
                                    section.content.backgroundImage?.hide ===
                                      false
                                      ? "white"
                                      : "inherit",
                                  textShadow:
                                    section.content.backgroundImage?.hide ===
                                    false
                                      ? "2px 2px 4px rgba(0,0,0,0.7)"
                                      : "none",
                                }}
                              >
                                {section.content.title}
                              </h2>
                              <p
                                className="text-lg mb-6"
                                style={{
                                  color:
                                    section.content.backgroundColor ||
                                    section.content.backgroundImage?.hide ===
                                      false
                                      ? "white"
                                      : "inherit",
                                  textShadow:
                                    section.content.backgroundImage?.hide ===
                                    false
                                      ? "1px 1px 2px rgba(0,0,0,0.7)"
                                      : "none",
                                }}
                              >
                                {section.content.subtitle}
                              </p>
                              {section.content.ctaText && (
                                <Button
                                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                                  style={{
                                    boxShadow:
                                      section.content.backgroundImage?.hide ===
                                      false
                                        ? "0 4px 8px rgba(0,0,0,0.3)"
                                        : "none",
                                    backgroundColor: primaryColor,
                                  }}
                                >
                                  {section.content.ctaText}
                                </Button>
                              )}
                            </div>
                          </div>
                        )}

                        {section.type === "heading" && (
                          <div
                            className="mt-6 text-center p-6 rounded-lg"
                            style={{
                              backgroundColor:
                                section.content.backgroundColor ||
                                "transparent",
                              backgroundImage:
                                section.content.backgroundImage?.hide ===
                                  false && section.content.backgroundImage?.src
                                  ? `url(${section.content.backgroundImage.src})`
                                  : "none",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <h2
                              className={`font-bold ${
                                section.content.level === 1
                                  ? "text-4xl"
                                  : section.content.level === 2
                                  ? "text-2xl"
                                  : "text-xl"
                              }`}
                              style={{
                                color:
                                  section.content.backgroundColor ||
                                  section.content.backgroundImage?.hide ===
                                    false
                                    ? "white"
                                    : textColor || "inherit",
                                textShadow:
                                  section.content.backgroundImage?.hide ===
                                  false
                                    ? "2px 2px 4px rgba(0,0,0,0.7)"
                                    : "none",
                              }}
                            >
                              {section.content.text}
                            </h2>
                          </div>
                        )}

                        {section.type === "paragraph" && (
                          <div className="mt-6 text-center">
                            <p className="text-md text-muted-foreground">
                              {section.content.text}
                            </p>
                          </div>
                        )}

                        {section.type === "features" && (
                          <div
                            className="mt-6 p-6 rounded-lg"
                            style={{
                              backgroundColor:
                                section.content.backgroundColor || "#f8fafc",
                            }}
                          >
                            <h3 className="text-lg font-medium mb-6 text-center">
                              {section.content.title}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {(section.content.items || []).map(
                                (item: any, index: number) => {
                                  // Simple icon rendering - in a real implementation you'd dynamically import
                                  const renderIcon = () => {
                                    switch (item.icon) {
                                      case "BookOpen":
                                        return (
                                          <BookOpen className="h-8 w-8 text-primary" />
                                        );
                                      case "Users":
                                        return (
                                          <Users className="h-8 w-8 text-primary" />
                                        );
                                      case "Building":
                                        return (
                                          <Grid className="h-8 w-8 text-primary" />
                                        ); // Using Grid as Building fallback
                                      case "Star":
                                        return (
                                          <Star className="h-8 w-8 text-primary" />
                                        );
                                      case "CheckCircle":
                                        return (
                                          <Check className="h-8 w-8 text-primary" />
                                        );
                                      case "Award":
                                        return (
                                          <Star className="h-8 w-8 text-primary" />
                                        ); // Using Star as Award fallback
                                      case "Shield":
                                        return (
                                          <Shield className="h-8 w-8 text-primary" />
                                        );
                                      case "Globe":
                                        return (
                                          <Grid className="h-8 w-8 text-primary" />
                                        ); // Using Grid as Globe fallback
                                      case "Lightbulb":
                                        return (
                                          <Lightbulb className="h-8 w-8 text-primary" />
                                        );
                                      case "Target":
                                        return (
                                          <Target className="h-8 w-8 text-primary" />
                                        );
                                      default:
                                        return (
                                          <Star className="h-8 w-8 text-primary" />
                                        );
                                    }
                                  };

                                  return (
                                    <Card
                                      key={index}
                                      className="p-6 text-center hover:shadow-md transition-shadow"
                                    >
                                      <div className="flex flex-col items-center space-y-4">
                                        <div className="p-3 bg-primary/10 rounded-full">
                                          {renderIcon()}
                                        </div>
                                        <div>
                                          <h4 className="text-lg font-semibold mb-2">
                                            {item.title}
                                          </h4>
                                          <p className="text-sm text-muted-foreground">
                                            {item.description}
                                          </p>
                                        </div>
                                      </div>
                                    </Card>
                                  );
                                }
                              )}
                            </div>
                          </div>
                        )}

                        {section.type === "testimonials" && (
                          <div
                            className="mt-6 p-6 rounded-lg"
                            style={{
                              backgroundColor:
                                section.content.backgroundColor ||
                                "transparent",
                              backgroundImage:
                                section.content.backgroundImage?.hide ===
                                  false && section.content.backgroundImage?.src
                                  ? `url(${section.content.backgroundImage.src})`
                                  : "none",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <h3
                              className="text-lg font-medium mb-6 text-center"
                              style={{
                                color:
                                  section.content.backgroundColor ||
                                  section.content.backgroundImage?.hide ===
                                    false
                                    ? "white"
                                    : "inherit",
                                textShadow:
                                  section.content.backgroundImage?.hide ===
                                  false
                                    ? "2px 2px 4px rgba(0,0,0,0.7)"
                                    : "none",
                              }}
                            >
                              {section.content.title}
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                              {(section.content.testimonials || []).map(
                                (testimonial: any, index: number) => (
                                  <Card
                                    key={index}
                                    className="p-4 text-center bg-white/90 backdrop-blur-sm"
                                  >
                                    {/* Author Image */}
                                    {testimonial.image && (
                                      <div className="mb-3 flex justify-center">
                                        <img
                                          src={testimonial.image}
                                          alt={testimonial.author}
                                          className="w-12 h-12 rounded-full object-cover"
                                        />
                                      </div>
                                    )}

                                    {/* Rating Stars */}
                                    {testimonial.rating && (
                                      <div className="mb-3 flex justify-center">
                                        {[...Array(5)].map((_, starIndex) => (
                                          <Star
                                            key={starIndex}
                                            className={`h-4 w-4 ${
                                              starIndex < testimonial.rating
                                                ? "text-yellow-400 fill-current"
                                                : "text-gray-300"
                                            }`}
                                          />
                                        ))}
                                      </div>
                                    )}

                                    <div className="mb-3">
                                      <p className="text-sm text-muted-foreground italic">
                                        "{testimonial.quote}"
                                      </p>
                                    </div>
                                    <div className="border-t pt-3">
                                      <p className="font-semibold text-sm">
                                        {testimonial.author}
                                      </p>
                                      <p className="text-xs text-muted-foreground">
                                        {testimonial.role}
                                      </p>
                                    </div>
                                  </Card>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {section.type === "cta" && (
                          <div className="mt-6 text-center p-6 bg-muted/20 rounded-lg">
                            <h3 className="text-xl font-bold mb-3">
                              {section.content.title}
                            </h3>
                            <p className="text-muted-foreground mb-4 max-w-md mx-auto">
                              {section.content.description}
                            </p>
                            <Button
                              className="bg-primary text-primary-foreground hover:bg-primary/90"
                              style={{
                                backgroundColor: primaryColor,
                              }}
                            >
                              {section.content.buttonText}
                            </Button>
                          </div>
                        )}

                        {section.type === "contact_form" && (
                          <div
                            className="mt-6 p-6 rounded-lg"
                            style={{
                              backgroundColor:
                                section.content.backgroundColor ||
                                "transparent",
                              backgroundImage:
                                section.content.backgroundImage?.hide ===
                                  false && section.content.backgroundImage?.src
                                  ? `url(${section.content.backgroundImage.src})`
                                  : "none",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <h3
                              className={`text-2xl font-bold mb-6 ${
                                section.content.textPosition === "center"
                                  ? "text-center"
                                  : section.content.textPosition === "right"
                                  ? "text-right"
                                  : "text-left"
                              }`}
                              style={{
                                color:
                                  section.content.backgroundColor ||
                                  section.content.backgroundImage?.hide ===
                                    false
                                    ? "white"
                                    : "inherit",
                                textShadow:
                                  section.content.backgroundImage?.hide ===
                                  false
                                    ? "2px 2px 4px rgba(0,0,0,0.7)"
                                    : "none",
                              }}
                            >
                              {section.content.title}
                            </h3>

                            {section.content.description && (
                              <p
                                className={`mb-6 ${
                                  section.content.textPosition === "center"
                                    ? "text-center"
                                    : section.content.textPosition === "right"
                                    ? "text-right"
                                    : "text-left"
                                }`}
                                style={{
                                  color:
                                    section.content.backgroundColor ||
                                    section.content.backgroundImage?.hide ===
                                      false
                                      ? "white"
                                      : "inherit",
                                  textShadow:
                                    section.content.backgroundImage?.hide ===
                                    false
                                      ? "1px 1px 2px rgba(0,0,0,0.7)"
                                      : "none",
                                }}
                              >
                                {section.content.description}
                              </p>
                            )}

                            <div
                              className={`grid grid-cols-1 ${
                                section.content.image?.hide === false
                                  ? "md:grid-cols-2"
                                  : ""
                              } gap-6 items-center`}
                            >
                              {/* Contact Form */}
                              <div
                                className={`${
                                  section.content.textPosition === "right" &&
                                  section.content.image?.hide === false
                                    ? "md:order-2"
                                    : ""
                                }`}
                              >
                                <Card className="p-6 bg-white/90 backdrop-blur-sm">
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                      <div className="space-y-2">
                                        <Label>Name</Label>
                                        <Input placeholder="Your name" />
                                      </div>
                                      <div className="space-y-2">
                                        <Label>Email</Label>
                                        <Input
                                          type="email"
                                          placeholder="your@email.com"
                                        />
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Subject</Label>
                                      <Input placeholder="Message subject" />
                                    </div>
                                    <div className="space-y-2">
                                      <Label>Message</Label>
                                      <Textarea
                                        placeholder="Your message"
                                        className="min-h-[100px]"
                                      />
                                    </div>
                                    <Button
                                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                                      style={{ backgroundColor: primaryColor }}
                                    >
                                      {section.content.buttonText ||
                                        "Send Message"}
                                    </Button>
                                  </div>
                                </Card>
                              </div>

                              {/* Contact Image */}
                              {section.content.image?.hide === false && (
                                <div
                                  className={`${
                                    section.content.textPosition === "right"
                                      ? "md:order-1"
                                      : ""
                                  }`}
                                >
                                  <div className="flex items-center justify-center">
                                    {section.content.image?.src ? (
                                      <img
                                        src={section.content.image.src}
                                        alt={section.content.image.alt}
                                        className="w-full max-w-md h-auto rounded-lg shadow-lg"
                                      />
                                    ) : (
                                      <div className="w-full max-w-md h-64 bg-muted rounded-lg flex items-center justify-center">
                                        <ImageIcon className="h-16 w-16 text-muted-foreground" />
                                      </div>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Contact Information */}
                            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                              <Card className="p-4 bg-white/90 backdrop-blur-sm">
                                <p className="font-medium">Address</p>
                                <p className="text-sm text-muted-foreground">
                                  {section.content.address}
                                </p>
                              </Card>
                              <Card className="p-4 bg-white/90 backdrop-blur-sm">
                                <p className="font-medium">Email</p>
                                <p className="text-sm text-muted-foreground">
                                  {section.content.email}
                                </p>
                              </Card>
                              <Card className="p-4 bg-white/90 backdrop-blur-sm">
                                <p className="font-medium">Phone</p>
                                <p className="text-sm text-muted-foreground">
                                  {section.content.phone}
                                </p>
                              </Card>
                            </div>
                          </div>
                        )}

                        {section.type === "courses" && (
                          <div className="mt-6">
                            <div className="text-center mb-6">
                              <h3 className="text-2xl font-bold mb-2">
                                {section.content.title}
                              </h3>
                              {section.content.description && (
                                <p className="text-muted-foreground">
                                  {section.content.description}
                                </p>
                              )}
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                              {(section.content.courses || []).map(
                                (course: any, index: number) => (
                                  <Card key={index} className="overflow-hidden">
                                    <div className="aspect-video bg-muted flex items-center justify-center">
                                      {course.image ? (
                                        <img
                                          src={course.image}
                                          alt={course.name}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <BookOpen className="h-12 w-12 text-muted-foreground" />
                                      )}
                                    </div>
                                    <div className="p-4">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className="font-semibold text-lg">
                                          {course.name}
                                        </h4>
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-6 w-6 hover:text-destructive"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            const newCourses = [
                                              ...section.content.courses,
                                            ];
                                            newCourses.splice(index, 1);
                                            updateSectionData(section._id, {
                                              content: {
                                                ...section.content,
                                                courses: newCourses,
                                              },
                                            });
                                          }}
                                        >
                                          <Trash className="h-4 w-4" />
                                        </Button>
                                      </div>
                                      <p className="text-sm text-muted-foreground mb-4">
                                        {course.description}
                                      </p>
                                      <div className="flex items-center justify-between text-sm">
                                        <div className="flex items-center gap-4">
                                          <span className="font-medium">
                                            ${course.price}
                                          </span>
                                          <span className="text-muted-foreground">
                                            {course.duration} hours
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  </Card>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        {section.type === "products" && (
                          <div className="mt-6">
                            <div className="text-center mb-6">
                              <h3 className="text-2xl font-bold mb-2">
                                {section.content.title}
                              </h3>
                              {section.content.description && (
                                <p className="text-muted-foreground">
                                  {section.content.description}
                                </p>
                              )}
                            </div>

                            {coursesList.length > 0 ? (
                              coursesList.length <= 3 ? (
                                // Display as regular grid for 3 or fewer items
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                  {coursesList.map(
                                    (course: any, index: number) => (
                                      <Card
                                        key={index}
                                        className="overflow-hidden"
                                      >
                                        <div className="aspect-video bg-muted flex items-center justify-center">
                                          {course.image ? (
                                            <img
                                              src={course.image}
                                              alt={course.title || course.name}
                                              className="w-full h-full object-cover"
                                            />
                                          ) : (
                                            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                                          )}
                                        </div>
                                        <div className="p-4">
                                          <h4 className="font-semibold text-lg mb-2">
                                            {course.title || course.name}
                                          </h4>
                                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                            {course.description}
                                          </p>
                                          <div className="flex items-center justify-between">
                                            <span className="text-lg font-bold text-primary">
                                              ${course.price || "0"}
                                            </span>
                                            <Button
                                              size="sm"
                                              style={{
                                                backgroundColor: primaryColor,
                                              }}
                                            >
                                              View Details
                                            </Button>
                                          </div>
                                        </div>
                                      </Card>
                                    )
                                  )}
                                </div>
                              ) : (
                                // Display as carousel for more than 3 items
                                <div className="relative">
                                  {/* Carousel navigation buttons */}
                                  <div className="flex justify-between items-center mb-4">
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() =>
                                        setProductCarouselIndex((prev) =>
                                          prev > 0
                                            ? prev - 1
                                            : Math.max(
                                                0,
                                                coursesList.length - 3
                                              )
                                        )
                                      }
                                      disabled={productCarouselIndex === 0}
                                      className="z-10"
                                    >
                                      <ChevronLeft className="h-4 w-4" />
                                    </Button>
                                    <span className="text-sm text-muted-foreground">
                                      {productCarouselIndex + 1} -{" "}
                                      {Math.min(
                                        productCarouselIndex + 3,
                                        coursesList.length
                                      )}{" "}
                                      of {coursesList.length}
                                    </span>
                                    <Button
                                      variant="outline"
                                      size="icon"
                                      onClick={() =>
                                        setProductCarouselIndex((prev) =>
                                          prev < coursesList.length - 3
                                            ? prev + 1
                                            : 0
                                        )
                                      }
                                      disabled={
                                        productCarouselIndex >=
                                        coursesList.length - 3
                                      }
                                      className="z-10"
                                    >
                                      <ChevronRight className="h-4 w-4" />
                                    </Button>
                                  </div>

                                  {/* Carousel container */}
                                  <div className="overflow-hidden">
                                    <div
                                      className="flex transition-transform duration-300 ease-in-out gap-6"
                                      style={{
                                        transform: `translateX(-${
                                          productCarouselIndex * (100 / 3)
                                        }%)`,
                                      }}
                                    >
                                      {coursesList.map(
                                        (course: any, index: number) => (
                                          <div
                                            key={index}
                                            className="flex-none w-1/3 min-w-0"
                                          >
                                            <Card className="overflow-hidden h-full">
                                              <div className="aspect-video bg-muted flex items-center justify-center">
                                                {course.image ? (
                                                  <img
                                                    src={course.image}
                                                    alt={
                                                      course.title ||
                                                      course.name
                                                    }
                                                    className="w-full h-full object-cover"
                                                  />
                                                ) : (
                                                  <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                                                )}
                                              </div>
                                              <div className="p-4">
                                                <h4 className="font-semibold text-lg mb-2">
                                                  {course.title || course.name}
                                                </h4>
                                                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                                  {course.description}
                                                </p>
                                                <div className="flex items-center justify-between">
                                                  <span className="text-lg font-bold text-primary">
                                                    ${course.price || "0"}
                                                  </span>
                                                  <Button
                                                    size="sm"
                                                    style={{
                                                      backgroundColor:
                                                        primaryColor,
                                                    }}
                                                  >
                                                    View Details
                                                  </Button>
                                                </div>
                                              </div>
                                            </Card>
                                          </div>
                                        )
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )
                            ) : (
                              <div className="text-center py-8">
                                <p className="text-muted-foreground">
                                  No courses available to display as products.
                                </p>
                              </div>
                            )}
                            {section.content.showAllButton?.show && (
                              <div className="mt-6">
                                <Button
                                  variant="outline"
                                  className="w-full"
                                  style={{
                                    backgroundColor: primaryColor,
                                  }}
                                >
                                  {section.content.showAllButton.text}
                                </Button>
                              </div>
                            )}
                          </div>
                        )}

                        {section.type === "carousel" && (
                          <div className="mt-6">
                            <div
                              className="relative h-96 overflow-hidden rounded-lg"
                              style={{
                                backgroundColor:
                                  section.content.backgroundColor || "#f0f9ff",
                              }}
                            >
                              {(section.content.items || []).map(
                                (item: any, index: number) => {
                                  const currentIndex =
                                    carouselStates[section._id] || 0;
                                  const isActive = index === currentIndex;
                                  const textPosition =
                                    section.content.textPosition || "left";

                                  return (
                                    <div
                                      key={index}
                                      className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                                        isActive
                                          ? "opacity-100 translate-x-0"
                                          : "opacity-0 translate-x-full"
                                      }`}
                                    >
                                      <div
                                        className={`grid grid-cols-1 md:grid-cols-2 h-full ${
                                          textPosition === "right"
                                            ? "md:grid-flow-col-dense"
                                            : ""
                                        }`}
                                      >
                                        {/* Content Side */}
                                        <div
                                          className={`flex flex-col justify-center p-8 space-y-6 ${
                                            textPosition === "right"
                                              ? "md:col-start-2"
                                              : ""
                                          }`}
                                        >
                                          {/* Animated Title */}
                                          <h2
                                            className={`text-4xl font-bold text-gray-900 transition-all duration-1000 delay-200 ${
                                              isActive
                                                ? "translate-x-0 opacity-100"
                                                : "-translate-x-10 opacity-0"
                                            }`}
                                          >
                                            {item.title}
                                          </h2>

                                          {/* Animated Descriptions */}
                                          <div className="space-y-3">
                                            {(item.descriptions || []).map(
                                              (
                                                desc: string,
                                                descIndex: number
                                              ) => (
                                                <p
                                                  key={descIndex}
                                                  className={`text-lg text-gray-600 transition-all duration-1000 ${
                                                    isActive
                                                      ? "translate-x-0 opacity-100"
                                                      : "-translate-x-10 opacity-0"
                                                  }`}
                                                  style={{
                                                    transitionDelay: `${
                                                      400 + descIndex * 200
                                                    }ms`,
                                                  }}
                                                >
                                                  {desc}
                                                </p>
                                              )
                                            )}
                                          </div>

                                          {/* Animated Buttons */}
                                          <div
                                            className={`flex gap-4 transition-all duration-1000 delay-700 ${
                                              isActive
                                                ? "translate-y-0 opacity-100"
                                                : "translate-y-10 opacity-0"
                                            }`}
                                          >
                                            {(item.buttons || []).map(
                                              (
                                                button: any,
                                                btnIndex: number
                                              ) => (
                                                <Button
                                                  style={{
                                                    backgroundColor:
                                                      btnIndex % 2 === 0
                                                        ? primaryColor
                                                        : "white",
                                                    color:
                                                      btnIndex % 2 === 0
                                                        ? "white"
                                                        : primaryColor,
                                                  }}
                                                  key={btnIndex}
                                                  variant={
                                                    btnIndex === 0
                                                      ? "default"
                                                      : "outline"
                                                  }
                                                  className="transition-all duration-300 hover:scale-105"
                                                >
                                                  {button.text}
                                                </Button>
                                              )
                                            )}
                                          </div>
                                        </div>

                                        {/* Image Side */}
                                        <div
                                          className={`flex items-center justify-center p-8 ${
                                            textPosition === "right"
                                              ? "md:col-start-1"
                                              : ""
                                          }`}
                                        >
                                          <div
                                            className={`w-full h-full bg-muted rounded-lg flex items-center justify-center overflow-hidden transition-all duration-1000 delay-300 ${
                                              isActive
                                                ? "scale-100 opacity-100"
                                                : "scale-95 opacity-0"
                                            }`}
                                          >
                                            {item.image ? (
                                              <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full h-full object-cover"
                                              />
                                            ) : (
                                              <ImageIcon className="h-16 w-16 text-muted-foreground" />
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  );
                                }
                              )}

                              {/* Carousel Controls */}
                              {(section.content.items || []).length > 1 && (
                                <>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const currentIndex =
                                        carouselStates[section._id] || 0;
                                      const newIndex =
                                        currentIndex === 0
                                          ? (section.content.items?.length ||
                                              1) - 1
                                          : currentIndex - 1;
                                      setCarouselStates((prev) => ({
                                        ...prev,
                                        [section._id]: newIndex,
                                      }));
                                    }}
                                  >
                                    <ChevronLeft className="h-4 w-4" />
                                  </Button>

                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      const currentIndex =
                                        carouselStates[section._id] || 0;
                                      const newIndex =
                                        currentIndex ===
                                        (section.content.items?.length || 1) - 1
                                          ? 0
                                          : currentIndex + 1;
                                      setCarouselStates((prev) => ({
                                        ...prev,
                                        [section._id]: newIndex,
                                      }));
                                    }}
                                  >
                                    <ChevronRight className="h-4 w-4" />
                                  </Button>

                                  {/* Dots Indicator */}
                                  <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                                    {(section.content.items || []).map(
                                      (_: any, index: number) => (
                                        <button
                                          key={index}
                                          className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                            (carouselStates[section._id] ||
                                              0) === index
                                              ? "bg-primary scale-125"
                                              : "bg-white/60 hover:bg-white/80"
                                          }`}
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            setCarouselStates((prev) => ({
                                              ...prev,
                                              [section._id]: index,
                                            }));
                                          }}
                                        />
                                      )
                                    )}
                                  </div>
                                </>
                              )}
                            </div>
                          </div>
                        )}

                        {section.type === "allProducts" && (
                          <div className="mt-6 min-h-screen">
                            <div className="text-center mb-8">
                              <h3
                                className="text-3xl font-bold mb-4"
                                style={{
                                  color: textColor,
                                }}
                              >
                                {section.content.title}
                              </h3>
                              {section.content.description && (
                                <p className="text-muted-foreground text-lg">
                                  {section.content.description}
                                </p>
                              )}
                            </div>

                            {/* Search and Filters */}
                            <div className="mb-8 space-y-4">
                              {section.content.showSearch && (
                                <div className="flex justify-center">
                                  <div className="w-full max-w-md">
                                    <Input
                                      placeholder="Search products..."
                                      className="w-full"
                                      value={
                                        allProductsStates[section._id]
                                          ?.searchTerm || ""
                                      }
                                      onChange={(e) => {
                                        setAllProductsStates((prev) => ({
                                          ...prev,
                                          [section._id]: {
                                            ...prev[section._id],
                                            searchTerm: e.target.value,
                                            currentPage: 1,
                                          },
                                        }));
                                      }}
                                    />
                                  </div>
                                </div>
                              )}

                              <div className="flex flex-wrap gap-4 justify-center items-center">
                                {section.content.showSorting && (
                                  <Select
                                    value={
                                      allProductsStates[section._id]?.sortBy ||
                                      "name"
                                    }
                                    onValueChange={(value) => {
                                      setAllProductsStates((prev) => ({
                                        ...prev,
                                        [section._id]: {
                                          ...prev[section._id],
                                          sortBy: value,
                                        },
                                      }));
                                    }}
                                  >
                                    <SelectTrigger className="w-48">
                                      <SelectValue placeholder="Sort by..." />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="name">
                                        Name (A-Z)
                                      </SelectItem>
                                      <SelectItem value="name-desc">
                                        Name (Z-A)
                                      </SelectItem>
                                      <SelectItem value="price">
                                        Price (Low to High)
                                      </SelectItem>
                                      <SelectItem value="price-desc">
                                        Price (High to Low)
                                      </SelectItem>
                                      <SelectItem value="duration">
                                        Duration
                                      </SelectItem>
                                    </SelectContent>
                                  </Select>
                                )}

                                <div className="flex gap-2">
                                  <Button
                                    variant={
                                      (allProductsStates[section._id]?.layout ||
                                        "grid") === "grid"
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() => {
                                      setAllProductsStates((prev) => ({
                                        ...prev,
                                        [section._id]: {
                                          ...prev[section._id],
                                          layout: "grid",
                                        },
                                      }));
                                    }}
                                  >
                                    <Grid className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant={
                                      allProductsStates[section._id]?.layout ===
                                      "list"
                                        ? "default"
                                        : "outline"
                                    }
                                    size="sm"
                                    onClick={() => {
                                      setAllProductsStates((prev) => ({
                                        ...prev,
                                        [section._id]: {
                                          ...prev[section._id],
                                          layout: "list",
                                        },
                                      }));
                                    }}
                                  >
                                    <ListOrdered className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>

                            {/* Products Grid/List */}
                            {coursesList.length > 0 ? (
                              <div
                                className={`${
                                  (allProductsStates[section._id]?.layout ||
                                    "grid") === "list"
                                    ? "space-y-4"
                                    : "grid grid-cols-1 md:grid-cols-2 gap-8"
                                }`}
                              >
                                {coursesList
                                  .filter((course: any) => {
                                    const searchTerm =
                                      allProductsStates[
                                        section._id
                                      ]?.searchTerm?.toLowerCase() || "";
                                    return (
                                      course.name
                                        .toLowerCase()
                                        .includes(searchTerm) ||
                                      course.description
                                        ?.toLowerCase()
                                        .includes(searchTerm)
                                    );
                                  })
                                  .sort((a: any, b: any) => {
                                    const sortBy =
                                      allProductsStates[section._id]?.sortBy ||
                                      "name";
                                    switch (sortBy) {
                                      case "name":
                                        return a.name.localeCompare(b.name);
                                      case "name-desc":
                                        return b.name.localeCompare(a.name);
                                      case "price":
                                        return (
                                          parseFloat(a.price || "0") -
                                          parseFloat(b.price || "0")
                                        );
                                      case "price-desc":
                                        return (
                                          parseFloat(b.price || "0") -
                                          parseFloat(a.price || "0")
                                        );
                                      case "duration":
                                        return (
                                          parseFloat(a.duration || "0") -
                                          parseFloat(b.duration || "0")
                                        );
                                      default:
                                        return 0;
                                    }
                                  })
                                  .map((course: any, index: number) =>
                                    (allProductsStates[section._id]?.layout ||
                                      "grid") === "list" ? (
                                      // List Layout
                                      <Card
                                        key={index}
                                        className="overflow-hidden"
                                      >
                                        <div className="flex">
                                          <div className="w-32 h-32 bg-muted flex items-center justify-center flex-shrink-0">
                                            {course.image ? (
                                              <img
                                                src={course.image}
                                                alt={course.name}
                                                className="w-full h-full object-cover"
                                              />
                                            ) : (
                                              <ShoppingBag className="h-8 w-8 text-muted-foreground" />
                                            )}
                                          </div>
                                          <div className="flex-1 p-4">
                                            <div className="flex justify-between items-start mb-2">
                                              <h4 className="font-semibold text-lg">
                                                {course.name}
                                              </h4>
                                              <span className="text-xl font-bold text-primary">
                                                ${course.price || "0"}
                                              </span>
                                            </div>
                                            <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                              {course.description}
                                            </p>
                                            <div className="flex justify-between items-center">
                                              <span className="text-sm text-muted-foreground">
                                                {course.duration} hours
                                              </span>
                                              <Button
                                                size="sm"
                                                style={{
                                                  backgroundColor: primaryColor,
                                                }}
                                              >
                                                View Details
                                              </Button>
                                            </div>
                                          </div>
                                        </div>
                                      </Card>
                                    ) : (
                                      // Grid Layout
                                      <Card
                                        key={index}
                                        className="overflow-hidden hover:shadow-lg transition-shadow"
                                      >
                                        <div className="aspect-video bg-muted flex items-center justify-center">
                                          {course.image ? (
                                            <img
                                              src={course.image}
                                              alt={course.name}
                                              className="w-full h-full object-cover"
                                            />
                                          ) : (
                                            <ShoppingBag className="h-12 w-12 text-muted-foreground" />
                                          )}
                                        </div>
                                        <div className="p-4">
                                          <h4 className="font-semibold text-lg mb-2 line-clamp-1">
                                            {course.name}
                                          </h4>
                                          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                                            {course.description}
                                          </p>
                                          <div className="flex items-center justify-between mb-3">
                                            <span className="text-xl font-bold text-primary">
                                              ${course.price || "0"}
                                            </span>
                                            <span className="text-sm text-muted-foreground">
                                              {course.duration} hours
                                            </span>
                                          </div>
                                          <Button className="w-full" size="sm">
                                            View Details
                                          </Button>
                                        </div>
                                      </Card>
                                    )
                                  )}
                              </div>
                            ) : (
                              <div className="text-center py-16">
                                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                <h4 className="text-lg font-medium mb-2">
                                  No Products Available
                                </h4>
                                <p className="text-muted-foreground">
                                  There are no courses available to display as
                                  products.
                                </p>
                              </div>
                            )}
                          </div>
                        )}

                        {section.type === "video" && (
                          <div
                            className="mt-6 p-6 rounded-lg"
                            style={{
                              backgroundColor:
                                section.content.backgroundColor ||
                                "transparent",
                              backgroundImage:
                                section.content.backgroundImage?.hide ===
                                  false && section.content.backgroundImage?.src
                                  ? `url(${section.content.backgroundImage.src})`
                                  : "none",
                              backgroundSize: "cover",
                              backgroundPosition: "center",
                              backgroundRepeat: "no-repeat",
                            }}
                          >
                            <div
                              className={`max-w-4xl mx-auto ${
                                section.content.textPosition === "center"
                                  ? "text-center"
                                  : section.content.textPosition === "right"
                                  ? "text-right"
                                  : "text-left"
                              }`}
                            >
                              {/* Title and Description */}
                              {(section.content.title ||
                                section.content.description) && (
                                <div className="mb-6">
                                  {section.content.title && (
                                    <h3
                                      className="text-2xl font-bold mb-3"
                                      style={{
                                        color:
                                          section.content.backgroundColor ||
                                          section.content.backgroundImage
                                            ?.hide === false
                                            ? "white"
                                            : "inherit",
                                        textShadow:
                                          section.content.backgroundImage
                                            ?.hide === false
                                            ? "2px 2px 4px rgba(0,0,0,0.7)"
                                            : "none",
                                      }}
                                    >
                                      {section.content.title}
                                    </h3>
                                  )}
                                  {section.content.description && (
                                    <p
                                      className="text-muted-foreground text-lg"
                                      style={{
                                        color:
                                          section.content.backgroundColor ||
                                          section.content.backgroundImage
                                            ?.hide === false
                                            ? "rgba(255,255,255,0.9)"
                                            : "inherit",
                                        textShadow:
                                          section.content.backgroundImage
                                            ?.hide === false
                                            ? "1px 1px 2px rgba(0,0,0,0.7)"
                                            : "none",
                                      }}
                                    >
                                      {section.content.description}
                                    </p>
                                  )}
                                </div>
                              )}

                              {/* Video Player */}
                              {section.content.video ? (
                                <div className="aspect-video rounded-lg overflow-hidden bg-black shadow-lg">
                                  <iframe
                                    src={section.content.video}
                                    className="w-full h-full"
                                    allowFullScreen
                                    title={
                                      section.content.title || "Video content"
                                    }
                                    style={{
                                      border: "none",
                                    }}
                                  />
                                </div>
                              ) : (
                                <div className="aspect-video rounded-lg bg-muted flex items-center justify-center">
                                  <div className="text-center">
                                    <Video className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-muted-foreground">
                                      No video URL provided
                                    </p>
                                  </div>
                                </div>
                              )}
                            </div>
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
                  <h2 className="font-medium">
                    Edit {selectedElementData?.label}
                  </h2>
                </div>

                <div className="space-y-4">
                  {selectedElementData?.type === "hero" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="hero-title">Title</Label>
                        <Input
                          id="hero-title"
                          value={tempContent?.title || ""}
                          onChange={(e) =>
                            handleContentChange("title", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero-subtitle">Subtitle</Label>
                        <Input
                          id="hero-subtitle"
                          value={tempContent?.subtitle || ""}
                          onChange={(e) =>
                            handleContentChange("subtitle", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero-cta">Button Text</Label>
                        <Input
                          id="hero-cta"
                          value={tempContent?.ctaText || ""}
                          onChange={(e) =>
                            handleContentChange("ctaText", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero-ctaLink">Redirect to Page</Label>
                        <Select
                          value={tempContent?.ctaLink?.pageId || "home"}
                          onValueChange={(value) => {
                            if (value === "home") {
                              handleContentChange("ctaLink", {
                                pageId: "",
                                link: "#",
                              });
                              return;
                            }

                            const selectedPage = selectPagesData?.find(
                              (page) => page._id === value
                            );

                            if (selectedPage) {
                              handleContentChange("ctaLink", {
                                pageId: value,
                                link: `/${
                                  selectedPage.slug || selectedPage._id
                                }`,
                              });
                            }
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a page to redirect to" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="home">No page (Home)</SelectItem>
                            {selectPagesData?.map((page: any) => (
                              <SelectItem key={page._id} value={page._id}>
                                {page.title ||
                                  page.name ||
                                  `Page ${page._id.slice(-6)}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Background Color */}
                      <div className="space-y-2">
                        <Label htmlFor="hero-backgroundColor">
                          Background Color
                        </Label>
                        {/* get settings colors and map them on circls  when user click on it it will change the background color */}
                        <div className="flex items-center space-x-2">
                          {Object.entries(
                            selectedSite?.settings?.colors || {}
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: value }}
                              onClick={() =>
                                handleContentChange("backgroundColor", value)
                              }
                            />
                          ))}
                        </div>
                        <Input
                          id="hero-backgroundColor"
                          type="color"
                          value={tempContent?.backgroundColor || "#ffffff"}
                          onChange={(e) =>
                            handleContentChange(
                              "backgroundColor",
                              e.target.value
                            )
                          }
                          className="h-10 w-full"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleContentChange("backgroundColor", "")
                          }
                          className="w-full"
                        >
                          Clear Background Color
                        </Button>
                      </div>

                      {/* Background Image */}
                      <div className="space-y-2">
                        <Label>Background Image</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="hero-backgroundImage-hide"
                              checked={
                                !(tempContent?.backgroundImage?.hide ?? false)
                              }
                              onCheckedChange={(checked) =>
                                handleContentChange(
                                  "backgroundImage.hide",
                                  !checked
                                )
                              }
                            />
                            <Label htmlFor="hero-backgroundImage-hide">
                              Show Background Image
                            </Label>
                          </div>

                          {!(tempContent?.backgroundImage?.hide ?? false) && (
                            <>
                              <div className="space-y-2">
                                <Label htmlFor="hero-backgroundImage-src">
                                  Background Image
                                </Label>
                                <div className="space-y-2">
                                  <Input
                                    id="hero-backgroundImage-src"
                                    value={
                                      tempContent?.backgroundImage?.src || ""
                                    }
                                    onChange={(e) =>
                                      handleContentChange(
                                        "backgroundImage.src",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter image URL or upload below"
                                    readOnly={false}
                                  />
                                  {/* upload image */}
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={async () => {
                                      try {
                                        const file = await new Promise<File>(
                                          (resolve, reject) => {
                                            const input =
                                              document.createElement("input");
                                            input.type = "file";
                                            input.accept = "image/*";
                                            input.onchange = (e) => {
                                              const target =
                                                e.target as HTMLInputElement;
                                              const file = target.files?.[0];
                                              if (file) {
                                                resolve(file);
                                              } else {
                                                reject(
                                                  new Error("No file selected")
                                                );
                                              }
                                            };
                                            input.click();
                                          }
                                        );

                                        const token =
                                          localStorage.getItem("token") || "";
                                        const imageUrl = await uploadImage(
                                          file,
                                          token
                                        );
                                        handleContentChange(
                                          "backgroundImage.src",
                                          imageUrl || ""
                                        );
                                      } catch (error) {
                                        console.error(
                                          "Error uploading image:",
                                          error
                                        );
                                      }
                                    }}
                                    className="w-full"
                                  >
                                    Upload Image
                                  </Button>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="hero-backgroundImage-alt">
                                  Alt Text
                                </Label>
                                <Input
                                  id="hero-backgroundImage-alt"
                                  value={
                                    tempContent?.backgroundImage?.alt || ""
                                  }
                                  onChange={(e) =>
                                    handleContentChange(
                                      "backgroundImage.alt",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter alt text for accessibility"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {selectedElementData?.type === "heading" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="heading-text">Heading Text</Label>
                        <Input
                          id="heading-text"
                          value={tempContent?.text || ""}
                          onChange={(e) =>
                            handleContentChange("text", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="heading-level">Heading Size</Label>
                        <select
                          id="heading-level"
                          className="w-full rounded-md border border-input bg-background px-3 py-2"
                          value={tempContent?.level || 2}
                          onChange={(e) =>
                            handleContentChange("level", Number(e.target.value))
                          }
                        >
                          <option value="1">Large (H1)</option>
                          <option value="2">Medium (H2)</option>
                          <option value="3">Small (H3)</option>
                        </select>
                      </div>

                      {/* Background Color */}
                      <div className="space-y-2">
                        <Label htmlFor="heading-backgroundColor">
                          Background Color
                        </Label>
                        <div className="flex items-center space-x-2">
                          {Object.entries(
                            selectedSite?.settings?.colors || {}
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: value }}
                              onClick={() =>
                                handleContentChange("backgroundColor", value)
                              }
                            />
                          ))}
                        </div>
                        <Input
                          id="heading-backgroundColor"
                          type="color"
                          value={tempContent?.backgroundColor || "#ffffff"}
                          onChange={(e) =>
                            handleContentChange(
                              "backgroundColor",
                              e.target.value
                            )
                          }
                          className="h-10 w-full"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleContentChange("backgroundColor", "")
                          }
                          className="w-full"
                        >
                          Clear Background Color
                        </Button>
                      </div>

                      {/* Background Image */}
                      <div className="space-y-2">
                        <Label>Background Image</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="backgroundImage-hide"
                              checked={
                                !(tempContent?.backgroundImage?.hide ?? true)
                              }
                              onCheckedChange={(checked) =>
                                handleContentChange(
                                  "backgroundImage.hide",
                                  !checked
                                )
                              }
                            />
                            <Label htmlFor="backgroundImage-hide">
                              Show Background Image
                            </Label>
                          </div>

                          {!(tempContent?.backgroundImage?.hide ?? true) && (
                            <>
                              <div className="space-y-2">
                                <Label htmlFor="backgroundImage-src">
                                  Background Image
                                </Label>
                                <div className="space-y-2">
                                  <Input
                                    id="backgroundImage-src"
                                    value={
                                      tempContent?.backgroundImage?.src || ""
                                    }
                                    onChange={(e) =>
                                      handleContentChange(
                                        "backgroundImage.src",
                                        e.target.value
                                      )
                                    }
                                    placeholder="Enter image URL or upload below"
                                    readOnly={false}
                                  />
                                  {/* upload image */}
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={async () => {
                                      try {
                                        const file = await new Promise<File>(
                                          (resolve, reject) => {
                                            const input =
                                              document.createElement("input");
                                            input.type = "file";
                                            input.accept = "image/*";
                                            input.onchange = (e) => {
                                              const target =
                                                e.target as HTMLInputElement;
                                              const file = target.files?.[0];
                                              if (file) {
                                                resolve(file);
                                              } else {
                                                reject(
                                                  new Error("No file selected")
                                                );
                                              }
                                            };
                                            input.click();
                                          }
                                        );

                                        const token =
                                          localStorage.getItem("token") || "";
                                        const imageUrl = await uploadImage(
                                          file,
                                          token
                                        );
                                        handleContentChange(
                                          "backgroundImage.src",
                                          imageUrl || ""
                                        );
                                      } catch (error) {
                                        console.error(
                                          "Error uploading image:",
                                          error
                                        );
                                      }
                                    }}
                                    className="w-full"
                                  >
                                    Upload Image
                                  </Button>
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="backgroundImage-alt">
                                  Alt Text
                                </Label>
                                <Input
                                  id="backgroundImage-alt"
                                  value={
                                    tempContent?.backgroundImage?.alt || ""
                                  }
                                  onChange={(e) =>
                                    handleContentChange(
                                      "backgroundImage.alt",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter alt text for accessibility"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {selectedElementData?.type === "features" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="features-title">Section Title</Label>
                        <Input
                          id="features-title"
                          value={tempContent?.title || ""}
                          onChange={(e) =>
                            handleContentChange("title", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-4"></div>
                    </>
                  )}

                  {selectedElementData?.type === "contact_form" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="contact-title">Form Title</Label>
                        <Input
                          id="contact-title"
                          value={tempContent?.title || ""}
                          onChange={(e) =>
                            handleContentChange("title", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-description">Description</Label>
                        <Textarea
                          id="contact-description"
                          value={tempContent?.description || ""}
                          onChange={(e) =>
                            handleContentChange("description", e.target.value)
                          }
                          placeholder="Brief description about contacting you"
                          className="min-h-[80px]"
                        />
                      </div>

                      {/* Background Color */}
                      <div className="space-y-2">
                        <Label htmlFor="contact-backgroundColor">
                          Background Color
                        </Label>
                        <div className="flex items-center space-x-2">
                          {Object.entries(
                            selectedSite?.settings?.colors || {}
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: value }}
                              onClick={() =>
                                handleContentChange("backgroundColor", value)
                              }
                            />
                          ))}
                        </div>
                        <Input
                          id="contact-backgroundColor"
                          type="color"
                          value={tempContent?.backgroundColor || "#ffffff"}
                          onChange={(e) =>
                            handleContentChange(
                              "backgroundColor",
                              e.target.value
                            )
                          }
                          className="h-10 w-full"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleContentChange("backgroundColor", "")
                          }
                          className="w-full"
                        >
                          Clear Background Color
                        </Button>
                      </div>

                      {/* Background Image */}
                      <div className="space-y-2">
                        <Label>Background Image</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="contact-backgroundImage-hide"
                              checked={
                                !(tempContent?.backgroundImage?.hide ?? true)
                              }
                              onCheckedChange={(checked) =>
                                handleContentChange(
                                  "backgroundImage.hide",
                                  !checked
                                )
                              }
                            />
                            <Label htmlFor="contact-backgroundImage-hide">
                              Show Background Image
                            </Label>
                          </div>

                          {!(tempContent?.backgroundImage?.hide ?? true) && (
                            <>
                              <div className="space-y-2">
                                <Label htmlFor="contact-backgroundImage-src">
                                  Image URL
                                </Label>
                                <Input
                                  id="contact-backgroundImage-src"
                                  value={
                                    tempContent?.backgroundImage?.src || ""
                                  }
                                  onChange={(e) =>
                                    handleContentChange(
                                      "backgroundImage.src",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter image URL"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="contact-backgroundImage-alt">
                                  Alt Text
                                </Label>
                                <Input
                                  id="contact-backgroundImage-alt"
                                  value={
                                    tempContent?.backgroundImage?.alt || ""
                                  }
                                  onChange={(e) =>
                                    handleContentChange(
                                      "backgroundImage.alt",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter alt text for accessibility"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Text Position */}
                      <div className="space-y-2">
                        <Label htmlFor="contact-textPosition">
                          Text Position
                        </Label>
                        <Select
                          value={tempContent?.textPosition || "left"}
                          onValueChange={(value) =>
                            handleContentChange("textPosition", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select text position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Contact Image */}
                      <div className="space-y-2">
                        <Label>Contact Image</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="contact-image-hide"
                              checked={!(tempContent?.image?.hide ?? false)}
                              onCheckedChange={(checked) =>
                                handleContentChange("image.hide", !checked)
                              }
                            />
                            <Label htmlFor="contact-image-hide">
                              Show Contact Image
                            </Label>
                          </div>

                          {!(tempContent?.image?.hide ?? false) && (
                            <>
                              <div className="space-y-2">
                                <Label htmlFor="contact-image-src">
                                  Image URL
                                </Label>
                                <Input
                                  id="contact-image-src"
                                  value={tempContent?.image?.src || ""}
                                  onChange={(e) =>
                                    handleContentChange(
                                      "image.src",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter image URL"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="contact-image-alt">
                                  Alt Text
                                </Label>
                                <Input
                                  id="contact-image-alt"
                                  value={tempContent?.image?.alt || ""}
                                  onChange={(e) =>
                                    handleContentChange(
                                      "image.alt",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter alt text for accessibility"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-address">Address</Label>
                        <Input
                          id="contact-address"
                          value={tempContent?.address || ""}
                          onChange={(e) =>
                            handleContentChange("address", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-email">Contact Email</Label>
                        <Input
                          id="contact-email"
                          type="email"
                          value={tempContent?.email || ""}
                          onChange={(e) =>
                            handleContentChange("email", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-phone">Phone Number</Label>
                        <Input
                          id="contact-phone"
                          value={tempContent?.phone || ""}
                          onChange={(e) =>
                            handleContentChange("phone", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-buttonText">Button Text</Label>
                        <Input
                          id="contact-buttonText"
                          value={tempContent?.buttonText || ""}
                          onChange={(e) =>
                            handleContentChange("buttonText", e.target.value)
                          }
                          placeholder="e.g., Send Message"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="contact-buttonLink">Button Link</Label>
                        <Input
                          id="contact-buttonLink"
                          value={tempContent?.buttonLink || ""}
                          onChange={(e) =>
                            handleContentChange("buttonLink", e.target.value)
                          }
                          placeholder="e.g., #contact or mailto:info@school.edu"
                        />
                      </div>
                    </>
                  )}

                  {selectedElementData?.type === "video" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="video-title">Title</Label>
                        <Input
                          id="video-title"
                          value={tempContent?.title || ""}
                          onChange={(e) =>
                            handleContentChange("title", e.target.value)
                          }
                          placeholder="Video section title"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="video-description">Description</Label>
                        <Textarea
                          id="video-description"
                          value={tempContent?.description || ""}
                          onChange={(e) =>
                            handleContentChange("description", e.target.value)
                          }
                          placeholder="Brief description about the video content"
                          className="min-h-[80px]"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="video-url">Video URL</Label>
                        <Input
                          id="video-url"
                          value={tempContent?.video || ""}
                          onChange={(e) =>
                            handleContentChange("video", e.target.value)
                          }
                          placeholder="e.g., https://www.youtube.com/embed/videoId"
                        />
                        <p className="text-xs text-muted-foreground">
                          Use embed URLs for YouTube, Vimeo, or direct video
                          file links.
                        </p>
                      </div>

                      {/* Background Color */}
                      <div className="space-y-2">
                        <Label htmlFor="video-backgroundColor">
                          Background Color
                        </Label>
                        <div className="flex items-center space-x-2">
                          {Object.entries(
                            selectedSite?.settings?.colors || {}
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: value }}
                              onClick={() =>
                                handleContentChange("backgroundColor", value)
                              }
                            />
                          ))}
                        </div>
                        <Input
                          id="video-backgroundColor"
                          type="color"
                          value={tempContent?.backgroundColor || "#ffffff"}
                          onChange={(e) =>
                            handleContentChange(
                              "backgroundColor",
                              e.target.value
                            )
                          }
                          className="h-10 w-full"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleContentChange("backgroundColor", "")
                          }
                          className="w-full"
                        >
                          Clear Background Color
                        </Button>
                      </div>

                      {/* Background Image */}
                      <div className="space-y-2">
                        <Label>Background Image</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="video-backgroundImage-hide"
                              checked={
                                !(tempContent?.backgroundImage?.hide ?? true)
                              }
                              onCheckedChange={(checked) =>
                                handleContentChange(
                                  "backgroundImage.hide",
                                  !checked
                                )
                              }
                            />
                            <Label htmlFor="video-backgroundImage-hide">
                              Show Background Image
                            </Label>
                          </div>

                          {!(tempContent?.backgroundImage?.hide ?? true) && (
                            <>
                              <div className="space-y-2">
                                <Label htmlFor="video-backgroundImage-src">
                                  Image URL
                                </Label>
                                <Input
                                  id="video-backgroundImage-src"
                                  value={
                                    tempContent?.backgroundImage?.src || ""
                                  }
                                  onChange={(e) =>
                                    handleContentChange(
                                      "backgroundImage.src",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter image URL"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="video-backgroundImage-alt">
                                  Alt Text
                                </Label>
                                <Input
                                  id="video-backgroundImage-alt"
                                  value={
                                    tempContent?.backgroundImage?.alt || ""
                                  }
                                  onChange={(e) =>
                                    handleContentChange(
                                      "backgroundImage.alt",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter alt text for accessibility"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      {/* Text Position */}
                      <div className="space-y-2">
                        <Label htmlFor="video-textPosition">
                          Content Position
                        </Label>
                        <Select
                          value={tempContent?.textPosition || "center"}
                          onValueChange={(value) =>
                            handleContentChange("textPosition", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select content position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="center">Center</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {selectedElementData?.type === "testimonials" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="testimonials-title">
                          Section Title
                        </Label>
                        <Input
                          id="testimonials-title"
                          value={tempContent?.title || ""}
                          onChange={(e) =>
                            handleContentChange("title", e.target.value)
                          }
                        />
                      </div>

                      {/* Background Color */}
                      <div className="space-y-2">
                        <Label htmlFor="testimonials-backgroundColor">
                          Background Color
                        </Label>
                        <div className="flex items-center space-x-2">
                          {Object.entries(
                            selectedSite?.settings?.colors || {}
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: value }}
                              onClick={() =>
                                handleContentChange("backgroundColor", value)
                              }
                            />
                          ))}
                        </div>
                        <Input
                          id="testimonials-backgroundColor"
                          type="color"
                          value={tempContent?.backgroundColor || "#ffffff"}
                          onChange={(e) =>
                            handleContentChange(
                              "backgroundColor",
                              e.target.value
                            )
                          }
                          className="h-10 w-full"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleContentChange("backgroundColor", "")
                          }
                          className="w-full"
                        >
                          Clear Background Color
                        </Button>
                      </div>

                      {/* Background Image */}
                      <div className="space-y-2">
                        <Label>Background Image</Label>
                        <div className="space-y-2">
                          <div className="flex items-center space-x-2">
                            <Switch
                              id="testimonials-backgroundImage-hide"
                              checked={
                                !(tempContent?.backgroundImage?.hide ?? true)
                              }
                              onCheckedChange={(checked) =>
                                handleContentChange(
                                  "backgroundImage.hide",
                                  !checked
                                )
                              }
                            />
                            <Label htmlFor="testimonials-backgroundImage-hide">
                              Show Background Image
                            </Label>
                          </div>

                          {!(tempContent?.backgroundImage?.hide ?? true) && (
                            <>
                              <div className="space-y-2">
                                <Label htmlFor="testimonials-backgroundImage-src">
                                  Image URL
                                </Label>
                                <Input
                                  id="testimonials-backgroundImage-src"
                                  value={
                                    tempContent?.backgroundImage?.src || ""
                                  }
                                  onChange={(e) =>
                                    handleContentChange(
                                      "backgroundImage.src",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter image URL"
                                />
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="testimonials-backgroundImage-alt">
                                  Alt Text
                                </Label>
                                <Input
                                  id="testimonials-backgroundImage-alt"
                                  value={
                                    tempContent?.backgroundImage?.alt || ""
                                  }
                                  onChange={(e) =>
                                    handleContentChange(
                                      "backgroundImage.alt",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Enter alt text for accessibility"
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="space-y-4">
                        <Label>Testimonials</Label>
                        {(tempContent?.testimonials || []).map(
                          (testimonial: any, index: number) => (
                            <Card key={index} className="p-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor={`testimonial-${index}`}>
                                    Testimonial {index + 1}
                                  </Label>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:text-destructive"
                                    onClick={() => {
                                      const newTestimonials = [
                                        ...(tempContent?.testimonials || []),
                                      ];
                                      newTestimonials.splice(index, 1);
                                      handleContentChange(
                                        "testimonials",
                                        newTestimonials
                                      );
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Input
                                  id={`testimonial-quote-${index}`}
                                  value={testimonial.quote || ""}
                                  onChange={(e) => {
                                    const newTestimonials = [
                                      ...(tempContent?.testimonials || []),
                                    ];
                                    newTestimonials[index] = {
                                      ...testimonial,
                                      quote: e.target.value,
                                    };
                                    handleContentChange(
                                      "testimonials",
                                      newTestimonials
                                    );
                                  }}
                                  placeholder="Testimonial quote"
                                />
                                <Input
                                  value={testimonial.author || ""}
                                  onChange={(e) => {
                                    const newTestimonials = [
                                      ...(tempContent?.testimonials || []),
                                    ];
                                    newTestimonials[index] = {
                                      ...testimonial,
                                      author: e.target.value,
                                    };
                                    handleContentChange(
                                      "testimonials",
                                      newTestimonials
                                    );
                                  }}
                                  placeholder="Author name"
                                />
                                <Input
                                  value={testimonial.role || ""}
                                  onChange={(e) => {
                                    const newTestimonials = [
                                      ...(tempContent?.testimonials || []),
                                    ];
                                    newTestimonials[index] = {
                                      ...testimonial,
                                      role: e.target.value,
                                    };
                                    handleContentChange(
                                      "testimonials",
                                      newTestimonials
                                    );
                                  }}
                                  placeholder="Author role (e.g., Student, Parent)"
                                />
                                <Input
                                  value={testimonial.image || ""}
                                  onChange={(e) => {
                                    const newTestimonials = [
                                      ...(tempContent?.testimonials || []),
                                    ];
                                    newTestimonials[index] = {
                                      ...testimonial,
                                      image: e.target.value,
                                    };
                                    handleContentChange(
                                      "testimonials",
                                      newTestimonials
                                    );
                                  }}
                                  placeholder="Author image URL (optional)"
                                />
                                <div className="space-y-2">
                                  <Label
                                    htmlFor={`testimonial-rating-${index}`}
                                  >
                                    Rating (1-5)
                                  </Label>
                                  <Select
                                    value={
                                      testimonial.rating?.toString() || "5"
                                    }
                                    onValueChange={(value) => {
                                      const newTestimonials = [
                                        ...(tempContent?.testimonials || []),
                                      ];
                                      newTestimonials[index] = {
                                        ...testimonial,
                                        rating: parseInt(value),
                                      };
                                      handleContentChange(
                                        "testimonials",
                                        newTestimonials
                                      );
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select rating" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="1">1 Star</SelectItem>
                                      <SelectItem value="2">2 Stars</SelectItem>
                                      <SelectItem value="3">3 Stars</SelectItem>
                                      <SelectItem value="4">4 Stars</SelectItem>
                                      <SelectItem value="5">5 Stars</SelectItem>
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </Card>
                          )
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            const newTestimonials = [
                              ...(tempContent?.testimonials || []),
                            ];
                            newTestimonials.push({
                              quote: "",
                              author: "",
                              role: "",
                              image: "",
                              rating: 5,
                            });
                            handleContentChange(
                              "testimonials",
                              newTestimonials
                            );
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Testimonial
                        </Button>
                      </div>
                    </>
                  )}

                  {selectedElementData?.type === "cta" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="cta-title">Title</Label>
                        <Input
                          id="cta-title"
                          value={tempContent?.title || ""}
                          onChange={(e) =>
                            handleContentChange("title", e.target.value)
                          }
                          placeholder="Enter CTA title"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cta-description">Description</Label>
                        <Input
                          id="cta-description"
                          value={tempContent?.description || ""}
                          onChange={(e) =>
                            handleContentChange("description", e.target.value)
                          }
                          placeholder="Enter CTA description"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cta-button-text">Button Text</Label>
                        <Input
                          id="cta-button-text"
                          value={tempContent?.buttonText || ""}
                          onChange={(e) =>
                            handleContentChange("buttonText", e.target.value)
                          }
                          placeholder="Enter button text"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cta-button-link">Button Link</Label>

                        <Select
                          value={tempContent?.buttonLink?.pageId || ""}
                          onValueChange={(value) => {
                            handleContentChange("buttonLink.pageId", value);
                            const selectedPage = selectPagesData?.find(
                              (page) => page._id === value
                            );
                            handleContentChange(
                              "buttonLink.link",
                              `/${
                                selectedPage?.slug || selectedPage?._id || ""
                              }`
                            );
                          }}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select a page to redirect to" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="home">No page (Home)</SelectItem>
                            {selectPagesData?.map((page: any) => (
                              <SelectItem key={page._id} value={page._id}>
                                {page.title ||
                                  page.name ||
                                  `Page ${page._id.slice(-6)}`}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}

                  {selectedElementData?.type === "contact" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="contact-text">Text</Label>
                        <Input
                          id="contact-text"
                          value={tempContent?.text || ""}
                          onChange={(e) =>
                            handleContentChange("text", e.target.value)
                          }
                          placeholder="Enter contact information text"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-src">Image URL</Label>
                        <Input
                          id="contact-src"
                          value={tempContent?.src || ""}
                          onChange={(e) =>
                            handleContentChange("src", e.target.value)
                          }
                          placeholder="Enter image URL (e.g., /contact-image.jpg)"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-alt">Image Alt Text</Label>
                        <Input
                          id="contact-alt"
                          value={tempContent?.alt || ""}
                          onChange={(e) =>
                            handleContentChange("alt", e.target.value)
                          }
                          placeholder="Enter alt text for accessibility"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="contact-caption">Caption</Label>
                        <Input
                          id="contact-caption"
                          value={tempContent?.caption || ""}
                          onChange={(e) =>
                            handleContentChange("caption", e.target.value)
                          }
                          placeholder="Enter image caption"
                        />
                      </div>
                    </>
                  )}

                  {selectedElementData?.type === "courses" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="courses-title">Section Title</Label>
                        <Input
                          id="courses-title"
                          value={tempContent?.title || ""}
                          onChange={(e) =>
                            handleContentChange("title", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="courses-description">Description</Label>
                        <Input
                          id="courses-description"
                          value={tempContent?.description || ""}
                          onChange={(e) =>
                            handleContentChange("description", e.target.value)
                          }
                        />
                      </div>

                      <div className="space-y-4">
                        <Label>Courses</Label>
                        {(tempContent?.courses || []).map(
                          (course: any, index: number) => (
                            <Card key={index} className="p-4">
                              <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor={`course-name-${index}`}>
                                    Course {index + 1}
                                  </Label>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:text-destructive"
                                    onClick={() => {
                                      const newCourses = [
                                        ...(tempContent?.courses || []),
                                      ];
                                      newCourses.splice(index, 1);
                                      handleContentChange(
                                        "courses",
                                        newCourses
                                      );
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                <Input
                                  id={`course-name-${index}`}
                                  value={course.name || ""}
                                  onChange={(e) => {
                                    const newCourses = [
                                      ...(tempContent?.courses || []),
                                    ];
                                    newCourses[index] = {
                                      ...course,
                                      name: e.target.value,
                                    };
                                    handleContentChange("courses", newCourses);
                                  }}
                                  placeholder="Course name"
                                />
                                <Input
                                  value={course.description || ""}
                                  onChange={(e) => {
                                    const newCourses = [
                                      ...(tempContent?.courses || []),
                                    ];
                                    newCourses[index] = {
                                      ...course,
                                      description: e.target.value,
                                    };
                                    handleContentChange("courses", newCourses);
                                  }}
                                  placeholder="Course description"
                                />
                                <div className="grid grid-cols-2 gap-2">
                                  <Input
                                    value={course.price || ""}
                                    onChange={(e) => {
                                      const newCourses = [
                                        ...(tempContent?.courses || []),
                                      ];
                                      newCourses[index] = {
                                        ...course,
                                        price: e.target.value,
                                      };
                                      handleContentChange(
                                        "courses",
                                        newCourses
                                      );
                                    }}
                                    placeholder="Price"
                                  />
                                  <Input
                                    value={course.duration || ""}
                                    onChange={(e) => {
                                      const newCourses = [
                                        ...(tempContent?.courses || []),
                                      ];
                                      newCourses[index] = {
                                        ...course,
                                        duration: e.target.value,
                                      };
                                      handleContentChange(
                                        "courses",
                                        newCourses
                                      );
                                    }}
                                    placeholder="Duration (hours)"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <Input
                                    value={course.image || ""}
                                    onChange={(e) => {
                                      const newCourses = [
                                        ...(tempContent?.courses || []),
                                      ];
                                      newCourses[index] = {
                                        ...course,
                                        image: e.target.value,
                                      };
                                      handleContentChange(
                                        "courses",
                                        newCourses
                                      );
                                    }}
                                    placeholder="Image URL"
                                  />
                                  <Button
                                    type="button"
                                    variant="outline"
                                    onClick={async () => {
                                      try {
                                        const file = await new Promise<File>(
                                          (resolve, reject) => {
                                            const input =
                                              document.createElement("input");
                                            input.type = "file";
                                            input.accept = "image/*";
                                            input.onchange = (e) => {
                                              const target =
                                                e.target as HTMLInputElement;
                                              const file = target.files?.[0];
                                              if (file) {
                                                resolve(file);
                                              } else {
                                                reject(
                                                  new Error("No file selected")
                                                );
                                              }
                                            };
                                            input.click();
                                          }
                                        );

                                        const token =
                                          localStorage.getItem("token") || "";
                                        const imageUrl = await uploadImage(
                                          file,
                                          token
                                        );
                                        handleContentChange(
                                          "backgroundImage.src",
                                          imageUrl || ""
                                        );
                                      } catch (error) {
                                        console.error(
                                          "Error uploading image:",
                                          error
                                        );
                                      }
                                    }}
                                    className="w-full"
                                  >
                                    Upload Image
                                  </Button>
                                </div>
                                <Input
                                  value={course.video || ""}
                                  onChange={(e) => {
                                    const newCourses = [
                                      ...(tempContent?.courses || []),
                                    ];
                                    newCourses[index] = {
                                      ...course,
                                      video: e.target.value,
                                    };
                                    handleContentChange("courses", newCourses);
                                  }}
                                  placeholder="Video URL (optional)"
                                />
                              </div>
                            </Card>
                          )
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            const newCourses = [
                              ...(tempContent?.courses || []),
                            ];
                            newCourses.push({
                              name: "",
                              description: "",
                              price: "",
                              duration: "",
                              image: "",
                              video: "",
                            });
                            handleContentChange("courses", newCourses);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Course
                        </Button>
                      </div>
                    </>
                  )}

                  {selectedElementData?.type === "products" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="products-title">Section Title</Label>
                        <Input
                          id="products-title"
                          value={tempContent?.title || ""}
                          onChange={(e) =>
                            handleContentChange("title", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="products-description">
                          Description
                        </Label>
                        <Input
                          id="products-description"
                          value={tempContent?.description || ""}
                          onChange={(e) =>
                            handleContentChange("description", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="products-showAllButton">
                          Show All Button
                        </Label>
                        <Switch
                          id="products-showAllButton"
                          checked={tempContent?.showAllButton?.show}
                          onCheckedChange={(checked: boolean) =>
                            handleContentChange("showAllButton.show", checked)
                          }
                        />
                        <Input
                          id="products-showAllButton-text"
                          value={tempContent?.showAllButton?.text || ""}
                          onChange={(e) =>
                            handleContentChange(
                              "showAllButton.text",
                              e.target.value
                            )
                          }
                          placeholder="Button text (e.g., 'Show All Products')"
                        />
                        <div className="space-y-2">
                          <Label htmlFor="products-showAllButton-page">
                            Redirect to Page
                          </Label>
                          <Select
                            value={tempContent?.showAllButton?.pageId || ""}
                            onValueChange={(value) => {
                              const selectedPage = selectPagesData.find(
                                (page) => page._id === value
                              );
                              handleContentChange(
                                "showAllButton.pageId",
                                value
                              );
                              handleContentChange(
                                "showAllButton.link",
                                selectedPage?.title || ""
                              );
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select a page to redirect to" />
                            </SelectTrigger>
                            <SelectContent>
                              {selectPagesData.map((page: any) => (
                                <SelectItem key={page._id} value={page._id}>
                                  {page.title}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-medium mb-2">Product Source</h4>
                          <p className="text-sm text-muted-foreground">
                            Products are automatically mapped from your courses
                            list. You can only edit the title and description of
                            this section.
                          </p>
                          <div className="mt-2 text-xs text-muted-foreground">
                            {coursesList.length} course(s) will be displayed as
                            products
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedElementData?.type === "allProducts" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="allProducts-title">Page Title</Label>
                        <Input
                          id="allProducts-title"
                          value={tempContent?.title || ""}
                          onChange={(e) =>
                            handleContentChange("title", e.target.value)
                          }
                          placeholder="e.g., All Products"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="allProducts-description">
                          Description
                        </Label>
                        <Input
                          id="allProducts-description"
                          value={tempContent?.description || ""}
                          onChange={(e) =>
                            handleContentChange("description", e.target.value)
                          }
                          placeholder="Brief description of your products"
                        />
                      </div>

                      <div className="space-y-4">
                        <Label>Page Features</Label>

                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <Label htmlFor="showSearch">Search Bar</Label>
                            <Switch
                              id="showSearch"
                              checked={tempContent?.showSearch || false}
                              onCheckedChange={(checked: boolean) =>
                                handleContentChange("showSearch", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="showFilters">Filters</Label>
                            <Switch
                              id="showFilters"
                              checked={tempContent?.showFilters || false}
                              onCheckedChange={(checked: boolean) =>
                                handleContentChange("showFilters", checked)
                              }
                            />
                          </div>

                          <div className="flex items-center justify-between">
                            <Label htmlFor="showSorting">Sorting Options</Label>
                            <Switch
                              id="showSorting"
                              checked={tempContent?.showSorting || false}
                              onCheckedChange={(checked: boolean) =>
                                handleContentChange("showSorting", checked)
                              }
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="itemsPerPage">Items Per Page</Label>
                          <Select
                            value={
                              tempContent?.itemsPerPage?.toString() || "12"
                            }
                            onValueChange={(value) =>
                              handleContentChange(
                                "itemsPerPage",
                                parseInt(value)
                              )
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6">6 items</SelectItem>
                              <SelectItem value="9">9 items</SelectItem>
                              <SelectItem value="12">12 items</SelectItem>
                              <SelectItem value="18">18 items</SelectItem>
                              <SelectItem value="24">24 items</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="defaultLayout">Default Layout</Label>
                          <Select
                            value={tempContent?.layout || "grid"}
                            onValueChange={(value) =>
                              handleContentChange("layout", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="grid">Grid Layout</SelectItem>
                              <SelectItem value="list">List Layout</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="p-4 bg-muted/50 rounded-lg">
                          <h4 className="font-medium mb-2">Product Source</h4>
                          <p className="text-sm text-muted-foreground">
                            All products are automatically populated from your
                            courses list. Users can search, filter, and sort
                            through them.
                          </p>
                          <div className="mt-2 text-xs text-muted-foreground">
                            {coursesList.length} course(s) available as products
                          </div>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedElementData?.type === "carousel" && (
                    <>
                      {/* Background Color */}
                      <div className="space-y-2">
                        <Label htmlFor="carousel-backgroundColor">
                          Background Color
                        </Label>
                        <div className="flex items-center space-x-2">
                          {Object.entries(
                            selectedSite?.settings?.colors || {}
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: value }}
                              onClick={() =>
                                handleContentChange("backgroundColor", value)
                              }
                            />
                          ))}
                        </div>
                        <Input
                          id="carousel-backgroundColor"
                          type="color"
                          value={tempContent?.backgroundColor || "#f0f9ff"}
                          onChange={(e) =>
                            handleContentChange(
                              "backgroundColor",
                              e.target.value
                            )
                          }
                          className="h-10 w-full"
                        />
                      </div>
                      {/* clear color  button*/}
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() =>
                          handleContentChange("backgroundColor", "#f0f9ff")
                        }
                      >
                        Clear Color
                      </Button>

                      {/* Text Position */}
                      <div className="space-y-2">
                        <Label htmlFor="carousel-textPosition">
                          Text Position
                        </Label>
                        <Select
                          value={tempContent?.textPosition || "left"}
                          onValueChange={(value) =>
                            handleContentChange("textPosition", value)
                          }
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select text position" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="left">Left</SelectItem>
                            <SelectItem value="right">Right</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-4">
                        <Label>Carousel Items</Label>
                        {(tempContent?.items || []).map(
                          (item: any, index: number) => (
                            <Card key={index} className="p-4">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor={`carousel-item-${index}`}>
                                    Slide {index + 1}
                                  </Label>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:text-destructive"
                                    onClick={() => {
                                      const newItems = [
                                        ...(tempContent?.items || []),
                                      ];
                                      newItems.splice(index, 1);
                                      handleContentChange("items", newItems);
                                    }}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>

                                {/* Title */}
                                <div className="space-y-2">
                                  <Label htmlFor={`carousel-title-${index}`}>
                                    Title
                                  </Label>
                                  <Input
                                    id={`carousel-title-${index}`}
                                    value={item.title || ""}
                                    onChange={(e) => {
                                      const newItems = [
                                        ...(tempContent?.items || []),
                                      ];
                                      newItems[index] = {
                                        ...item,
                                        title: e.target.value,
                                      };
                                      handleContentChange("items", newItems);
                                    }}
                                    placeholder="Slide title"
                                  />
                                </div>

                                {/* Descriptions */}
                                <div className="space-y-2">
                                  <Label>Descriptions</Label>
                                  {(item.descriptions || []).map(
                                    (desc: string, descIndex: number) => (
                                      <div
                                        key={descIndex}
                                        className="flex gap-2"
                                      >
                                        <Input
                                          value={desc}
                                          onChange={(e) => {
                                            const newItems = [
                                              ...(tempContent?.items || []),
                                            ];
                                            const newDescriptions = [
                                              ...(item.descriptions || []),
                                            ];
                                            newDescriptions[descIndex] =
                                              e.target.value;
                                            newItems[index] = {
                                              ...item,
                                              descriptions: newDescriptions,
                                            };
                                            handleContentChange(
                                              "items",
                                              newItems
                                            );
                                          }}
                                          placeholder={`Description ${
                                            descIndex + 1
                                          }`}
                                        />
                                        <Button
                                          variant="ghost"
                                          size="icon"
                                          className="h-8 w-8 hover:text-destructive"
                                          onClick={() => {
                                            const newItems = [
                                              ...(tempContent?.items || []),
                                            ];
                                            const newDescriptions = [
                                              ...(item.descriptions || []),
                                            ];
                                            newDescriptions.splice(
                                              descIndex,
                                              1
                                            );
                                            newItems[index] = {
                                              ...item,
                                              descriptions: newDescriptions,
                                            };
                                            handleContentChange(
                                              "items",
                                              newItems
                                            );
                                          }}
                                        >
                                          <X className="h-3 w-3" />
                                        </Button>
                                      </div>
                                    )
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const newItems = [
                                        ...(tempContent?.items || []),
                                      ];
                                      const newDescriptions = [
                                        ...(item.descriptions || []),
                                      ];
                                      newDescriptions.push("");
                                      newItems[index] = {
                                        ...item,
                                        descriptions: newDescriptions,
                                      };
                                      handleContentChange("items", newItems);
                                    }}
                                  >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Description
                                  </Button>
                                </div>

                                {/* Image */}
                                <div className="space-y-2">
                                  <Label htmlFor={`carousel-image-${index}`}>
                                    Image URL
                                  </Label>
                                  <Input
                                    id={`carousel-image-${index}`}
                                    value={item.image || ""}
                                    onChange={(e) => {
                                      const newItems = [
                                        ...(tempContent?.items || []),
                                      ];
                                      newItems[index] = {
                                        ...item,
                                        image: e.target.value,
                                      };
                                      handleContentChange("items", newItems);
                                    }}
                                    placeholder="Image URL"
                                  />
                                </div>

                                {/* Buttons */}
                                <div className="space-y-2">
                                  <Label>Buttons</Label>
                                  {(item.buttons || []).map(
                                    (button: any, btnIndex: number) => (
                                      <div
                                        key={btnIndex}
                                        className="grid grid-cols-2 gap-2"
                                      >
                                        <Input
                                          value={button.text || ""}
                                          onChange={(e) => {
                                            const newItems = [
                                              ...(tempContent?.items || []),
                                            ];
                                            const newButtons = [
                                              ...(item.buttons || []),
                                            ];
                                            newButtons[btnIndex] = {
                                              ...button,
                                              text: e.target.value,
                                            };
                                            newItems[index] = {
                                              ...item,
                                              buttons: newButtons,
                                            };
                                            handleContentChange(
                                              "items",
                                              newItems
                                            );
                                          }}
                                          placeholder="Button text"
                                        />
                                        <div className="flex gap-1">
                                          {/* <Input
                                            value={button.link || ""}
                                            onChange={(e) => {
                                              const newItems = [
                                                ...(tempContent?.items || []),
                                              ];
                                              const newButtons = [
                                                ...(item.buttons || []),
                                              ];
                                              newButtons[btnIndex] = {
                                                ...button,
                                                link: e.target.value,
                                              };
                                              newItems[index] = {
                                                ...item,
                                                buttons: newButtons,
                                              };
                                              handleContentChange(
                                                "items",
                                                newItems
                                              );
                                            }}
                                            placeholder="Button link"
                                          /> */}
                                          <Select
                                            value={button.pageId || ""}
                                            onValueChange={(value) => {
                                              const newItems = [
                                                ...(tempContent?.items || []),
                                              ];
                                              const newButtons = [
                                                ...(item.buttons || []),
                                              ];
                                              const selectedPage =
                                                selectPagesData?.find(
                                                  (p: any) => p._id === value
                                                );
                                              newButtons[btnIndex] = {
                                                ...button,
                                                pageId: value,
                                                link:
                                                  value === "home"
                                                    ? ""
                                                    : `/${selectedPage?.slug}`,
                                              };
                                              newItems[index] = {
                                                ...item,
                                                buttons: newButtons,
                                              };
                                              handleContentChange(
                                                "items",
                                                newItems
                                              );
                                            }}
                                            // disabled={button.pageId !== ""}
                                          >
                                            <SelectTrigger>
                                              <SelectValue placeholder="Select a page to redirect to" />
                                            </SelectTrigger>
                                            <SelectContent>
                                              <SelectItem value="home">
                                                No page (Home)
                                              </SelectItem>
                                              {selectPagesData.map(
                                                (page: any) => (
                                                  <SelectItem
                                                    key={page._id}
                                                    value={page._id}
                                                  >
                                                    {page.title ||
                                                      page.name ||
                                                      `Page ${page._id.slice(
                                                        -6
                                                      )}`}
                                                  </SelectItem>
                                                )
                                              )}
                                            </SelectContent>
                                          </Select>
                                          <Button
                                            variant="ghost"
                                            size="icon"
                                            className="h-8 w-8 hover:text-destructive"
                                            onClick={() => {
                                              const newItems = [
                                                ...(tempContent?.items || []),
                                              ];
                                              const newButtons = [
                                                ...(item.buttons || []),
                                              ];
                                              newButtons.splice(btnIndex, 1);
                                              newItems[index] = {
                                                ...item,
                                                buttons: newButtons,
                                              };
                                              handleContentChange(
                                                "items",
                                                newItems
                                              );
                                            }}
                                          >
                                            <X className="h-3 w-3" />
                                          </Button>
                                        </div>
                                      </div>
                                    )
                                  )}
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    onClick={() => {
                                      const newItems = [
                                        ...(tempContent?.items || []),
                                      ];
                                      const newButtons = [
                                        ...(item.buttons || []),
                                      ];
                                      newButtons.push({ text: "", link: "" });
                                      newItems[index] = {
                                        ...item,
                                        buttons: newButtons,
                                      };
                                      handleContentChange("items", newItems);
                                    }}
                                  >
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Button
                                  </Button>
                                </div>
                              </div>
                            </Card>
                          )
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            const newItems = [...(tempContent?.items || [])];
                            newItems.push({
                              title: "",
                              descriptions: [""],
                              image: "",
                              buttons: [{ text: "", link: "" }],
                            });
                            handleContentChange("items", newItems);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Carousel Item
                        </Button>
                      </div>
                    </>
                  )}

                  {selectedElementData?.type === "features" && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="features-title">Section Title</Label>
                        <Input
                          id="features-title"
                          value={tempContent?.title || ""}
                          onChange={(e) =>
                            handleContentChange("title", e.target.value)
                          }
                          placeholder="e.g., Why Choose Us"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="features-backgroundColor">
                          Background Color
                        </Label>
                        <div className="flex items-center space-x-2">
                          {Object.entries(
                            selectedSite?.settings?.colors || {}
                          ).map(([key, value]) => (
                            <div
                              key={key}
                              className="w-4 h-4 rounded-full"
                              style={{ backgroundColor: value }}
                              onClick={() =>
                                handleContentChange("backgroundColor", value)
                              }
                            />
                          ))}
                        </div>
                        <Input
                          id="features-backgroundColor"
                          type="color"
                          value={tempContent?.backgroundColor || "#f8fafc"}
                          onChange={(e) =>
                            handleContentChange(
                              "backgroundColor",
                              e.target.value
                            )
                          }
                          className="h-10 w-full"
                        />
                      </div>

                      <div className="space-y-4">
                        <Label>Features</Label>
                        {(tempContent?.items || []).map(
                          (item: any, index: number) => (
                            <Card key={index} className="p-4">
                              <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                  <Label htmlFor={`feature-item-${index}`}>
                                    Feature {index + 1}
                                  </Label>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6 hover:text-destructive"
                                    onClick={() => {
                                      const newItems = [
                                        ...(tempContent?.items || []),
                                      ];
                                      newItems.splice(index, 1);
                                      handleContentChange("items", newItems);
                                    }}
                                  >
                                    <X className="h-3 w-3" />
                                  </Button>
                                </div>

                                {/* Title */}
                                <div className="space-y-2">
                                  <Label htmlFor={`feature-title-${index}`}>
                                    Title
                                  </Label>
                                  <Input
                                    id={`feature-title-${index}`}
                                    value={item.title || ""}
                                    onChange={(e) => {
                                      const newItems = [
                                        ...(tempContent?.items || []),
                                      ];
                                      newItems[index] = {
                                        ...item,
                                        title: e.target.value,
                                      };
                                      handleContentChange("items", newItems);
                                    }}
                                    placeholder="Feature title"
                                  />
                                </div>

                                {/* Description */}
                                <div className="space-y-2">
                                  <Label
                                    htmlFor={`feature-description-${index}`}
                                  >
                                    Description
                                  </Label>
                                  <Textarea
                                    id={`feature-description-${index}`}
                                    value={item.description || ""}
                                    onChange={(e) => {
                                      const newItems = [
                                        ...(tempContent?.items || []),
                                      ];
                                      newItems[index] = {
                                        ...item,
                                        description: e.target.value,
                                      };
                                      handleContentChange("items", newItems);
                                    }}
                                    placeholder="Feature description"
                                    rows={3}
                                  />
                                </div>

                                {/* Icon Selector */}
                                <div className="space-y-2">
                                  <Label htmlFor={`feature-icon-${index}`}>
                                    Icon
                                  </Label>
                                  <Select
                                    value={item.icon || ""}
                                    onValueChange={(value) => {
                                      const newItems = [
                                        ...(tempContent?.items || []),
                                      ];
                                      newItems[index] = {
                                        ...item,
                                        icon: value,
                                      };
                                      handleContentChange("items", newItems);
                                    }}
                                  >
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select an icon" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {commonLucideIcons.map((iconName) => (
                                        <SelectItem
                                          key={iconName}
                                          value={iconName}
                                        >
                                          {iconName}
                                        </SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                </div>
                              </div>
                            </Card>
                          )
                        )}

                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => {
                            const newItems = [...(tempContent?.items || [])];
                            newItems.push({
                              title: "",
                              description: "",
                              icon: "Star",
                            });
                            handleContentChange("items", newItems);
                          }}
                        >
                          <Plus className="h-4 w-4 mr-2" />
                          Add Feature
                        </Button>
                      </div>
                    </>
                  )}

                  <div className="pt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      onClick={handleUpdateElementContent}
                    >
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
                <h3 className="text-lg font-medium mb-2">
                  No Element Selected
                </h3>
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
            <Button
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
              onClick={() => setShowTutorial(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            {tutorialSteps[tutorialStep].content}
          </p>
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
                  setTutorialStep(tutorialStep + 1);
                } else {
                  setShowTutorial(false);
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
              Learn how to use the website editor to create and customize your
              school website.
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
                  <p className="text-sm text-muted-foreground">
                    {topic.content}
                  </p>
                </div>
              ))}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium mb-2">Need More Help?</h3>
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
            <Button onClick={() => setShowTutorial(true)}>
              Restart Tutorial
            </Button>
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
              Your changes have been saved. Your website visitors will see these
              changes once you publish your site.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowSaveDialog(false)}>
              Okay
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Element Alert Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Component?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this component? This action cannot
              be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeleteDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDeleteElement}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Delete Page Alert Dialog */}
      <AlertDialog
        open={showDeletePageDialog}
        onOpenChange={setShowDeletePageDialog}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Page?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the "{pageToDelete}" page? This
              action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowDeletePageDialog(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              onClick={confirmDeletePage}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Site Settings Dialog */}
      <AlertDialog open={showSiteSettings} onOpenChange={setShowSiteSettings}>
        <AlertDialogContent className="max-w-3xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Site Design Settings</AlertDialogTitle>
            <AlertDialogDescription>
              Customize the colors and fonts for your entire website.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <SiteSettingsPanel
              siteId={id}
              settings={
                selectedSite?.settings || {
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
                colors={
                  selectedSite?.settings?.colors || colorPalettes[0].colors
                }
                fonts={
                  selectedSite?.settings?.fonts || {
                    heading: fontStyles[0].heading,
                    body: fontStyles[0].body,
                  }
                }
              />
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setShowSiteSettings(false)}>
              Close
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
