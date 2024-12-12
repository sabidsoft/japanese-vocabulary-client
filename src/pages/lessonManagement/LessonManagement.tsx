import React, { useState } from "react";
import {
    useCreateLessonMutation,
    useDeleteLessonMutation,
    useGetLessonsQuery,
    useUpdateLessonMutation
} from "../../redux/features/api/endPoints/lessonEndpoint/lessonEndpoint";

export default function LessonManagement() {
    const { data: lessons, isLoading, error } = useGetLessonsQuery();
    const [createLesson] = useCreateLessonMutation();
    const [updateLesson] = useUpdateLessonMutation();
    const [deleteLesson] = useDeleteLessonMutation();
    const [formData, setFormData] = useState<any>({ id: "", name: "", number: 0 });
    const [isEditing, setIsEditing] = useState(false);

    console.log(lessons)

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: name === "number" ? Number(value) : value });
    };

    const handleCreateOrUpdate = async () => {
        if (isEditing) {
            await updateLesson(formData);
        } else {
            await createLesson(formData);
        }
        setFormData({ id: "", name: "", number: 0 });
        setIsEditing(false);
    };

    const handleEdit = (lesson: any) => {
        setFormData(lesson);
        setIsEditing(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this lesson?")) {
            await deleteLesson(id);
        }
    };

    if (isLoading) return <div>Loading lessons...</div>;
    if (error) return <div>Error loading lessons.</div>;

    return (
        <div>
            <h1>Lesson Management</h1>

            <div>
                <h2>{isEditing ? "Edit Lesson" : "Create Lesson"}</h2>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    placeholder="Lesson Name"
                    onChange={handleInputChange}
                />
                <input
                    type="number"
                    name="number"
                    value={formData.number}
                    placeholder="Lesson Number"
                    onChange={handleInputChange}
                />
                <button onClick={handleCreateOrUpdate}>
                    {isEditing ? "Update Lesson" : "Create Lesson"}
                </button>
            </div>

            <h2>All Lessons</h2>
            <table>
                <thead>
                    <tr>
                        <th>Lesson Name</th>
                        <th>Lesson Number</th>
                        <th>Vocabulary Count</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {lessons?.map((lesson: any) => (
                        <tr key={lesson.id}>
                            <td>{lesson.name}</td>
                            <td>{lesson.number}</td>
                            <td>{lesson.vocabCount}</td>
                            <td>
                                <button onClick={() => handleEdit(lesson)}>Edit</button>
                                <button onClick={() => handleDelete(lesson.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
