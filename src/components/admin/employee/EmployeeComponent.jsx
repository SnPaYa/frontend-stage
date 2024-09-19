import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './EmployeeComponent.css';

const EmployeeComponent = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  function saveEmployee(e) {
    e.preventDefault();
    const employee = { firstName, lastName, email };
    console.log(employee);
    // Logique pour envoyer les données au serveur
  }

  return (
    <div className="employee-page d-flex align-items-center justify-content-center">
      <div className="employee-form-container shadow-lg">
        <h2 className="text-center mb-4">Add Employee</h2>
        <form onSubmit={saveEmployee}>
          {/* Champ pour télécharger la photo */}
          <div className="form-group mb-3 text-center">
            <label htmlFor="photoUpload" className="form-label">Upload Photo:</label>
            <input type="file" id="photoUpload" className="form-control-file" />
          </div>

          <div className="form-row mb-3">
            <div className="form-group col-md-6">
              <label htmlFor="firstName" className="form-label">First Name:</label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter First Name"
                name="firstName"
                value={firstName}
                className="form-control"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>

            <div className="form-group col-md-6">
              <label htmlFor="lastName" className="form-label">Last Name:</label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter Last Name"
                name="lastName"
                value={lastName}
                className="form-control"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email:</label>
            <input
              type="email"
              id="email"
              placeholder="Enter Email"
              name="email"
              value={email}
              className="form-control"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary w-100">Create Employee</button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeComponent;
