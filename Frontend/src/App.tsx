import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import LoginPage from "./screens/LoginPage";
import SignupPage from "./screens/SignupPage";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
