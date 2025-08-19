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
  User,
  GetUsersPayload,
  UsersData,
  GetClassesPayload,
  Classroom,
  ClassesData,
  Subject,
  Level,
  Room,
  Presence,
  Session,
  StudyPeriod,
  FullClassRoomCreationData,
  Course,
  SiteSettings,
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
  getProfile as getProfileApi,
  getUsers as getUsersApi,
  createUser as createUserApi,
  updateUser as updateUserApi,
  deleteUser as deleteUserApi,
  getClasses as getClassesApi,
  getClassesById as getClassesByIdApi,
  createClassroom as createClassroomApi,
  updateClassroom as updateClassroomApi,
  deleteClassroom as deleteClassroomApi,
  getAllSubjects as getAllSubjectsApi,
  getSubjectById as getSubjectByIdApi,
  createSubject as createSubjectApi,
  updateSubject as updateSubjectApi,
  deleteSubject as deleteSubjectApi,
  getAllLevels as getAllLevelsApi,
  getLevelById as getLevelByIdApi,
  createLevel as createLevelApi,
  updateLevel as updateLevelApi,
  deleteLevel as deleteLevelApi,
  getAllRooms as getAllRoomsApi,
  getRoomById as getRoomByIdApi,
  createRoom as createRoomApi,
  updateRoom as updateRoomApi,
  deleteRoom as deleteRoomApi,
  getAllSessions as getAllSessionsApi,
  getSessionById as getSessionByIdApi,
  createSession as createSessionApi,
  updateSession as updateSessionApi,
  deleteSession as deleteSessionApi,
  getAllPresences as getAllPresencesApi,
  getPresenceById as getPresenceByIdApi,
  createPresence as createPresenceApi,
  updatePresence as updatePresenceApi,
  deletePresence as deletePresenceApi,
  getAllStudyPeriods as getAllStudyPeriodsApi,
  getStudyPeriodById as getStudyPeriodByIdApi,
  createStudyPeriod as createStudyPeriodApi,
  updateStudyPeriod as updateStudyPeriodApi,
  deleteStudyPeriod as deleteStudyPeriodApi,
  createFullClassRoom as createFullClassRoomApi,
  createCourse as createCourseApi,
  getCourseById as getCourseByIdApi,
  updateCourse as updateCourseApi,
  deleteCourse as deleteCourseApi,
  getAllCourses as getAllCoursesApi,
  uploadImage as uploadImageApi,
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
  fetchSitesData: (query: any) => Promise<void>;
  // Member actions
  addMember: (email: string, role: string) => Promise<void>;
  updateMemberRole: (memberId: string, role: string) => Promise<void>;
  removeMember: (memberId: string) => Promise<void>;

  // Users
  getUsers: (payload: GetUsersPayload, token: string) => Promise<any>;
  createUser: (userData: Partial<User>, token: string) => Promise<void>;
  updateUser: (
    userId: string,
    userData: Partial<User>,
    token: string
  ) => Promise<void>;
  deleteUser: (userId: string, token: string) => Promise<void>;

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
  user: Partial<User> | null;
  usersData:
    | UsersData
    | {
        users: [];
        totalPages: 1;
        currentPage: 1;
        totalUsers: 0;
      };
  // ClassRoom
  classesData:
    | ClassesData
    | {
        classes: [];
        totalPages: 1;
        currentPage: 1;
        totalClasses: 0;
      };
  // Site actions
  createNewSite: (site: Partial<Site>) => Promise<void>;
  updateSiteData: (siteId: string, data: Partial<Site>) => Promise<void>;
  deleteSiteData: (siteId: string) => Promise<void>;
  updateSiteSettingsData: (
    siteId: string,
    settings: Partial<SiteSettings>
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
  updateSectionsOrder: (
    sectionId: string,
    newIndex: number
  ) => Promise<Section[]>;
  duplicateSectionData: (sectionId: string) => Promise<void>;
  fetchPageSections: (pageId: string) => Promise<void>;

  // Site selection
  setCurrentSite: (site: Site | null) => void;
  setCurrentPage: (page: Page | null) => void;

  // ClassRoom
  getClasses: (payload: GetClassesPayload, token: string) => Promise<void>;
  getClassesById: (id: string, token: string) => Promise<void>;
  createClassroom: (
    classroom: Partial<Classroom>,
    token: string
  ) => Promise<void>;
  updateClassroom: (
    id: string,
    classroom: Partial<Classroom>,
    token: string
  ) => Promise<void>;
  deleteClassroom: (id: string, token: string) => Promise<void>;
  // Full Class Room
  createFullClassRoom: (
    data: FullClassRoomCreationData,
    token: string
  ) => Promise<void>;
  // Subjects
  getAllSubjects: (
    token: string,
    query: { page: number; limit: number; search: string; schoolId: string }
  ) => Promise<void>;
  getSubjectById: (id: string, token: string) => Promise<void>;
  createSubject: (subject: Partial<Subject>, token: string) => Promise<void>;
  updateSubject: (
    id: string,
    subject: Partial<Subject>,
    token: string
  ) => Promise<void>;
  deleteSubject: (id: string, token: string) => Promise<void>;

  // Levels
  getAllLevels: (
    token: string,
    query: { page: number; limit: number; search: string; schoolId: string }
  ) => Promise<void>;
  getLevelById: (id: string, token: string) => Promise<void>;
  createLevel: (level: Partial<Level>, token: string) => Promise<void>;
  updateLevel: (
    id: string,
    level: Partial<Level>,
    token: string
  ) => Promise<void>;
  deleteLevel: (id: string, token: string) => Promise<void>;

  // Rooms
  getAllRooms: (
    token: string,
    query: { schoolId: string; search: string }
  ) => Promise<void>;
  getRoomById: (id: string, token: string) => Promise<void>;
  createRoom: (room: Partial<Room>, token: string) => Promise<void>;
  updateRoom: (id: string, room: Partial<Room>, token: string) => Promise<void>;
  deleteRoom: (id: string, token: string) => Promise<void>;

  // Sessions
  getAllSessions: (
    token: string,
    query: { classRoomId?: string; subjectId?: string }
  ) => Promise<void>;
  getSessionById: (id: string, token: string) => Promise<void>;
  createSession: (session: Partial<Session>, token: string) => Promise<void>;
  updateSession: (
    id: string,
    session: Partial<Session>,
    token: string
  ) => Promise<void>;
  deleteSession: (id: string, token: string) => Promise<void>;

  // Presences
  getAllPresences: (token: string, sessionId?: string) => Promise<void>;
  getPresenceById: (id: string, token: string) => Promise<void>;
  createPresence: (presence: Partial<Presence>, token: string) => Promise<void>;
  updatePresence: (
    id: string,
    presence: Partial<Presence>,
    token: string
  ) => Promise<void>;
  deletePresence: (id: string, token: string) => Promise<void>;
  // Study Periods
  getAllStudyPeriods: (
    token: string,
    query: { schoolId: string; search: string }
  ) => Promise<void>;
  getStudyPeriodById: (id: string, token: string) => Promise<void>;
  createStudyPeriod: (
    studyPeriod: Partial<StudyPeriod>,
    token: string
  ) => Promise<void>;
  updateStudyPeriod: (
    id: string,
    studyPeriod: Partial<StudyPeriod>,
    token: string
  ) => Promise<void>;
  deleteStudyPeriod: (id: string, token: string) => Promise<void>;
  // Subjects
  subjects: {
    subjects: Subject[];
    total: number;
    page: number;
  };
  // Levels
  levels: {
    levels: Level[];
    total: number;
    page: number;
  };
  // Rooms
  rooms: Room[];
  // Sessions
  sessions: Session[];
  // Presences
  presences: Presence[];
  // Study Periods
  studyPeriods: StudyPeriod[];
  // Courses
  courses: {
    courses: Course[];
    total: number;
    page: number;
    limit: number;
  };
  getCourseById: (id: string, token: string) => Promise<void>;
  createCourse: (course: Partial<Course>, token: string) => Promise<void>;
  updateCourse: (
    id: string,
    course: Partial<Course>,
    token: string
  ) => Promise<void>;
  deleteCourse: (id: string, token: string) => Promise<void>;
  getAllCourses: (
    token: string,
    query: { schoolId: string; search: string; page: number; limit: number }
  ) => Promise<void>;
  uploadImage: (
    image: File,
    token: string
  ) => Promise<string | null | undefined>;
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
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [members, setMembers] = useState<OrganizationMember[]>([]);
  const [templates, setTemplates] = useState<Template[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  // Subjects
  const [subjects, setSubjects] = useState<{
    subjects: Subject[];
    total: number;
    page: number;
  }>({ subjects: [], total: 0, page: 1 });
  // Levels
  const [levels, setLevels] = useState<{
    levels: Level[];
    total: number;
    page: number;
  }>({ levels: [], total: 0, page: 1 });
  // Rooms
  const [rooms, setRooms] = useState<Room[]>([]);
  // Sessions
  const [sessions, setSessions] = useState<Session[]>([]);
  // Presences
  const [presences, setPresences] = useState<Presence[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Site state
  const [sites, setSites] = useState<Site[]>([]);
  const [currentSite, setCurrentSite] = useState<Site | null>(null);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [sitePages, setSitePages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [pageSections, setPageSections] = useState<Section[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  // ClassRoom
  const [classesData, setClassesData] = useState<
    | ClassesData
    | {
        classes: [];
        totalPages: 1;
        currentPage: 1;
        totalClasses: 0;
      }
  >({
    classes: [],
    totalPages: 1,
    currentPage: 1,
    totalClasses: 0,
  });
  // Users
  const [usersData, setUsersData] = useState<
    | UsersData
    | {
        users: [];
        totalPages: 1;
        currentPage: 1;
        totalUsers: 0;
      }
  >({
    users: [],
    totalPages: 1,
    currentPage: 1,
    totalUsers: 0,
  });
  // Study Periods
  const [studyPeriods, setStudyPeriods] = useState<StudyPeriod[]>([]);
  // Courses
  const [courses, setCourses] = useState<{
    courses: Course[];
    total: number;
    page: number;
    limit: number;
  }>({ courses: [], total: 0, page: 1, limit: 10 });
  useEffect(() => {
    // Only access localStorage in the browser environment
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
    }
  }, []);

  useEffect(() => {
    if (token) {
      getProfileApi(token).then((user) => setUser(user));
    }
  }, [token]);
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
          // fetchSitesData(),
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
  const fetchSitesData = async (query: any) => {
    try {
      const sitesList = await getSites(query);
      setSites(sitesList);
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
    settings: Partial<SiteSettings>
  ) => {
    try {
      const updatedSetting = await updateSiteSettings(siteId, settings);
      setSites((prev) =>
        prev.map((site) =>
          site._id === siteId ? { ...site, settings: updatedSetting } : site
        )
      );
      if (currentSite?._id === siteId) {
        setCurrentSite({ ...currentSite, settings: updatedSetting });
      }
      if (selectedSite?._id === siteId) {
        setSelectedSite({ ...selectedSite, settings: updatedSetting });
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
        prev.map((page) => (page._id === pageId ? updatedPage : page))
      );
      if (currentPage?._id === pageId) {
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
      setSitePages((prev) => prev.filter((page) => page._id !== pageId));
      if (currentPage?._id === pageId) {
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
      setPageSections((prev: any) => {
        const newSections = [...prev];
        newSections.splice(newSection.order_index, 0, newSection); // <-- insert at index
        return newSections;
      });
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
          section._id === sectionId ? updatedSection : section
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
        prev.filter((section) => section._id !== sectionId)
      );
    } catch (error) {
      console.error("Error deleting section:", error);
      throw error;
    }
  };

  const updateSectionsOrder = async (sectionId: string, newIndex: number) => {
    try {
      const sections = await updateSectionOrder(sectionId, newIndex);
      setPageSections(sections);
      return sections;
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
      fetchPageSections(currentPage._id);
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
      if (site) {
        setSitePages(site.pages);
      }
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
  // Users
  const getUsers = async (payload: GetUsersPayload, token: string) => {
    setLoading(true);
    try {
      const usersData = await getUsersApi(payload, token);
      setUsersData(
        usersData || {
          users: [],
          totalPages: 1,
          currentPage: 1,
          totalUsers: 0,
        }
      );
      setError(null);
    } catch (error) {
      console.error("Failed to get users:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (userData: Partial<User>, token: string) => {
    setLoading(true);
    try {
      const response = await createUserApi(userData, token);

      // Update the users state by adding the new user
      setUsersData((prevUsersData) => {
        return {
          ...prevUsersData,
          users: [response.user, ...(prevUsersData.users || [])],
          totalUsers: (prevUsersData.totalUsers || 0) + 1,
        };
      });

      setError(null);
      console.log("User created successfully:", response.message);
    } catch (error) {
      console.error("Failed to create user:", error);
      setError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (
    userId: string,
    userData: Partial<User>,
    token: string
  ) => {
    setLoading(true);

    try {
      const response = await updateUserApi(userId, userData, token);

      // Update the users state by updating the specific user
      setUsersData((prevUsersData) => {
        return {
          ...prevUsersData,
          users: (prevUsersData.users || []).map((user) =>
            user._id === userId ? response.user : user
          ),
        };
      });

      setError(null);
      console.log("User updated successfully:", response.message);
    } catch (error) {
      console.error("Failed to update user:", error);
      setError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId: string, token: string) => {
    setLoading(true);
    try {
      const response = await deleteUserApi(userId, token);

      // Update the users state by removing the deleted user
      setUsersData((prevUsersData) => {
        return {
          ...prevUsersData,
          users: (prevUsersData.users || []).filter(
            (user) => user._id !== userId
          ),
          totalUsers: Math.max((prevUsersData.totalUsers || 0) - 1, 0),
        };
      });

      setError(null);
      console.log("User deleted successfully:", response.message);
    } catch (error) {
      console.error("Failed to delete user:", error);
      setError(error as Error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // ClassRoom
  const getClasses = async (payload: GetClassesPayload, token: string) => {
    setLoading(true);
    try {
      const response = await getClassesApi(payload, token);
      setClassesData(
        response || {
          classes: [],
          totalPages: 1,
          currentPage: 1,
          totalClasses: 0,
        }
      );
      setError(null);
    } catch (error) {
      console.error("Failed to get classes:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const getClassesById = async (id: string, token: string) => {
    setLoading(true);
    try {
      const response = await getClassesByIdApi(id, token);
      // setClassesData(response || null);
      setError(null);
    } catch (error) {
      console.error("Failed to get class by id:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const createClassroom = async (
    classroom: Partial<Classroom>,
    token: string
  ) => {
    setLoading(true);
    try {
      const response = await createClassroomApi(classroom, token);
      setClassesData((prevClassesData) => {
        return {
          ...prevClassesData,
          classes: [...(prevClassesData.classes || []), response],
          totalClasses: (prevClassesData.totalClasses || 0) + 1,
        };
      });
      setError(null);
    } catch (error) {
      console.error("Failed to create classroom:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const updateClassroom = async (
    id: string,
    classroom: Partial<Classroom>,
    token: string
  ) => {
    setLoading(true);
    try {
      const response = await updateClassroomApi(id, classroom, token);
      setClassesData((prevClassesData) => {
        return {
          ...prevClassesData,
          classes: (prevClassesData.classes || []).map((classroom) =>
            classroom._id === id ? response : classroom
          ),
        };
      });
      setError(null);
    } catch (error) {
      console.error("Failed to update classroom:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const deleteClassroom = async (id: string, token: string) => {
    setLoading(true);
    try {
      await deleteClassroomApi(id, token);
      setClassesData((prevClassesData) => {
        return {
          ...prevClassesData,
          classes: (prevClassesData.classes || []).filter(
            (classroom) => classroom._id !== id
          ),
          totalClasses: Math.max((prevClassesData.totalClasses || 0) - 1, 0),
        };
      });
      setError(null);
    } catch (error) {
      console.error("Failed to delete classroom:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  // Subjects
  const getAllSubjects = async (
    token: string,
    query: { page: number; limit: number; search: string; schoolId: string }
  ) => {
    setLoading(true);
    try {
      const response = await getAllSubjectsApi(token, query);
      setSubjects(response);
    } catch (error) {
      console.error("Failed to get subjects:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const getSubjectById = async (id: string, token: string) => {
    setLoading(true);
    try {
      const response = await getSubjectByIdApi(id, token);
      // setSubjects(response);
    } catch (error) {
      console.error("Failed to get subject by id:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const createSubject = async (subject: Partial<Subject>, token: string) => {
    setLoading(true);
    try {
      const response = await createSubjectApi(subject, token);
      setSubjects((prevSubjects) => {
        return {
          ...prevSubjects,
          subjects: [...(prevSubjects.subjects || []), response],
          total: (prevSubjects.total || 0) + 1,
        };
      });
    } catch (error) {
      console.error("Failed to create subject:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const updateSubject = async (
    id: string,
    subject: Partial<Subject>,
    token: string
  ) => {
    setLoading(true);
    try {
      const response = await updateSubjectApi(id, subject, token);
      setSubjects((prevSubjects) => {
        return {
          ...prevSubjects,
          subjects: (prevSubjects.subjects || []).map((subject) =>
            subject._id === id ? response : subject
          ),
        };
      });
    } catch (error) {
      console.error("Failed to update subject:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const deleteSubject = async (id: string, token: string) => {
    setLoading(true);
    try {
      await deleteSubjectApi(id, token);
      setSubjects((prevSubjects) => {
        return {
          ...prevSubjects,
          subjects: (prevSubjects.subjects || []).filter(
            (subject) => subject._id !== id
          ),
          total: Math.max((prevSubjects.total || 0) - 1, 0),
        };
      });
      setError(null);
    } catch (error) {
      console.error("Failed to delete subject:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // Levels
  const getAllLevels = async (
    token: string,
    query: { page: number; limit: number; search: string; schoolId: string }
  ) => {
    setLoading(true);
    try {
      const response = await getAllLevelsApi(token, query);
      setLevels((prevLevels) => {
        return {
          ...prevLevels,
          levels: [...(prevLevels.levels || []), ...response.levels],
          total: response.total,
          page: response.page,
        };
      });
    } catch (error) {
      console.error("Failed to get levels:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const getLevelById = async (id: string, token: string) => {
    setLoading(true);
    try {
      const response = await getLevelByIdApi(id, token);
      // setLevels(response);
    } catch (error) {
      console.error("Failed to get level by id:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const createLevel = async (level: Partial<Level>, token: string) => {
    setLoading(true);
    try {
      const response = await createLevelApi(level, token);
      setLevels((prevLevels) => {
        return {
          ...prevLevels,
          levels: [...(prevLevels.levels || []), response],
          total: (prevLevels.total || 0) + 1,
        };
      });
    } catch (error) {
      console.error("Failed to create level:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const updateLevel = async (
    id: string,
    level: Partial<Level>,
    token: string
  ) => {
    setLoading(true);
    try {
      const response = await updateLevelApi(id, level, token);
      setLevels((prevLevels) => {
        return {
          ...prevLevels,
          levels: (prevLevels.levels || []).map((level) =>
            level._id === id ? response : level
          ),
        };
      });
    } catch (error) {
      console.error("Failed to update level:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const deleteLevel = async (id: string, token: string) => {
    setLoading(true);
    try {
      await deleteLevelApi(id, token);
      setLevels((prevLevels) => {
        return {
          ...prevLevels,
          levels: (prevLevels.levels || []).filter((level) => level._id !== id),
          total: Math.max((prevLevels.total || 0) - 1, 0),
        };
      });
      setError(null);
    } catch (error) {
      console.error("Failed to delete level:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  // Rooms
  const getAllRooms = async (
    token: string,
    query: { schoolId: string; search: string }
  ) => {
    setLoading(true);
    try {
      const response = await getAllRoomsApi(token, query);
      setRooms(response);
    } catch (error) {
      console.error("Failed to get rooms:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const getRoomById = async (id: string, token: string) => {
    setLoading(true);
    try {
      const response = await getRoomByIdApi(id, token);
      // setRooms(response);
    } catch (error) {
      console.error("Failed to get room by id:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const createRoom = async (room: Partial<Room>, token: string) => {
    setLoading(true);
    try {
      const response = await createRoomApi(room, token);
      setRooms((prevRooms) => [...prevRooms, response]);
    } catch (error) {
      console.error("Failed to create room:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const updateRoom = async (id: string, room: Partial<Room>, token: string) => {
    setLoading(true);
    try {
      const response = await updateRoomApi(id, room, token);
      setRooms((prevRooms) =>
        prevRooms.map((room) => (room._id === id ? response : room))
      );
    } catch (error) {
      console.error("Failed to update room:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const deleteRoom = async (id: string, token: string) => {
    setLoading(true);
    try {
      await deleteRoomApi(id, token);
      setRooms((prevRooms) => prevRooms.filter((room) => room._id !== id));
    } catch (error) {
      console.error("Failed to delete room:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  // Sessions
  const getAllSessions = async (
    token: string,
    query: { classRoomId?: string; subjectId?: string }
  ) => {
    setLoading(true);
    try {
      const response = await getAllSessionsApi(token, query);
      setSessions(response);
    } catch (error) {
      console.error("Failed to get sessions:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const getSessionById = async (id: string, token: string) => {
    setLoading(true);
    try {
      const response = await getSessionByIdApi(id, token);
      // setSessions(response);
    } catch (error) {
      console.error("Failed to get session by id:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const createSession = async (session: Partial<Session>, token: string) => {
    setLoading(true);
    try {
      const response = await createSessionApi(session, token);
      setSessions((prevSessions) => [...prevSessions, response]);
    } catch (error) {
      console.error("Failed to create session:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const updateSession = async (
    id: string,
    session: Partial<Session>,
    token: string
  ) => {
    setLoading(true);
    try {
      const response = await updateSessionApi(id, session, token);
      setSessions((prevSessions) =>
        prevSessions.map((session) => (session._id === id ? response : session))
      );
    } catch (error) {
      console.error("Failed to update session:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const deleteSession = async (id: string, token: string) => {
    setLoading(true);
    try {
      await deleteSessionApi(id, token);
      setSessions((prevSessions) =>
        prevSessions.filter((session) => session._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete session:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  // Presences
  const getAllPresences = async (token: string, sessionId?: string) => {
    setLoading(true);
    try {
      const response = await getAllPresencesApi(token, sessionId);
      setPresences(response);
    } catch (error) {
      console.error("Failed to get presences:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const getPresenceById = async (id: string, token: string) => {
    setLoading(true);
    try {
      const response = await getPresenceByIdApi(id, token);
      // setPresences(response);
    } catch (error) {
      console.error("Failed to get presence by id:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const createPresence = async (presence: Partial<Presence>, token: string) => {
    setLoading(true);
    try {
      const response = await createPresenceApi(presence, token);
      setPresences((prevPresences) => [...prevPresences, response]);
    } catch (error) {
      console.error("Failed to create presence:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const updatePresence = async (
    id: string,
    presence: Partial<Presence>,
    token: string
  ) => {
    setLoading(true);
    try {
      const response = await updatePresenceApi(id, presence, token);
      setPresences((prevPresences) =>
        prevPresences.map((presence) =>
          presence._id === id ? response : presence
        )
      );
    } catch (error) {
      console.error("Failed to update presence:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const deletePresence = async (id: string, token: string) => {
    setLoading(true);
    try {
      await deletePresenceApi(id, token);
      setPresences((prevPresences) =>
        prevPresences.filter((presence) => presence._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete presence:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // Study Periods
  const getAllStudyPeriods = async (
    token: string,
    query: { schoolId: string; search: string }
  ) => {
    setLoading(true);
    try {
      const response = await getAllStudyPeriodsApi(token, query);
      setStudyPeriods(response);
    } catch (error) {
      console.error("Failed to get study periods:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const getStudyPeriodById = async (id: string, token: string) => {
    setLoading(true);
    try {
      const response = await getStudyPeriodByIdApi(id, token);
    } catch (error) {
      console.error("Failed to get study period by id:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const createStudyPeriod = async (
    studyPeriod: Partial<StudyPeriod>,
    token: string
  ) => {
    setLoading(true);
    try {
      const response = await createStudyPeriodApi(studyPeriod, token);
      setStudyPeriods((prevStudyPeriods) => [...prevStudyPeriods, response]);
    } catch (error) {
      console.error("Failed to create study period:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const updateStudyPeriod = async (
    id: string,
    studyPeriod: Partial<StudyPeriod>,
    token: string
  ) => {
    setLoading(true);
    try {
      const response = await updateStudyPeriodApi(id, studyPeriod, token);
      setStudyPeriods((prevStudyPeriods) =>
        prevStudyPeriods.map((studyPeriod) =>
          studyPeriod._id === id ? response : studyPeriod
        )
      );
    } catch (error) {
      console.error("Failed to update study period:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const deleteStudyPeriod = async (id: string, token: string) => {
    setLoading(true);
    try {
      await deleteStudyPeriodApi(id, token);
      setStudyPeriods((prevStudyPeriods) =>
        prevStudyPeriods.filter((studyPeriod) => studyPeriod._id !== id)
      );
    } catch (error) {
      console.error("Failed to delete study period:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // Full Class Room
  const createFullClassRoom = async (
    data: FullClassRoomCreationData,
    token: string
  ) => {
    setLoading(true);
    try {
      const response = await createFullClassRoomApi(data, token);
      setClassesData((prevClassesData) => {
        return {
          ...prevClassesData,
          classes: [...(prevClassesData.classes || []), response],
          totalClasses: (prevClassesData.totalClasses || 0) + 1,
        };
      });
    } catch (error) {
      console.error("Failed to create full class room:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  // Courses
  const getCourseById = async (id: string, token: string) => {
    setLoading(true);
    try {
      const response = await getCourseByIdApi(id, token);
      // setCourses((prevCourses) => [...prevCourses, response]);
    } catch (error) {
      console.error("Failed to get course by id:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const createCourse = async (course: Partial<Course>, token: string) => {
    setLoading(true);
    try {
      const response = await createCourseApi(course, token);
      setCourses((prevCourses) => {
        return {
          ...prevCourses,
          courses: [...(prevCourses.courses || []), response],
          total: (prevCourses.total || 0) + 1,
        };
      });
    } catch (error) {
      console.error("Failed to create course:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const updateCourse = async (
    id: string,
    course: Partial<Course>,
    token: string
  ) => {
    setLoading(true);
    try {
      const response = await updateCourseApi(id, course, token);
      setCourses((prevCourses) => {
        return {
          ...prevCourses,
          courses: prevCourses.courses.map((course) =>
            course._id === id ? response : course
          ),
        };
      });
    } catch (error) {
      console.error("Failed to update course:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const deleteCourse = async (id: string, token: string) => {
    setLoading(true);
    try {
      await deleteCourseApi(id, token);
      setCourses((prevCourses) => {
        return {
          ...prevCourses,
          courses: prevCourses.courses.filter((course) => course._id !== id),
          total: (prevCourses.total || 0) - 1,
        };
      });
    } catch (error) {
      console.error("Failed to delete course:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const getAllCourses = async (
    token: string,
    query: { schoolId: string; search: string; page: number; limit: number }
  ) => {
    setLoading(true);
    try {
      const response = await getAllCoursesApi(token, query);
      setCourses(response);
    } catch (error) {
      console.error("Failed to get all courses:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const uploadImage = async (image: File, token: string) => {
    setLoading(true);
    try {
      const response = await uploadImageApi(image, token);
      return API_BASE_URL + response.url;
    } catch (error) {
      console.error("Failed to upload image:", error);
      setError(error as Error);
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
        user,

        // Site actions
        createNewSite,
        updateSiteData,
        deleteSiteData,
        updateSiteSettingsData,
        getSiteById,
        fetchSitesData,

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
        fetchPageSections,

        // Site selection
        setCurrentSite,
        setCurrentPage,
        //Users
        getUsers,
        createUser,
        updateUser,
        deleteUser,
        usersData,
        // ClassRoom
        getClasses,
        getClassesById,
        createClassroom,
        updateClassroom,
        deleteClassroom,
        classesData,
        // Subjects
        getAllSubjects,
        getSubjectById,
        createSubject,
        updateSubject,
        deleteSubject,
        // Levels
        getAllLevels,
        getLevelById,
        createLevel,
        updateLevel,
        deleteLevel,
        // Rooms
        getAllRooms,
        getRoomById,
        createRoom,
        updateRoom,
        deleteRoom,
        // Sessions
        getAllSessions,
        getSessionById,
        createSession,
        updateSession,
        deleteSession,
        // Presences
        getAllPresences,
        getPresenceById,
        createPresence,
        updatePresence,
        deletePresence,
        // Study Periods
        getAllStudyPeriods,
        getStudyPeriodById,
        createStudyPeriod,
        updateStudyPeriod,
        deleteStudyPeriod,
        subjects,
        levels,
        rooms,
        sessions,
        presences,
        studyPeriods,
        createFullClassRoom,
        // Courses
        getCourseById,
        createCourse,
        updateCourse,
        deleteCourse,
        getAllCourses,
        courses,
        uploadImage,
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
