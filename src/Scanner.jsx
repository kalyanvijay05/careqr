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
          width: 300,
          height: 300
        },
        aspectRatio: 1.0,
        rememberLastUsedCamera: true
      },
      false
    );

    const handleScanSuccess = (decodedText) => {
      try {
       if (!decodedText.startsWith('CAREQR|')) {
  alert('⚠️ Invalid QR Code\nPlease scan a valid CareQR emergency code.');
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
      // Ignore scanning errors
    };

    scanner.render(handleScanSuccess, handleScanError);

    return () => {
      scanner.clear().catch(() => {});
    };
  }, []);

  return (
    <div className="scanner-container">

      <button
        className="back-button scanner-back"
        onClick={onBack}
      >
        <span className="back-arrow">←</span> Back
      </button>

      <h2>Scan CareQR</h2>

      <p>
  Allow camera access and scan an emergency QR code.
</p>

<div className="scanner-tip">
  <span>📷</span>
  <strong>Scanning for CareQR...</strong>
  <small>
    Position the QR code inside the camera frame.
  </small>
</div>
      <div id="qr-reader"></div>

    </div>
  );
}

export default Scanner;