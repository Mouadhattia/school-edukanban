// syllabus detail page
"use client";
import { SyllabusDetails } from "@/components/admin/syllabus-details";
import { useParams } from "next/navigation";

export default function SyllabusDetailPage() {
  const { id } = useParams();
  return <SyllabusDetails syllabusId={id as string} />;
}
