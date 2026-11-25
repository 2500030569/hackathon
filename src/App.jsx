
import { translations } from "./language";
import { useState } from "react";
import Login from "./pages/Login";
import FarmerDashboard from "./pages/FarmerDashboard";
import AdminDashboard from "./pages/AdminDashboard";

export default function App() {
  const [language, setLanguage] = useState(
    localStorage.getItem("agriLanguage") || ""
  );
  const [user, setUser] = useState(null);
  const t = translations[language] ?? translations.English;

  function handleLogin(name, role) {
    setUser({ name, role });
  }

  function logout() {
    setUser(null);
  }

  if (!language) {
    return (
      <main className="language-screen">
        <div className="language-card">
          <div className="logo-icon">🌾</div>
          <h1>Welcome to AGRI FRIEND</h1>
          <p>Select your preferred language</p>

          {[
            ["English", "English"],
            ["తెలుగు", "Telugu"],
            ["हिन्दी", "Hindi"],
            ["தமிழ்", "Tamil"]
          ].map(([label, value]) => (
            <button
              className="language-option"
              key={value}
              onClick={() => {
                localStorage.setItem("agriLanguage", value);
                setLanguage(value);
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <Login
        language={language}
        onLogin={handleLogin}
        onChangeLanguage={() => {
          localStorage.removeItem("agriLanguage");
          setLanguage("");
        }}
      />
    );
  }

  if (user.role === "admin") {
    return <AdminDashboard user={user} onLogout={logout} t={t} />;
  }

  return (
    <FarmerDashboard
      user={user}
      onLogout={logout}
      t={t}
      language={language}
    />
  );
}
