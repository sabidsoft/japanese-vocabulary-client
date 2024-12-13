import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import Loader from "../../components/loader/Loader";
import Sidebar from "../../components/sidebar/Sidebar";
import { useGetLessonsQuery } from "../../redux/features/api/endPoints/lessonEndpoint/lessonEndpoint";
import { useNavigate } from "react-router-dom";

export default function LessonsForAdmin() {
    const navigate = useNavigate();
    const { data, isError, isLoading } = useGetLessonsQuery();

    const lessons = data?.data?.lessons;

    let content;

    if (isLoading)
        content = <Loader />;

    if (!isLoading && isError)
        content = <ErrorMessage message="Something went wrong." />;

    if (!isLoading && !isError && lessons && lessons.length === 0)
        content = <ErrorMessage message='Opps! There is no lesson available!' />;

    if (!isLoading && !isError && lessons && lessons.length > 0)
        content =
            <>
                {lessons?.map((lesson: { _id: string; lessonName: string, lessonNumber: number }) => (
                    <button
                        key={lesson._id}
                        onClick={() => navigate(`/dashboard/lessons/${lesson.lessonNumber}`, { state: { lessonName: lesson.lessonName } })}
                        className="py-4 border mb-4 w-full bg-gray-800 hover:bg-gray-600 duration-500 text-white rounded-xl"
                    >
                        {lesson.lessonName}
                    </button>
                ))}
            </>;

    return (
        <>
            <Sidebar activeMenu="Lessons" />
            <main className="w-[76%] p-4 mt-2 overflow-y-auto ml-[24%]">
                <div className="flex flex-col">
                    <h1 className="text-center text-4xl font-bold mt-8 mb-16">Lessons</h1>
                    <div className="w-[100%] md:w-[50%] lg:w-[30%] mx-auto mb-6 px-5">
                        {content}
                    </div>
                </div>
            </main>
        </>
    );
}
