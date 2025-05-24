import { ClassBoardsView } from "@/components/admin/class-boards-view"

interface ClassBoardsPageProps {
  params: {
    id: string
  }
}

export default function ClassBoardsPage({ params }: ClassBoardsPageProps) {
  // In a real app, you would fetch the class name from the database
  const className =
    params.id === "class-1"
      ? "Grade 5A"
      : params.id === "class-2"
        ? "Grade 5B"
        : params.id === "class-3"
          ? "Advanced Spanish - Evening"
          : params.id === "class-4"
            ? "Introduction to Programming"
            : params.id === "class-5"
              ? "Grade 4C"
              : "Unknown Class"

  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Class Boards</h1>
      <ClassBoardsView classId={params.id} className={className} />
    </div>
  )
}
