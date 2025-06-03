import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import SigninPage from "./components/pages/SigninPage";
import SignupPage from "./components/pages/SignupPage";
import ManagerDashboard from "./components/pages/ManagerDashboard";
import EngineerDashboard from "./components/pages/EngineerDashboard";
import { useAuth } from "./context/AuthContext"

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { user } = useAuth();
  if (!user) {
    return <SigninPage />;
  }
  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/manager"
            element={
              <ProtectedRoute>
                <ManagerDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="/engineer"
            element={
              <ProtectedRoute>
                <EngineerDashboard />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<SigninPage />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
