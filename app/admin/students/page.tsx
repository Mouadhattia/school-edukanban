import { StudentsList } from "@/components/admin/students-list"

export default function StudentsPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Students Management</h1>
      <StudentsList />
    </div>
  )
}
