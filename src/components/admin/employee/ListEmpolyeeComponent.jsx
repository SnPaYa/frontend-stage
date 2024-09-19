import React, { useState, useEffect } from 'react';
import { listEmployees, updateEmployee, deleteEmployee, addEmployee } from '../../../services/EmployeeService';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ListEmployeeComponent.css';
import Sidebar from '../Sidebar';

const ListEmployeeComponent = () => {
  const [employees, setEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);
  const [formValues, setFormValues] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({});
  const employeesPerPage = 5;
  const navigate = useNavigate();

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Récupère la liste des employés
  const fetchEmployees = () => {
    listEmployees()
      .then((response) => {
        setEmployees(response.data);
      })
      .catch((error) => {
        console.error(error);
        alert('Failed to fetch employees. Please try again later.');
      });
  };

  // Ouvre le formulaire d'édition pour un employé
  const handleEdit = (employee) => {
    setEditingEmployee(employee.id);
    setFormValues({
      firstName: employee.firstName,
      lastName: employee.lastName,
      email: employee.email
    });
  };

  // Gestion des changements dans le formulaire d'édition
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  // Soumission du formulaire de modification d'employé
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      updateEmployee(editingEmployee, formValues)
        .then(() => {
          alert('Employee updated successfully');
          setEmployees((prevEmployees) =>
            prevEmployees.map((employee) =>
              employee.id === editingEmployee ? { ...employee, ...formValues } : employee
            )
          );
          setEditingEmployee(null);
          setFormValues({}); // Réinitialise le formulaire après soumission
        })
        .catch((error) => {
          console.error('Error updating employee:', error);
          alert('Failed to update employee. Please try again later.');
        });
    }
  };

  // Gestion de la suppression d'un employé
  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id)
        .then(() => {
          alert('Employee deleted successfully');
          setEmployees((prevEmployees) => prevEmployees.filter(employee => employee.id !== id));
        })
        .catch((error) => {
          console.error('Error deleting employee:', error);
          alert('Failed to delete employee. Please try again later.');
        });
    }
  };

  // Gestion de l'ajout d'un nouvel employé
  const handleAddEmployee = (e) => {
    e.preventDefault();
    addEmployee(newEmployee)
      .then(() => {
        alert('Employee added successfully');
        fetchEmployees(); // Actualise la liste des employés
        setShowAddModal(false); // Ferme la modal
        setNewEmployee({}); // Réinitialise le formulaire
      })
      .catch((error) => {
        console.error('Error adding employee:', error);
        alert('Failed to add employee. Please try again later.');
      });
  };

  // Gestion des changements dans le formulaire d'ajout d'employé
  const handleNewEmployeeChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const photos = {
    '3': 'https://th.bing.com/th/id/OIP.ptqhamuVx-YqtFkYgd0FswAAAA?rs=1&pid=ImgDetMain',
    '4': 'https://th.bing.com/th/id/OIP.Ti2g_DxzNv2xHlGDJyrIVgAAAA?rs=1&pid=ImgDetMain',
    '5': 'https://img.freepik.com/premium-photo/focused-male-programmer-codes-multiple-monitors-with-cityscape-background-night_34950-4748.jpg',
    '11': 'https://th.bing.com/th/id/OIP.Dd3EaZwbBWEvSTjiwYv37gAAAA?rs=1&pid=ImgDetMain',
    '13': 'https://makemychance.com/wp-content/uploads/images/understanding-jquery-and-ajax.jpeg',
    '12': 'https://miro.medium.com/v2/resize:fit:1024/1*bW7X2sKSgjoNss-lmbYhaQ@2x.jpeg',
    '15': 'https://th.bing.com/th/id/OIP.YNfyt5aRg-cWgs2nTZxOCwAAAA?rs=1&pid=ImgDetMain',
  };

  // Pagination logic
  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = employees.slice(indexOfFirstEmployee, indexOfLastEmployee);
  const totalPages = Math.ceil(employees.length / employeesPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="list-employee-container full-width">
      <Sidebar />
      <div className="container-fluid mt-5">
        <h2 className="text-center mb-4 title">List of Employees</h2>
        <div className="d-flex justify-content-end mb-3">
          <button className="btn custom-btn" onClick={() => setShowAddModal(true)}>
            Add Employee
          </button>
        </div>
        <div className="table-responsive">
          <table className="table table-striped custom-table">
            <thead>
              <tr>
                <th>Photo</th>
                <th>Employee Id</th>
                <th>Employee First Name</th>
                <th>Employee Last Name</th>
                <th>Employee Email Id</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentEmployees.length ? (
                currentEmployees.map((employee) => {
                  const photoUrl = photos[employee.id] || 'https://via.placeholder.com/50';
                  return (
                    <tr key={employee.id}>
                      <td>
                        <img
                          src={photoUrl}
                          alt={`${employee.firstName} ${employee.lastName}`}
                          className="employee-photo"
                          onError={(e) => {
                            console.error(`Failed to load image for employee ID: ${employee.id}`);
                            e.target.src = 'https://via.placeholder.com/50';
                          }}
                        />
                      </td>
                      <td>{employee.id}</td>
                      <td>{employee.firstName}</td>
                      <td>{employee.lastName}</td>
                      <td>{employee.email}</td>
                      <td className="action-btns">
                        <button
                          className="btn btn-primary"
                          onClick={() => handleEdit(employee)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleDelete(employee.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">
                    No employees found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <nav>
          <ul className="pagination justify-content-center">
            {[...Array(totalPages)].map((_, index) => (
              <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                <button className="page-link" onClick={() => paginate(index + 1)}>
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Add Employee Modal */}
        {showAddModal && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Add Employee</h5>
                  <button type="button" className="close" onClick={() => setShowAddModal(false)}>
                    <span>&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={handleAddEmployee}>
                    <div className="form-group">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={newEmployee.firstName || ''}
                        onChange={handleNewEmployeeChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={newEmployee.lastName || ''}
                        onChange={handleNewEmployeeChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={newEmployee.email || ''}
                        onChange={handleNewEmployeeChange}
                        className="form-control"
                        required
                      />
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-secondary" onClick={() => setShowAddModal(false)}>
                        Close
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Add Employee
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Employee Form */}
        {editingEmployee && (
          <div className="edit-employee-form">
            <h3>Edit Employee</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formValues.firstName || ''}
                  onChange={handleFormChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formValues.lastName || ''}
                  onChange={handleFormChange}
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formValues.email || ''}
                  onChange={handleFormChange}
                  className="form-control"
                  required
                />
              </div>
              <button type="submit" className="btn btn-success">Update Employee</button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setEditingEmployee(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ListEmployeeComponent;
