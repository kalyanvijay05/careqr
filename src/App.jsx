import { useEffect, useState } from 'react';
import './App.css';
import Profile from './Profile';
import Emergency from './Emergency';
import Scanner from './Scanner';
function App() {

    const [showProfile, setShowProfile] = useState(false);
    const [showEmergency, setShowEmergency] = useState(false);
    const [showScanner, setShowScanner] = useState(false);
    const [scannedProfile, setScannedProfile] = useState(null);
    const [savedProfile, setSavedProfile] = useState(null);

useEffect(() => {
  const storedProfile = localStorage.getItem('careqrProfile');

  if (storedProfile) {
    setSavedProfile(JSON.parse(storedProfile));
  }
}, []);

  if (showProfile) {
    return <Profile onBack={() => setShowProfile(false)} />;
  }

 if (showScanner) {
  return (
    <Scanner
      onBack={() => setShowScanner(false)}
      onScan={(data) => {
        setScannedProfile(data);
        setShowScanner(false);
        setShowEmergency(true);
      }}
    />
  );
}

if (showEmergency) {
  return (
    <Emergency
      profile={scannedProfile}
      onBack={() => {
        setShowEmergency(false);
        setScannedProfile(null);
      }}
    />
  );
}
  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">♥</span>
          Care<span>QR</span>
        </div>

        <button className="nav-button">About</button>
      </nav>

      <main className="hero">
        <div className="hero-content">
          <div className="badge">🏥 HealthTech</div>

          <h1>
            When you can't speak,
            <br />
            <span>CareQR speaks for you.</span>
          </h1>

          <p className="description">
            Your essential emergency medical information,
            available when it matters most.
          </p>

          <div className="buttons">
           {savedProfile ? (
  <button
    className="primary-button"
    onClick={() => setShowProfile(true)}
  >
    View My Emergency Profile
  </button>
) : (
  <button
    className="primary-button"
    onClick={() => setShowProfile(true)}
  >
    Create Emergency Profile
  </button>
)}

{savedProfile && (
  <p className="profile-ready">
    ✅ Emergency profile is ready
  </p>
)}


            <button
  className="secondary-button"
  onClick={() => setShowScanner(true)}
>
  Scan QR
</button>
          </div>

          <div className="features">
            <div className="feature">
              <div className="feature-icon">🩺</div>
              <h3>Emergency Ready</h3>
              <p>Critical information at a glance.</p>
            </div>

            <div className="feature">
              <div className="feature-icon">🔒</div>
              <h3>Privacy Focused</h3>
              <p>Only essential information is shared.</p>
            </div>

            <div className="feature">
              <div className="feature-icon">📱</div>
              <h3>Easy Access</h3>
              <p>Scan a QR code in seconds.</p>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <div className="heart-circle">♥</div>

          <h2>Emergency Profile</h2>

          <div className="info-card">
            <span>🩸</span>
            <div>
              <small>Blood Group</small>
              <strong>B+</strong>
            </div>
          </div>

          <div className="info-card">
            <span>⚠️</span>
            <div>
              <small>Allergies</small>
              <strong>Penicillin</strong>
            </div>
          </div>

          <div className="info-card">
            <span>🏥</span>
            <div>
              <small>Medical Condition</small>
              <strong>Asthma</strong>
            </div>
          </div>

          <div className="emergency-button">
            📞 Call Emergency Contact
          </div>
        </div>
      </main>

      <footer>
        <p>CareQR • Emergency Made Simple</p>
      </footer>
    </div>
  );
}

export default App;
