import {
    useCreateLessonMutation,
    useDeleteLessonMutation,
    useGetLessonsForLessonManagementQuery,
    useUpdateLessonMutation
} from "../../redux/features/api/endPoints/lessonEndpoint/lessonEndpoint";
import { useEffect, useState } from "react";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import { MoonLoader } from "react-spinners";
import Sidebar from "../../components/sidebar/Sidebar";
import { toast } from "react-toastify";

export default function LessonManagement() {
    const { data, isLoading: lessonsIsLoading, isError } = useGetLessonsForLessonManagementQuery();
    const [createLesson, { isLoading: createLessonIsLoading, error: createError }] = useCreateLessonMutation();
    const [updateLesson, { isLoading: updateLessonIsLoading, error: updateError }] = useUpdateLessonMutation();
    const [deleteLesson, { isLoading: deleteLessonIsLoading, error: deleteError }] = useDeleteLessonMutation();
    const [formData, setFormData] = useState<any>({ id: "", name: "", number: 0 });
    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const lessons = data?.data?.lessons;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "number" ? Number(value) : value });
    };

    const handleCreateOrUpdate = async () => {
        const apiData = {
            _id: formData.id || undefined, // Include `_id` only for updates
            lessonName: formData.name,
            lessonNumber: formData.number,
        };

        try {
            if (isEditing) {
                await updateLesson(apiData).unwrap();

                toast.success("Lesson updated successfully!");

                setFormData({ id: "", name: "", number: 0 });
                setIsEditing(false);
                setShowModal(false);
                setErrorMessage("");
            } else {
                await createLesson(apiData).unwrap();

                toast.success("Lesson created successfully!");

                setFormData({ id: "", name: "", number: 0 });
                setIsEditing(false);
                setShowModal(false);
                setErrorMessage("");
            }
        } catch (error) {
            toast.error("An error occurred while saving the lesson.");
        }
    };

    const handleCreate = () => {
        setFormData({ id: "", name: "", number: 0 });
        setIsEditing(false);
        setShowModal(true);
    };

    const handleEdit = (lesson: any) => {
        setFormData({
            id: lesson._id,
            name: lesson.lessonName,
            number: lesson.lessonNumber,
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this lesson?")) {
            try {
                await deleteLesson(id).unwrap();
                toast.success("Lesson deleted successfully!");
            } catch (error) {
                toast.error("An error occurred while deleting the lesson.");
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ id: "", name: "", number: 0 });
        setIsEditing(false);
        setErrorMessage("");
    };

    useEffect(() => {
        if (createError) {
            if ("status" in createError) {
                const errMsgJSONString =
                    "error" in createError ? createError.error : JSON.stringify(createError.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);
                setErrorMessage(errMsgJSObj.message || "Failed to add lesson");
            }
        }
        if (updateError) {
            if ("status" in updateError) {
                const errMsgJSONString =
                    "error" in updateError ? updateError.error : JSON.stringify(updateError.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);
                setErrorMessage(errMsgJSObj.message || "Failed to update lesson");
            }
        }
        if (deleteError) {
            if ("status" in deleteError) {
                const errMsgJSONString =
                    "error" in deleteError ? deleteError.error : JSON.stringify(deleteError.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);
                setErrorMessage(errMsgJSObj.message || "Failed to delete lesson");
            }
        }
    }, [createError, updateError, deleteError]);

    let content;

    if (lessonsIsLoading || deleteLessonIsLoading) {
        content = <Loader />;
    } else if (isError) {
        content = <ErrorMessage message="Failed to load lessons. Please try again." />;
    } else if (!lessons || lessons.length === 0) {
        content = <ErrorMessage message="No lessons available. Add a new lesson to get started!" />;
    } else {
        content = (
            <div>
                <h2 className="text-xl text-center font-bold mb-4">All Lessons</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Lesson Name</th>
                            <th className="border border-gray-300 p-2">Lesson Number</th>
                            <th className="border border-gray-300 p-2">Vocabulary Count</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lessons.map((lesson: any) => (
                            <tr key={lesson._id} className="hover:bg-gray-50 text-center">
                                <td className="border border-gray-300 p-2">{lesson.lessonName}</td>
                                <td className="border border-gray-300 p-2">{lesson.lessonNumber}</td>
                                <td className="border border-gray-300 p-2">{lesson.vocabCount}</td>
                                <td className="border border-gray-300 p-2 flex justify-center gap-2">
                                    <button
                                        onClick={() => handleEdit(lesson)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(lesson._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        disabled={deleteLessonIsLoading}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    return (
        <>
            <Sidebar activeMenu="Add Lessons" />
            <main className="w-[76%] p-4 mt-2 overflow-y-auto ml-[24%]">
                <div className="flex flex-col items-center mb-10">
                    <h1 className="text-center text-4xl font-bold mb-10">Lesson Management</h1>
                    <button
                        onClick={handleCreate}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mb-8"
                    >
                        Add New Lesson
                    </button>
                    <div className="w-[100%] px-0 md:px-5 lg:px-10">{content}</div>

                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white w-[90%] md:w-[50%] lg:w-[40%] p-6 rounded shadow-lg">
                                <h2 className="text-xl text-center font-bold mb-4">
                                    {isEditing ? "Edit Lesson" : "Create Lesson"}
                                </h2>
                                <div className="mb-4">
                                    <label htmlFor="modal-name" className="block mb-2 font-medium">Lesson Name</label>
                                    <input
                                        id="modal-name"
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        placeholder="Lesson Name"
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="modal-number" className="block mb-2 font-medium">Lesson Number</label>
                                    <input
                                        id="modal-number"
                                        type="number"
                                        name="number"
                                        value={formData.number}
                                        placeholder="Lesson Number"
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded"
                                    />
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={handleCloseModal}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                        disabled={updateLessonIsLoading || createLessonIsLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCreateOrUpdate}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        {
                                            isEditing ?
                                                updateLessonIsLoading ?
                                                    <div className='flex justify-center px-4'><MoonLoader color="#fff" size={18} /> </div> : "Save Changes" : createLessonIsLoading ?
                                                    <div className='flex justify-center px-4'><MoonLoader color="#fff" size={18} /> </div> : "Create Lesson"
                                        }
                                    </button>
                                </div>
                                {/* Error message */}
                                {errorMessage && (
                                    <p className="text-red-500 text-center mt-4">{errorMessage}</p>
                                )}

                            </div>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
