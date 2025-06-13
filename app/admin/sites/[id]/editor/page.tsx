"use client";

import type React from "react";
import { ReactNode, use } from "react";

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
  Edit,
  Check,
  Type,
  Users,
  Palette,
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
  } = useOrganizationData();
  const router = useRouter();
  const [activeView, setActiveView] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );

  const [showComponentLibrary, setShowComponentLibrary] = useState(true);
  const [showPropertiesPanel, setShowPropertiesPanel] = useState(true);
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
        label: "Call to Action",
        description: "Banner with button",
        icon: (<Megaphone className="h-8 w-8 mb-1" />) as ReactNode,
        category: "essential",
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
        id: "contact-form",
        label: "Contact Form",
        description: "Form for inquiries",
        icon: (<Pencil className="h-8 w-8 mb-1" />) as ReactNode,
        category: "interactive",
        difficulty: "advanced",
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
    if (!pageId) {
      addToast({
        title: "Error",
        description: "No page selected",
        variant: "destructive",
      });
      return;
    }

    // First save the current state
    await updatePageData(pageId, {
      title: pageTitle,
      slug: pageTitle.toLowerCase().replace(/\s+/g, "-"),
      is_homepage: pageTitle.toLowerCase() === "home",
    });

    // Save all sections for the current page
    for (const section of pageSections) {
      await createNewSection({
        page_id: pageId,
        type: section.type,
        label: section.label,
        order_index: pageSections.indexOf(section),
        content: section.content,
      });
    }

    // Navigate to the preview page
    router.push(`/dashboard/sites/${id}/preview`);
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
            ctaLink: "#",
            backgroundImage: "/traditional-schoolhouse.png",
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
    setTempContent((prev: any) => ({
      ...prev,
      [field]: value,
    }));
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

  const handleSave = async () => {
    if (!pageId) {
      console.log("No page selected");
      addToast({
        title: "Error",
        description: "No page selected",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);

    try {
      // Save the current page data
      await updatePageData(pageId, {
        title: pageTitle,
        slug: pageTitle.toLowerCase().replace(/\s+/g, "-"),
        is_homepage: pageTitle.toLowerCase() === "home",
      });

      // Save all sections for the current page
      for (const section of pageSections) {
        await createNewSection({
          page_id: pageId,
          type: section.type,
          label: section.label,
          order_index: pageSections.indexOf(section),
          content: section.content,
        });
      }

      // Show success message
      setShowSaveDialog(true);

      // If tutorial is active and this is the first save, advance to next step
      if (showTutorial && tutorialStep === 3) {
        setTutorialStep(4);
      }
    } catch (error) {
      console.error("Error saving site:", error);
      addToast({
        title: "Error saving site",
        description: "An unexpected error occurred while saving your site.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

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
            href="/dashboard/sites"
            className="flex items-center text-sm text-muted-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to sites
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <TooltipProvider>
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
          </TooltipProvider>

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
                  variant="outline"
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
                          <div className="flex flex-col items-center text-center">
                            <div className="w-3/4 h-10 bg-muted rounded mb-4 flex items-center justify-center">
                              <span className="text-sm text-muted-foreground">
                                {section.content.title}
                              </span>
                            </div>
                            <div className="w-2/3 h-6 bg-muted rounded mb-2 flex items-center justify-center">
                              <span className="text-xs text-muted-foreground">
                                {section.content.subtitle}
                              </span>
                            </div>
                            <div className="flex gap-4 mt-4">
                              <div className="w-32 h-10 bg-primary rounded flex items-center justify-center">
                                <span className="text-xs text-primary-foreground">
                                  {section.content.ctaText}
                                </span>
                              </div>
                            </div>
                          </div>
                        )}

                        {section.type === "heading" && (
                          <div className="mt-6 text-center">
                            <h2 className={`text-2xl font-bold`}>
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
                        <Label htmlFor="hero-link">Button Link</Label>
                        <Input
                          id="hero-link"
                          value={tempContent?.ctaLink || ""}
                          onChange={(e) =>
                            handleContentChange("ctaLink", e.target.value)
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="hero-background">
                          Background Image URL
                        </Label>
                        <Input
                          id="hero-background"
                          value={tempContent?.backgroundImage || ""}
                          onChange={(e) =>
                            handleContentChange(
                              "backgroundImage",
                              e.target.value
                            )
                          }
                        />
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

              <div className="border rounded-lg p-4 bg-blue-50 border-blue-200">
                <h3 className="font-medium flex items-center mb-2 text-blue-800">
                  <Info className="h-5 w-5 mr-2 text-blue-500" />
                  <span>Need More Help?</span>
                </h3>
                <p className="text-sm text-blue-700 mb-4">
                  If you need additional assistance, you can:
                </p>
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
