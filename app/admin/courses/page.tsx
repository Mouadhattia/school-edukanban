import { CourseList } from "@/components/admin/course-list";

export default function CoursesPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Course Management</h1>
      <CourseList />
    </div>
  );
}
