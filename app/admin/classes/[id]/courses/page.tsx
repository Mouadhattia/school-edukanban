import { ClassCourseView } from "@/components/admin/class-course-view";

interface ClassCoursesPageProps {
  params: {
    id: string;
  };
}

export default function ClassCoursesPage({ params }: ClassCoursesPageProps) {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Class Courses</h1>
      <ClassCourseView classId={params.id} />
    </div>
  );
}
