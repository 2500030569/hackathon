
import { useState } from "react";
import {
  Home, Users, Sprout, TrendingUp, Megaphone,
  LogOut, Menu, X, Trash2, PlusCircle
} from "lucide-react";

export default function AdminDashboard({ user, onLogout, t }) {
  const [page, setPage] = useState("Dashboard");
  const [menuOpen, setMenuOpen] = useState(false);

  const [farmers, setFarmers] = useState([
    { id: 1, name: "Ravi Kumar", location: "Guntur" },
    { id: 2, name: "Suresh", location: "Vijayawada" },
    { id: 3, name: "Ramesh", location: "Tenali" },
  ]);

  const [crops, setCrops] = useState([
    "Rice", "Cotton", "Maize", "Chilli", "Wheat", "Sugarcane", "Soybean",
    "Groundnut", "Tomato", "Potato", "Onion", "Banana", "Mango", "Turmeric",
    "Sunflower", "Red Gram", "Green Gram", "Black Gram", "Pearl Millet",
    "Sorghum", "Barley", "Coconut", "Tea", "Coffee"
  ]);

  const [prices, setPrices] = useState([
    { id: 1, crop: "Rice", price: "2369" },
    { id: 2, crop: "Cotton", price: "7710" },
    { id: 3, crop: "Maize", price: "2400" },
    { id: 4, crop: "Chilli", price: "14200" },
    { id: 5, crop: "Wheat", price: "2425" },
    { id: 6, crop: "Sugarcane", price: "3400" },
    { id: 7, crop: "Soybean", price: "4892" },
    { id: 8, crop: "Groundnut", price: "6783" },
    { id: 9, crop: "Tomato", price: "1800" },
    { id: 10, crop: "Potato", price: "1450" },
    { id: 11, crop: "Onion", price: "2100" },
    { id: 12, crop: "Banana", price: "2500" },
    { id: 13, crop: "Mango", price: "5800" },
    { id: 14, crop: "Turmeric", price: "15600" },
    { id: 15, crop: "Sunflower", price: "7250" },
    { id: 16, crop: "Red Gram", price: "7750" },
    { id: 17, crop: "Green Gram", price: "8682" },
    { id: 18, crop: "Black Gram", price: "7740" },
    { id: 19, crop: "Pearl Millet", price: "2500" },
    { id: 20, crop: "Sorghum", price: "3180" },
    { id: 21, crop: "Barley", price: "2220" },
    { id: 22, crop: "Coconut", price: "4100" },
    { id: 23, crop: "Tea", price: "210" },
    { id: 24, crop: "Coffee", price: "18000" },
  ]);

  const [announcements, setAnnouncements] = useState([
    "Check the latest crop market prices.",
    "Use quality seeds for better crop production.",
  ]);

  const [farmerName, setFarmerName] = useState("");
  const [farmerLocation, setFarmerLocation] = useState("");
  const [cropName, setCropName] = useState("");
  const [priceCrop, setPriceCrop] = useState("");
  const [priceValue, setPriceValue] = useState("");
  const [announcement, setAnnouncement] = useState("");

  const menu = [
    { name: "Dashboard", label: t.dashboard, icon: Home },
    { name: "Manage Farmers", label: t.manageFarmers, icon: Users },
    { name: "Manage Crops", label: t.manageCrops, icon: Sprout },
    { name: "Market Prices", label: t.marketPrices, icon: TrendingUp },
    { name: "Announcements", label: t.announcements, icon: Megaphone },
  ];

  function addFarmer(e) {
    e.preventDefault();
    if (!farmerName.trim() || !farmerLocation.trim()) return;

    setFarmers([
      ...farmers,
      {
        id: Date.now(),
        name: farmerName,
        location: farmerLocation,
      },
    ]);

    setFarmerName("");
    setFarmerLocation("");
  }

  function addCrop(e) {
    e.preventDefault();
    if (!cropName.trim()) return;

    setCrops([...crops, cropName]);
    setCropName("");
  }

  function addPrice(e) {
    e.preventDefault();
    if (!priceCrop.trim() || !priceValue.trim()) return;

    setPrices([
      ...prices,
      { id: Date.now(), crop: priceCrop, price: priceValue },
    ]);

    setPriceCrop("");
    setPriceValue("");
  }

  function addAnnouncement(e) {
    e.preventDefault();
    if (!announcement.trim()) return;

    setAnnouncements([...announcements, announcement]);
    setAnnouncement("");
  }

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

        <p className="sidebar-label">ADMIN MENU</p>

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
            <h3>{t.adminDashboard}</h3>
            <p>{t.welcome}, {user.name}!</p>
          </div>
          <div className="profile-icon">👨‍💼</div>
        </header>

        <section className="dashboard-content">
          {page === "Dashboard" && (
            <>
              <div className="welcome-banner">
                <div>
                  <span>ADMINISTRATION PANEL</span>
                  <h1>Welcome, Admin! 🌾</h1>
                  <p>Manage the AGRI FRIEND farming platform.</p>
                </div>
                <div className="banner-emoji">👨‍🌾</div>
              </div>

              <h2 className="section-heading">Platform Overview</h2>

              <div className="stats-grid">
                <div className="stat-card">
                  <span>👨‍🌾</span>
                  <h2>{farmers.length}</h2>
                  <p>Registered Farmers</p>
                </div>
                <div className="stat-card">
                  <span>🌱</span>
                  <h2>{crops.length}</h2>
                  <p>Available Crops</p>
                </div>
                <div className="stat-card">
                  <span>📈</span>
                  <h2>{prices.length}</h2>
                  <p>Market Price Records</p>
                </div>
                <div className="stat-card">
                  <span>📢</span>
                  <h2>{announcements.length}</h2>
                  <p>Announcements</p>
                </div>
              </div>
            </>
          )}

          {page === "Manage Farmers" && (
            <>
              <h1 className="page-heading">👨‍🌾 Manage Farmers</h1>

              <form className="admin-form" onSubmit={addFarmer}>
                <input
                  placeholder="Farmer name"
                  value={farmerName}
                  onChange={(e) => setFarmerName(e.target.value)}
                />
                <input
                  placeholder="Location"
                  value={farmerLocation}
                  onChange={(e) => setFarmerLocation(e.target.value)}
                />
                <button type="submit"><PlusCircle size={17} /> Add Farmer</button>
              </form>

              <div className="admin-list">
                {farmers.map((farmer) => (
                  <div className="admin-list-row" key={farmer.id}>
                    <div>
                      <strong>{farmer.name}</strong>
                      <p>📍 {farmer.location}</p>
                    </div>
                    <button
                      className="delete-button"
                      onClick={() =>
                        setFarmers(farmers.filter((f) => f.id !== farmer.id))
                      }
                      aria-label={`Delete ${farmer.name}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {page === "Manage Crops" && (
            <>
              <h1 className="page-heading">🌱 Manage Crops</h1>

              <form className="admin-form" onSubmit={addCrop}>
                <input
                  placeholder="Enter crop name"
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                />
                <button type="submit"><PlusCircle size={17} /> Add Crop</button>
              </form>

              <div className="admin-list">
                {crops.map((crop, index) => (
                  <div className="admin-list-row" key={`${crop}-${index}`}>
                    <strong>🌿 {crop}</strong>
                    <button
                      className="delete-button"
                      onClick={() => setCrops(crops.filter((_, i) => i !== index))}
                      aria-label={`Delete ${crop}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {page === "Market Prices" && (
            <>
              <h1 className="page-heading">📈 Manage Market Prices</h1>

              <form className="admin-form" onSubmit={addPrice}>
                <input
                  placeholder="Crop name"
                  value={priceCrop}
                  onChange={(e) => setPriceCrop(e.target.value)}
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Price per quintal (₹)"
                  value={priceValue}
                  onChange={(e) => setPriceValue(e.target.value)}
                />
                <button type="submit"><PlusCircle size={17} /> Add Price</button>
              </form>

              <div className="admin-list">
                {prices.map((item) => (
                  <div className="admin-list-row" key={item.id}>
                    <div>
                      <strong>{item.crop}</strong>
                      <p>₹{item.price} per quintal</p>
                    </div>
                    <button
                      className="delete-button"
                      onClick={() => setPrices(prices.filter((p) => p.id !== item.id))}
                      aria-label={`Delete ${item.crop} price`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

          {page === "Announcements" && (
            <>
              <h1 className="page-heading">📢 Announcements</h1>

              <form className="admin-form" onSubmit={addAnnouncement}>
                <input
                  placeholder="Write an announcement"
                  value={announcement}
                  onChange={(e) => setAnnouncement(e.target.value)}
                />
                <button type="submit"><PlusCircle size={17} /> Publish</button>
              </form>

              <div className="admin-list">
                {announcements.map((item, index) => (
                  <div className="admin-list-row" key={index}>
                    <p>{item}</p>
                    <button
                      className="delete-button"
                      onClick={() =>
                        setAnnouncements(
                          announcements.filter((_, i) => i !== index)
                        )
                      }
                      aria-label="Delete announcement"
                    >
                      <Trash2 size={18} />
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
