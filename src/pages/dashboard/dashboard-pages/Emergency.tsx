import React from 'react';

const EmergencyPage = () => {
  const cardStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
    padding: '20px',
    textAlign: 'center' ,
    width: '250px',
    margin: '0 auto',
  };

  const headerStyle = {
    backgroundColor: '#e2f0ff',
    borderRadius: '50%',
    padding: '15px',
    display: 'inline-block',
    marginBottom: '15px',
  };

  const titleStyle = {
    fontSize: '20px',
    fontWeight: 'bold',
    color: '#1e3a8a',
  };

  const numberStyle = {
    fontSize: '18px',
    color: '#1e3a8a',
    marginBottom: '15px',
  };

  const buttonStyle = {
    backgroundColor: '#1e40af',
    color: 'white',
    padding: '10px 20px',
    borderRadius: '25px',
    textDecoration: 'none',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '16px',
    cursor: 'pointer',
    border: 'none',
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    height: '100vh',
    backgroundColor: '#f0f9ff',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={headerStyle}>
          {/* SVG Icon for Help */}
          <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 24 24" fill="#1e40af">
            <path d="M11 3h2v10h-2zm0 12h2v2h-2z"/>
          </svg>
        </div>
        <h3 style={titleStyle}>Emergency Service</h3>
        <p style={numberStyle}>112</p>
        <a href="tel:112" style={buttonStyle}>
          {/* SVG Icon for Phone */}
          <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 24 24" fill="white" style={{ marginRight: '8px' }}>
            <path d="M6.62 10.79c.35-.62.79-1.17 1.27-1.62l1.1 1.13c-.67.55-1.2 1.23-1.55 2.01l-.56 1.3c-.1.22-.16.46-.2.69-.08.35-.14.7-.17 1.05.22.3.38.63.51.96l.6 1.31c.35.62.79 1.17 1.27 1.62l1.1-1.13c-.67-.55-1.2-1.23-1.55-2.01l-.56-1.3c-.1-.22-.16-.46-.2-.69-.08-.35-.14-.7-.17-1.05-.22-.3-.38-.63-.51-.96z"/>
          </svg>
          Call Now
        </a>
      </div>
      
      <div style={{ ...cardStyle, marginTop: '30px' }}>
        <div style={headerStyle}>
          {/* SVG Icon for Help */}
          <svg xmlns="http://www.w3.org/2000/svg" height="30" width="30" viewBox="0 0 24 24" fill="#dc2626">
            <path d="M11 3h2v10h-2zm0 12h2v2h-2z"/>
          </svg>
        </div>
        <h3 style={titleStyle}>Emergency Service</h3>
        <p style={numberStyle}>911</p>
        <a href="tel:911" style={buttonStyle}>
          {/* SVG Icon for Phone */}
          <svg xmlns="http://www.w3.org/2000/svg" height="18" width="18" viewBox="0 0 24 24" fill="white" style={{ marginRight: '8px' }}>
            <path d="M6.62 10.79c.35-.62.79-1.17 1.27-1.62l1.1 1.13c-.67.55-1.2 1.23-1.55 2.01l-.56 1.3c-.1.22-.16.46-.2.69-.08.35-.14.7-.17 1.05.22.3.38.63.51.96l.6 1.31c.35.62.79 1.17 1.27 1.62l1.1-1.13c-.67-.55-1.2-1.23-1.55-2.01l-.56-1.3c-.1-.22-.16-.46-.2-.69-.08-.35-.14-.7-.17-1.05-.22-.3-.38-.63-.51-.96z"/>
          </svg>
          Call Now
        </a>
      </div>
    </div>
  );
};

export default EmergencyPage;
