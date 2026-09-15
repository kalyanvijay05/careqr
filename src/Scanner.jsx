import { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';

function Scanner({ onScan, onBack }) {
  const onScanRef = useRef(onScan);

  useEffect(() => {
    onScanRef.current = onScan;
  }, [onScan]);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      'qr-reader',
      {
        fps: 15,
        qrbox: {
          width: 280,
          height: 280
        },
        aspectRatio: 1.0,
        rememberLastUsedCamera: true
      },
      false
    );

    const handleScanSuccess = (decodedText) => {
      try {
        if (!decodedText.startsWith('CAREQR|')) {
          alert(
            '⚠️ Invalid QR Code\nPlease scan a valid CareQR emergency code.'
          );
          return;
        }

        const parts = decodedText.split('|');

        const data = {
          name: parts[1] || '',
          bloodGroup: parts[2] || '',
          emergencyContact: parts[3] || '',
          allergies: parts[4] || '',
          medicalConditions: parts[5] || '',
          emergencyNotes: parts[6] || ''
        };

        onScanRef.current(data);
        scanner.clear();
      } catch (error) {
        console.log('Invalid CareQR code');
      }
    };

    const handleScanError = () => {
      // Ignore continuous scanning errors
    };

    scanner.render(handleScanSuccess, handleScanError);

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="scanner-page">

      {/* Back button */}
      <button
        className="scanner-back-button"
        onClick={onBack}
      >
        <span>←</span>
        Back
      </button>

      <div className="scanner-layout">

        {/* =========================
            LEFT — SCANNER
        ========================== */}
        <main className="scanner-main">

          <div className="scanner-heading">
            <span className="scanner-eyebrow">
              SCAN CAREQR
            </span>

            <h1>Scan the QR Code</h1>

            <p>
              Point your camera at a CareQR code to view the
              emergency profile information.
            </p>
          </div>

          <div className="scanner-camera-card">

            <div id="qr-reader"></div>

          </div>

          <div className="scanner-status">
            <span></span>
            Camera scanner ready
          </div>

          <div className="scanner-tip-bottom">
            <span>📷</span>

            <div>
              <strong>Position the QR code inside the frame</strong>
              <small>
                Keep the code steady and make sure it is clearly visible.
              </small>
            </div>
          </div>

        </main>


        {/* =========================
            RIGHT — INFORMATION
        ========================== */}
        <aside className="scanner-sidebar">

          <div className="scanner-why">

            <div className="scanner-why-icon">
              ⌁
            </div>

            <div>
              <span>WHY SCAN?</span>

              <h2>Quick access to essential information.</h2>

              <p>
                CareQR helps you quickly access emergency
                information when it matters most.
              </p>
            </div>

          </div>


          <div className="scanner-info-card">

            <div className="scanner-info-icon">
              👤
            </div>

            <div>
              <strong>View Profile</strong>

              <p>
                Access the person's basic emergency information.
              </p>
            </div>

          </div>


          <div className="scanner-info-card">

            <div className="scanner-info-icon green">
              ♥
            </div>

            <div>
              <strong>Emergency Details</strong>

              <p>
                View blood group, allergies, conditions and
                contact information.
              </p>
            </div>

          </div>


          <div className="scanner-info-card">

            <div className="scanner-info-icon purple">
              🛡
            </div>

            <div>
              <strong>Emergency Focused</strong>

              <p>
                Get important information quickly when every
                second matters.
              </p>
            </div>

          </div>


          <div className="scanner-help">

            <span>ⓘ</span>

            <div>
              <strong>Make sure the QR is clear</strong>

              <p>
                Good lighting and a steady hand help the scanner
                recognize the code faster.
              </p>
            </div>

          </div>

        </aside>

      </div>
    </div>
  );
}

export default Scanner;

