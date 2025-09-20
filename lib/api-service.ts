import {
  getDesignerTemplates,
  getTemplateById as getTemplateByIdData,
  getTeacherBoards as getTeacherBoardsData,
  getSharedBoards as getSharedBoardsData,
  getStudentBoards as getStudentBoardsData,
  getStudentTasks as getStudentTasksData,
  getOrganizations,
  getOrganizationMembers,
  getOrganizationActivity,
  getUserById,
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
  Subject,
  UsersData,
  GetUsersPayload,
  GetClassesPayload,
  ClassesData,
  Classroom,
  Level,
  StudyPeriod,
  FullClassRoomCreationData,
  Course,
  List,
  Card,
  Order,
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
export async function createSite(site: any): Promise<Site> {
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
): Promise<SiteSettings> {
  return apiRequest<SiteSettings>(`/builder/sites/${id}/settings`, {
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
//Users

// Create user API - accepts partial user data
export async function createUser(
  userData: Partial<User>,
  token: string
): Promise<{ message: string; user: User }> {
  return apiRequest<{ message: string; user: User }>("/admin/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
}

// Update user by ID API - accepts partial user data
export async function updateUser(
  userId: string,
  userData: Partial<User>,
  token: string
): Promise<{ message: string; user: User }> {
  return apiRequest<{ message: string; user: User }>(`/admin/users/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(userData),
  });
}

// Delete user by ID API
export async function deleteUser(
  userId: string,
  token: string
): Promise<{ message: string }> {
  return apiRequest<{ message: string }>(`/admin/users/${userId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getUsers(
  payload: GetUsersPayload,

  token: string
): Promise<UsersData | null> {
  return apiRequest<
    | UsersData
    | {
        users: [];
        totalPages: 1;
        currentPage: 1;
        totalUsers: 0;
      }
  >(
    `/admin/users?page=${payload.page}&&limit=${payload.limit}&&role=${payload.role}&&search=${payload.search}&&schoolId=${payload.schoolId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// clasRoom
// getClasses
export async function getClasses(
  payload: GetClassesPayload,
  token: string
): Promise<ClassesData | null> {
  return apiRequest<ClassesData | null>(
    `/school/classrooms?schoolId=${payload.schoolId}&fromDate=${payload.fromDate}&toDate=${payload.toDate}&&page=${payload.page}&&limit=${payload.limit}&&search=${payload.search}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
}

// getClassesById
export async function getClassesById(
  id: string,
  token: string
): Promise<Classroom | null> {
  return apiRequest<Classroom | null>(`/school/classrooms/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}
// createClassroom
export async function createClassroom(
  classroom: Partial<Classroom>,
  token: string
): Promise<Classroom> {
  return apiRequest<Classroom>("/school/classrooms", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(classroom),
  });
}
// updateClassroom
export async function updateClassroom(
  id: string,
  classroom: Partial<Classroom>,
  token: string
): Promise<Classroom> {
  return apiRequest<Classroom>(`/school/classrooms/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(classroom),
  });
}
// deleteClassroom
export async function deleteClassroom(
  id: string,
  token: string
): Promise<Classroom> {
  return apiRequest<Classroom>(`/school/classrooms/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Subjects
export async function getAllSubjects(
  token?: string,
  query?: { page: number; limit: number; search: string; schoolId: string }
): Promise<{
  subjects: Subject[];
  total: number;
  page: number;
  limit: number;
}> {
  // query is optional
  const queryString = query
    ? `?page=${query.page}&limit=${query.limit}&search=${query.search}&schoolId=${query.schoolId}`
    : "";
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return apiRequest<{
    subjects: Subject[];
    total: number;
    page: number;
    limit: number;
  }>(`/school/subjects${queryString}`, headers ? { headers } : undefined);
}

export async function getSubjectById(
  id: string,
  token?: string
): Promise<Subject> {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return apiRequest<Subject>(
    `/school/subjects/${id}`,
    headers ? { headers } : undefined
  );
}

export async function createSubject(
  subject: Partial<Subject>,
  token: string
): Promise<Subject> {
  return apiRequest<Subject>("/school/subjects", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subject),
  });
}

export async function updateSubject(
  id: string,
  subject: Partial<Subject>,
  token: string
): Promise<Subject> {
  return apiRequest<Subject>(`/school/subjects/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(subject),
  });
}

export async function deleteSubject(id: string, token: string): Promise<void> {
  return apiRequest<void>(`/school/subjects/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Levels
export async function getAllLevels(
  token?: string,
  query?: { page: number; limit: number; search: string; schoolId: string }
): Promise<{ levels: Level[]; total: number; page: number }> {
  const queryString = query
    ? `?page=${query.page}&limit=${query.limit}&search=${query.search}&schoolId=${query.schoolId}`
    : "";
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return apiRequest<{ levels: Level[]; total: number; page: number }>(
    `/school/levels${queryString}`,
    headers ? { headers } : undefined
  );
}

export async function getLevelById(id: string, token?: string): Promise<any> {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return apiRequest<any>(
    `/school/levels/${id}`,
    headers ? { headers } : undefined
  );
}

export async function createLevel(level: any, token: string): Promise<any> {
  return apiRequest<any>("/school/levels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(level),
  });
}

export async function updateLevel(
  id: string,
  level: any,
  token: string
): Promise<any> {
  return apiRequest<any>(`/school/levels/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(level),
  });
}

export async function deleteLevel(id: string, token: string): Promise<void> {
  return apiRequest<void>(`/school/levels/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Rooms
export async function getAllRooms(
  token?: string,
  query?: { schoolId: string; search: string }
): Promise<any[]> {
  const queryString = query
    ? `?schoolId=${query.schoolId}&search=${query.search}`
    : "";
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return apiRequest<any[]>(
    `/school/rooms${queryString}`,
    headers ? { headers } : undefined
  );
}

export async function getRoomById(id: string, token?: string): Promise<any> {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return apiRequest<any>(
    `/school/rooms/${id}`,
    headers ? { headers } : undefined
  );
}

export async function createRoom(room: any, token: string): Promise<any> {
  return apiRequest<any>("/school/rooms", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(room),
  });
}

export async function updateRoom(
  id: string,
  room: any,
  token: string
): Promise<any> {
  return apiRequest<any>(`/school/rooms/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(room),
  });
}

export async function deleteRoom(id: string, token: string): Promise<void> {
  return apiRequest<void>(`/school/rooms/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Sessions
export async function getAllSessions(
  token?: string,
  query?: { classRoomId?: string; subjectId?: string }
): Promise<any[]> {
  const queryString = query
    ? `?classRoomId=${query.classRoomId}&subjectId=${query.subjectId}`
    : "";
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return apiRequest<any[]>(
    `/school/sessions${queryString}`,
    headers ? { headers } : undefined
  );
}

export async function getSessionById(id: string, token?: string): Promise<any> {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return apiRequest<any>(
    `/school/sessions/${id}`,
    headers ? { headers } : undefined
  );
}

export async function createSession(session: any, token: string): Promise<any> {
  return apiRequest<any>("/school/sessions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(session),
  });
}

export async function updateSession(
  id: string,
  session: any,
  token: string
): Promise<any> {
  return apiRequest<any>(`/school/sessions/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(session),
  });
}

export async function deleteSession(id: string, token: string): Promise<void> {
  return apiRequest<void>(`/school/sessions/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// Presences
export async function getAllPresences(
  token?: string,
  sessionId?: string
): Promise<any[]> {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return apiRequest<any[]>(
    `/school/presences?sessionId=${sessionId}`,
    headers ? { headers } : undefined
  );
}

export async function getPresenceById(
  id: string,
  token?: string
): Promise<any> {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return apiRequest<any>(
    `/school/presences/${id}`,
    headers ? { headers } : undefined
  );
}

export async function createPresence(
  presence: any,
  token: string
): Promise<any> {
  return apiRequest<any>("/school/presences", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(presence),
  });
}

export async function updatePresence(
  id: string,
  presence: any,
  token: string
): Promise<any> {
  return apiRequest<any>(`/school/presences/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(presence),
  });
}

export async function deletePresence(id: string, token: string): Promise<void> {
  return apiRequest<void>(`/school/presences/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// study period
export async function getAllStudyPeriods(
  token?: string,
  query?: { schoolId: string; search: string }
): Promise<StudyPeriod[]> {
  const queryString = query
    ? `?schoolId=${query.schoolId}&search=${query.search}`
    : "";
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return apiRequest<StudyPeriod[]>(
    `/school/study-periods${queryString}`,
    headers ? { headers } : undefined
  );
}

export async function getStudyPeriodById(
  id: string,
  token?: string
): Promise<StudyPeriod> {
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return apiRequest<StudyPeriod>(
    `/school/study-periods/${id}`,
    headers ? { headers } : undefined
  );
}

export async function createStudyPeriod(
  studyPeriod: Partial<StudyPeriod>,
  token: string
): Promise<StudyPeriod> {
  return apiRequest<StudyPeriod>("/school/study-periods", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(studyPeriod),
  });
}

export async function updateStudyPeriod(
  id: string,
  studyPeriod: Partial<StudyPeriod>,
  token: string
): Promise<StudyPeriod> {
  return apiRequest<StudyPeriod>(`/school/study-periods/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(studyPeriod),
  });
}

export async function deleteStudyPeriod(
  id: string,
  token: string
): Promise<void> {
  return apiRequest<void>(`/school/study-periods/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// create full class room
export async function createFullClassRoom(
  data: FullClassRoomCreationData,
  token: string
): Promise<Classroom> {
  return apiRequest<Classroom>("/school/classrooms/full", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

// course
export async function createCourse(
  data: Partial<Course>,
  token: string
): Promise<Course> {
  return apiRequest<Course>("/school/courses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function getCourseById(
  id: string,
  token: string
): Promise<Course> {
  return apiRequest<Course>(`/school/courses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function updateCourse(
  id: string,
  data: Partial<Course>,
  token: string
): Promise<Course> {
  return apiRequest<Course>(`/school/courses/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
}

export async function deleteCourse(id: string, token: string): Promise<void> {
  return apiRequest<void>(`/school/courses/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function getAllCourses(
  token: string,
  query: { schoolId: string; search: string; page: number; limit: number }
): Promise<{ courses: Course[]; total: number; page: number; limit: number }> {
  const queryString = query
    ? `?schoolId=${query.schoolId}&search=${query.search}&page=${query.page}&limit=${query.limit} `
    : "";
  const headers = token ? { Authorization: `Bearer ${token}` } : undefined;
  return apiRequest<{
    courses: Course[];
    total: number;
    page: number;
    limit: number;
  }>(`/school/courses${queryString}`, {
    headers: headers ? headers : undefined,
  });
}
//
export async function assignCoursesToClassroom(
  courseId: string,
  classroomId: string,
  token: string
): Promise<void> {
  return apiRequest<void>(`/school/classrooms/assign-course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ courseId, classroomId }),
  });
}

export async function unassignCoursesFromClassroom(
  courseId: string,
  classroomId: string,
  token: string
): Promise<void> {
  return apiRequest<void>(`/school/classrooms/remove-course`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ courseId, classroomId }),
  });
}

//  upload image
export async function uploadImage(
  image: File,
  token: string
): Promise<{ url: string; filename: string }> {
  const formData = new FormData();
  formData.append("image", image);
  // send to req.files

  return apiRequest<{ url: string; filename: string }>(
    "/builder/upload/image",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    }
  );
}
// board
export async function createBoard(
  board: Partial<Board>,
  token: string
): Promise<Board> {
  return apiRequest<Board>("/board", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(board),
  });
}

export async function getBoardById(id: string, token: string): Promise<Board> {
  return apiRequest<Board>(`/board/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

export async function updateBoard(
  id: string,
  board: Partial<Board>,
  token: string
): Promise<Board> {
  return apiRequest<Board>(`/board/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(board),
  });
}

export async function deleteBoard(id: string, token: string): Promise<void> {
  return apiRequest<void>(`/board/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${token}`,
    },
  });
}

export async function getAllBoards(token: string): Promise<Board[]> {
  return apiRequest<Board[]>(`/board`, {
    headers: {
      Authorization: `${token}`,
    },
  });
}

// list
export async function createList(
  list: Partial<List>,
  token: string
): Promise<List> {
  return apiRequest<List>("/board/list", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(list),
  });
}

//  update list
export async function updateList(
  id: string,
  list: Partial<List>,
  token: string
) {
  return apiRequest<List>(`/board/list/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(list),
  });
}

// delete list
export async function deleteList(id: string, token: string): Promise<void> {
  return apiRequest<void>(`/board/list/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${token}`,
    },
  });
}

// router.post("/card", verifyToken, createCard);
// router.put("/card/:cardId", verifyToken, updateCard);
// router.delete("/card/:cardId", verifyToken, deleteCard);
// router.put("/move-card/:cardId", verifyToken, moveCard);

// create card
export async function createCard(
  card: Partial<Card>,
  token: string
): Promise<Card> {
  return apiRequest<Card>("/board/card", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(card),
  });
}

// update card
export async function updateCard(
  id: string,
  card: Partial<Card>,
  token: string
): Promise<Card> {
  return apiRequest<Card>(`/board/card/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `${token}`,
    },
    body: JSON.stringify(card),
  });
}

// delete card
export async function deleteCard(id: string, token: string): Promise<void> {
  return apiRequest<void>(`/board/card/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `${token}`,
    },
  });
}

// move card
export async function moveCard(
  id: string,
  indexInList: number,
  newListId: string,
  token: string
): Promise<void> {
  console.log(id, indexInList, newListId, "api");
  return apiRequest<void>(`/board/move-card/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ indexInList, newListId }),
  });
}
///board/generate-board-for-unit/
export async function generateBoardForUnit(
  unitId: string,
  token: string
): Promise<void> {
  return apiRequest<void>(`/board/generate-board-for-unit/${unitId}`, {
    headers: { Authorization: `${token}`, "Content-Type": "application/json" },
    method: "GET",
  });
}
//orders
// orders APIs
export async function getOrders(
  token: string,
  page: number = 1,
  limit: number = 10,
  userId?: string
): Promise<{
  orders: Order[];
  total: number;
  page: number;
  limit: number;
}> {
  return apiRequest<{
    orders: Order[];
    total: number;
    page: number;
    limit: number;
  }>(`/order/user/${userId}?page=${page}&limit=${limit}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
}
export async function getOrderById(id: string, token: string): Promise<Order> {
  return apiRequest<Order>(`/order/orders/${id}`, {
    headers: {
      Authorization: `${token}`,
    },
  });
}
