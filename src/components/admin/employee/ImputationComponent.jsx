import React from 'react';
import './ImputationComponent.css'; // Assurez-vous que votre CSS est importé

function ImputationComponent() {
  // Exemple de données, ajustez en fonction de vos besoins
  const imputations = [
    { project: "Projet X", hours: 5 },
    { project: "Projet Y", hours: 7 },
  ];

  return (
    <div className="container">
      <h1>Imputation des Heures</h1>
      <table>
        <thead>
          <tr>
            <th>Projet</th>
            <th>Heures Imputées</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {imputations.map((item, index) => (
            <tr key={index}>
              <td>{item.project}</td>
              <td>{item.hours}</td>
              <td>
                <button>Modifier</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ImputationComponent;
