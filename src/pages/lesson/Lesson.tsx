import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Confetti from "react-confetti";
import { useGetVocabulariesByLessonNumberQuery } from "../../redux/features/api/endPoints/vocabularyEndpoint/vocabularyEndpoint";
import { Vocabulary } from "./types";
import Loader from "../../components/loader/Loader";
import ErrorMessage from "../../components/errorMessage/ErrorMessage";
import Footer from "../../components/footer/Footer";

export default function LessonDetailPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const { lessonNumber } = useParams();
    const { data, isError, isLoading } = useGetVocabulariesByLessonNumberQuery(lessonNumber as unknown as number);
    const [currentVocabularyIndex, setCurrentVocabularyIndex] = useState<number>(0);
    const [showConfetti, setShowConfetti] = useState<boolean>(false);
    const [isCompleting, setIsCompleting] = useState<boolean>(false); // New state for disabling button

    const vocabularies = data?.data?.vocabularies;
    const lessonName = location.state?.lessonName;

    // Handle Next and Previous Vocabulary
    const handleNextVocabulary = () => {
        if (vocabularies && currentVocabularyIndex < vocabularies.length - 1) {
            setCurrentVocabularyIndex(currentVocabularyIndex + 1);
        }
    };

    const handlePreviousVocabulary = () => {
        if (currentVocabularyIndex > 0) {
            setCurrentVocabularyIndex(currentVocabularyIndex - 1);
        }
    };

    const handleCompleteLesson = () => {
        setIsCompleting(true); // Disable button
        setShowConfetti(true);
        setTimeout(() => {
            setShowConfetti(false);
            setIsCompleting(false); // Re-enable button
            navigate('/lessons');
        }, 3000);
    };

    const handlePronunciationClick = (vocabulary: Vocabulary) => {
        if ("speechSynthesis" in window) {
            const utterance = new SpeechSynthesisUtterance(vocabulary.pronunciation);
            speechSynthesis.speak(utterance);
        } else {
            alert("Text-to-Speech is not supported in this browser.");
        }
    };

    let content;

    if (isLoading)
        content = <Loader />;

    if (!isLoading && isError)
        content = <ErrorMessage message="Something went wrong." />;

    if (!isLoading && !isError && vocabularies && vocabularies.length === 0)
        content = <ErrorMessage message='Opps! There is no vocabulary available!' />;

    if (!isLoading && !isError && vocabularies && vocabularies.length > 0)
        content =
            <>
                <div className="text-center">
                    {vocabularies.length > 0 && (
                        <>
                            <div className="flex justify-center mb-8">
                                <button
                                    className="flex flex-col items-center p-5 border-2 rounded-lg hover:bg-gray-100 duration-500"
                                    onClick={() => handlePronunciationClick(vocabularies[currentVocabularyIndex])}
                                >
                                    <span className="text-2xl font-bold cursor-pointer mb-1">
                                        {vocabularies[currentVocabularyIndex].word}
                                    </span>
                                    <span>
                                        {vocabularies[currentVocabularyIndex].meaning}
                                    </span>
                                </button>
                            </div>
                            <div className="mb-8">
                                <div className="text-gray-600">
                                    <span className="font-medium text-black">Word: </span>
                                    {vocabularies[currentVocabularyIndex].word}
                                </div>
                                <div className="text-gray-600">
                                    <span className="font-medium text-black">Meaning: </span>
                                    {vocabularies[currentVocabularyIndex].meaning}
                                </div>
                                <div className="text-gray-600">
                                    <span>
                                        <span className="font-medium text-black">Pronunciation: </span>
                                        {vocabularies[currentVocabularyIndex].pronunciation}
                                    </span>
                                    <button
                                        onClick={() => handlePronunciationClick(vocabularies[currentVocabularyIndex])}
                                        className="text-blue-600 hover:text-blue-800 duration-500 font-bold ml-2"
                                    >
                                        (Play)
                                    </button>
                                </div>
                                <div className="text-gray-600">
                                    <span className="font-medium text-black">When to say: </span>
                                    {vocabularies[currentVocabularyIndex].whenToSay}
                                </div>
                            </div>
                        </>
                    )}
                </div >

                <div className="flex justify-center mb-8 gap-5">
                    <button
                        onClick={handlePreviousVocabulary}
                        disabled={currentVocabularyIndex === 0}
                        className={`text-white py-1 px-4 rounded bg-gray-800 hover:bg-gray-600 duration-500 ${currentVocabularyIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        Previous
                    </button>
                    <button
                        onClick={handleNextVocabulary}
                        disabled={currentVocabularyIndex === vocabularies.length - 1}
                        className={`text-white py-1 px-4 rounded bg-gray-800 hover:bg-gray-600 duration-500 ${currentVocabularyIndex === vocabularies.length - 1 ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                    >
                        Next
                    </button>
                </div>

                {
                    currentVocabularyIndex === vocabularies.length - 1 && (
                        <div className="text-center">
                            <button
                                onClick={handleCompleteLesson}
                                className={`bg-green-500 hover:bg-green-600 duration-500 text-white py-3 px-8 rounded-lg ${isCompleting ? "opacity-50 cursor-not-allowed" : ""
                                    }`}
                                disabled={isCompleting} // Disable button during completion
                            >
                                Complete Lesson
                            </button>
                        </div>
                    )
                }
                {showConfetti && <Confetti />}
            </>;

    return (
        <div className="mt-8">
            <h1 className="text-center text-4xl font-bold mb-8">{lessonName}</h1>
            {content}
            <div className="mt-60">
                <Footer />
            </div>
        </div>
    );
}
