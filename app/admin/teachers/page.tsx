import { TeachersList } from "@/components/admin/teachers-list"

export default function TeachersPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Teachers Management</h1>
      <TeachersList schoolId="school-1" />
    </div>
  )
}
