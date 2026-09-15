function Emergency({ profile, onBack }) {
  return (
    <div className="emergency-page">
      <div className="emergency-layout">

        {/* =========================
            MAIN EMERGENCY PROFILE
        ========================== */}
        <main className="emergency-main">

          <button
            className="emergency-back-button"
            onClick={onBack}
          >
            <span>←</span>
            Back to Scanner
          </button>

          {!profile ? (
            <div className="emergency-empty">
              <div className="emergency-empty-icon">⚠</div>
              <h1>No Emergency Profile Found</h1>
              <p>
                The scanned QR code does not contain a valid
                CareQR emergency profile.
              </p>

              <button
                className="emergency-primary-button"
                onClick={onBack}
              >
                ← Back to Scanner
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="emergency-header">

                <div>
                  <div className="emergency-title-row">
                    <span className="emergency-badge">
                      ⚠ EMERGENCY PROFILE
                    </span>

                    <span className="profile-found-badge">
                      <span></span>
                      Profile Found
                    </span>
                  </div>

                  <h1>{profile.name || 'Unnamed User'}</h1>

                  <p>
                    Essential medical information for emergency
                    responders.
                  </p>
                </div>

              </div>

              {/* Main Information */}
              <section className="emergency-primary-info">

                <div className="emergency-person-icon">
                  👤
                </div>

                <div className="emergency-primary-item blood">
                  <span>🩸</span>
                  <small>Blood Group</small>
                  <strong>
                    {profile.bloodGroup || 'Not provided'}
                  </strong>
                </div>

                <div className="emergency-primary-item">
                  <span>⚠️</span>
                  <small>Allergies</small>
                  <strong>
                    {profile.allergies || 'None provided'}
                  </strong>
                </div>

                <div className="emergency-primary-item">
                  <span>📞</span>
                  <small>Emergency Contact</small>
                  <strong>
                    {profile.emergencyContact || 'Not provided'}
                  </strong>
                </div>

              </section>

              {/* Medical Cards */}
              <section className="emergency-info-grid">

                <div className="emergency-detail-card">
                  <div className="emergency-detail-icon">
                    🏥
                  </div>

                  <div>
                    <span>Medical Conditions</span>
                    <strong>
                      {profile.medicalConditions ||
                        'None provided'}
                    </strong>
                  </div>
                </div>

                <div className="emergency-detail-card">
                  <div className="emergency-detail-icon">
                    ⚠️
                  </div>

                  <div>
                    <span>Allergies</span>
                    <strong>
                      {profile.allergies ||
                        'None provided'}
                    </strong>
                  </div>
                </div>

              </section>

              {/* Emergency Notes */}
              <section className="emergency-notes-card">

                <div className="emergency-detail-icon">
                  📝
                </div>

                <div>
                  <span>Emergency Notes</span>

                  <p>
                    {profile.emergencyNotes ||
                      'No additional notes provided.'}
                  </p>
                </div>

              </section>

              {/* Call Button */}
              {profile.emergencyContact && (
                <a
                  href={`tel:${profile.emergencyContact}`}
                  className="emergency-call-button"
                >
                  <span>📞</span>

                  <div>
                    <strong>Call Emergency Contact</strong>
                    <small>
                      {profile.emergencyContact}
                    </small>
                  </div>

                  <span className="call-arrow">→</span>
                </a>
              )}

              {/* Disclaimer */}
              <div className="emergency-disclaimer-box">
                <span>🔒</span>

                <div>
                  <strong>Emergency use only</strong>

                  <p>
                    This information is provided by the profile
                    owner for emergency assistance. Please use
                    it responsibly.
                  </p>
                </div>
              </div>

            </>
          )}

        </main>


        {/* =========================
            RIGHT SIDEBAR
        ========================== */}
        {profile && (
          <aside className="emergency-sidebar">

            {/* Emergency Notice */}
            <div className="emergency-notice">

              <div className="notice-icon">
                🚨
              </div>

              <div>
                <strong>Emergency Information</strong>

                <p>
                  This person's medical information is
                  available. Please use it responsibly.
                </p>
              </div>

            </div>


            {/* Quick Actions */}
            <div className="quick-actions">

              <div className="quick-actions-header">
                <span>⚡</span>
                <h2>Quick Actions</h2>
              </div>


              {profile.emergencyContact && (
                <a
                  href={`tel:${profile.emergencyContact}`}
                  className="quick-action"
                >
                  <div className="quick-action-icon">
                    📞
                  </div>

                  <div>
                    <strong>Call Emergency Contact</strong>
                    <small>
                      {profile.emergencyContact}
                    </small>
                  </div>

                  <span>→</span>
                </a>
              )}


              <div className="quick-action">
                <div className="quick-action-icon">
                  👤
                </div>

                <div>
                  <strong>View Full Profile</strong>
                  <small>
                    Complete emergency information
                  </small>
                </div>

                <span>✓</span>
              </div>


              <div className="quick-action">
                <div className="quick-action-icon">
                  🛡
                </div>

                <div>
                  <strong>CareQR Verified</strong>
                  <small>
                    Valid CareQR emergency code
                  </small>
                </div>

                <span>✓</span>
              </div>

            </div>


            {/* Important Box */}
            <div className="emergency-important">

              <div className="important-icon">
                🛡
              </div>

              <div>
                <strong>Important</strong>

                <p>
                  This information is provided for emergency
                  use only. Contact the person's emergency
                  contact or healthcare provider for additional
                  details.
                </p>
              </div>

            </div>

          </aside>
        )}

      </div>
    </div>
  );
}

export default Emergency;


