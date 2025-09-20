"use client"
import { Info, Zap, Star, BookOpen } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Card, CardContent } from "@/components/ui/card"
import Link from "next/link"
import Image from "next/image"
import { type Column, getAllColumns, getColumnById, getColumnBoxStyle } from "@/lib/column-system"

// Types for our components
export type Activity = {
  id: string
  title: string
  description: string
  columnId: string // Changed from status to columnId
  imageSrc?: string
}

export type Quiz = {
  id: string
  title: string
}

export type UnitTest = {
  id: string
  title: string
}

export type Unit = {
  id: string
  title: string
  activities: (Activity | Quiz | UnitTest)[]
}

// Helper function to determine if an item is a Quiz
function isQuiz(item: Activity | Quiz | UnitTest): item is Quiz {
  return "title" in item && !("columnId" in item) && !("description" in item)
}

// Helper function to determine if an item is a UnitTest
function isUnitTest(item: Activity | Quiz | UnitTest): item is UnitTest {
  return "title" in item && !("columnId" in item) && !("description" in item)
}

// ActivityBox Component
export function ActivityBox({
  columnId = "not-started",
  title = "Activity",
  description = "Activity description",
  imageSrc = "/placeholder.svg?height=150&width=200",
  customColumns = [],
}: {
  columnId?: string
  title?: string
  description?: string
  imageSrc?: string
  customColumns?: Column[]
}) {
  const boxStyle = getColumnBoxStyle(columnId, customColumns)
  const column = getColumnById(columnId, customColumns)

  return (
    <Tooltip>
      <TooltipTrigger>
        <div
          className={`w-4 h-4 rounded ${boxStyle} cursor-pointer hover:opacity-80 hover:scale-110 transition-transform`}
        ></div>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="p-0 overflow-hidden max-w-xs">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="relative h-[150px] w-[200px]">
            <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
            <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 p-2">
              <span className="text-gray-100 text-xs font-medium">{column?.name || "Unknown"}</span>
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm text-gray-900">{title}</h3>
            <p className="text-xs text-gray-600 mt-1">{description}</p>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}

// QuizIcon Component
export function QuizIcon({ title = "Quiz" }: { title?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Zap className="w-4 h-4 mx-1 text-gray-700 cursor-pointer hover:text-blue-600" />
      </TooltipTrigger>
      <TooltipContent side="bottom" className="p-0 overflow-hidden max-w-xs">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="relative h-[150px] w-[200px] bg-blue-50 flex items-center justify-center">
            <Zap className="h-16 w-16 text-blue-500" />
            <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 p-2">
              <span className="text-gray-100 text-xs font-medium">Quiz</span>
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm text-gray-900">{title}</h3>
            <p className="text-xs text-gray-600 mt-1">Test your knowledge of recent concepts</p>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}

// UnitTestIcon Component
export function UnitTestIcon({ title = "Unit Test" }: { title?: string }) {
  return (
    <Tooltip>
      <TooltipTrigger>
        <Star className="w-4 h-4 text-gray-700 cursor-pointer hover:text-yellow-500" />
      </TooltipTrigger>
      <TooltipContent side="bottom" className="p-0 overflow-hidden max-w-xs">
        <div className="bg-white rounded-lg shadow-lg">
          <div className="relative h-[150px] w-[200px] bg-yellow-50 flex items-center justify-center">
            <Star className="h-16 w-16 text-yellow-500" />
            <div className="absolute bottom-0 left-0 right-0 bg-gray-900 bg-opacity-90 p-2">
              <span className="text-gray-100 text-xs font-medium">Unit Test</span>
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-medium text-sm text-gray-900">{title}</h3>
            <p className="text-xs text-gray-600 mt-1">Comprehensive test of all unit concepts</p>
          </div>
        </div>
      </TooltipContent>
    </Tooltip>
  )
}

// UnitProgress Component - For displaying a single unit row
export function UnitProgress({
  unit,
  unitNumber,
  customColumns = [],
}: {
  unit: Unit
  unitNumber: number
  customColumns?: Column[]
}) {
  return (
    <div className="border-b pb-2 hover:bg-gray-50 rounded transition-colors cursor-pointer">
      <div className="flex items-center">
        <h2 className="font-bold text-gray-800 w-14 text-sm cursor-pointer hover:text-blue-600 transition-colors">
          Unit {unitNumber}
        </h2>
        <div className="flex items-center gap-1 flex-wrap">
          {unit.activities.map((item, index) => {
            if (isQuiz(item)) {
              return <QuizIcon key={`quiz-${index}`} title={item.title} />
            } else if (isUnitTest(item)) {
              return <UnitTestIcon key={`test-${index}`} title={item.title} />
            } else {
              return (
                <ActivityBox
                  key={`activity-${index}`}
                  columnId={item.columnId}
                  title={item.title}
                  description={item.description}
                  imageSrc={item.imageSrc}
                  customColumns={customColumns}
                />
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

// CourseProgress Component - Main component for displaying course progress
export function CourseProgress({
  units,
  title = "Your progress",
  description = "7,500 possible mastery points",
  showCourseChallenge = true,
  columns = 2,
  customColumns = [],
}: {
  units: Unit[]
  title?: string
  description?: string
  showCourseChallenge?: boolean
  columns?: 1 | 2
  customColumns?: Column[]
}) {
  // Split units into columns
  const midpoint = Math.ceil(units.length / columns)
  const leftColumnUnits = units.slice(0, midpoint)
  const rightColumnUnits = columns === 2 ? units.slice(midpoint) : []

  const allColumns = getAllColumns(customColumns)

  return (
    <Card>
      <CardContent className="pt-4">
        <div className="mb-4">
          <div className="flex items-center mb-1">
            <h2 className="text-xl font-bold text-gray-900">{title}</h2>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-4 w-4 ml-2 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p className="w-64">
                    Track your progress through each unit. Complete activities to earn mastery points.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <p className="text-sm text-gray-600">{description}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3 mb-4 text-xs">
          {allColumns.map((column) => (
            <div key={column.id} className="flex items-center gap-1">
              <div className={`w-4 h-4 rounded ${getColumnBoxStyle(column.id, customColumns)}`}></div>
              <span>{column.name}</span>
            </div>
          ))}
          <div className="flex items-center gap-1">
            <Zap className="w-4 h-4 text-gray-700" />
            <span>Quiz</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 text-gray-700" />
            <span>Unit test</span>
          </div>
        </div>

        {/* Course Grid */}
        <TooltipProvider>
          <div className={`grid grid-cols-1 ${columns === 2 ? "md:grid-cols-2" : ""} gap-x-8 gap-y-2`}>
            {/* Left Column */}
            <div className="space-y-2">
              {leftColumnUnits.map((unit, index) => (
                <Link href={`/unit/${unit.id}`} key={unit.id} className="block">
                  <UnitProgress unit={unit} unitNumber={index + 1} customColumns={customColumns} />
                </Link>
              ))}
            </div>

            {/* Right Column (if needed) */}
            {columns === 2 && rightColumnUnits.length > 0 && (
              <div className="space-y-2">
                {rightColumnUnits.map((unit, index) => (
                  <Link href={`/unit/${unit.id}`} key={unit.id} className="block">
                    <UnitProgress
                      key={unit.id}
                      unit={unit}
                      unitNumber={index + midpoint + 1}
                      customColumns={customColumns}
                    />
                  </Link>
                ))}

                {/* Course Challenge */}
                {showCourseChallenge && (
                  <div className="border rounded-lg p-3 mt-2">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="h-4 w-4" />
                      <h2 className="font-bold text-gray-800 uppercase text-sm">Course Challenge</h2>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">Test your knowledge of the skills in this course.</p>
                    <Link href="#" className="text-blue-600 text-sm font-medium hover:underline">
                      Start Course challenge
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </TooltipProvider>
      </CardContent>
    </Card>
  )
}
