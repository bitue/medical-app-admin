import React, { useState } from 'react';

// PatientDetailsPage.tsx
const PatientDetailsPage: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [patientData, setPatientData] = useState<any>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const handleSearch = async () => {
    if (!email) {
      setError('Please enter a valid email.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`https://www.medical-app.online/patient/find-by-email?email=${email}`);
      const data = await response.json();

      if (data.status) {
        setPatientData(data.data);
        setError('');
      } else {
        setError('Patient not found.');
        setPatientData(null);
      }
    } catch (err) {
      setError('Error fetching patient data.');
      setPatientData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Search Patient Details</h2>

      <div style={styles.inputContainer}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Patient's Email"
          style={styles.inputField}
        />
        <button onClick={handleSearch} style={styles.searchButton} disabled={loading}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div style={styles.error}>{error}</div>}

      {patientData && (
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Patient Information</h3>

          <div style={styles.cardContent}>
            <div style={styles.field}>
              <strong>Username:</strong> {patientData.user.username}
            </div>
            <div style={styles.field}>
              <strong>Email:</strong> {patientData.user.email}
            </div>
            <div style={styles.field}>
              <strong>Role:</strong> {patientData.user.role}
            </div>
            <div style={styles.field}>
              <strong>Account Created At:</strong> {new Date(patientData.user.createdAt).toLocaleString()}
            </div>

            <h4 style={styles.subTitle}>Current Medications:</h4>
            {patientData.currentMedications.length > 0 ? (
              patientData.currentMedications.map((med: any) => (
                <div style={styles.field} key={med.id}>
                  <strong>Medication:</strong> {med.doses.join(', ')}
                  <br />
                  <strong>Start Date:</strong> {new Date(med.startDate).toLocaleDateString()}
                  <br />
                  <strong>End Date:</strong> {new Date(med.endDate).toLocaleDateString()}
                </div>
              ))
            ) : (
              <div style={styles.field}>No current medications available</div>
            )}

            <h4 style={styles.subTitle}>Health Status:</h4>
            <div style={styles.field}>
              <strong>Diabetic Status:</strong> {patientData.healthStatuses[0].diabeticsStatus ? 'Yes' : 'No'}
            </div>
            <div style={styles.field}>
              <strong>Allergy:</strong> {patientData.healthStatuses[0].allergy ? 'Yes' : 'No'}
            </div>
            <div style={styles.field}>
              <strong>Smoking Status:</strong> {patientData.healthStatuses[0].smokingStatus ? 'Yes' : 'No'}
            </div>
            <div style={styles.field}>
              <strong>Exercise:</strong> {patientData.healthStatuses[0].exercise ? 'Yes' : 'No'}
            </div>

            <h4 style={styles.subTitle}>Prescriptions:</h4>
            {patientData.prescriptions.length > 0 ? (
              patientData.prescriptions.map((prescription: any) => (
                <div style={styles.field} key={prescription.id}>
                  <strong>Title:</strong> {prescription.title}
                  <br />
                  <strong>Prescription Date:</strong> {new Date(prescription.prescriptionDate).toLocaleDateString()}
                  <br />
                  <a href={prescription.docPath} target="_blank" rel="noopener noreferrer">
                    View Prescription
                  </a>
                </div>
              ))
            ) : (
              <div style={styles.field}>No prescriptions available</div>
            )}

            <h4 style={styles.subTitle}>Reports:</h4>
            {patientData.reports.length > 0 ? (
              patientData.reports.map((report: any) => (
                <div style={styles.field} key={report.id}>
                  <strong>Title:</strong> {report.title}
                  <br />
                  <strong>Report Date:</strong> {new Date(report.reportDate).toLocaleDateString()}
                  <br />
                  <a href={report.docPath} target="_blank" rel="noopener noreferrer">
                    View Report
                  </a>
                </div>
              ))
            ) : (
              <div style={styles.field}>No reports available</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

// Inline CSS styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    maxWidth: '800px',
    margin: '0 auto',
  },
  heading: {
    textAlign: 'center',
    fontSize: '24px',
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '20px',
  },
  inputField: {
    padding: '10px',
    marginRight: '10px',
    width: '250px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  searchButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
  },
  cardTitle: {
    fontSize: '20px',
    marginBottom: '10px',
    color: '#333',
  },
  subTitle: {
    fontSize: '18px',
    marginTop: '20px',
    color: '#333',
  },
  cardContent: {
    marginTop: '10px',
  },
  field: {
    marginBottom: '8px',
    fontSize: '16px',
  },
};

export default PatientDetailsPage;
