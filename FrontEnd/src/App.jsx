import { Route, Routes } from "react-router-dom";
import Header from "./Components/Header/Header";
import InstallPrompt from "./InstallPrompt";
import HelmetManager from "./Components/HomePage/pages/HelmetManager";

// 🔒 Protected Route Wrapper
import ProtectedRoute from "./Components/Auth/ProtectedRoute";
import NetworkStatus from "./Components/HomePage/LockWeb/NetworkStatus";
import Lock from "./Components/HomePage/LockWeb/Lock";
import UserSelectNone from "./Components/HomePage/LockWeb/UserSelectNone";

// 🌐 Public Pages
import Home from "./Components/HomePage/Home";
import About from "./Components/HomePage/pages/About/About";
import OurCourses from "./Components/HomePage/pages/Course/OurCourses";
import Branch from "./Components/HomePage/pages/Branch/Branch";
import Gallery from "./Components/HomePage/pages/Gallery";
import AdmissionForm from "./Components/HomePage/pages/AdmissionForm";
import Verification from "./Components/HomePage/pages/Verification/Verification";
import QueryForm from "./Components/HomePage/pages/QueryFrom";
import Offers from "./Components/HomePage/Offers";
import CRepairing from "./Components/HomePage/pages/Course/CRepairing";
import Certificate from "./Components/HomePage/pages/Course/Ceritificate";
import ComputerLanguage from "./Components/HomePage/pages/Course/ComputerLanguage";
import Designing from "./Components/HomePage/pages/Course/Designing";
import WebDev from "./Components/HomePage/pages/Course/WebDev";
import Nielet from "./Components/HomePage/pages/Course/Nielet";
import Banking from "./Components/HomePage/pages/Course/Banking";
import Discription from "./Components/HomePage/pages/Course/Discription";
import Library from "./Components/HomePage/pages/Library/Library";

// 👩‍🎓 Student Pages
import StudentHomePage from "./Components/StudentComponent/StudentHomePage";
import Greating from "./Components/StudentComponent/Greating";
import Default from "./Components/StudentComponent/Default";
import Exam from "./Components/StudentComponent/Exam";

// 👨‍💼 Admin Pages
import AdminPannel from "./Components/Admin/MainAdminPage/AdminPannel";

// 🧭 Fallback
import PageNotFound from "./Components/HomePage/pages/PageNotFound";

export default function App() {
    return (
        <div>
            {/* Optional global components */}
            <NetworkStatus />
            <Lock />
            <UserSelectNone />
            <Header />
            <InstallPrompt />

            <Routes>
                {/* 🌐 Public Routes with Helmet */}
                <Route path="/" element={<HelmetManager><Home /></HelmetManager>} />
                <Route path="/About" element={<HelmetManager><About /></HelmetManager>} />
                <Route path="/OurCourses" element={<HelmetManager><OurCourses /></HelmetManager>} />
                <Route path="/Branch" element={<HelmetManager><Branch /></HelmetManager>} />
                <Route path="/Gallery" element={<HelmetManager><Gallery /></HelmetManager>} />
                <Route path="/AdmissionForm" element={<HelmetManager><AdmissionForm /></HelmetManager>} />
                <Route path="/Download-Certificate" element={<HelmetManager><Verification /></HelmetManager>} />
                <Route path="/Contact-us" element={<HelmetManager><QueryForm /></HelmetManager>} />
                <Route path="/Offers" element={<HelmetManager><Offers /></HelmetManager>} />
                <Route path="/CRepairing" element={<HelmetManager><CRepairing /></HelmetManager>} />
                <Route path="/Certificate" element={<HelmetManager><Certificate /></HelmetManager>} />
                <Route path="/ComputerLanguage" element={<HelmetManager><ComputerLanguage /></HelmetManager>} />
                <Route path="/Designing" element={<HelmetManager><Designing /></HelmetManager>} />
                <Route path="/WebDev" element={<HelmetManager><WebDev /></HelmetManager>} />
                <Route path="/Nielet" element={<HelmetManager><Nielet /></HelmetManager>} />
                <Route path="/Banking" element={<HelmetManager><Banking /></HelmetManager>} />
                <Route path="/Discription" element={<HelmetManager><Discription /></HelmetManager>} />
                <Route path="/Library" element={<HelmetManager><Library /></HelmetManager>} />
                <Route path="/Greating" element={<HelmetManager><Greating /></HelmetManager>} />
                <Route path="/Exam" element={<HelmetManager><Exam /></HelmetManager>} />
                <Route path="/Default" element={<HelmetManager><Default /></HelmetManager>} />

                {/* 🔐 Protected Admin Route */}
                <Route
                    path="/Admin-Pannel/*"
                    element={
                        <ProtectedRoute role="admin" fallback="/">
                            <HelmetManager>
                                <AdminPannel />
                            </HelmetManager>
                        </ProtectedRoute>
                    }
                />

                {/* 🔐 Protected Student Route */}
                <Route
                    path="/Student-Portal/*"
                    element={
                        <ProtectedRoute role="student" fallback="/">
                            <HelmetManager>
                                <StudentHomePage />
                            </HelmetManager>
                        </ProtectedRoute>
                    }
                />


                {/* ❌ 404 Page */}
                <Route path="*" element={<HelmetManager><PageNotFound /></HelmetManager>} />
            </Routes>
        </div>
    );
}
