import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useInitialAuthCheck from "./hooks/useInitialAuthCheck";
import Loader from "./components/loader/Loader";
import NotFound from "./pages/notFound/NotFound";
import Navbar from "./components/Navbar/Navbar";
import Register from "./pages/register/Register";
import Login from "./pages/login/Login";
import UserRoute from "./components/privateRoute/userRoute/UserRoute";
import Lesson from "./pages/lesson/Lesson";
import Lessons from "./pages/lessons/Lessons";
import LessonsForAdmin from "./pages/lessonsForAdmin/LessonsForAdmin";
import LessonForAdmin from "./pages/lessonForAdmin/LessonForAdmin";
import Tutorials from "./pages/tutorials/Tutorials";
import AdminRoute from "./components/privateRoute/adminRoute/AdminRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import AddLessons from "./pages/addLessons/AddLessons";
import ManageUsers from "./pages/manageUsers/ManageUsers";
import Home from "./pages/home/Home";
import AddVocabularies from "./pages/addVocabularies/AddVocabularies";
import LessonManagement from "./pages/lessonManagement/LessonManagement";
import VocabularyManagement from "./pages/vocabularyManagement/VocabularyManagement";

export default function App() {
  const initialAuthChecked = useInitialAuthCheck();

  return !initialAuthChecked ? (
    <Loader />
  ) : (
    <Router>
      <Navbar />
      <Routes>
        {/* Public Routes */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />

        {/* User Protected Routes */}
        <Route path="/lessons" element={<UserRoute><Lessons /></UserRoute>} />
        <Route path="/lessons/:lessonNumber" element={<UserRoute><Lesson /></UserRoute>} />
        <Route path="/tutorials" element={<UserRoute><Tutorials /></UserRoute>} />

        {/* Admin Protected Routes */}
        <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/dashboard/lessons" element={<AdminRoute><LessonsForAdmin /></AdminRoute>} />
        <Route path="/dashboard/lessons/:lessonNumber" element={<AdminRoute><LessonForAdmin /></AdminRoute>} />
        <Route path="/dashboard" element={<AdminRoute><Dashboard /></AdminRoute>} />
        <Route path="/dashboard/add-lessons" element={<AdminRoute><AddLessons /></AdminRoute>} />
        <Route path="/dashboard/add-vocabularies" element={<AdminRoute><AddVocabularies /></AdminRoute>} />
        <Route path="/dashboard/manage-users" element={<AdminRoute><ManageUsers /></AdminRoute>} />
        <Route path="/dashboard/lesson-management" element={<AdminRoute><LessonManagement /></AdminRoute>} />
        <Route path="/dashboard/vocabulary-management" element={<AdminRoute><VocabularyManagement /></AdminRoute>} />

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
