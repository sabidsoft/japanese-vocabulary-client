import Sidebar from "../../components/sidebar/Sidebar";
import { useGetLessonsQuery } from "../../redux/features/api/endPoints/lessonEndpoint/lessonEndpoint";

export default function Lessons() {
  const { data, error, isLoading } = useGetLessonsQuery();

  const lessons = data?.data?.lessons;

  console.log(lessons)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading lessons</div>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar activeMenu="Lessons" />

      {/* Main Content */}
      <main className="w-[76%] p-4 mt-2 overflow-y-auto ml-[24%]">
        <h1 className="text-center text-4xl font-bold mb-10">Lessons</h1>

        <div className="overflow-x-auto">

        </div>
      </main>
    </div>
  );
}
