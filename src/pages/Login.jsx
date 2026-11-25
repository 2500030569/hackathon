
import { useState } from "react";
import { Sprout, User, ShieldCheck } from "lucide-react";

export default function Login({ language, onLogin, onChangeLanguage }) {
  const [role, setRole] = useState("farmer");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function submit(e) {
    e.preventDefault();

    if (!name.trim() || !password.trim()) {
      alert("Please enter your name and password");
      return;
    }

    onLogin(name, role);
  }

  return (
    <div className="login-page">
      <section className="login-art">
        <div className="brand">
          <Sprout size={35} />
          <span>AGRI FRIEND</span>
        </div>

        <div className="art-content">
          <span className="eyebrow">SMART FARMING PLATFORM</span>
          <h1>Grow Better.<br />Live Better.</h1>
          <p>
            Your farming companion for crop knowledge,
            market information and smarter agriculture.
          </p>
          <div className="art-emoji">🌱 🌾 🚜</div>
        </div>

        <p className="art-footer">Smart Farming, Better Future</p>
      </section>

      <section className="login-form-area">
        <div className="login-card">
          <button className="change-language" onClick={onChangeLanguage}>
            🌐 {language} · Change
          </button>

          <h2>Welcome Back!</h2>
          <p className="muted">Login to continue to AGRI FRIEND</p>

          <div className="role-selector">
            <button
              className={role === "farmer" ? "role active" : "role"}
              onClick={() => setRole("farmer")}
              type="button"
            >
              <User size={19} /> Farmer
            </button>

            <button
              className={role === "admin" ? "role active" : "role"}
              onClick={() => setRole("admin")}
              type="button"
            >
              <ShieldCheck size={19} /> Admin
            </button>
          </div>

          <form onSubmit={submit}>
            <label>Name</label>
            <input
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-button" type="submit">
              Login as {role === "farmer" ? "Farmer" : "Admin"} →
            </button>
          </form>

          <p className="login-note">
            College project demonstration · Frontend demo login
          </p>
        </div>
      </section>
    </div>
  );
}
