"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
  useCallback,
} from "react";
import {
  getOrganizationById,
  getOrganizationMembers,
  getOrganizationTemplates,
  getOrganizationActivity,
  getOrganizationInvitations,
} from "@/lib/data";
import type {
  Organization,
  OrganizationMember,
  Template,
  Activity,
  Invitation,
  PaginationOptions,
  SortOptions,
  Site,
  Page,
  Section,
} from "@/lib/types";
import {
  createSite,
  getSites,
  getSite,
  updateSite,
  deleteSite,
  updateSiteSettings,
  createPage,
  getPages,
  getPage,
  updatePage,
  updatePageOrder,
  deletePage,
  createSection,
  getSections,
  getSection,
  updateSection,
  updateSectionOrder,
  deleteSection,
  duplicateSection,
} from "@/lib/api-service";

interface OrganizationDataContextType {
  organization: Organization | null;
  members: OrganizationMember[];
  templates: Template[];
  activities: Activity[];
  invitations: Invitation[];
  loading: boolean;
  error: Error | null;

  // Pagination and filtering
  paginatedMembers: (options: PaginationOptions) => OrganizationMember[];
  paginatedTemplates: (options: PaginationOptions) => Template[];
  paginatedActivities: (options: PaginationOptions) => Activity[];
  filteredMembers: (filter: Record<string, any>) => OrganizationMember[];
  filteredTemplates: (filter: Record<string, any>) => Template[];
  sortedMembers: (sortOptions: SortOptions) => OrganizationMember[];
  sortedTemplates: (sortOptions: SortOptions) => Template[];

  // Member actions
  addMember: (email: string, role: string) => Promise<void>;
  updateMemberRole: (memberId: string, role: string) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;

  // Template actions
  createTemplate: (template: Partial<Template>) => Promise<void>;
  updateTemplate: (
    templateId: string,
    data: Partial<Template>
  ) => Promise<void>;
  deleteTemplate: (templateId: string) => Promise<void>;
  approveTemplate: (templateId: string) => Promise<void>;
  rejectTemplate: (templateId: string, reason: string) => Promise<void>;
  toggleFeatureTemplate: (templateId: string) => Promise<void>;

  // Organization actions
  updateOrganization: (data: Partial<Organization>) => Promise<void>;

  // Analytics
  getTemplateAnalytics: (timeframe: string) => any;
  getMemberAnalytics: (timeframe: string) => any;
  getRevenueAnalytics: (timeframe: string) => any;

  // Refresh functions
  refreshData: () => Promise<void>;

  // Site state
  sites: Site[];
  currentSite: Site | null;
  selectedSite: Site | null;
  sitePages: Page[];
  currentPage: Page | null;
  pageSections: Section[];

  // Site actions
  createNewSite: (site: Partial<Site>) => Promise<void>;
  updateSiteData: (siteId: string, data: Partial<Site>) => Promise<void>;
  deleteSiteData: (siteId: string) => Promise<void>;
  updateSiteSettingsData: (
    siteId: string,
    settings: Partial<Site["settings"]>
  ) => Promise<void>;
  getSiteById: (siteId: string) => Promise<void>;

  // Page actions
  createNewPage: (page: Partial<Page>) => Promise<void>;
  updatePageData: (pageId: string, data: Partial<Page>) => Promise<void>;
  deletePageData: (pageId: string) => Promise<void>;
  updatePagesOrder: (pageIds: string[]) => Promise<void>;

  // Section actions
  createNewSection: (section: Partial<Section>) => Promise<void>;
  updateSectionData: (
    sectionId: string,
    data: Partial<Section>
  ) => Promise<void>;
  deleteSectionData: (sectionId: string) => Promise<void>;
  updateSectionsOrder: (sectionIds: string[]) => Promise<void>;
  duplicateSectionData: (sectionId: string) => Promise<void>;

  // Site selection
  setCurrentSite: (site: Site | null) => void;
  setCurrentPage: (page: Page | null) => void;
}

const OrganizationDataContext = createContext<
  OrganizationDataContextType | undefined
>(undefined);

export function OrganizationDataProvider({
  children,
  organizationId = "org-1", // This would come from auth context in a real app
}: {
  children: ReactNode;
  organizationId?: string;
}) {
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Site state
  const [sites, setSites] = useState<Site[]>([]);
  const [currentSite, setCurrentSite] = useState<Site | null>(null);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [sitePages, setSitePages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [pageSections, setPageSections] = useState<Section[]>([]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [org, membersList, templatesList, activitiesList, invitationsList] =
        await Promise.all([
          getOrganizationById(organizationId),
          getOrganizationMembers(organizationId),
          getOrganizationTemplates(organizationId),
          getOrganizationActivity(organizationId),
          getOrganizationInvitations(organizationId),
          fetchSitesData(),
        ]);

      setOrganization(org || null);
      setMembers(membersList);
      setTemplates(templatesList);
      setActivities(activitiesList);
      setInvitations(invitationsList);
    } catch (error) {
      console.error("Error fetching organization data:", error);
      setError(
        error instanceof Error ? error : new Error("Unknown error occurred")
      );
    } finally {
      setLoading(false);
    }
  };

  // Fetch sites data
  const fetchSitesData = async () => {
    try {
      const sitesList = await getSites();
      setSites(sitesList?.sites);
    } catch (error) {
      console.error("Error fetching sites:", error);
      setError(
        error instanceof Error ? error : new Error("Unknown error occurred")
      );
    }
  };

  // Fetch pages for current site
  const fetchSitePages = async (siteId: string) => {
    try {
      const pages = await getPages(siteId);
      setSitePages(pages);
    } catch (error) {
      console.error("Error fetching pages:", error);
      setError(
        error instanceof Error ? error : new Error("Unknown error occurred")
      );
    }
  };

  // Fetch sections for current page
  const fetchPageSections = async (pageId: string) => {
    try {
      const sections = await getSections(pageId);
      setPageSections(sections);
    } catch (error) {
      console.error("Error fetching sections:", error);
      setError(
        error instanceof Error ? error : new Error("Unknown error occurred")
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, [organizationId]);

  // Pagination and filtering helpers
  const paginatedMembers = useCallback(
    ({ page = 1, pageSize = 10 }: PaginationOptions) => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      return members.slice(start, end);
    },
    [members]
  );

  const paginatedTemplates = useCallback(
    ({ page = 1, pageSize = 10 }: PaginationOptions) => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      return templates.slice(start, end);
    },
    [templates]
  );

  const paginatedActivities = useCallback(
    ({ page = 1, pageSize = 10 }: PaginationOptions) => {
      const start = (page - 1) * pageSize;
      const end = start + pageSize;
      return activities.slice(start, end);
    },
    [activities]
  );

  const filteredMembers = useCallback(
    (filter: Record<string, any>) => {
      return members.filter((member) => {
        return Object.entries(filter).every(([key, value]) => {
          if (!value) return true; // Skip empty filters
          if (typeof value === "string") {
            return String(member[key as keyof OrganizationMember])
              .toLowerCase()
              .includes(value.toLowerCase());
          }
          return member[key as keyof OrganizationMember] === value;
        });
      });
    },
    [members]
  );

  const filteredTemplates = useCallback(
    (filter: Record<string, any>) => {
      return templates.filter((template) => {
        return Object.entries(filter).every(([key, value]) => {
          if (!value) return true; // Skip empty filters
          if (typeof value === "string") {
            return String(template[key as keyof Template])
              .toLowerCase()
              .includes(value.toLowerCase());
          }
          return template[key as keyof Template] === value;
        });
      });
    },
    [templates]
  );

  const sortedMembers = useCallback(
    ({ field, direction = "asc" }: SortOptions) => {
      return [...members].sort((a, b) => {
        const aValue = a[field as keyof OrganizationMember];
        const bValue = b[field as keyof OrganizationMember];

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
      });
    },
    [members]
  );

  const sortedTemplates = useCallback(
    ({ field, direction = "asc" }: SortOptions) => {
      return [...templates].sort((a, b) => {
        const aValue = a[field as keyof Template];
        const bValue = b[field as keyof Template];

        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
        return 0;
      });
    },
    [templates]
  );

  // Member actions
  const addMember = async (email: string, role: string) => {
    try {
      // In a real app, this would be an API call
      const newInvitation: Invitation = {
        id: `invitation-${Date.now()}`,
        email,
        organizationId,
        role: role as "admin" | "designer" | "viewer",
        invitedBy: "user-1", // This would come from auth context
        invitedAt: new Date(),
        status: "pending",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        token: `inv-token-${Date.now()}`,
      };

      setInvitations((prev) => [newInvitation, ...prev]);

      // Add activity
      const newActivity: Activity = {
        id: `activity-${Date.now()}`,
        type: "user_invited",
        userId: "user-1", // This would come from auth context
        userName: "Jane Cooper", // This would come from auth context
        userAvatar: "/placeholder.svg?height=40&width=40",
        organizationId,
        timestamp: new Date(),
        details: { invitedEmail: email, role },
        scope: "organization",
      };

      setActivities((prev) => [newActivity, ...prev]);
    } catch (error) {
      console.error("Error adding member:", error);
      throw error;
    }
  };

  const updateMemberRole = async (memberId: string, role: string) => {
    try {
      // In a real app, this would be an API call
      const updatedMembers = members.map((member) =>
        member.id === memberId
          ? { ...member, role: role as "admin" | "designer" | "viewer" }
          : member
      );

      setMembers(updatedMembers);

      // Add activity
      const member = members.find((m) => m.id === memberId);
      if (member) {
        const newActivity: Activity = {
          id: `activity-${Date.now()}`,
          type: "user_role_updated",
          userId: "user-1", // This would come from auth context
          userName: "Jane Cooper", // This would come from auth context
          userAvatar: "/placeholder.svg?height=40&width=40",
          organizationId,
          timestamp: new Date(),
          details: { memberId, oldRole: member.role, newRole: role },
          scope: "organization",
        };

        setActivities((prev) => [newActivity, ...prev]);
      }
    } catch (error) {
      console.error("Error updating member role:", error);
      throw error;
    }
  };

  const removeMember = async (memberId: string) => {
    try {
      // In a real app, this would be an API call
      const memberToRemove = members.find((m) => m.id === memberId);
      const updatedMembers = members.filter((member) => member.id !== memberId);

      setMembers(updatedMembers);

      // Add activity
      if (memberToRemove) {
        const newActivity: Activity = {
          id: `activity-${Date.now()}`,
          type: "user_removed",
          userId: "user-1", // This would come from auth context
          userName: "Jane Cooper", // This would come from auth context
          userAvatar: "/placeholder.svg?height=40&width=40",
          organizationId,
          timestamp: new Date(),
          details: { memberId, memberName: memberToRemove.userId },
          scope: "organization",
        };

        setActivities((prev) => [newActivity, ...prev]);
      }
    } catch (error) {
      console.error("Error removing member:", error);
      throw error;
    }
  };

  // Template actions
  const createTemplate = async (template: Partial<Template>) => {
    try {
      // In a real app, this would be an API call
      const newTemplate: Template = {
        id: `template-${Date.now()}`,
        title: template.title || "Untitled Template",
        description: template.description || "",
        createdAt: new Date(),
        updatedAt: new Date(),
        designerId: "user-1", // This would come from auth context
        designerName: "Jane Cooper", // This would come from auth context
        organizationId,
        previewImage:
          template.previewImage || "/placeholder.svg?height=200&width=300",
        color: template.color || "bg-blue-500",
        educationLevels: template.educationLevels || [],
        subjects: template.subjects || [],
        pricing: template.pricing || { type: "free" },
        status: template.status || "draft",
        visibility: template.visibility || "organization",
        featured: false,
        stats: {
          views: 0,
          installs: 0,
          activeInstances: 0,
          rating: 0,
          schoolsUsing: 0,
          revenue: 0,
        },
        versions: [
          {
            version: "1.0.0",
            releaseDate: new Date(),
            changes: ["Initial creation"],
          },
        ],
        columns: template.columns || [],
        tasks: template.tasks || [],
        sprints: template.sprints || [],
        collaborators: template.collaborators || [],
      };

      setTemplates((prev) => [newTemplate, ...prev]);

      // Add activity
      const newActivity: Activity = {
        id: `activity-${Date.now()}`,
        type: "template_created",
        userId: "user-1", // This would come from auth context
        userName: "Jane Cooper", // This would come from auth context
        userAvatar: "/placeholder.svg?height=40&width=40",
        organizationId,
        templateId: newTemplate.id,
        templateTitle: newTemplate.title,
        timestamp: new Date(),
        details: { templateId: newTemplate.id },
        scope: "organization",
      };

      setActivities((prev) => [newActivity, ...prev]);
    } catch (error) {
      console.error("Error creating template:", error);
      throw error;
    }
  };

  const updateTemplate = async (
    templateId: string,
    data: Partial<Template>
  ) => {
    try {
      // In a real app, this would be an API call
      const updatedTemplates = templates.map((template) =>
        template.id === templateId
          ? {
              ...template,
              ...data,
              updatedAt: new Date(),
              versions: [
                {
                  version: `${template.versions.length + 1}.0.0`,
                  releaseDate: new Date(),
                  changes: ["Template updated"],
                },
                ...template.versions,
              ],
            }
          : template
      );

      setTemplates(updatedTemplates);

      // Add activity
      const template = templates.find((t) => t.id === templateId);
      if (template) {
        const newActivity: Activity = {
          id: `activity-${Date.now()}`,
          type: "template_updated",
          userId: "user-1", // This would come from auth context
          userName: "Jane Cooper", // This would come from auth context
          userAvatar: "/placeholder.svg?height=40&width=40",
          organizationId,
          templateId,
          templateTitle: template.title,
          timestamp: new Date(),
          details: { templateId, changes: Object.keys(data) },
          scope: "organization",
        };

        setActivities((prev) => [newActivity, ...prev]);
      }
    } catch (error) {
      console.error("Error updating template:", error);
      throw error;
    }
  };

  const deleteTemplate = async (templateId: string) => {
    try {
      // In a real app, this would be an API call
      const templateToDelete = templates.find((t) => t.id === templateId);
      const updatedTemplates = templates.filter(
        (template) => template.id !== templateId
      );

      setTemplates(updatedTemplates);

      // Add activity
      if (templateToDelete) {
        const newActivity: Activity = {
          id: `activity-${Date.now()}`,
          type: "template_deleted",
          userId: "user-1", // This would come from auth context
          userName: "Jane Cooper", // This would come from auth context
          userAvatar: "/placeholder.svg?height=40&width=40",
          organizationId,
          templateId,
          templateTitle: templateToDelete.title,
          timestamp: new Date(),
          details: { templateId },
          scope: "organization",
        };

        setActivities((prev) => [newActivity, ...prev]);
      }
    } catch (error) {
      console.error("Error deleting template:", error);
      throw error;
    }
  };

  const approveTemplate = async (templateId: string) => {
    try {
      // In a real app, this would be an API call
      const updatedTemplates = templates.map((template) =>
        template.id === templateId
          ? {
              ...template,
              status: "published",
              updatedAt: new Date(),
            }
          : template
      );

      setTemplates(updatedTemplates);

      // Add activity
      const template = templates.find((t) => t.id === templateId);
      if (template) {
        const newActivity: Activity = {
          id: `activity-${Date.now()}`,
          type: "template_published",
          userId: "user-1", // This would come from auth context
          userName: "Jane Cooper", // This would come from auth context
          userAvatar: "/placeholder.svg?height=40&width=40",
          organizationId,
          templateId,
          templateTitle: template.title,
          timestamp: new Date(),
          details: { templateId },
          scope: "organization",
        };

        setActivities((prev) => [newActivity, ...prev]);
      }
    } catch (error) {
      console.error("Error approving template:", error);
      throw error;
    }
  };

  const rejectTemplate = async (templateId: string, reason: string) => {
    try {
      // In a real app, this would be an API call
      const updatedTemplates = templates.map((template) =>
        template.id === templateId
          ? {
              ...template,
              status: "rejected",
              updatedAt: new Date(),
              moderationNotes: reason,
            }
          : template
      );

      setTemplates(updatedTemplates);

      // Add activity
      const template = templates.find((t) => t.id === templateId);
      if (template) {
        const newActivity: Activity = {
          id: `activity-${Date.now()}`,
          type: "template_rejected",
          userId: "user-1", // This would come from auth context
          userName: "Jane Cooper", // This would come from auth context
          userAvatar: "/placeholder.svg?height=40&width=40",
          organizationId,
          templateId,
          templateTitle: template.title,
          timestamp: new Date(),
          details: { templateId, reason },
          scope: "organization",
        };

        setActivities((prev) => [newActivity, ...prev]);
      }
    } catch (error) {
      console.error("Error rejecting template:", error);
      throw error;
    }
  };

  const toggleFeatureTemplate = async (templateId: string) => {
    try {
      // In a real app, this would be an API call
      const updatedTemplates = templates.map((template) =>
        template.id === templateId
          ? {
              ...template,
              featured: !template.featured,
              updatedAt: new Date(),
            }
          : template
      );

      setTemplates(updatedTemplates);

      // Add activity
      const template = templates.find((t) => t.id === templateId);
      if (template) {
        const newActivity: Activity = {
          id: `activity-${Date.now()}`,
          type: template.featured ? "template_unfeatured" : "template_featured",
          userId: "user-1", // This would come from auth context
          userName: "Jane Cooper", // This would come from auth context
          userAvatar: "/placeholder.svg?height=40&width=40",
          organizationId,
          templateId,
          templateTitle: template.title,
          timestamp: new Date(),
          details: { templateId },
          scope: "organization",
        };

        setActivities((prev) => [newActivity, ...prev]);
      }
    } catch (error) {
      console.error("Error toggling template feature status:", error);
      throw error;
    }
  };

  // Organization actions
  const updateOrganization = async (data: Partial<Organization>) => {
    try {
      // In a real app, this would be an API call
      if (organization) {
        const updatedOrg = { ...organization, ...data };
        setOrganization(updatedOrg);

        // Add activity
        const newActivity: Activity = {
          id: `activity-${Date.now()}`,
          type: "organization_updated",
          userId: "user-1", // This would come from auth context
          userName: "Jane Cooper", // This would come from auth context
          userAvatar: "/placeholder.svg?height=40&width=40",
          organizationId,
          timestamp: new Date(),
          details: { changes: Object.keys(data) },
          scope: "organization",
        };

        setActivities((prev) => [newActivity, ...prev]);
      }
    } catch (error) {
      console.error("Error updating organization:", error);
      throw error;
    }
  };

  // Analytics functions
  const getTemplateAnalytics = useCallback((timeframe: string) => {
    // In a real app, this would calculate analytics based on the timeframe
    // For now, we'll return mock data
    const now = new Date();
    const startDate = new Date();

    switch (timeframe) {
      case "7days":
        startDate.setDate(now.getDate() - 7);
        break;
      case "30days":
        startDate.setDate(now.getDate() - 30);
        break;
      case "90days":
        startDate.setDate(now.getDate() - 90);
        break;
      case "year":
        startDate.setFullYear(now.getFullYear() - 1);
        break;
      default:
        // All time - use a date far in the past
        startDate.setFullYear(2000);
    }

    // Generate daily data points between start date and now
    const dataPoints = [];
    const currentDate = new Date(startDate);

    while (currentDate <= now) {
      dataPoints.push({
        date: new Date(currentDate),
        installs: Math.floor(Math.random() * 10),
        views: Math.floor(Math.random() * 50),
        revenue: Math.random() * 100,
      });

      currentDate.setDate(currentDate.getDate() + 1);
    }

    return {
      dataPoints,
      totals: {
        installs: dataPoints.reduce((sum, point) => sum + point.installs, 0),
        views: dataPoints.reduce((sum, point) => sum + point.views, 0),
        revenue: dataPoints.reduce((sum, point) => sum + point.revenue, 0),
      },
    };
  }, []);

  const getMemberAnalytics = useCallback(
    (timeframe: string) => {
      // Similar to template analytics but for members
      const roleDistribution = {
        admin: members.filter((m) => m.role === "admin").length,
        designer: members.filter((m) => m.role === "designer").length,
        viewer: members.filter((m) => m.role === "viewer").length,
      };

      const activityByMember = members
        .map((member) => ({
          id: member.id,
          name: member.userId, // In a real app, we'd get the actual name
          activityCount: activities.filter((a) => a.userId === member.userId)
            .length,
        }))
        .sort((a, b) => b.activityCount - a.activityCount);

      return {
        roleDistribution,
        activityByMember,
        totalMembers: members.length,
        activeMembers: members.filter((m) => m.status === "active").length,
      };
    },
    [members, activities]
  );

  const getRevenueAnalytics = useCallback(
    (timeframe: string) => {
      // Revenue analytics
      const revenueByTemplate = templates
        .filter((t) => t.stats.revenue && t.stats.revenue > 0)
        .map((template) => ({
          id: template.id,
          title: template.title,
          revenue: template.stats.revenue || 0,
          installs: template.stats.installs,
        }))
        .sort((a, b) => b.revenue - a.revenue);

      const totalRevenue = revenueByTemplate.reduce(
        (sum, t) => sum + t.revenue,
        0
      );

      return {
        revenueByTemplate,
        totalRevenue,
        averageRevenuePerTemplate:
          totalRevenue / (revenueByTemplate.length || 1),
      };
    },
    [templates]
  );

  // Site actions
  const createNewSite = async (site: Partial<Site>) => {
    try {
      setLoading(true);
      const newSite = await createSite(site);
      setSites((prev) => [newSite, ...prev]);
      return newSite;
    } catch (error) {
      console.error("Error creating site:", error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateSiteData = async (siteId: string, data: Partial<Site>) => {
    try {
      const updatedSite = await updateSite(siteId, data);
      setSites((prev) =>
        prev.map((site) => (site._id === siteId ? updatedSite : site))
      );
      if (currentSite?._id === siteId) {
        setCurrentSite(updatedSite);
      }
    } catch (error) {
      console.error("Error updating site:", error);
      throw error;
    }
  };

  const deleteSiteData = async (siteId: string) => {
    try {
      await deleteSite(siteId);
      setSites((prev) => prev.filter((site) => site._id !== siteId));
      if (currentSite?._id === siteId) {
        setCurrentSite(null);
      }
    } catch (error) {
      console.error("Error deleting site:", error);
      throw error;
    }
  };

  const updateSiteSettingsData = async (
    siteId: string,
    settings: Partial<Site["settings"]>
  ) => {
    try {
      const updatedSite = await updateSiteSettings(siteId, settings);
      setSites((prev) =>
        prev.map((site) => (site._id === siteId ? updatedSite : site))
      );
      if (currentSite?._id === siteId) {
        setCurrentSite(updatedSite);
      }
    } catch (error) {
      console.error("Error updating site settings:", error);
      throw error;
    }
  };

  // Page actions
  const createNewPage = async (page: Partial<Page>) => {
    try {
      const newPage = await createPage(page);
      setSitePages((prev) => [newPage, ...prev]);
    } catch (error) {
      console.error("Error creating page:", error);
      throw error;
    }
  };

  const updatePageData = async (pageId: string, data: Partial<Page>) => {
    try {
      const updatedPage = await updatePage(pageId, data);
      setSitePages((prev) =>
        prev.map((page) => (page.id === pageId ? updatedPage : page))
      );
      if (currentPage?.id === pageId) {
        setCurrentPage(updatedPage);
      }
    } catch (error) {
      console.error("Error updating page:", error);
      throw error;
    }
  };

  const deletePageData = async (pageId: string) => {
    try {
      await deletePage(pageId);
      setSitePages((prev) => prev.filter((page) => page.id !== pageId));
      if (currentPage?.id === pageId) {
        setCurrentPage(null);
      }
    } catch (error) {
      console.error("Error deleting page:", error);
      throw error;
    }
  };

  const updatePagesOrder = async (pageIds: string[]) => {
    try {
      await updatePageOrder(pageIds);
      // Refresh pages to get the new order
      if (currentSite) {
        await fetchSitePages(currentSite._id);
      }
    } catch (error) {
      console.error("Error updating pages order:", error);
      throw error;
    }
  };

  // Section actions
  const createNewSection = async (section: Partial<Section>) => {
    try {
      const newSection = await createSection(section);
      setPageSections((prev) => [newSection, ...prev]);
    } catch (error) {
      console.error("Error creating section:", error);
      throw error;
    }
  };

  const updateSectionData = async (
    sectionId: string,
    data: Partial<Section>
  ) => {
    try {
      const updatedSection = await updateSection(sectionId, data);
      setPageSections((prev) =>
        prev.map((section) =>
          section.id === sectionId ? updatedSection : section
        )
      );
    } catch (error) {
      console.error("Error updating section:", error);
      throw error;
    }
  };

  const deleteSectionData = async (sectionId: string) => {
    try {
      await deleteSection(sectionId);
      setPageSections((prev) =>
        prev.filter((section) => section.id !== sectionId)
      );
    } catch (error) {
      console.error("Error deleting section:", error);
      throw error;
    }
  };

  const updateSectionsOrder = async (sectionIds: string[]) => {
    try {
      await updateSectionOrder(sectionIds);
      // Refresh sections to get the new order
      if (currentPage) {
        await fetchPageSections(currentPage.id);
      }
    } catch (error) {
      console.error("Error updating sections order:", error);
      throw error;
    }
  };

  const duplicateSectionData = async (sectionId: string) => {
    try {
      const newSection = await duplicateSection(sectionId);
      setPageSections((prev) => [newSection, ...prev]);
    } catch (error) {
      console.error("Error duplicating section:", error);
      throw error;
    }
  };

  // Effects for fetching related data
  useEffect(() => {
    if (currentSite) {
      fetchSitePages(currentSite._id);
    } else {
      setSitePages([]);
    }
  }, [currentSite]);

  useEffect(() => {
    if (currentPage) {
      fetchPageSections(currentPage.id);
    } else {
      setPageSections([]);
    }
  }, [currentPage]);

  // Add this new function to get a single site
  const getSiteById = async (siteId: string) => {
    try {
      setLoading(true);
      const site = await getSite(siteId);
      setSelectedSite(site);
      return site;
    } catch (error) {
      console.error("Error fetching site:", error);
      setError(
        error instanceof Error ? error : new Error("Unknown error occurred")
      );
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrganizationDataContext.Provider
      value={{
        organization,
        members,
        templates,
        activities,
        invitations,
        loading,
        error,

        // Pagination and filtering
        paginatedMembers,
        paginatedTemplates,
        paginatedActivities,
        filteredMembers,
        filteredTemplates,
        sortedMembers,
        sortedTemplates,

        // Member actions
        addMember,
        updateMemberRole,
        removeMember,

        // Template actions
        createTemplate,
        updateTemplate,
        deleteTemplate,
        approveTemplate,
        rejectTemplate,
        toggleFeatureTemplate,

        // Organization actions
        updateOrganization,

        // Analytics
        getTemplateAnalytics,
        getMemberAnalytics,
        getRevenueAnalytics,

        // Refresh function
        refreshData: fetchData,

        // Site state
        sites,
        currentSite,
        selectedSite,
        sitePages,
        currentPage,
        pageSections,

        // Site actions
        createNewSite,
        updateSiteData,
        deleteSiteData,
        updateSiteSettingsData,
        getSiteById,

        // Page actions
        createNewPage,
        updatePageData,
        deletePageData,
        updatePagesOrder,

        // Section actions
        createNewSection,
        updateSectionData,
        deleteSectionData,
        updateSectionsOrder,
        duplicateSectionData,

        // Site selection
        setCurrentSite,
        setCurrentPage,
      }}
    >
      {children}
    </OrganizationDataContext.Provider>
  );
}

export function useOrganizationData() {
  const context = useContext(OrganizationDataContext);
  if (context === undefined) {
    throw new Error(
      "useOrganizationData must be used within an OrganizationDataProvider"
    );
  }
  return context;
}
