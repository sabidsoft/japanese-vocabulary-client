import Sidebar from "../../components/sidebar/Sidebar";
import { useState, useEffect } from "react";
import { MoonLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";
import { useCreateLessonMutation } from "../../redux/features/api/endPoints/lessonEndpoint/lessonEndpoint";
import { toast } from "react-toastify";

export default function AddLessons() {
  const navigate = useNavigate();
  const [lessonName, setLessonName] = useState("");
  const [lessonNumber, setLessonNumber] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");

  const [createLesson, { error, isLoading, isSuccess }] = useCreateLessonMutation();

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (lessonNumber === 0) {
      setErrorMessage("Lesson number can't be zero!");
      return;
    }

    if (lessonName && lessonNumber) {
      await createLesson({ lessonName, lessonNumber });
    }
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success("Lesson added successfully!");
      navigate("/dashboard/lessons", { replace: true });
    }

    if (error) {
      if ("status" in error) {
        const errMsgJSONString =
          "error" in error ? error.error : JSON.stringify(error.data);
        const errMsgJSObj = JSON.parse(errMsgJSONString);
        setErrorMessage(errMsgJSObj.message || "Failed to add lesson");
      }
    }
  }, [isSuccess, error, navigate]);

  return (
    <>
      {/* Sidebar */}
      <Sidebar activeMenu="Add Lessons" />

      {/* Main Content */}
      <main className="w-[76%] p-4 mt-2 overflow-y-auto ml-[24%]">
        <h1 className="text-center text-4xl font-bold mb-10">Add Lessons</h1>
        <div className="max-w-lg mx-auto p-6 bg-gray-100 rounded-lg shadow">
          <form onSubmit={handleSubmit}>
            <h3 className="text-center text-2xl font-semibold mb-5">Add a Lesson</h3>
            {/* Lesson Name */}
            <div className="mb-4">
              <label htmlFor="lessonName" className="block text-gray-700 text-sm font-bold mb-2">
                Lesson Name
              </label>
              <input
                type="text"
                id="lessonName"
                value={lessonName}
                onChange={(e) => setLessonName(e.target.value)}
                placeholder="Enter lesson name"
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
                placeholder="Enter lesson number"
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
                "Add Lesson"
              )}
            </button>

            {/* Error message */}
            {errorMessage && (
              <p className="text-red-500 text-center mt-4">{errorMessage}</p>
            )}

            {/* Success message */}
            {isSuccess && (
              <p className="text-green-500 text-center mt-4">Lesson added successfully!</p>
            )}
          </form>
        </div>
      </main>
    </>
  );
}
