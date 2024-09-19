// server.js
const express = require('express');
const app = express();
const port = 8085;

// Exemple de données d'employés
const employees = [
  { id: 1200, firstName: 'aya', lastName: 'mg', email: 'aya12@example.com' },
  { id: 1210, firstName: 'hiba', lastName: 'hg', email: 'hiba2@example.com' },
];

// Middleware pour les requêtes JSON
app.use(express.json());

// Endpoint pour obtenir la liste des employés
app.get('/api/employees', (req, res) => {
  res.json(employees);
});

// Démarrer le serveur
app.listen(port, () => {
  console.log(`Server running on http://localhost:${8085}`);
});
