import {
  getDesignerTemplates,
  getTemplateById as getTemplateByIdData,
  getTeacherBoards as getTeacherBoardsData,
  getSharedBoards as getSharedBoardsData,
  getStudentBoards as getStudentBoardsData,
  getStudentTasks as getStudentTasksData,
  getUsers,
  getOrganizations,
  getOrganizationMembers,
  getOrganizationActivity,
  getUserById,
  getBoardById,
} from "@/lib/data";

import type {
  Template,
  Board,
  Task,
  User,
  Organization,
  OrganizationMember,
  Activity,
  Site,
  Page,
  Section,
  SiteSettings,
} from "@/lib/types";

// Configuration flag to switch between mock and real API
const USE_MOCK_DATA = false;
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Helper for API requests
async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      // Add auth headers here when implemented
    },
    ...options,
  });

  if (!response.ok) {
    throw new Error(`API request failed: ${response.status}`);
  }

  return response.json();
}

// Template APIs
export async function fetchTemplates(): Promise<Template[]> {
  if (USE_MOCK_DATA) {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getDesignerTemplates();
  }

  return apiRequest<Template[]>("/templates");
}

export async function fetchTemplateById(id: string): Promise<Template | null> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getTemplateByIdData(id);
  }

  return apiRequest<Template | null>(`/templates/${id}`);
}

export async function createTemplate(
  template: Partial<Template>
): Promise<Template> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    // In a real implementation, this would add to the mock data
    const newTemplate = {
      ...template,
      id: `template-${Date.now()}`,
      createdAt: new Date(),
      updatedAt: new Date(),
    } as Template;

    return newTemplate;
  }

  return apiRequest<Template>("/templates", {
    method: "POST",
    body: JSON.stringify(template),
  });
}

export async function updateTemplate(
  id: string,
  updates: Partial<Template>
): Promise<Template> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const template = getTemplateByIdData(id);
    if (!template) throw new Error("Template not found");

    // In a real implementation, this would update the mock data
    return {
      ...template,
      ...updates,
      updatedAt: new Date(),
    };
  }

  return apiRequest<Template>(`/templates/${id}`, {
    method: "PATCH",
    body: JSON.stringify(updates),
  });
}

// Add these new functions for template management

/**
 * Archives multiple templates
 * @param templateIds Array of template IDs to archive
 * @returns Promise that resolves when the operation is complete
 */
export async function archiveTemplates(templateIds: string[]): Promise<void> {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real implementation, this would make an API call to archive templates
  console.log(`Archived templates: ${templateIds.join(", ")}`);
  return Promise.resolve();
}

/**
 * Deletes multiple templates
 * @param templateIds Array of template IDs to delete
 * @returns Promise that resolves when the operation is complete
 */
export async function deleteTemplates(templateIds: string[]): Promise<void> {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // In a real implementation, this would make an API call to delete templates
  console.log(`Deleted templates: ${templateIds.join(", ")}`);
  return Promise.resolve();
}

/**
 * Exports template data for the current user
 * @returns Promise that resolves with the exported data
 */
export async function exportTemplateData(): Promise<any> {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // Fetch templates to include in the export
  const templates = await fetchTemplates();

  // In a real implementation, this would format the data appropriately
  return {
    exportDate: new Date().toISOString(),
    templates,
    stats: {
      totalTemplates: templates.length,
      publishedTemplates: templates.filter((t) => t.status === "published")
        .length,
      totalInstalls: templates.reduce(
        (sum, t) => sum + (t.stats?.installs || 0),
        0
      ),
      totalRevenue: templates.reduce(
        (sum, t) => sum + (t.stats?.revenue || 0),
        0
      ),
    },
  };
}

// Board APIs
export async function fetchTeacherBoards(schoolId: string): Promise<Board[]> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return getTeacherBoardsData(schoolId);
  }

  return apiRequest<Board[]>(`/schools/${schoolId}/teacher-boards`);
}

export async function fetchSharedBoards(schoolId: string): Promise<Board[]> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return getSharedBoardsData(schoolId);
  }

  return apiRequest<Board[]>(`/schools/${schoolId}/shared-boards`);
}

export async function fetchBoardById(boardId: string): Promise<Board | null> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getBoardById(boardId);
  }

  return apiRequest<Board | null>(`/boards/${boardId}`);
}

export async function createBoard(board: Partial<Board>): Promise<Board> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 700));
    // In a real implementation, this would add to the mock data
    const newBoard = {
      ...board,
      id: `board-${Date.now()}`,
      createdAt: new Date(),
    } as Board;

    return newBoard;
  }

  return apiRequest<Board>("/boards", {
    method: "POST",
    body: JSON.stringify(board),
  });
}

// Student APIs
export async function fetchStudentBoards(schoolId: string) {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getStudentBoardsData(schoolId);
  }

  return apiRequest(`/schools/${schoolId}/student-boards`);
}

export async function fetchStudentTasks(): Promise<Task[]> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return getStudentTasksData();
  }

  return apiRequest<Task[]>("/student/tasks");
}

// Organization APIs
export async function fetchOrganizations(): Promise<Organization[]> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 600));
    return getOrganizations();
  }

  return apiRequest<Organization[]>("/organizations");
}

export async function fetchOrganizationMembers(
  orgId: string
): Promise<OrganizationMember[]> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return getOrganizationMembers(orgId);
  }

  return apiRequest<OrganizationMember[]>(`/organizations/${orgId}/members`);
}

export async function fetchOrganizationActivity(
  orgId: string
): Promise<Activity[]> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getOrganizationActivity(orgId);
  }

  return apiRequest<Activity[]>(`/organizations/${orgId}/activity`);
}

// User APIs
export async function fetchUsers(): Promise<User[]> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return getUsers();
  }

  return apiRequest<User[]>("/users");
}

export async function fetchUserById(userId: string): Promise<User | undefined> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return getUserById(userId);
  }

  return apiRequest<User>(`/users/${userId}`);
}

// Error handling wrapper for API calls
export async function safeApiCall<T>(
  apiCall: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await apiCall();
  } catch (error) {
    console.error("API call failed:", error);
    return fallback;
  }
}

// Add these functions to the existing api-service.ts file

// Mock notifications data
const mockNotifications = [
  {
    id: 1,
    type: "success",
    title: "New Teacher Added",
    message: "Dr. Martinez was successfully added to the system.",
    time: "10 minutes ago",
    read: false,
    icon: "UserPlus",
    actionUrl: "/admin/teachers",
  },
  {
    id: 2,
    type: "info",
    title: "System Update",
    message: "The system will undergo maintenance tonight at 2 AM.",
    time: "1 hour ago",
    read: false,
    icon: "Info",
  },
  {
    id: 3,
    type: "warning",
    title: "Storage Space Low",
    message:
      "Your school is approaching its storage limit. Consider upgrading.",
    time: "3 hours ago",
    read: false,
    icon: "AlertCircle",
    actionUrl: "/admin/settings",
  },
  {
    id: 4,
    type: "info",
    title: "New Feature Available",
    message: "Check out the new analytics dashboard for improved insights.",
    time: "5 hours ago",
    read: true,
    icon: "Settings",
    actionUrl: "/admin/analytics",
  },
  {
    id: 5,
    type: "success",
    title: "Backup Completed",
    message: "Your weekly system backup was completed successfully.",
    time: "Yesterday",
    read: true,
    icon: "CheckCircle",
  },
  {
    id: 6,
    type: "info",
    title: "Upcoming Event",
    message: "Teacher training session scheduled for next Monday.",
    time: "2 days ago",
    read: true,
    icon: "Calendar",
    actionUrl: "/admin/calendar",
  },
  {
    id: 7,
    type: "warning",
    title: "Template Request Pending",
    message: "There are 3 template requests awaiting your approval.",
    time: "3 days ago",
    read: false,
    icon: "FileCheck",
    actionUrl: "/admin/template-requests",
  },
  {
    id: 8,
    type: "error",
    title: "Database Connection Issue",
    message:
      "There was a temporary database connection issue that has been resolved.",
    time: "4 days ago",
    read: true,
    icon: "AlertTriangle",
  },
  {
    id: 9,
    type: "success",
    title: "New Student Enrolled",
    message: "Emma Thompson has been enrolled in Grade 10.",
    time: "5 days ago",
    read: true,
    icon: "UserPlus",
    actionUrl: "/admin/students",
  },
  {
    id: 10,
    type: "info",
    title: "Curriculum Update",
    message: "The science curriculum has been updated for the new semester.",
    time: "1 week ago",
    read: true,
    icon: "BookOpen",
  },
];

/**
 * Fetches notifications based on filter criteria
 * @param type Filter by notification type
 * @param timeRange Filter by time range
 * @returns Promise that resolves with notifications
 */
export async function fetchNotifications(
  type = "all",
  timeRange = "all"
): Promise<any[]> {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // In a real implementation, this would make an API call to fetch notifications
  // with the appropriate filters
  return mockNotifications;
}

/**
 * Marks a specific notification as read
 * @param id ID of the notification to mark as read
 * @returns Promise that resolves when the operation is complete
 */
export async function markNotificationAsRead(id: number): Promise<void> {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  // In a real implementation, this would make an API call to mark the notification as read
  console.log(`Marked notification ${id} as read`);
  return Promise.resolve();
}

/**
 * Marks all notifications as read
 * @returns Promise that resolves when the operation is complete
 */
export async function markAllNotificationsAsRead(): Promise<void> {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 700));

  // In a real implementation, this would make an API call to mark all notifications as read
  console.log("Marked all notifications as read");
  return Promise.resolve();
}

/**
 * Updates notification settings
 * @param settings Object containing notification settings
 * @returns Promise that resolves when the operation is complete
 */
export async function updateNotificationSettings(settings: any): Promise<void> {
  // Simulate API call with a delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real implementation, this would make an API call to update notification settings
  console.log("Updated notification settings:", settings);
  return Promise.resolve();
}

// Site APIs
export async function createSite(site: Partial<Site>): Promise<Site> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newSite = {
      ...site,
      _id: `site-${Date.now()}`,
      created_at: new Date(),
      updated_at: new Date(),
      last_updated: new Date(),
      settings: {
        id: `settings-${Date.now()}`,
        site_id: `site-${Date.now()}`,
        colors: {
          primary: "#3A86FF",
          secondary: "#8338EC",
          accent: "#FF006E",
          background: "#FFFFFF",
          text: "#14213D",
        },
        fonts: {
          heading: "Montserrat, sans-serif",
          body: "Open Sans, sans-serif",
        },
        logo_url: "",
        favicon_url: "",
        social_links: {},
        analytics: {},
        seo: {
          title: "",
          description: "",
          keywords: [],
        },
        created_at: new Date(),
        updated_at: new Date(),
      },
      pages: [],
    } as Site;
    return newSite;
  }
  console.log("Creating site:", site);
  console.log("API_BASE_URL:", API_BASE_URL);
  return apiRequest<Site>("/builder/sites", {
    method: "POST",
    body: JSON.stringify(site),
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getSites(query: any): Promise<any> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [];
  }

  return apiRequest<any>(
    `/builder/sites?page=${query.page}&limit=${query.limit}&status=${query.status}&search=${query.search}&schoolId=${query.schoolId}`
  );
}

export async function getSite(id: string): Promise<Site | null> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return null;
  }

  return apiRequest<Site | null>(`/builder/sites/${id}`);
}

export async function updateSite(
  id: string,
  updates: Partial<Site>
): Promise<Site> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const site = await getSite(id);
    if (!site) throw new Error("Site not found");

    return {
      ...site,
      ...updates,
      updated_at: new Date(),
      last_updated: new Date(),
    };
  }

  return apiRequest<Site>(`/builder/sites/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function deleteSite(id: string): Promise<void> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Promise.resolve();
  }

  return apiRequest<void>(`/builder/sites/${id}`, {
    method: "DELETE",
  });
}

export async function updateSiteSettings(
  id: string,
  settings: Partial<SiteSettings>
): Promise<Site> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const site = await getSite(id);
    if (!site) throw new Error("Site not found");

    return {
      ...site,
      settings: {
        ...site.settings,
        ...settings,
        updated_at: new Date(),
      },
      updated_at: new Date(),
      last_updated: new Date(),
    };
  }

  return apiRequest<Site>(`/builder/sites/${id}/settings`, {
    method: "PUT",
    body: JSON.stringify(settings),
  });
}

// Page APIs
export async function createPage(page: Partial<Page>): Promise<Page> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newPage = {
      ...page,
      id: `page-${Date.now()}`,
      created_at: new Date(),
      updated_at: new Date(),
    } as Page;
    return newPage;
  }

  return apiRequest<Page>("/builder/pages", {
    method: "POST",
    body: JSON.stringify(page),
  });
}

export async function getPages(siteId: string): Promise<Page[]> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [];
  }

  return apiRequest<Page[]>(`/builder/sites/${siteId}/pages`);
}

export async function getPage(id: string): Promise<Page | null> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return null;
  }

  return apiRequest<Page | null>(`/builder/pages/${id}`);
}

export async function updatePage(
  id: string,
  updates: Partial<Page>
): Promise<Page> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const page = await getPage(id);
    if (!page) throw new Error("Page not found");

    return {
      ...page,
      ...updates,
      updated_at: new Date(),
    };
  }

  return apiRequest<Page>(`/builder/pages/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function updatePageOrder(pageIds: string[]): Promise<void> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Promise.resolve();
  }

  return apiRequest<void>("/builder/pages/order", {
    method: "PUT",
    body: JSON.stringify({ pageIds }),
  });
}

export async function deletePage(id: string): Promise<void> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Promise.resolve();
  }

  return apiRequest<void>(`/builder/pages/${id}`, {
    method: "DELETE",
  });
}

// Section APIs
export async function createSection(
  section: Partial<Section>
): Promise<Section> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const newSection = {
      ...section,
      id: `section-${Date.now()}`,
      created_at: new Date(),
      updated_at: new Date(),
    } as Section;
    return newSection;
  }

  return apiRequest<Section>("/builder/sections", {
    method: "POST",
    body: JSON.stringify(section),
  });
}

export async function getSections(pageId: string): Promise<Section[]> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return [];
  }

  return apiRequest<Section[]>(`/builder/pages/${pageId}/sections`);
}

export async function getSection(id: string): Promise<Section | null> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 300));
    return null;
  }

  return apiRequest<Section | null>(`/builder/sections/${id}`);
}

export async function updateSection(
  id: string,
  updates: Partial<Section>
): Promise<Section> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const section = await getSection(id);
    if (!section) throw new Error("Section not found");

    return {
      ...section,
      ...updates,
      updated_at: new Date(),
    };
  }

  return apiRequest<Section>(`/builder/sections/${id}`, {
    method: "PUT",
    body: JSON.stringify(updates),
  });
}

export async function updateSectionOrder(
  sectionId: string,
  newIndex: number
): Promise<Section[]> {
  // if (USE_MOCK_DATA) {
  //   await new Promise((resolve) => setTimeout(resolve, 500));
  //   return Promise.resolve();
  // }

  return apiRequest<Section[]>("/builder/sections/order", {
    method: "POST",
    body: JSON.stringify({ sectionId, newIndex }),
  });
}

export async function deleteSection(id: string): Promise<void> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return Promise.resolve();
  }

  return apiRequest<void>(`/builder/sections/${id}`, {
    method: "DELETE",
  });
}

export async function duplicateSection(id: string): Promise<Section> {
  if (USE_MOCK_DATA) {
    await new Promise((resolve) => setTimeout(resolve, 800));
    const section = await getSection(id);
    if (!section) throw new Error("Section not found");

    const newSection = {
      ...section,
      id: `section-${Date.now()}`,
      created_at: new Date(),
      updated_at: new Date(),
    };
    return newSection;
  }

  return apiRequest<Section>(`/builder/sections/${id}/duplicate`, {
    method: "POST",
  });
}
export async function getProfile(token: string): Promise<User> {
  return apiRequest<User>("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
//sites
