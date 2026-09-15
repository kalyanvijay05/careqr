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
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo">
          <span className="logo-icon">♥</span>
          Care<span>QR</span>
        </div>

        <div className="nav-links">
          <button className="nav-link">About</button>

          <button
            className="nav-profile"
            onClick={() => setShowProfile(true)}
          >
            {savedProfile ? 'My Profile' : 'Get Started'}
            <span>→</span>
          </button>
        </div>
      </nav>

      {/* Hero */}
      <main className="hero">
        <section className="hero-content">
          <div className="badge">
            <span className="badge-dot"></span>
            HealthTech • Emergency Access
          </div>

          <h1>
            When every second
            <br />
            <span>matters.</span>
          </h1>

          <p className="description">
            CareQR gives emergency responders instant access to
            essential medical information when you may not be able
            to speak for yourself.
          </p>

          <div className="buttons">
            <button
              className="primary-button"
              onClick={() => setShowProfile(true)}
            >
              {savedProfile
                ? 'View My Emergency Profile'
                : 'Create Emergency Profile'}
              <span>→</span>
            </button>

            <button
              className="secondary-button"
              onClick={() => setShowScanner(true)}
            >
              <span className="scan-icon">⌁</span>
              Scan CareQR
            </button>
          </div>

          {savedProfile && (
            <div className="profile-ready">
              <span>✓</span>
              Your emergency profile is ready
            </div>
          )}

          {/* Trust points */}
          <div className="trust-row">
            <div>
              <strong>01</strong>
              <span>Quick access</span>
            </div>

            <div>
              <strong>02</strong>
              <span>Essential info</span>
            </div>

            <div>
              <strong>03</strong>
              <span>Emergency focused</span>
            </div>
          </div>
        </section>

        {/* Emergency Preview */}
        <section className="hero-visual">
          <div className="visual-glow"></div>

          <div className="emergency-preview">
            <div className="preview-top">
              <div>
                <span className="preview-label">CAREQR ID</span>
                <h2>Emergency Profile</h2>
              </div>

              <div className="status-dot">
                <span></span>
                Active
              </div>
            </div>

            <div className="preview-person">
              <div className="person-avatar">VK</div>

              <div>
                <span>PROFILE OWNER</span>
                <strong>Emergency Ready</strong>
              </div>
            </div>

            <div className="medical-grid">
              <div className="medical-item blood">
                <span>🩸</span>
                <small>Blood Group</small>
                <strong>B+</strong>
              </div>

              <div className="medical-item">
                <span>⚠️</span>
                <small>Allergies</small>
                <strong>Penicillin</strong>
              </div>

              <div className="medical-item wide">
                <span>🏥</span>
                <div>
                  <small>Medical Condition</small>
                  <strong>Asthma</strong>
                </div>
              </div>
            </div>

            <div className="preview-footer">
              <span>Emergency information</span>
              <strong>Available instantly</strong>
            </div>
          </div>

          <div className="floating-card floating-one">
            <span>✓</span>
            <div>
              <strong>Emergency Ready</strong>
              <small>Profile available</small>
            </div>
          </div>

          <div className="floating-card floating-two">
            <span>⌁</span>
            <div>
              <strong>Scan & Access</strong>
              <small>In seconds</small>
            </div>
          </div>
        </section>
      </main>

      {/* Features */}
      <section className="features-section">
        <div className="section-heading">
          <span>WHY CAREQR</span>
          <h2>Designed for the moment<br />you need it most.</h2>
        </div>

        <div className="features">
          <div className="feature">
            <div className="feature-number">01</div>
            <div className="feature-icon">⚡</div>
            <h3>Instant Access</h3>
            <p>
              Scan a CareQR code and reach essential emergency
              information quickly.
            </p>
          </div>

          <div className="feature">
            <div className="feature-number">02</div>
            <div className="feature-icon">🛡</div>
            <h3>Privacy Focused</h3>
            <p>
              Share only the information that can help during
              an emergency.
            </p>
          </div>

          <div className="feature">
            <div className="feature-number">03</div>
            <div className="feature-icon">♥</div>
            <h3>Human First</h3>
            <p>
              Built around a simple idea: critical information
              should be easy to access when words aren't.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="logo">
          <span className="logo-icon">♥</span>
          Care<span>QR</span>
        </div>

        <p>Emergency information. When it matters.</p>
      </footer>
    </div>
  );
}

export default App;

