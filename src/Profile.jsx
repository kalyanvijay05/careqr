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
if (saved && editing) {
  return (
    <div className="profile-page">
      <div className="profile-container">

        <button
          className="back-button"
          onClick={() => setEditing(false)}
        >
          <span className="back-arrow">←</span> Cancel
        </button>

        <div className="profile-header">
          <div className="profile-icon">♥</div>

          <h1>Edit Emergency Profile</h1>

          <p>
            Update your emergency information below.
          </p>
        </div>

        <form
          className="profile-form"
          onSubmit={handleSubmit}
        >

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
              <label>Emergency Contact</label>

              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>

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
            Update Emergency Profile
          </button>

        </form>

      </div>
    </div>
  );
}

  if (saved) {
    return (
      <div className="profile-page">
        <div className="saved-profile-container">

          <button className="back-button" onClick={onBack}>
            <span className="back-arrow">←</span> Back
          </button>

          <div className="saved-profile-card">
            {updateSuccess && (
  <div className="update-success">
    ✅ Profile updated successfully!
  </div>
)}
            <button
  className="edit-profile-button"
  onClick={() => setEditing(true)}
>
  ✏️ Edit Profile
</button>

            <div className="saved-profile-logo">
              ♥
            </div>

            <h1>CareQR</h1>

            <p className="saved-profile-title">
              Emergency Profile
            </p>

            <div className="saved-profile-name">
              {formData.name || 'Unnamed User'}
            </div>

            <div className="info-item">
              <span>Blood Group</span>
              <strong>{formData.bloodGroup || 'Not provided'}</strong>
            </div>

            <div className="info-item">
              <span>Allergies</span>
              <strong>{formData.allergies || 'None provided'}</strong>
            </div>

            <div className="info-item">
              <span>Medical Condition</span>
              <strong>
                {formData.medicalConditions || 'None provided'}
              </strong>
            </div>

            <div className="info-item">
              <span>Emergency Contact</span>
              <strong>
                {formData.emergencyContact || 'Not provided'}
              </strong>
            </div>

            <div className="notes-box">
              <span>Emergency Notes</span>
              <p>
                {formData.emergencyNotes || 'No additional notes.'}
              </p>
            </div>

            <div className="qr-section">
  <h2>Your Emergency QR</h2>

  <p>
    Scan this QR code to access the emergency profile.
  </p>

  <div className="qr-code">
   <QRCodeCanvas
  value={`CAREQR|${formData.name}|${formData.bloodGroup}|${formData.emergencyContact}|${formData.allergies}|${formData.medicalConditions}|${formData.emergencyNotes}`}
  size={280}
  level="M"
/>
  </div>

 <div className="qr-instructions">
  <strong>📱 Your CareQR is ready</strong>
  <p>
    Save or print this QR code and keep it accessible
    for emergency situations.
  </p>
</div>
</div>

          </div>

        </div>
      </div>
    );
  }

  return (
    
  <div className="profile-page">
    <div className="profile-container"></div>

        <button className="back-button" onClick={onBack}>
          <span className="back-arrow">←</span> Back
        </button>

        <div className="profile-header">
          <div className="profile-icon">♥</div>

          <h1>Create Emergency Profile</h1>

          <p>
            Add important information that can help someone assist you
            during an emergency.
          </p>
        </div>

        <form
          className="profile-form"
          onSubmit={handleSubmit}
        >

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
              <label>Emergency Contact</label>

              <input
                type="tel"
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                placeholder="Phone number"
              />
            </div>

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
            Save Emergency Profile
          </button>

        </form>

       <div className="privacy-note">
  🔒 <strong>Emergency-use information only</strong>
      <p>
        Only share information that may help during an emergency.
        Do not enter sensitive information such as passwords or financial details.
      </p>
    </div>
  </div>
);

}

export default Profile
