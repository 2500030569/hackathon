
import { useState } from "react";
import {
  Home, Sprout, CloudSun, TrendingUp, BookOpen,
  Volume2, LogOut, Menu, X, Search, Mic
} from "lucide-react";
import { speechLanguages } from "../language";

const crops = [
  { name: "Rice", icon: "🌾", season: "Kharif", duration: "120–150 days" },
  { name: "Cotton", icon: "🌱", season: "Kharif", duration: "150–180 days" },
  { name: "Maize", icon: "🌽", season: "Kharif", duration: "90–110 days" },
  { name: "Chilli", icon: "🌶️", season: "Rabi", duration: "150–180 days" },
  { name: "Wheat", icon: "🌾", season: "Rabi", duration: "110–130 days" },
  { name: "Sugarcane", icon: "🎋", season: "Year-round", duration: "300–365 days" },
  { name: "Soybean", icon: "🫘", season: "Kharif", duration: "90–120 days" },
  { name: "Groundnut", icon: "🥜", season: "Kharif", duration: "100–130 days" },
  { name: "Tomato", icon: "🍅", season: "Rabi / Summer", duration: "90–120 days" },
  { name: "Potato", icon: "🥔", season: "Rabi", duration: "90–120 days" },
  { name: "Onion", icon: "🧅", season: "Rabi", duration: "120–150 days" },
  { name: "Banana", icon: "🍌", season: "Year-round", duration: "300–365 days" },
  { name: "Mango", icon: "🥭", season: "Kharif planting", duration: "Perennial" },
  { name: "Turmeric", icon: "🟡", season: "Kharif", duration: "210–270 days" },
  { name: "Sunflower", icon: "🌻", season: "Rabi / Kharif", duration: "90–110 days" },
  { name: "Red Gram", icon: "🫘", season: "Kharif", duration: "150–180 days" },
  { name: "Green Gram", icon: "🟢", season: "Kharif / Summer", duration: "60–90 days" },
  { name: "Black Gram", icon: "⚫", season: "Kharif", duration: "70–90 days" },
  { name: "Pearl Millet", icon: "🌾", season: "Kharif", duration: "75–100 days" },
  { name: "Sorghum", icon: "🌾", season: "Kharif / Rabi", duration: "110–130 days" },
  { name: "Barley", icon: "🌾", season: "Rabi", duration: "100–120 days" },
  { name: "Coconut", icon: "🥥", season: "Year-round", duration: "Perennial" },
  { name: "Tea", icon: "🍃", season: "Year-round", duration: "Perennial" },
  { name: "Coffee", icon: "☕", season: "Monsoon planting", duration: "Perennial" },
];

const prices = [
  { crop: "Rice", price: "₹2,369", unit: "per quintal" },
  { crop: "Cotton", price: "₹7,710", unit: "per quintal" },
  { crop: "Maize", price: "₹2,400", unit: "per quintal" },
  { crop: "Chilli", price: "₹14,200", unit: "per quintal" },
  { crop: "Wheat", price: "₹2,425", unit: "per quintal" },
  { crop: "Sugarcane", price: "₹3,400", unit: "per tonne" },
  { crop: "Soybean", price: "₹4,892", unit: "per quintal" },
  { crop: "Groundnut", price: "₹6,783", unit: "per quintal" },
  { crop: "Tomato", price: "₹1,800", unit: "per quintal" },
  { crop: "Potato", price: "₹1,450", unit: "per quintal" },
  { crop: "Onion", price: "₹2,100", unit: "per quintal" },
  { crop: "Banana", price: "₹2,500", unit: "per quintal" },
  { crop: "Mango", price: "₹5,800", unit: "per quintal" },
  { crop: "Turmeric", price: "₹15,600", unit: "per quintal" },
  { crop: "Sunflower", price: "₹7,250", unit: "per quintal" },
  { crop: "Red Gram", price: "₹7,750", unit: "per quintal" },
  { crop: "Green Gram", price: "₹8,682", unit: "per quintal" },
  { crop: "Black Gram", price: "₹7,740", unit: "per quintal" },
  { crop: "Pearl Millet", price: "₹2,500", unit: "per quintal" },
  { crop: "Sorghum", price: "₹3,180", unit: "per quintal" },
  { crop: "Barley", price: "₹2,220", unit: "per quintal" },
  { crop: "Coconut", price: "₹4,100", unit: "per 1,000 nuts" },
  { crop: "Tea", price: "₹210", unit: "per kg" },
  { crop: "Coffee", price: "₹18,000", unit: "per quintal" },
];

export default function FarmerDashboard({ user, onLogout, t, language }) {
  const [page, setPage] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [voiceText, setVoiceText] = useState("");

  const menu = [
    { name: "Dashboard", label: t.dashboard, icon: Home },
    { name: "Crop Guide", label: t.cropGuide, icon: Sprout },
    { name: "Market Prices", label: t.marketPrices, icon: TrendingUp },
    { name: "Weather", label: t.weather, icon: CloudSun },
    { name: "Farming Tips", label: t.farmingTips, icon: BookOpen },
  ];

  function speak(text) {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = speechLanguages[language] ?? "en-IN";
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Speech is not supported in this browser.");
    }
  }

  function listen() {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = speechLanguages[language] ?? "en-IN";
    recognition.onresult = (event) => {
      const result = event.results[0][0].transcript;
      setVoiceText(result);
      setSearch(result);
    };
    recognition.start();
  }

  const filteredCrops = crops.filter((crop) =>
    crop.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="dashboard-layout">
      <aside
        id="app-sidebar"
        className={`sidebar ${menuOpen ? "sidebar-open" : ""}`}
      >
        <div className="sidebar-brand">
          🌾 <span>AGRI FRIEND</span>
          <button
            className="close-menu"
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
          >
            <X />
          </button>
        </div>

        <p className="sidebar-label">FARMER MENU</p>

        {menu.map(({ name, label, icon: Icon }) => (
          <button
            key={name}
            className={`nav-item ${page === name ? "selected" : ""}`}
            onClick={() => {
              setPage(name);
              setMenuOpen(false);
            }}
          >
            <Icon size={19} /> {label}
          </button>
        ))}

        <button className="nav-item logout" onClick={onLogout}>
          <LogOut size={19} /> {t.logout}
        </button>
      </aside>

      <main className="dashboard-main">
        <header className="topbar">
          <button
            className="menu-button"
            type="button"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            aria-controls="app-sidebar"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <Menu />
          </button>
          <div>
            <h3>{t.farmerDashboard}</h3>
            <p>{t.welcome}, {user.name}!</p>
          </div>
          <div className="profile-icon">👨‍🌾</div>
        </header>

        <section className="dashboard-content">
          {page === "Dashboard" && (
            <>
              <div className="welcome-banner">
                <div>
                  <span>YOUR FARMING COMPANION</span>
                  <h1>Welcome, {user.name}! 🌱</h1>
                  <p>Let's make your farming smarter and easier.</p>
                </div>
                <div className="banner-emoji">🚜</div>
              </div>

              <h2 className="section-heading">{t.services}</h2>

              <div className="stats-grid">
                <div className="stat-card">
                  <span>🌾</span>
                  <h2>Crop Guide</h2>
                  <p>Learn about crops</p>
                  <button onClick={() => setPage("Crop Guide")}>Explore →</button>
                </div>
                <div className="stat-card">
                  <span>📈</span>
                  <h2>Market Prices</h2>
                  <p>Check crop prices</p>
                  <button onClick={() => setPage("Market Prices")}>Explore →</button>
                </div>
                <div className="stat-card">
                  <span>🌤️</span>
                  <h2>Weather</h2>
                  <p>Weather information</p>
                  <button onClick={() => setPage("Weather")}>Explore →</button>
                </div>
                <div className="stat-card">
                  <span>📚</span>
                  <h2>Farming Tips</h2>
                  <p>Improve your knowledge</p>
                  <button onClick={() => setPage("Farming Tips")}>Explore →</button>
                </div>
              </div>

              <div className="voice-card">
                <div>
                  <h2>🎙️ {t.voiceAssistant}</h2>
                  <p>Speak or listen to farming information.</p>
                </div>
                <button onClick={() => speak("Welcome to Agri Friend. How can I help you today?")}>
                  <Volume2 size={18} /> {t.listen}
                </button>
                <button onClick={listen}>
                  <Mic size={18} /> {t.speak}
                </button>
                {voiceText && <p className="voice-result">You said: {voiceText}</p>}
              </div>
            </>
          )}

          {page === "Crop Guide" && (
            <>
              <h1 className="page-heading">🌱 Crop Guide</h1>
              <p className="page-description">Find useful information about crops.</p>
              <div className="search-box">
                <Search size={19} />
                <input
                  placeholder={`${t.search}...`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <div className="stats-grid">
                {filteredCrops.map((crop) => (
                  <div className="stat-card" key={crop.name}>
                    <span>{crop.icon}</span>
                    <h2>{crop.name}</h2>
                    <p>Season: {crop.season}</p>
                    <p>Duration: {crop.duration}</p>
                    <button onClick={() => speak(`${crop.name}. Season ${crop.season}. Duration ${crop.duration}.`)}>
                      <Volume2 size={16} /> Listen
                    </button>
                  </div>
                ))}
                {filteredCrops.length === 0 && <p>No crops found.</p>}
              </div>
            </>
          )}

          {page === "Market Prices" && (
            <>
              <h1 className="page-heading">📈 Market Prices</h1>
              <p className="page-description">Indicative mandi prices for demonstration. Confirm with your local market before selling.</p>
              <div className="market-summary">
                <strong>{prices.length} crops</strong>
                <span>Updated: Today</span>
              </div>
              <div className="price-grid">
                {prices.map((item) => (
                  <div className="price-row" key={item.crop}>
                    <div>
                      <strong>{item.crop}</strong>
                      <small>{item.unit}</small>
                    </div>
                    <span className="market-price">{item.price}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {page === "Weather" && (
            <>
              <h1 className="page-heading">🌤️ Weather</h1>
              <p className="page-description">Weather outlook and farming advice for Guntur district.</p>
              <div className="weather-current">
                <div className="weather-main">
                  <span>☀️</span>
                  <div>
                    <small>Guntur, Andhra Pradesh</small>
                    <h2>29°C</h2>
                    <p>Sunny</p>
                  </div>
                </div>
                <div className="weather-details">
                  <div><span>Humidity</span><strong>58%</strong></div>
                  <div><span>Wind</span><strong>12 km/h</strong></div>
                  <div><span>Rain chance</span><strong>10%</strong></div>
                  <div><span>UV index</span><strong>Moderate</strong></div>
                </div>
              </div>
              <h2 className="section-heading">5-Day Forecast</h2>
              <div className="forecast-grid">
                {[
                  ["Today", "☀️", "29° / 20°", "Dry"],
                  ["Wed", "🌤️", "30° / 21°", "Mostly clear"],
                  ["Thu", "🌦️", "28° / 21°", "Light rain"],
                  ["Fri", "⛈️", "27° / 20°", "Thunderstorm"],
                  ["Sat", "🌤️", "29° / 21°", "Partly cloudy"],
                ].map(([day, icon, temp, condition]) => (
                  <div className="forecast-card" key={day}>
                    <strong>{day}</strong>
                    <span>{icon}</span>
                    <b>{temp}</b>
                    <small>{condition}</small>
                  </div>
                ))}
              </div>
              <div className="weather-advice">
                <h2>🌱 Today's Farming Advice</h2>
                <p>Irrigate early in the morning or late evening. Cover sensitive seedlings if thunderstorms arrive later this week.</p>
              </div>
            </>
          )}

          {page === "Farming Tips" && (
            <>
              <h1 className="page-heading">📚 Farming Tips</h1>
              <p className="page-description">Practical guidance for healthier crops and better yields.</p>
              <div className="tip-list">
                {[
                  "Test your soil before choosing a crop.",
                  "Use quality seeds from reliable sources.",
                  "Monitor crops regularly for pests and diseases.",
                  "Use water efficiently and avoid unnecessary irrigation.",
                  "Follow crop rotation to maintain soil fertility.",
                  "Apply fertilizer only after a soil test and use the recommended dose.",
                  "Mulch around plants to conserve soil moisture and control weeds.",
                  "Remove weeds early before they compete with crops.",
                  "Inspect the undersides of leaves for pests.",
                  "Clean tools and equipment before moving between fields.",
                  "Store harvested produce in dry, well-ventilated areas.",
                  "Keep farm records for sowing, inputs, irrigation, and harvest.",
                  "Use integrated pest management and avoid repeated pesticide spraying.",
                  "Protect beneficial insects such as bees and ladybugs.",
                  "Drain standing water to prevent fungal diseases.",
                  "Check weather forecasts before spraying or irrigation.",
                  "Use drip or sprinkler irrigation where suitable.",
                  "Harvest at the correct maturity stage for better market value.",
                  "Follow local agricultural department advice."
                ].map((tip, index) => (
                  <div className="tip-item" key={index}>
                    <span>🌿</span>
                    <p>{tip}</p>
                    <button onClick={() => speak(tip)} aria-label="Listen to tip">
                      <Volume2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    </div>
  );
}
