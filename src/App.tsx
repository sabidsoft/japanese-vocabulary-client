import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import useInitialAuthCheck from "./hooks/useInitialAuthCheck";
import Loader from "./components/loader/Loader";
import Home from "./pages/home/Home";
import NotFound from "./pages/notFound/NotFound";
import Navbar from "./components/Navbar/Navbar";

export default function App() {
  const initialAuthChecked = useInitialAuthCheck();

  return !initialAuthChecked ? (
    <Loader />
  ) : (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
      
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
