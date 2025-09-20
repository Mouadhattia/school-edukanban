export type ColumnColor =
  | "red"
  | "orange"
  | "yellow"
  | "green"
  | "teal"
  | "blue"
  | "indigo"
  | "pink"
  | "purple"
  | "gray"

export interface Column {
  id: string
  name: string
  color: ColumnColor
  isDefault: boolean
  order: number
}

// Default columns that replace the old status system
export const DEFAULT_COLUMNS: Column[] = [
  {
    id: "not-started",
    name: "Not Started",
    color: "gray",
    isDefault: true,
    order: 0,
  },
  {
    id: "in-progress",
    name: "In Progress",
    color: "blue",
    isDefault: true,
    order: 1,
  },
  {
    id: "completed",
    name: "Completed",
    color: "purple",
    isDefault: true,
    order: 2,
  },
]

// Column management functions
export function getColumnById(columnId: string, customColumns: Column[] = []): Column | undefined {
  const allColumns = [...DEFAULT_COLUMNS, ...customColumns]
  return allColumns.find((col) => col.id === columnId)
}

export function getAllColumns(customColumns: Column[] = []): Column[] {
  return [...DEFAULT_COLUMNS, ...customColumns].sort((a, b) => a.order - b.order)
}

export function getColumnColor(columnId: string, customColumns: Column[] = []): string {
  const column = getColumnById(columnId, customColumns)
  if (!column) return "bg-gray-100 text-gray-700"

  const colorMap: Record<ColumnColor, string> = {
    red: "bg-red-500 text-white",
    orange: "bg-orange-500 text-white",
    yellow: "bg-yellow-500 text-white",
    green: "bg-green-500 text-white",
    teal: "bg-teal-500 text-white",
    blue: "bg-blue-500 text-white",
    indigo: "bg-indigo-500 text-white",
    pink: "bg-pink-500 text-white",
    purple: "bg-purple-500 text-white",
    gray: "bg-gray-100 text-gray-700",
  }

  return colorMap[column.color] || "bg-gray-100 text-gray-700"
}

export function getColumnBadgeColor(columnId: string, customColumns: Column[] = []): string {
  const column = getColumnById(columnId, customColumns)
  if (!column) return "bg-gray-100 hover:bg-gray-200 text-gray-700"

  const colorMap: Record<ColumnColor, string> = {
    red: "bg-red-100 hover:bg-red-200 text-red-700",
    orange: "bg-orange-100 hover:bg-orange-200 text-orange-700",
    yellow: "bg-yellow-100 hover:bg-yellow-200 text-yellow-700",
    green: "bg-green-100 hover:bg-green-200 text-green-700",
    teal: "bg-teal-100 hover:bg-teal-200 text-teal-700",
    blue: "bg-blue-100 hover:bg-blue-200 text-blue-700",
    indigo: "bg-indigo-100 hover:bg-indigo-200 text-indigo-700",
    pink: "bg-pink-100 hover:bg-pink-200 text-pink-700",
    purple: "bg-purple-100 hover:bg-purple-200 text-purple-700",
    gray: "bg-gray-100 hover:bg-gray-200 text-gray-700",
  }

  return colorMap[column.color] || "bg-gray-100 hover:bg-gray-200 text-gray-700"
}

export function getColumnBoxStyle(columnId: string, customColumns: Column[] = []): string {
  const column = getColumnById(columnId, customColumns)
  if (!column) return "border border-gray-300"

  const colorMap: Record<ColumnColor, string> = {
    red: "bg-red-500",
    orange: "bg-orange-500",
    yellow: "bg-yellow-500",
    green: "bg-green-500",
    teal: "bg-teal-500",
    blue: "bg-blue-500",
    indigo: "bg-indigo-500",
    pink: "bg-pink-500",
    purple: "bg-purple-500",
    gray: "border border-gray-300",
  }

  return colorMap[column.color] || "border border-gray-300"
}

// Legacy status mapping for backward compatibility
export function mapLegacyStatusToColumn(status: string): string {
  const statusMap: Record<string, string> = {
    mastered: "completed",
    proficient: "completed",
    familiar: "in-progress",
    attempted: "in-progress",
    "not-started": "not-started",
  }

  return statusMap[status] || "not-started"
}
