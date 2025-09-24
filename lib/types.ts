import type React from "react";
export type UserRole =
  | "teacher"
  | "student"
  | "admin"
  | "curriculum-designer"
  | "org-admin"
  | "super-admin";

export interface School {
  id: string;
  name: string;
  address: string;
  logo: string;
}

export interface Organization {
  id: string;
  name: string;
  description?: string;
  logo?: string;
  website?: string;
  createdAt: Date;
  ownerId: string;
  plan: "free" | "professional" | "enterprise";
  settings: {
    defaultTemplateVisibility: "private" | "organization" | "public";
    allowPublicTemplates: boolean;
    requireApprovalForPublishing: boolean;
    brandingEnabled: boolean;
    customDomain?: string;
  };
  status?: "active" | "trial" | "suspended" | "expired";
  trialEndsAt?: Date;
  billingCycle?: "monthly" | "annual";
  nextBillingDate?: Date;
}

export interface OrganizationMember {
  id: string;
  organizationId: string;
  userId: string;
  role: "admin" | "designer" | "viewer";
  joinedAt: Date;
  invitedBy: string;
  status: "active" | "invited" | "suspended";
}

export interface User {
  _id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  title?: string;
  expertise?: string[];
  organizationIds?: any; // Organizations the user belongs to
  defaultOrganizationId?: string; // The organization shown by default
  status?: "active" | "pending" | "suspended" | "deleted";
  lastLogin?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  schoolIds: string[];
  password?: string;
  schoolId?: string;
  userId?: string;
}

// Update the Board interface to include classId (singular) and templateId
export interface Board {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  ownerId: string;
  ownerName: string;
  schoolId?: string;
  classId?: string; // The single class this board is assigned to
  shared: boolean;
  color: string;
  isTemplate?: boolean;
  templateId?: string; // Reference to the original template if this board was created from a template
  boardModel?: string; // The model used to create this board
  status: "draft" | "published"; // Add status field to track if board is draft or published
}

// Add a Class interface if it doesn't exist already
export interface Class {
  id: string;
  name: string;
  subject: string;
  grade: string;
  period?: string;
  room?: string;
  studentCount: number;
  startTime?: string;
  endTime?: string;
  days?: string[];
  color: string;
  description?: string;
  teacherId: string;
}

export interface Column {
  id: string;
  title: string;
  taskIds: string[];
}

export type TaskType =
  | "lesson"
  | "assignment"
  | "homework"
  | "assessment"
  | "preparation"
  | "review";
export type TaskPriority = "low" | "medium" | "high";
export type TaskVisibility = "personal" | "shared" | "instanced";

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
  dueDate?: Date;
  assignedStudentIds: string[];
  attachments: Attachment[];
  comments: Comment[];
  createdBy: string;
  status?: "todo" | "in-progress" | "submitted" | "completed";
  grade?: string;
  boardId?: string;
  boardName?: string;
  // New fields for the three-type task model
  visibility: TaskVisibility;
  parentTaskId?: string; // For instanced tasks, reference to the original task
  instanceOwnerId?: string; // For instanced tasks, the student who owns this instance
  teachingActivities?: string;
  canEditTitle?: boolean;
  canEditDescription?: boolean;
  canEditDueDate?: boolean;
  canEditType?: boolean;
  canEditPriority?: boolean;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  type: string;
  uploadedAt?: Date;
  uploadedBy?: string;
  size?: string;
}

export interface Comment {
  id: string;
  text: string;
  author: string;
  createdAt: Date;
  replies?: Comment[];
}

export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  avatar?: string;
  classes?: string[];
  performance?: number;
  lastActive?: string;
  status?: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  classId: string;
  className: string;
  dueDate: Date;
  points: number;
  type: string;
  status: "draft" | "active" | "archived";
  attachments: Attachment[];
  createdAt: Date;
}

export interface GradeEntry {
  id: string;
  studentId: string;
  studentName: string;
  assignmentId: string;
  assignmentTitle: string;
  classId: string;
  className: string;
  score: number;
  possiblePoints: number;
  feedback?: string;
  submittedAt?: Date;
  gradedAt?: Date;
}

export interface TemplateVersion {
  version: string;
  releaseDate: Date;
  changes: string[];
}

export interface TemplateColumn {
  id: string;
  title: string;
  taskIds: string[];
}

export interface TemplateTask {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  priority: TaskPriority;
}

export interface Template {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  designerId: string;
  designerName: string;
  organizationId: string; // The organization that owns this template
  previewImage?: string;
  color: string;
  educationLevels: string[]; // e.g., ["elementary", "middle", "high"]
  subjects: string[]; // e.g., ["math", "science", "english"]
  standards?: string[]; // e.g., ["CCSS.MATH.CONTENT.5.NBT.A.1"]
  pricing: TemplatePricing;
  status: "draft" | "published" | "archived" | "pending_approval" | "rejected";
  visibility?: "private" | "organization" | "public"; // Who can see this template
  stats: TemplateStats;
  restrictedToSchools?: string[]; // School IDs that can access this template
  versions: TemplateVersion[]; // Version history
  columns?: TemplateColumn[]; // Kanban board columns
  tasks?: TemplateTask[]; // Sample tasks
  sprints?: { name: string; duration: number }[]; // Sprint definitions
  collaborators?: TemplateCollaborator[]; // Users who can collaborate on this template
  tags?: string[]; // Additional tags for searching and filtering
  featured?: boolean; // Whether this template is featured by super admin
  moderationStatus?: "approved" | "flagged" | "under_review";
  moderationNotes?: string;
  isPurchased?: boolean; // Whether the current user/school has purchased this template
  accessGranted?: string[]; // IDs of teachers who have been granted access to this template
}

export interface TemplateCollaborator {
  userId: string;
  userName: string;
  userAvatar?: string;
  role: "editor" | "viewer" | "admin";
  addedAt: Date;
  addedBy: string;
}

export interface TemplatePricing {
  type: "free" | "paid" | "trial";
  model?: "per_instance" | "per_student"; // How pricing is calculated
  price?: number; // Price in USD
  trialPeriod?: number; // Number of days for trial
  trialInstances?: number; // Number of instances allowed in trial
  maxStudents?: number; // Maximum number of students allowed in trial
}

export interface TemplateStats {
  views: number;
  installs: number;
  activeInstances: number;
  rating?: number;
  schoolsUsing: number;
  revenue?: number; // Total revenue generated by this template
}

export interface Invitation {
  id: string;
  email: string;
  organizationId: string;
  role: "admin" | "designer" | "viewer";
  invitedBy: string;
  invitedAt: Date;
  status: "pending" | "accepted" | "declined" | "expired";
  expiresAt: Date;
  token: string;
}

export interface Activity {
  id: string;
  type:
    | "template_created"
    | "template_updated"
    | "template_published"
    | "template_archived"
    | "user_joined"
    | "user_invited"
    | "comment_added"
    | "organization_created"
    | "payment_processed"
    | "system_update"
    | "security_alert";
  userId: string;
  userName: string;
  userAvatar?: string;
  organizationId?: string;
  templateId?: string;
  templateTitle?: string;
  timestamp: Date;
  details?: any;
  severity?: "info" | "warning" | "critical";
  scope: "system" | "organization" | "template" | "user";
}

export interface SystemSettings {
  maintenance: {
    enabled: boolean;
    scheduledStart?: Date;
    scheduledEnd?: Date;
    message?: string;
  };
  security: {
    passwordPolicy: {
      minLength: number;
      requireUppercase: boolean;
      requireLowercase: boolean;
      requireNumbers: boolean;
      requireSpecialChars: boolean;
      expiryDays: number;
    };
    twoFactorAuth: {
      required: boolean;
      requiredForRoles: UserRole[];
    };
    sessionTimeout: number; // minutes
  };
  billing: {
    plans: {
      free: {
        enabled: boolean;
        maxUsers: number;
        maxTemplates: number;
        features: string[];
      };
      professional: {
        enabled: boolean;
        price: number;
        maxUsers: number;
        maxTemplates: number;
        features: string[];
      };
      enterprise: {
        enabled: boolean;
        features: string[];
      };
    };
    trialPeriod: number; // days
  };
  localization: {
    defaultLanguage: string;
    supportedLanguages: string[];
    dateFormat: string;
    timeFormat: string;
    timezone: string;
  };
  notifications: {
    emailEnabled: boolean;
    systemNotificationsEnabled: boolean;
    defaultEmailTemplates: {
      welcome: string;
      passwordReset: string;
      inviteUser: string;
      paymentReceipt: string;
    };
  };
  api: {
    rateLimit: number;
    enabled: boolean;
  };
}

export interface SystemHealth {
  cpu: {
    usage: number;
    temperature: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
  };
  disk: {
    total: number;
    used: number;
    free: number;
  };
  database: {
    connections: number;
    queryResponseTime: number;
    size: number;
    lastBackup: Date;
  };
  api: {
    requestsPerMinute: number;
    averageResponseTime: number;
    errorRate: number;
  };
  lastChecked: Date;
}

export interface MaintenanceTask {
  id: string;
  name: string;
  description: string;
  status: "scheduled" | "in_progress" | "completed" | "failed" | "cancelled";
  scheduledStart: Date;
  scheduledEnd?: Date;
  actualStart?: Date;
  actualEnd?: Date;
  affectedSystems: string[];
  priority: "low" | "medium" | "high" | "critical";
  createdBy: string;
  notes?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  userId: string;
  userName: string;
  userIp: string;
  resourceType: string;
  resourceId: string;
  timestamp: Date;
  details: any;
  success: boolean;
}

export interface PaymentTransaction {
  id: string;
  organizationId: string;
  organizationName: string;
  amount: number;
  currency: string;
  status: "pending" | "completed" | "failed" | "refunded";
  paymentMethod: string;
  description: string;
  createdAt: Date;
  completedAt?: Date;
  refundedAt?: Date;
  invoiceId?: string;
  receiptUrl?: string;
}

export interface NavItem {
  title: string;
  items: {
    title: string;
    href: string;
    icon?: React.ComponentType<{ className?: string }>;
    active?: boolean;
    badge?: number | string;
    badgeVariant?: "default" | "destructive";
  }[];
}

export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface SortOptions {
  field: string;
  direction: "asc" | "desc";
}

export interface FilterOptions {
  [key: string]: any;
}

export interface PaginationMeta {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  pageSize: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface Subject {
  _id: string;
  name: string;
  description?: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

//sites

export interface SiteSettings {
  id: string;
  site_id: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
  logo_url: string;
  favicon_url: string;
  social_links: Record<string, string>;
  analytics: Record<string, any>;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  created_at: Date;
  updated_at: Date;
  last_updated: Date;
}
export interface Site {
  _id: string;
  name: string;
  domain: string;
  status: "published" | "draft";
  image_url: string;
  created_at: Date;
  updated_at: Date;
  last_updated: Date;
  settings: SiteSettings;
  pages: Page[];
  schoolId: string;
}
export interface Page {
  _id: string;
  site_id: string;
  title: string;
  slug: string;
  is_homepage: boolean;
  order_index: number;
  created_at: Date;
  updated_at: Date;
}

// Section Model
export interface Section {
  _id: string;
  page_id: string;
  type?: SectionType;
  label: string;
  order_index: number;
  content: any;
  created_at: Date;
  updated_at: Date;
}
export type SectionType =
  | "hero"
  | "heading"
  | "paragraph"
  | "features"
  | "testimonials"
  | "cta"
  | "staff_directory"
  | "calendar"
  | "contact"
  | "image"
  | "gallery"
  | "video"
  | "faq"
  | "courses"
  | "products"
  | "carousel"
  | "allProducts"
  | "contact_form";

export interface UsersData {
  users?: User[];

  totalPages?: number;
  currentPage?: number;
  totalUsers?: number;
}
export interface GetUsersPayload {
  page?: number;
  limit?: number;
  search?: string;
  role?: UserRole;
  schoolId?: string;
}
// classRoom
export interface Classroom {
  _id: string;
  name: string;
  description?: string;
  status: "active" | "archived";
  schoolId: School | string; // It can be a full object or just the ID
  createdAt: string;
  updatedAt: string;
  levelId: string | Level;
  studyPeriod: string | StudyPeriod;
  schoolProductId: string | SchoolProduct;
}
// GetClassesPayload
export interface GetClassesPayload {
  page?: number;
  limit?: number;
  search?: string;
  schoolId: string;
  fromDate: string;
  toDate: string;
}
// ClassesData
export interface ClassesData {
  classes?: Classroom[];
  totalPages?: number;
  currentPage?: number;
  totalClasses?: number;
}

// level
export interface Level {
  _id: string;
  name: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  description?: string;
}
// room
export interface Room {
  _id: string;
  name: string;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
  capacity: number;
  location: "online" | "local";
}
// session
export interface Session {
  _id: string;
  title: string;
  classRoom: string | Classroom;
  subject: string | Subject;
  studyPeriod: any;
  teacher: string | User;
  weeklySchedule: any;
  createdAt: string;
  updatedAt: string;
}
// presence
export interface Presence {
  _id: string;
  session: string | Session;
  student: string | User;
  date: Date;
  status: "present" | "absent" | "late" | "excused";
  createdAt: string;
  updatedAt: string;
  comment?: string;
}
// study period
export interface StudyPeriod {
  _id: string;
  name: string;
  description?: string;
  startTime?: Date;
  endTime?: Date;
  startDate?: Date;
  endDate?: Date;
  schoolId: string;
  createdAt: string;
  updatedAt: string;
}

// weekly schedule
export interface WeeklySchedule {
  _id: string;
  weeklySchedule: Record<string, { start: string; end: string }>;
  createdAt: string;
  updatedAt: string;
}

export interface FullClassRoomCreationData {
  name: string;
  schoolId: string;
  description?: string;
  courseName: string; // Fixed typo from coureName
  subjectId: string;
  teacherId: string;
  weeklySchedule: Record<string, { start: string; end: string }>;
  levelId: string;
  roomId: string;
  studyPeriodId: string;
  status?: "active" | "archived";
}

// course
export interface Course {
  _id: string;
  name: string;
  description?: string;
  school: string | School;
  duration: number;
  image: string;
  video: string;
  createdAt: string;
  updatedAt: string;
  syllabus?: string;
}
// types/board.ts
export type BoardRole = "owner" | "admin" | "member" | "observer";

export interface BoardMember {
  userId: string; // references User _id
  role: BoardRole;
  joinedAt?: string; // ISO date string
}

export interface Board {
  _id: string;
  title: string;
  descriptions: string;
  backgroundColor: string;
  createdBy: string | User; // references User _id
  members: BoardMember[];
  archived: boolean;
  createdAt: Date; // from timestamps: true
  updatedAt?: Date;
  lists: List[];
}
// types/card.ts
export interface Card {
  _id: string;
  title: string;
  cardParent?: string; // references another Card
  listId?: string; // references List
  boardId: string; // references Board
  assignedTo?: string; // references User
  position?: number;
  borderColor?: string;
  createdBy?: string; // references User
  archived: boolean;
  activityId?: string; // references another Card
  createdAt: string; // from timestamps
  updatedAt: string;
}
// types/list.ts
export interface List {
  _id: string;
  title: string;
  boardId: string; // references Board
  position: number;
  color: string;
  archived: boolean;
  createdBy: string; // references User
  createdAt: string; // from timestamps
  updatedAt: string;
  cards: Card[];
}

export interface Order {
  _id: string;
  userId: string | User;
  courseId?: string | Course;
  curriculumProductId?: any;
  status: string;
  amount: number;
  paymentMethod: "cash" | "bank_transfer" | "card";
  paymentStatus: "pending" | "paid" | "failed";
  paymentDate: Date;
  paymentGateway: "stripe" | "paypal" | "razorpay";
  paymentGatewayId: string;
  paymentGatewayStatus: "pending" | "paid" | "failed";
  createdAt: Date;
  updatedAt: Date;
}

export interface SchoolDashboard {
  success: boolean;
  data: {
    school: {
      id: string;
      name: string;
      district: string;
      type: string;
      status: string;
    };
    users: {
      total: number;
      active: number;
      breakdown: {
        teachers: number;
        students: number;
        admins: number;
      };
      registrationTrends: any[]; // refine later if you know structure
    };
    courses: {
      total: number;
      joinEnabled: number;
      analytics: {
        totalCourses: number;
        averagePrice: number;
        averageDuration: number;
        totalRevenue: number;
      };
    };
    classrooms: {
      total: number;
      active: number;
      archived: number;
      capacityStats: {
        totalCapacity: number;
        averageCapacity: number;
        maxCapacity: number;
        minCapacity: number;
      };
    };
    enrollments: {
      total: number;
      active: number;
      pending: number;
      rejected: number;
      monthlyTrends: {
        _id: {
          year: number;
          month: number;
        };
        total: number;
        active: number;
        pending: number;
      }[];
    };
    boards: {
      total: number;
      createdThisMonth: number;
      stats: {
        _id: string | null;
        totalBoards: number;
        totalMembers: number;
        averageMembersPerBoard: number;
      };
    };
    tasks: {
      total: number;
      createdThisMonth: number;
      byStatus: {
        _id: string[];
        count: number;
      }[];
    };
    sessions: {
      total: number;
      thisMonth: number;
    };
    attendance: {
      stats: any[]; // refine later if you know structure
      rate: {
        attendanceRate: number;
        totalSessions: number;
        presentCount: number;
        lateCount: number;
      };
    };
    academic: {
      levels: number;
      studyPeriods: {
        total: number;
        active: number;
      };
    };
    recentActivity: {
      newUsersThisWeek: number;
      newClassroomsThisWeek: number;
      newBoardsThisWeek: number;
    };
    generatedAt: string; // ISO date string
  };
}
export interface SchoolProduct {
  _id: string; // MongoDB ObjectId
  name: string;
  description: string;
  school: string | School; // ObjectId reference to School
  price: number;
  duration: number;
  image?: string;
  video?: string;
  enableJoinClass: boolean;
  courses: string[] | Course[]; // Array of ObjectIds referencing Course
  createdAt: string; // ISO date
  updatedAt: string; // ISO date
}