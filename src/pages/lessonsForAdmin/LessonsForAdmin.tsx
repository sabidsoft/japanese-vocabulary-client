import Sidebar from "../../components/sidebar/Sidebar";

export default function LessonsForAdmin() {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar activeMenu='Lessons' />

      {/* Main Content */}
      <main className="w-[77%] px-5 overflow-y-auto">
        <h1 className="text-2xl font-bold mb-4">LessonsForAdmin</h1>
        <div className="content">
          <p>Welcome to the LessonsForAdmin! Add your content here.</p>
        </div>
      </main>
    </div>
  );
}
