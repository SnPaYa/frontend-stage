import React from 'react';
import './RecapComponent.css'; // Assurez-vous que votre CSS est importé

function RecapComponent() {
  const recap = [
    { project: "Projet A", hours: 10, status: "Validé" },
    { project: "Projet B", hours: 8, status: "En attente" },
  ];

  return (
    <div className="container">
      <h1>Récapitulatif des Heures</h1>
      <table className="recap-table">
        <thead>
          <tr>
            <th>Projet</th>
            <th>Heures Imputées</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody id="recap-list">
          {recap.map((item, index) => (
            <tr key={index}>
              <td>{item.project}</td>
              <td>{item.hours}</td>
              <td className={item.status === 'Validé' ? 'status-validated' : 'status-pending'}>
                {item.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecapComponent;
