import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useCreateVocabularyMutation } from "../../redux/features/api/endPoints/vocabularyEndpoint/vocabularyEndpoint";
import { useAppSelector } from "../../redux/app/hooks";

export default function AddVocabularies() {
  const navigate = useNavigate();
  const [word, setWord] = useState("");
  const [pronunciation, setPronunciation] = useState("");
  const [meaning, setMeaning] = useState("");
  const [whenToSay, setWhenToSay] = useState("");
  const [lessonNumber, setLessonNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const [createVocabulary, { error, isLoading, isSuccess }] = useCreateVocabularyMutation();
  const adminEmail = useAppSelector(state => state.auth.user?.email);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lessonNumber === 0) {
      setErrorMessage("Lesson number can't be zero!");
      return;
    }

    if (word && pronunciation && meaning && whenToSay && lessonNumber && adminEmail) {
      await createVocabulary({ word, pronunciation, meaning, whenToSay, lessonNumber, adminEmail });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard/lessons", { replace: true });
    }

    if (error) {
      if ("status" in error) {
        const errMsgJSONString =
          "error" in error ? error.error : JSON.stringify(error.data);
        const errMsgJSObj = JSON.parse(errMsgJSONString);
        setErrorMessage(errMsgJSObj.message || "Failed to add vocabulary");
      }
    }
  }, [isSuccess, error, navigate]);

  return (
    <>
      {/* Sidebar */}
      <Sidebar activeMenu="Add Vocabularies" />

      {/* Main Content */}
      <main className="w-[76%] p-4 mt-2 overflow-y-auto ml-[24%]">
        <h1 className="text-center text-4xl font-bold mb-10">Add Vocabularies</h1>
        <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center text-2xl font-semibold mb-5">Add a Vocabulary</h3>

            {/* Word */}
            <div className="mb-4">
              <label htmlFor="word" className="block text-gray-700 text-sm font-bold mb-2">
                Word
              </label>
              <input
                type="text"
                id="word"
                value={word}
                onChange={(e) => setWord(e.target.value)}
                placeholder="Enter the word"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Pronunciation */}
            <div className="mb-4">
              <label htmlFor="pronunciation" className="block text-gray-700 text-sm font-bold mb-2">
                Pronunciation
              </label>
              <input
                type="text"
                id="pronunciation"
                value={pronunciation}
                onChange={(e) => setPronunciation(e.target.value)}
                placeholder="Enter the pronunciation"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Meaning */}
            <div className="mb-4">
              <label htmlFor="meaning" className="block text-gray-700 text-sm font-bold mb-2">
                Meaning
              </label>
              <input
                type="text"
                id="meaning"
                value={meaning}
                onChange={(e) => setMeaning(e.target.value)}
                placeholder="Enter the meaning"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* When to Say */}
            <div className="mb-4">
              <label htmlFor="whenToSay" className="block text-gray-700 text-sm font-bold mb-2">
                When to Say
              </label>
              <textarea
                id="whenToSay"
                value={whenToSay}
                onChange={(e) => setWhenToSay(e.target.value)}
                placeholder="Describe when to say the word"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            {/* Lesson Number */}
            <div className="mb-8">
              <label htmlFor="lessonNumber" className="block text-gray-700 text-sm font-bold mb-2">
                Lesson Number
              </label>
              <input
                type="number"
                id="lessonNumber"
                value={lessonNumber}
                onChange={(e) => setLessonNumber(Number(e.target.value))}
                placeholder="Enter the lesson number"
                required
                className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-600 duration-500"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex justify-center px-4">
                  <MoonLoader color="#fff" size={18} />
                </div>
              ) : (
                "Add Vocabulary"
              )}
            </button>

            {/* Error message */}
            {errorMessage && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}

            {/* Success message */}
            {isSuccess && (
              <p className="text-green-500 text-center mt-4">Vocabulary added successfully!</p>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
