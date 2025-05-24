export default function TestPage() {
  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Admin Test Page</h1>
      <p className="text-lg">This is a test page to verify that the admin layout and sidebar are working correctly.</p>
      <div className="p-4 mt-4 bg-yellow-100 border border-yellow-300 rounded-md">
        <p>If you can see the sidebar on the left, then it's working correctly!</p>
      </div>
    </div>
  )
}
