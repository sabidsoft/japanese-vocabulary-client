import { useState, useEffect, ChangeEvent } from "react";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import { MoonLoader } from "react-spinners";
import Sidebar from "../../components/sidebar/Sidebar";
import { toast } from "react-toastify";
import {
    useCreateVocabularyMutation,
    useDeleteVocabularyMutation,
    useGetVocabulariesQuery,
    useUpdateVocabularyMutation
} from "../../redux/features/api/endPoints/vocabularyEndpoint/vocabularyEndpoint";
import { useAppSelector } from "../../redux/app/hooks";

// Define TypeScript types
interface Vocabulary {
    _id: string;
    word: string;
    pronunciation: string;
    meaning: string;
    whenToSay: string;
    lessonNumber: number;
    adminEmail: string;
}

interface FormData {
    id: string;
    word: string;
    pronunciation: string;
    meaning: string;
    whenToSay: string;
    lessonNumber: number;
    adminEmail: string;
}

export default function VocabularyManagement() {
    const user = useAppSelector(state => state.auth.user);
    const { data, isLoading: vocabIsLoading, isError } = useGetVocabulariesQuery();
    const [createVocabulary, { isLoading: createVocabIsLoading, error: createError }] = useCreateVocabularyMutation();
    const [updateVocabulary, { isLoading: updateVocabIsLoading, error: updateError }] = useUpdateVocabularyMutation();
    const [deleteVocabulary, { isLoading: deleteVocabIsLoading, error: deleteError }] = useDeleteVocabularyMutation();

    const [formData, setFormData] = useState<FormData>({
        id: "",
        word: "",
        pronunciation: "",
        meaning: "",
        whenToSay: "",
        lessonNumber: 0,
        adminEmail: ""
    });

    const [isEditing, setIsEditing] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [filterLesson, setFilterLesson] = useState(0);
    const [errorMessage, setErrorMessage] = useState("");

    const vocabularies = data?.data?.vocabularies || [];
    const filteredVocabularies = filterLesson
        ? vocabularies.filter((vocab: any) => vocab.lessonNumber === filterLesson)
        : vocabularies;

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleCreateOrUpdate = async () => {
        const apiData = {
            _id: formData.id || undefined,
            word: formData.word,
            pronunciation: formData.pronunciation,
            meaning: formData.meaning,
            whenToSay: formData.whenToSay,
            lessonNumber: formData.lessonNumber,
            adminEmail: user?.email
        };

        try {
            if (isEditing) {
                await updateVocabulary(apiData).unwrap();
                toast.success("Vocabulary updated successfully!");
                setErrorMessage("");
            } else {
                await createVocabulary(apiData).unwrap();
                toast.success("Vocabulary created successfully!");
                setErrorMessage("");
            }
            setShowModal(false);
            setFormData({ id: "", word: "", pronunciation: "", meaning: "", whenToSay: "", lessonNumber: 0, adminEmail: "" });
        } catch (error) {
            toast.error("An error occurred while saving the vocabulary.");
        }
    };

    const handleEdit = (vocab: Vocabulary) => {
        setFormData({
            id: vocab._id,
            word: vocab.word,
            pronunciation: vocab.pronunciation,
            meaning: vocab.meaning,
            whenToSay: vocab.whenToSay,
            lessonNumber: vocab.lessonNumber,
            adminEmail: vocab.adminEmail
        });
        setIsEditing(true);
        setShowModal(true);
    };

    const handleDelete = async (id: string) => {
        if (window.confirm("Are you sure you want to delete this vocabulary?")) {
            try {
                await deleteVocabulary(id).unwrap();
                toast.success("Vocabulary deleted successfully!");
            } catch (error) {
                toast.error("An error occurred while deleting the vocabulary.");
            }
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setFormData({ id: "", word: "", pronunciation: "", meaning: "", whenToSay: "", lessonNumber: 0, adminEmail: "" });
        setIsEditing(false);
        setErrorMessage("");
    };

    useEffect(() => {
        const handleError = (error: any, defaultMsg: string) => {
            if (error && "status" in error) {
                const errMsgJSONString = "error" in error ? error.error : JSON.stringify(error.data);
                const errMsgJSObj = JSON.parse(errMsgJSONString);
                setErrorMessage(errMsgJSObj.message || defaultMsg);
            }
        };

        handleError(createError, "Failed to add vocabulary");
        handleError(updateError, "Failed to update vocabulary");
        handleError(deleteError, "Failed to delete vocabulary");
    }, [createError, updateError, deleteError]);

    let content;

    if (vocabIsLoading || deleteVocabIsLoading) {
        content = <Loader />;
    } else if (isError) {
        content = <ErrorMessage message="Failed to load vocabularies. Please try again." />;
    } else if (filteredVocabularies.length === 0) {
        content = <ErrorMessage message="No vocabularies available. Add a new vocabulary to get started!" />;
    } else {
        content = (
            <div>
                <h2 className="text-xl text-center font-bold mb-4">All Vocabularies</h2>
                <table className="w-full border-collapse border border-gray-200">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border border-gray-300 p-2">Word</th>
                            <th className="border border-gray-300 p-2">Pronunciation</th>
                            <th className="border border-gray-300 p-2">Meaning</th>
                            <th className="border border-gray-300 p-2">When to Say</th>
                            <th className="border border-gray-300 p-2">Lesson No</th>
                            <th className="border border-gray-300 p-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredVocabularies.map((vocab: any) => (
                            <tr key={vocab._id} className="hover:bg-gray-50 text-center">
                                <td className="border border-gray-300 p-2">{vocab.word}</td>
                                <td className="border border-gray-300 p-2">{vocab.pronunciation}</td>
                                <td className="border border-gray-300 p-2">{vocab.meaning}</td>
                                <td className="border border-gray-300 p-2">{vocab.whenToSay}</td>
                                <td className="border border-gray-300 p-2">{vocab.lessonNumber}</td>
                                <td className="border border-gray-300 p-2 flex justify-center gap-2">
                                    <button
                                        onClick={() => handleEdit(vocab)}
                                        className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(vocab._id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                        disabled={deleteVocabIsLoading}
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
            <Sidebar activeMenu="Vocabulary Management" />
            <main className="w-[76%] p-4 mt-2 overflow-y-auto ml-[24%]">
                <div className="flex flex-col items-center mb-10">
                    <h1 className="text-center text-4xl font-bold mb-10">Vocabulary Management</h1>

                    <div className="w-[100%] flex items-center justify-between px-0 md:px-5 lg:px-10 mb-8">
                        <div className="w-[150px] mr-5 md:mr-0">
                            <label htmlFor="filter-lesson" className="block mb-2 font-medium">Filter by Lesson No:</label>
                            <input
                                id="filter-lesson"
                                type="number"
                                value={filterLesson}
                                onChange={(e) => setFilterLesson(parseInt(e.target.value))}
                                className="w-full px-4 py-2 border rounded"
                            />
                        </div>
                        <button
                            onClick={() => setShowModal(true)}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                        >
                            Add New Vocabulary
                        </button>
                    </div>
                    <div className="w-[100%] px-0 md:px-5 lg:px-10">{content}</div>

                    {showModal && (
                        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                            <div className="bg-white w-[90%] md:w-[50%] lg:w-[40%] p-6 rounded shadow-lg">
                                <h2 className="text-xl text-center font-bold mb-4">
                                    {isEditing ? "Edit Vocabulary" : "Create Vocabulary"}
                                </h2>
                                <div className="mb-4">
                                    <label htmlFor="modal-word" className="block mb-2 font-medium">Word</label>
                                    <input
                                        id="modal-word"
                                        type="text"
                                        name="word"
                                        value={formData.word}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="modal-pronunciation" className="block mb-2 font-medium">Pronunciation</label>
                                    <input
                                        id="modal-pronunciation"
                                        type="text"
                                        name="pronunciation"
                                        value={formData.pronunciation}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="modal-meaning" className="block mb-2 font-medium">Meaning</label>
                                    <input
                                        id="modal-meaning"
                                        type="text"
                                        name="meaning"
                                        value={formData.meaning}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="modal-whenToSay" className="block mb-2 font-medium">When to Say</label>
                                    <input
                                        id="modal-whenToSay"
                                        type="text"
                                        name="whenToSay"
                                        value={formData.whenToSay}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded"
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="modal-lessonNumber" className="block mb-2 font-medium">Lesson No</label>
                                    <input
                                        id="modal-lessonNumber"
                                        type="number"
                                        name="lessonNumber"
                                        value={formData.lessonNumber}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 border rounded"
                                    />
                                </div>
                                <div className="flex justify-end gap-4">
                                    <button
                                        onClick={handleCloseModal}
                                        className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
                                        disabled={updateVocabIsLoading || createVocabIsLoading}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleCreateOrUpdate}
                                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                                    >
                                        {isEditing ?
                                            (updateVocabIsLoading ? <div className='flex justify-center px-4'><MoonLoader color="#fff" size={18} /> </div> : "Save Changes") :
                                            (createVocabIsLoading ? <div className='flex justify-center px-4'><MoonLoader color="#fff" size={18} /> </div> : "Create Vocabulary")}
                                    </button>
                                </div>
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
