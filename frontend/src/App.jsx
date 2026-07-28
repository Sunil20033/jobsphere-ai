import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import JobList from "./pages/JobList";
import AddJob from "./pages/AddJob";
import EditJob from "./pages/EditJob";

import NotFound from "./pages/NotFound";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="colored"
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/jobs" element={<JobList />} />
        <Route path="/add" element={<AddJob />} />
        <Route path="/edit/:id" element={<EditJob />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;