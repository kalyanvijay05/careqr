import { useEffect, useState } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

function Profile({ onBack }) {
  const [formData, setFormData] = useState({
    name: '',
    bloodGroup: '',
    emergencyContact: '',
    allergies: '',
    medicalConditions: '',
    emergencyNotes: ''
  });

  const [saved, setSaved] = useState(false);
  const [editing, setEditing] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  useEffect(() => {
    const storedProfile = localStorage.getItem('careqrProfile');

    if (storedProfile) {
      setFormData(JSON.parse(storedProfile));
      setSaved(true);
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    localStorage.setItem(
      'careqrProfile',
      JSON.stringify(formData)
    );

    if (editing) {
      setEditing(false);
      setUpdateSuccess(true);

      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    } else {
      setSaved(true);
    }
  };

  /* =====================================================
     EDIT PROFILE
     ===================================================== */

  if (saved && editing) {
    return (
      <div className="profile-page">
        <div className="profile-container">

          <button
            className="back-button"
            onClick={() => setEditing(false)}
          >
            <span className="back-arrow">←</span>
            Cancel
          </button>

          <div className="profile-header">
            <div className="profile-icon">♥</div>

            <span className="profile-eyebrow">
              CAREQR / PROFILE
            </span>

            <h1>Edit Emergency Profile</h1>

            <p>
              Keep your essential emergency information
              accurate and ready when it matters.
            </p>
          </div>

          <form
            className="profile-form"
            onSubmit={handleSubmit}
          >
            <div className="form-section-title">
              Personal information
            </div>

            <div className="form-group">
              <label>Full Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Blood Group</label>

                <select
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                >
                  <option value="">Select blood group</option>
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                </select>
              </div>

              <div className="form-group">
                <label>Emergency Contact Number</label>

                <input
                  type="tel"
                  name="emergencyContact"
                  value={formData.emergencyContact}
                  onChange={handleChange}
                  placeholder="Enter emergency contact number"
                />
              </div>
            </div>

            <div className="form-section-title">
              Medical information
            </div>

            <div className="form-group">
              <label>Allergies</label>

              <input
                type="text"
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                placeholder="Example: Penicillin, peanuts"
              />
            </div>

            <div className="form-group">
              <label>Medical Conditions</label>

              <textarea
                name="medicalConditions"
                value={formData.medicalConditions}
                onChange={handleChange}
                rows="4"
                placeholder="Example: Asthma, diabetes, etc."
              ></textarea>
            </div>

            <div className="form-group">
              <label>Emergency Notes</label>

              <textarea
                name="emergencyNotes"
                value={formData.emergencyNotes}
                onChange={handleChange}
                rows="3"
                placeholder="Any important information for emergency responders"
              ></textarea>
            </div>

            <button
              type="submit"
              className="save-button"
            >
              Save Changes
              <span>→</span>
            </button>
          </form>

          <div className="privacy-note">
            🔒 <strong>Emergency-use information only</strong>

            <p>
              Only share information that may help during an emergency.
              Do not enter sensitive information such as passwords or
              financial details.
            </p>
          </div>

        </div>
      </div>
    );
  }

  /* =====================================================
     SAVED PROFILE
     ===================================================== */

  if (saved) {
    return (
      <div className="profile-page">

        <div className="profile-container">

          <button
            className="back-button"
            onClick={onBack}
          >
            <span className="back-arrow">←</span>
            Back
          </button>

          {updateSuccess && (
            <div className="update-success">
              ✓ Profile updated successfully!
            </div>
          )}

          <div className="profile-dashboard">

            {/* MAIN PROFILE */}

            <div className="saved-profile-card">

              <div className="profile-card-top">
                <div className="saved-profile-logo">
                  ♥
                </div>

                <div>
                  <span className="profile-eyebrow">
                    CAREQR ID
                  </span>

                  <h1>Emergency Profile</h1>

                  <p>
                    Essential information for emergency situations.
                  </p>
                </div>
              </div>

              <div className="profile-status">
                <span></span>
                Emergency profile active
              </div>

              <div className="saved-profile-name">
                {formData.name || 'Unnamed User'}
              </div>

              <div className="profile-info-grid">

                <div className="info-item highlight">
                  <span>🩸 Blood Group</span>
                  <strong>
                    {formData.bloodGroup || 'Not provided'}
                  </strong>
                </div>

                <div className="info-item">
                  <span>⚠️ Allergies</span>
                  <strong>
                    {formData.allergies || 'None provided'}
                  </strong>
                </div>

                <div className="info-item">
                  <span>🏥 Medical Condition</span>
                  <strong>
                    {formData.medicalConditions || 'None provided'}
                  </strong>
                </div>

                <div className="info-item">
                  <span>📞 Emergency Contact</span>
                  <strong>
                    {formData.emergencyContact || 'Not provided'}
                  </strong>
                </div>

              </div>

              <div className="notes-box">
                <span>📝 Emergency Notes</span>

                <p>
                  {formData.emergencyNotes ||
                    'No additional notes provided.'}
                </p>
              </div>

              {/* QR */}

              <div className="qr-section">

                <div className="qr-heading">
                  <div>
                    <span className="profile-eyebrow">
                      EMERGENCY ACCESS
                    </span>

                    <h2>Your CareQR</h2>
                  </div>

                  <span className="qr-live">
                    ● Active
                  </span>
                </div>

                <p>
                  Scan this code to access the emergency profile.
                </p>

                <div className="qr-code">
                  <QRCodeCanvas
                    value={`CAREQR|${formData.name}|${formData.bloodGroup}|${formData.emergencyContact}|${formData.allergies}|${formData.medicalConditions}|${formData.emergencyNotes}`}
                    size={280}
                    level="M"
                  />
                  <button
  className="download-qr-button"
  onClick={() => {
    const canvas = document.querySelector('.qr-code canvas');

    if (!canvas) return;

    const link = document.createElement('a');
    link.download = 'CareQR-Emergency-Code.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  }}
>
  ↓ Download QR Code
</button>
                </div>

                <div className="qr-instructions">
                  <strong>
                    📱 Keep your CareQR accessible
                  </strong>

                  <p>
                    Save or print this QR code for emergency situations.
                  </p>
                </div>

              </div>

            </div>

            {/* SETTINGS */}

            <aside className="profile-settings">

              <div className="settings-header">
                <span className="settings-icon">⚙</span>

                <div>
                  <span className="profile-eyebrow">
                    PROFILE
                  </span>

                  <h2>Settings</h2>
                </div>
              </div>

              <div className="settings-divider"></div>

              <button
                className="settings-item"
                onClick={() => setEditing(true)}
              >
                <span className="settings-item-icon">
                  ✏️
                </span>

                <div>
                  <strong>Edit Profile</strong>
                  <small>Update your information</small>
                </div>

                <span className="settings-arrow">→</span>
              </button>

              <button
                className="settings-item"
                onClick={() => setShowAbout(!showAbout)}
              >
                <span className="settings-item-icon">
                  ℹ️
                </span>

                <div>
                  <strong>About CareQR</strong>
                  <small>Learn about CareQR</small>
                </div>

                <span className="settings-arrow">
                  {showAbout ? '↓' : '→'}
                </span>
              </button>

             {showAbout && (
  <div className="about-panel">
    <div className="about-panel-header">
      <span className="about-panel-icon">♥</span>
      <div>
        <strong>About CareQR</strong>
        <small>Emergency information, made accessible.</small>
      </div>
    </div>

    <p>
      CareQR helps make essential emergency information
      easier to access when someone may not be able to
      speak for themselves.
    </p>

    <p>
      Create your emergency profile, generate your CareQR
      code, and keep it accessible for situations where
      quick information may matter.
    </p>

    <div className="about-features">
      <span>✓ Quick access</span>
      <span>✓ Emergency focused</span>
      <span>✓ Privacy aware</span>
    </div>
  </div>
  
)}

<div className="about-team">
  <span className="about-team-title">OUR TEAM</span>

  <div className="team-member">
    <span className="team-avatar">M</span>
    <div>
      <strong>M. Vijay Kalyan</strong>
      <small>Team Member</small>
    </div>
  </div>

  <div className="team-member">
    <span className="team-avatar">K</span>
    <div>
      <strong>K. Maneesh</strong>
      <small>Team Member</small>
    </div>
  </div>
</div>

              <div className="settings-note">
                <span>🔒</span>

                <div>
                  <strong>Privacy first</strong>

                  <p>
                    Only include information that may help
                    during an emergency.
                  </p>
                </div>
              </div>

            </aside>

          </div>

        </div>
      </div>
    );
  }

  /* =====================================================
     CREATE PROFILE
     ===================================================== */

  return (
    <div className="profile-page">

      <div className="profile-container">

        <button
          className="back-button"
          onClick={onBack}
        >
          <span className="back-arrow">←</span>
          Back
        </button>

        <div className="profile-header">

          <div className="profile-icon">
            ♥
          </div>

          <span className="profile-eyebrow">
            CAREQR / GET STARTED
          </span>

          <h1>Create Emergency Profile</h1>

          <p>
            Add essential information that can help someone
            assist you during an emergency.
          </p>

        </div>

        <form
          className="profile-form"
          onSubmit={handleSubmit}
        >

          <div className="form-section-title">
            Personal information
          </div>

          <div className="form-group">
            <label>Full Name</label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-row">

            <div className="form-group">
              <label>Blood Group</label>

              <select
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
              >
                <option value="">Select blood group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>
            </div>

            <div className="form-group">
              <label>Emergency Contact Number</label>

              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Enter emergency contact number"
              />
            </div>

          </div>

          <div className="form-section-title">
            Medical information
          </div>

          <div className="form-group">
            <label>Allergies</label>

            <input
              type="text"
              name="allergies"
              value={formData.allergies}
              onChange={handleChange}
              placeholder="Example: Penicillin, peanuts"
            />
          </div>

          <div className="form-group">
            <label>Medical Conditions</label>

            <textarea
              name="medicalConditions"
              value={formData.medicalConditions}
              onChange={handleChange}
              rows="4"
              placeholder="Example: Asthma, diabetes, etc."
            ></textarea>
          </div>

          <div className="form-group">
            <label>Emergency Notes</label>

            <textarea
              name="emergencyNotes"
              value={formData.emergencyNotes}
              onChange={handleChange}
              rows="3"
              placeholder="Any important information for emergency responders"
            ></textarea>
          </div>

          <button
            type="submit"
            className="save-button"
          >
            Create Emergency Profile
            <span>→</span>
          </button>

        </form>

        <div className="privacy-note">
          🔒 <strong>Emergency-use information only</strong>

          <p>
            Only share information that may help during an emergency.
            Do not enter sensitive information such as passwords or
            financial details.
          </p>
        </div>

      </div>

    </div>
  );
}

export default Profile;


