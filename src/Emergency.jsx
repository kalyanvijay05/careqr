function Emergency({ profile, onBack }) {
  return (
    <div className="emergency-page">

      <div className="emergency-top">
        <button
          className="back-button emergency-back"
          onClick={onBack}
        >
          <span className="back-arrow">←</span> Back
        </button>
      </div>

      <div className="emergency-card">

        <div className="emergency-logo">
          ♥
        </div>

        <h1>CareQR</h1>

        <div className="emergency-badge">
          🚨 EMERGENCY PROFILE
        </div>

        {!profile ? (
          <div className="scan-message">
            <p>No emergency profile was found.</p>
          </div>
        ) : (
          <>
            <h2>{profile.name}</h2>

            {/* Blood Group - Most Important */}
            <div className="blood-group-box">
              <span>Blood Group</span>
              <strong>{profile.bloodGroup || 'Not provided'}</strong>
            </div>

            <div className="emergency-info">

              <div className="emergency-item">
                <span>⚠️ Allergies</span>
                <strong>
                  {profile.allergies || 'None provided'}
                </strong>
              </div>

              <div className="emergency-item">
                <span>🏥 Medical Condition</span>
                <strong>
                  {profile.medicalConditions || 'None provided'}
                </strong>
              </div>

              <div className="emergency-item">
                <span>📞 Emergency Contact</span>
                <strong>
                  {profile.emergencyContact || 'Not provided'}
                </strong>
              </div>

            </div>

            <div className="emergency-notes">
              <span>📝 Emergency Notes</span>
              <p>
                {profile.emergencyNotes || 'No additional notes provided.'}
              </p>
            </div>

            {profile.emergencyContact && (
              <a
                href={`tel:${profile.emergencyContact}`}
                className="emergency-button"
              >
                📞 Call Emergency Contact
              </a>
            )}

            <p className="emergency-disclaimer">
              This information is provided by the profile owner
              for emergency assistance.
            </p>

          </>
        )}

      </div>
    </div>
  );
}

export default Emergency;