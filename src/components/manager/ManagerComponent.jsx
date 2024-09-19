import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Modal, Row, Col, Card, Table } from 'react-bootstrap';
import './ManagerComponent.css';

const PROJECT_API_BASE_URL = 'http://localhost:8085/api/projects';
const TIME_ENTRY_API_BASE_URL = 'http://localhost:8085/api/time-entries';
const LOT_API_BASE_URL = 'http://localhost:8085/api/project-lots';

const ManagerComponent = () => {
  const [projects, setProjects] = useState([]);
  const [timeEntries, setTimeEntries] = useState([]);
  const [showLotForm, setShowLotForm] = useState(false);
  const [showValidationForm, setShowValidationForm] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [lotData, setLotData] = useState({ name: '', hours: '', projectId: '' });
  const [validationData, setValidationData] = useState([]);

  useEffect(() => {
    fetchProjects();
    fetchTimeEntries();
  }, []);

  const fetchProjects = () => {
    axios.get(PROJECT_API_BASE_URL)
      .then(response => setProjects(response.data))
      .catch(error => console.error('Error fetching projects:', error));
  };

  const fetchTimeEntries = () => {
    axios.get(TIME_ENTRY_API_BASE_URL)
      .then(response => setTimeEntries(response.data))
      .catch(error => console.error('Error fetching time entries:', error));
  };

  const handleLotFormChange = (e) => {
    const { name, value } = e.target;
    setLotData({ ...lotData, [name]: value });
  };

  const handleLotSubmit = (e) => {
    e.preventDefault();
    axios.post(LOT_API_BASE_URL, lotData)
      .then(response => {
        console.log('Lot created:', response.data);
        setShowLotForm(false);
        fetchProjects(); // Refresh project list
      })
      .catch(error => console.error('Error creating lot:', error));
  };

  const handleValidation = (entryId) => {
    // Logic to validate time entry
    console.log(`Validating entry with ID: ${entryId}`);
  };

  const handleShowValidation = (project) => {
    setSelectedProject(project);
    setValidationData(timeEntries.filter(entry => entry.projectId === project.id));
    setShowValidationForm(true);
  };

  return (
    <div className="manager-container">
      <h2>Project Management Dashboard</h2>

      {/* Dashboard Overview */}
      <Row className="mb-4">
        {projects.map(project => (
          <Col md={4} key={project.id} className="mb-4">
            <Card className="shadow-sm project-card">
              <Card.Body>
                <Card.Title>{project.name}</Card.Title>
                <Card.Text>Budget: ${project.budget}</Card.Text>
                <Button variant="info" onClick={() => handleShowValidation(project)}>
                  Validate Time Entries
                </Button>
                <Button variant="secondary" className="mt-2" onClick={() => setShowLotForm(true)}>
                  Add New Lot
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal for Creating a New Project Lot */}
      <Modal show={showLotForm} onHide={() => setShowLotForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add New Project Lot</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLotSubmit}>
            <Form.Group controlId="lotName">
              <Form.Label>Lot Name:</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={lotData.name}
                onChange={handleLotFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="lotHours">
              <Form.Label>Hours:</Form.Label>
              <Form.Control
                type="number"
                name="hours"
                value={lotData.hours}
                onChange={handleLotFormChange}
                required
              />
            </Form.Group>
            <Form.Group controlId="lotProject">
              <Form.Label>Project:</Form.Label>
              <Form.Control
                as="select"
                name="projectId"
                value={lotData.projectId}
                onChange={handleLotFormChange}
                required
              >
                <option value="">Select Project</option>
                {projects.map(project => (
                  <option key={project.id} value={project.id}>{project.name}</option>
                ))}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" className="w-100">Add Lot</Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Modal for Validating Time Entries */}
      <Modal show={showValidationForm} onHide={() => setShowValidationForm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Validate Time Entries for {selectedProject ? selectedProject.name : ''}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>ID</th>
                <th>Employee</th>
                <th>Hours</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {validationData.map(entry => (
                <tr key={entry.id}>
                  <td>{entry.id}</td>
                  <td>{entry.employeeName}</td>
                  <td>{entry.hours}</td>
                  <td>
                    <Button 
                      variant="success"
                      onClick={() => handleValidation(entry.id)}
                    >
                      Validate
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ManagerComponent;
