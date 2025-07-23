import React from 'react';
import './Contador.css';

function Contador({ dias, horas, minutos, segundos }) {
  return (
    <div className="countdown-container"> {/* <--- Esta etiqueta se conecta con el CSS */}
      <div className="countdown-numbers"> {/* <--- Y esta */}
        <div className="countdown-item"> {/* <--- Y esta */}
          <span className="countdown-value">{dias}</span>
          <span className="countdown-label">días</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{horas}</span>
          <span className="countdown-label">hrs</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{minutos}</span>
          <span className="countdown-label">min</span>
        </div>
        <div className="countdown-item">
          <span className="countdown-value">{segundos}</span>
          <span className="countdown-label">seg</span>
        </div>
      </div>
    </div>
  );
}

export default Contador;