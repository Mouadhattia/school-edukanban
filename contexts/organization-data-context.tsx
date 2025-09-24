"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

import type {
  Organization,
  OrganizationMember,
  Template,
  Activity,
  Invitation,
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
  Board,
  Card,
  List,
  Order,
  SchoolDashboard,
  SchoolProduct,
} from "@/lib/types";
import {
  createSite,
  getSite,
  updateSite,
  deleteSite,
  updateSiteSettings,
  createPage,
  getPages,
  updatePage,
  updatePageOrder,
  deletePage,
  createSection,
  getSections,
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
  assignCoursesToClassroom as assignCoursesToClassroomApi,
  unassignCoursesFromClassroom as unassignCoursesFromClassroomApi,
  createBoard as createBoardApi,
  getBoardById as getBoardByIdApi,
  updateBoard as updateBoardApi,
  deleteBoard as deleteBoardApi,
  getAllBoards as getAllBoardsApi,
  createList as createListApi,
  updateList as updateListApi,
  deleteList as deleteListApi,
  createCard as createCardApi,
  updateCard as updateCardApi,
  deleteCard as deleteCardApi,
  moveCard as moveCardApi,
  getSites,
  generateBoardForUnit as generateBoardForUnitApi,
  getOrders as getOrdersApi,
  getOrderById as getOrderByIdApi,
  getSchoolDashboard as getSchoolDashboardApi,

  createSchoolProduct as createSchoolProductApi,
  getAllSchoolProducts as getAllSchoolProductsApi,
  deleteSchoolProduct as deleteSchoolProductApi,
  updateSchoolProduct as updateSchoolProductApi,
  getSchoolProductById as getSchoolProductByIdApi,
} from "@/lib/api-service";

interface OrganizationDataContextType {
  organization: Organization | null;
  activities: Activity[];
  invitations: Invitation[];
  loading: boolean;
  error: Error | null;

  // Pagination and filtering

  // Users
  getUsers: (payload: GetUsersPayload, token: string) => Promise<any>;
  createUser: (userData: Partial<User>, token: string) => Promise<void>;
  updateUser: (
    userId: string,
    userData: Partial<User>,
    token: string
  ) => Promise<void>;
  deleteUser: (userId: string, token: string) => Promise<void>;

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
  classRoom: Classroom | null;
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
  assignMultiCoursestoClassroom: (
    courseIds: string[],
    classId: string,
    token: string
  ) => Promise<void>;
  unassignCoursesFromClassroom: (
    courseId: string,
    classId: string,
    token: string
  ) => Promise<void>;
  // Board
  createBoard: (board: Partial<Board>) => Promise<void>;
  getBoardById: (id: string) => Promise<void>;
  updateBoard: (id: string, board: Partial<Board>) => Promise<void>;
  deleteBoard: (id: string) => Promise<void>;
  getAllBoards: () => Promise<void>;
  boards: Board[];
  board: Board | null;
  createList: (list: Partial<List>) => Promise<void>;
  updateList: (id: string, list: Partial<List>) => Promise<void>;
  deleteList: (id: string) => Promise<void>;
  createCard: (card: Partial<Card>) => Promise<void>;
  updateCard: (id: string, card: Partial<Card>) => Promise<void>;
  deleteCard: (id: string) => Promise<void>;
  moveCard: (
    id: string,
    indexInList: number,
    newListId: string
  ) => Promise<void>;
  cardLoading: boolean;
  fetchSitesData: (query: any) => Promise<void>;
  generateBoardForUnit: (unitId: string) => Promise<void>;
  boardLoading: boolean;
  getOrders: (
    token: string,
    page: number,
    limit: number,
    userId?: string
  ) => Promise<void>;
  getOrderById: (id: string, token: string) => Promise<void>;
  ordersData: { orders: Order[]; total: number; page: number; limit: number };
  order: Order | null;
  getSchoolDashboard: ( schoolId: string) => Promise<void>;
  schoolDashboard: SchoolDashboard | null;
  createSchoolProduct: (product: Partial<SchoolProduct>) => Promise<void>;
  getAllSchoolProducts: ( payload: { schoolId: string, page: number, limit: number, search: string }) => Promise<void>;
  deleteSchoolProduct: (id: string) => Promise<void>;
  updateSchoolProduct: (id: string, product: Partial<SchoolProduct>) => Promise<void>;
  getSchoolProductById: (id: string) => Promise<void>;
  schoolProductsData: { products: SchoolProduct[]; total: number, page: number, limit: number };
  schoolProduct: SchoolProduct | null;
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
  const [ordersData, setOrdersData] = useState<{
    orders: Order[];
    total: number;
    page: number;
    limit: number;
  }>({ orders: [], total: 0, page: 1, limit: 10 });
  const [order, setOrder] = useState<Order | null>(null);
  // Site state
  const [sites, setSites] = useState<Site[]>([]);
  const [currentSite, setCurrentSite] = useState<Site | null>(null);
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [sitePages, setSitePages] = useState<Page[]>([]);
  const [currentPage, setCurrentPage] = useState<Page | null>(null);
  const [pageSections, setPageSections] = useState<Section[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [schoolDashboard, setSchoolDashboard] = useState<SchoolDashboard | null>(null);
  const [schoolProductsData, setSchoolProductsData] = useState<{ products: SchoolProduct[]; total: number, page: number, limit: number }>({ products: [], total: 0, page: 1, limit: 10 });
  const [schoolProduct, setSchoolProduct] = useState<SchoolProduct | null>(null);
  // ClassRooms
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
  const [classRoom, setClassRoom] = useState<Classroom | null>(null);
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

  // Board
  const [boards, setBoards] = useState<Board[]>([]);
  const [board, setBoard] = useState<Board | null>(null);
  const [cardLoading, setCardLoading] = useState(false);
  const [boardLoading, setBoardLoading] = useState(false);
  const generateBoardForUnit = async (unitId: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      setBoardLoading(true);
      const borad = await generateBoardForUnitApi(unitId, token);
      return borad;
    } catch (error) {
      console.error("Failed to generate board for unit:", error);
      setError(error as Error);
    } finally {
      setBoardLoading(false);
    }
  };
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
  // Fetch sites data
  const fetchSitesData = async (query: any) => {
    try {
      const response = await getSites(query);
      setSites(response);
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

  // Pagination and filtering helpers

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
      setClassRoom(response || null);
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

  const assignMultiCoursestoClassroom = async (
    courseIds: string[],
    classId: string,
    token: string
  ) => {
    setLoading(true);
    try {
      await Promise.all(
        courseIds.map(async (courseId) => {
          await assignCoursesToClassroomApi(courseId, classId, token);
        })
      );
    } catch (error) {
      console.error("Failed to assign courses to classroom:", error);
    }
  };
  const unassignCoursesFromClassroom = async (
    courseId: string,
    classId: string,
    token: string
  ) => {
    setLoading(true);
    try {
      await unassignCoursesFromClassroomApi(courseId, classId, token);
    } catch (error) {
      console.error("Failed to unassign courses from classroom:", error);
    } finally {
      setLoading(false);
    }
  };
  // Board
  const createBoard = async (board: Partial<Board>) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await createBoardApi(board, token);
      setBoards((prevBoards) => [...prevBoards, response]);
    } catch (error) {
      console.error("Failed to create board:", error);
    } finally {
      setLoading(false);
    }
  };
  const getBoardById = async (id: string) => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await getBoardByIdApi(id, token);
      setBoard(response);
    } catch (error) {
      console.error("Failed to get board by id:", error);
    } finally {
      setLoading(false);
    }
  };
  const updateBoard = async (id: string, board: Partial<Board>) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await updateBoardApi(id, board, token);
      setBoards((prevBoards) =>
        prevBoards.map((board) => (board._id === id ? response : board))
      );
    } catch (error) {
      console.error("Failed to update board:", error);
    } finally {
      setLoading(false);
    }
  };
  const deleteBoard = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await deleteBoardApi(id, token);
      setBoards((prevBoards) => prevBoards.filter((board) => board._id !== id));
    } catch (error) {
      console.error("Failed to delete board:", error);
    } finally {
      setLoading(false);
    }
  };
  // here  there is way to get  recall the function when token becom not null just use ref or contex
  const getAllBoards = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;
    setLoading(true);
    try {
      const response = await getAllBoardsApi(token);
      setBoards(response);
    } catch (error) {
      console.error("Failed to get all boards:", error);
    } finally {
      setLoading(false);
    }
  };

  const createList = async (list: Partial<List>) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await createListApi(list, token);
      await getBoardById(response.boardId);
    } catch (error) {
      console.error("Failed to create list:", error);
    } finally {
      setLoading(false);
    }
  };

  const updateList = async (id: string, list: Partial<List>) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token || !id) return;
      const response = await updateListApi(id, list, token);
      await getBoardById(response.boardId);
    } catch (error) {
      console.error("Failed to update list:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteList = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await deleteListApi(id, token);
      if (!board) return;
      await getBoardById(board?._id);
    } catch (error) {
      console.error("Failed to delete list:", error);
    } finally {
      setLoading(false);
    }
  };

  const createCard = async (card: Partial<Card>) => {
    setCardLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await createCardApi(card, token);
      await getBoardById(response.boardId);
    } catch (error) {
      console.error("Failed to create card:", error);
    } finally {
      setCardLoading(false);
    }
  };

  const updateCard = async (id: string, card: Partial<Card>) => {
    setCardLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await updateCardApi(id, card, token);
      await getBoardById(response.boardId);
    } catch (error) {
      console.error("Failed to update card:", error);
    } finally {
      setCardLoading(false);
    }
  };
  const deleteCard = async (id: string) => {
    setCardLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await deleteCardApi(id, token);
      if (!board) return;
      await getBoardById(board._id);
    } catch (error) {
      console.error("Failed to delete card:", error);
    } finally {
      setCardLoading(false);
    }
  };
  const moveCard = async (
    id: string,
    indexInList: number,
    newListId: string
  ) => {
    setCardLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      if (!board) return;
      await moveCardApi(id, indexInList, newListId, token);
      await getBoardById(board?._id);
    } catch (error) {
      console.error("Failed to move card:", error);
    } finally {
      setCardLoading(false);
    }
  };
  // orders
  const getOrders = async (
    token: string,
    page: number,
    limit: number,
    userId?: string
  ) => {
    setLoading(true);
    try {
      const response = await getOrdersApi(token, page, limit, userId);
      setOrdersData(response);
    } catch (error) {
      console.error("Failed to get orders:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  const getOrderById = async (id: string, token: string) => {
    setLoading(true);
    try {
      const response = await getOrderByIdApi(id, token);
      setOrder(response);
    } catch (error) {
      console.error("Failed to get order by id:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const getSchoolDashboard = async ( schoolId: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await getSchoolDashboardApi(token, schoolId);
      setSchoolDashboard(response);
    } catch (error) {
      console.error("Failed to get school dashboard:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const createSchoolProduct = async (product: Partial<SchoolProduct>) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await createSchoolProductApi(product, token);
      setSchoolProductsData((prevSchoolProductsData) => {
        return { ...prevSchoolProductsData, products: [...prevSchoolProductsData.products, response] };
      });
    } catch (error) {
      console.error("Failed to create school product:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const getAllSchoolProducts = async ( payload: { schoolId: string, page: number, limit: number, search: string }) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await getAllSchoolProductsApi(token, payload);
      setSchoolProductsData(response);
    } catch (error) {
      console.error("Failed to get school products:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const deleteSchoolProduct = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      await deleteSchoolProductApi(id, token);
      setSchoolProductsData((prevSchoolProductsData) => {
        return { ...prevSchoolProductsData, products: prevSchoolProductsData.products.filter((product) => product._id !== id) };
      });
    } catch (error) {
      console.error("Failed to delete school product:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const updateSchoolProduct = async (id: string, product: Partial<SchoolProduct>) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await updateSchoolProductApi(id, product, token);
      setSchoolProductsData((prevSchoolProductsData) => {
        return { ...prevSchoolProductsData, products: prevSchoolProductsData.products.map((product) => product._id === id ? response : product) };
      });
    } catch (error) {
      console.error("Failed to update school product:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };
  const getSchoolProductById = async (id: string) => {
    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const response = await getSchoolProductByIdApi(id, token);
      setSchoolProduct(response);
    } catch (error) {
      console.error("Failed to get school product by id:", error);
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <OrganizationDataContext.Provider
      value={{
        organization,

        activities,
        invitations,
        loading,
        error,

        // Refresh function
        // Site state
        fetchSitesData,
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
        classRoom,
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
        // Assign Courses to Classroom
        assignMultiCoursestoClassroom,
        unassignCoursesFromClassroom,
        // Board
        createBoard,
        getBoardById,
        updateBoard,
        deleteBoard,
        getAllBoards,
        boards,
        board,

        createList,
        updateList,
        deleteList,
        createCard,
        updateCard,
        deleteCard,
        moveCard,
        cardLoading,
        generateBoardForUnit,
        boardLoading,
        getOrders,
        getOrderById,
        ordersData,
        order,
        getSchoolDashboard,
        schoolDashboard,
        createSchoolProduct,
        getAllSchoolProducts,
        deleteSchoolProduct,
        updateSchoolProduct,
        getSchoolProductById,
        schoolProductsData,
        schoolProduct,
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
