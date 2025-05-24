import { WebsitePageEditor } from "@/components/admin/website-page-editor"

export default function WebsitePageEditorPage({ params }: { params: { id: string } }) {
  return <WebsitePageEditor pageId={params.id} />
}
