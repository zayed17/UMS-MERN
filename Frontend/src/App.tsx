import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./pages/user/HomePage";
import LoginPage from "./pages/user/LoginPage";
import SignupPage from "./pages/user/SignupPage";
import ProfilePage from "./pages/user/ProfilePage";
import AdminLogin from "./pages/admin/AdminLogin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/admin" element={<AdminLogin />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
