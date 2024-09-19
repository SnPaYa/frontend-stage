import React, { useState, useEffect } from 'react';
import { Card, Button, Modal, Form, Row, Col } from 'react-bootstrap';
import Sidebar from '../Sidebar';
import './ListEquipeComponent.css';
import { listEquipes, addEquipe, updateEquipe, deleteEquipe } from '../../../services/EquipeService';

const ListEquipeComponent = () => {
    const [equipes, setEquipes] = useState([]);
    const [editingEquipe, setEditingEquipe] = useState(null);
    const [formValues, setFormValues] = useState({});
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    useEffect(() => {
        fetchEquipes();
    }, []);

    const fetchEquipes = () => {
        listEquipes()
            .then((response) => {
                setEquipes(response.data);
            })
            .catch((error) => {
                console.error(error);
                alert('Failed to fetch equipes. Please try again later.');
            });
    };

    const handleEdit = (equipe) => {
        setEditingEquipe(equipe.id);
        setFormValues({
            nom: equipe.nom,
            description: equipe.description
        });
        setShowEditModal(true);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        addEquipe(formValues)
            .then(() => {
                alert('Equipe added successfully');
                fetchEquipes();
                setShowAddModal(false);
                setFormValues({});
            })
            .catch((error) => {
                console.error('Error adding equipe:', error);
                alert('Failed to add equipe. Please try again later.');
            });
    };

    const handleEditSubmit = (e) => {
        e.preventDefault();
        updateEquipe(editingEquipe, formValues)
            .then(() => {
                alert('Equipe updated successfully');
                fetchEquipes();
                setEditingEquipe(null);
                setFormValues({});
                setShowEditModal(false);
            })
            .catch((error) => {
                console.error('Error updating equipe:', error);
                alert('Failed to update equipe. Please try again later.');
            });
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this equipe?')) {
            deleteEquipe(id)
                .then(() => {
                    alert('Equipe deleted successfully');
                    fetchEquipes();
                })
                .catch((error) => {
                    console.error('Error deleting equipe:', error);
                    alert('Failed to delete equipe. Please try again later.');
                });
        }
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value
        }));
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentEquipes = equipes.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(equipes.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div className='list-equipe-wrapper'>
            <Sidebar />
            <div className='content'>
                <div className="container mt-5">
                    <div className="d-flex justify-content-between mb-4">
                        <h2 className='page-title'>Liste des Équipes</h2>
                        <Button variant="success" onClick={() => setShowAddModal(true)} className='btn-custom'>Créer une Équipe</Button>
                    </div>
                    <Row>
                        {currentEquipes.map(equipe => (
                            <Col md={4} key={equipe.id} className="mb-4">
                                <Card className="equipe-card">
                                    <Card.Body>
                                        <Card.Title className='card-title'>{equipe.nom}</Card.Title>
                                        <Card.Text className='card-description'>{equipe.description}</Card.Text>
                                        <div className="d-flex justify-content-around mt-3">
                                            <Button variant="primary" className="btn-custom" onClick={() => handleEdit(equipe)}>Modifier</Button>
                                            <Button variant="danger" className="btn-custom" onClick={() => handleDelete(equipe.id)}>Supprimer</Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>

                    <div className="d-flex justify-content-center mt-4">
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Button
                                key={index + 1}
                                variant="outline-primary"
                                onClick={() => paginate(index + 1)}
                                className={`mx-1 page-btn ${currentPage === index + 1 ? 'active' : ''}`}
                            >
                                {index + 1}
                            </Button>
                        ))}
                    </div>

                    {/* Add Equipe Modal */}
                    <Modal show={showAddModal} onHide={() => setShowAddModal(false)} className="modal-custom">
                        <Modal.Header closeButton>
                            <Modal.Title>Créer une Nouvelle Équipe</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={handleAdd}>
                                <Form.Group controlId="formNom">
                                    <Form.Label>Nom de l'Équipe</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nom"
                                        placeholder="Entrez le nom de l'équipe"
                                        value={formValues.nom || ''}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </Form.Group>
                                <Form.Group controlId="formDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        placeholder="Entrez la description de l'équipe"
                                        value={formValues.description || ''}
                                        onChange={handleFormChange}
                                        required
                                    />
                                </Form.Group>
                                <Button variant="primary" type="submit" className="w-100 mt-3 btn-custom">
                                    Ajouter l'Équipe
                                </Button>
                            </Form>
                        </Modal.Body>
                    </Modal>

                    {/* Edit Equipe Modal */}
                    {editingEquipe && (
                        <Modal show={showEditModal} onHide={() => setShowEditModal(false)} className="modal-custom">
                            <Modal.Header closeButton>
                                <Modal.Title>Modifier l'Équipe</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <Form onSubmit={handleEditSubmit}>
                                    <Form.Group controlId="formNom">
                                        <Form.Label>Nom de l'Équipe</Form.Label>
                                        <Form.Control
                                            type="text"
                                            name="nom"
                                            placeholder="Entrez le nom de l'équipe"
                                            value={formValues.nom || ''}
                                            onChange={handleFormChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Form.Group controlId="formDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={3}
                                            name="description"
                                            placeholder="Entrez la description de l'équipe"
                                            value={formValues.description || ''}
                                            onChange={handleFormChange}
                                            required
                                        />
                                    </Form.Group>
                                    <Button variant="primary" type="submit" className="w-100 mt-3 btn-custom">
                                        Sauvegarder les Modifications
                                    </Button>
                                </Form>
                            </Modal.Body>
                        </Modal>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ListEquipeComponent;
