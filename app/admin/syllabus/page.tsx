// syllabus page
"use client";

import { SyllabusList } from "@/components/admin/syllabus-list";

export default function SyllabusPage() {
  return (
    <div className="container py-6">
      <h1 className="text-2xl font-bold mb-6">Syllabus Management</h1>
      <SyllabusList />
    </div>
  );
}
