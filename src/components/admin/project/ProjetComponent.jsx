import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import ProjectHoursChart from '../ProjectHoursChart';
import CircularChart from '../CircularChart';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProjetComponent.css';
import { getProjets } from '../../../services/ProjectService';
import Sidebar from '../Sidebar';
import ReactPaginate from 'react-paginate';

const PROJECT_API_BASE_URL = 'http://localhost:8085/api/projet';

const ProjetComponent = () => {
    const [projets, setProjets] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [projetsPerPage] = useState(5);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [editProjectId, setEditProjectId] = useState(null);
    const [projetData, setProjetData] = useState({
        nom: '',
        budgetTotal: '',
        heuresAllouees: ''
    });
    const [showChartModal, setShowChartModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        fetchProjets();
    }, []);

    const fetchProjets = async () => {
        try {
            const response = await getProjets();
            setProjets(response.data);
        } catch (error) {
            console.error('Error fetching projets:', error);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProjetData({ ...projetData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newProjet = {
            nom: projetData.nom,
            budgetTotal: parseFloat(projetData.budgetTotal),
            heuresAllouees: parseInt(projetData.heuresAllouees)
        };

        try {
            if (isEditing) {
                await axios.put(`${PROJECT_API_BASE_URL}/${editProjectId}`, newProjet);
                setIsEditing(false);
                setEditProjectId(null);
            } else {
                await axios.post(PROJECT_API_BASE_URL, newProjet);
            }
            fetchProjets();
            setShowForm(false);
            setProjetData({ nom: '', budgetTotal: '', heuresAllouees: '' });
        } catch (error) {
            console.error('Error saving project:', error);
        }
    };

    const handleEdit = (projet) => {
        setProjetData({
            nom: projet.nom,
            budgetTotal: projet.budgetTotal,
            heuresAllouees: projet.heuresAllouees
        });
        setEditProjectId(projet.id);
        setIsEditing(true);
        setShowForm(true);
    };

    const handleDelete = async (projetId) => {
        try {
            await axios.delete(`${PROJECT_API_BASE_URL}/${projetId}`);
            fetchProjets();
        } catch (error) {
            console.error('Error deleting projet:', error);
        }
    };

    const handleShowCharts = () => {
        setShowChartModal(true);
    };

    const handleCloseCharts = () => {
        setShowChartModal(false);
    };

    const handleViewLotProjects = (projectId) => {
        navigate(`/projects/${projectId}/lots`);
    };

    const handlePageClick = (event) => {
        setCurrentPage(event.selected);
    };

    const indexOfLastProjet = (currentPage + 1) * projetsPerPage;
    const indexOfFirstProjet = indexOfLastProjet - projetsPerPage;
    const currentProjets = projets.slice(indexOfFirstProjet, indexOfLastProjet);

    const pieChartData = [30, 70];

    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="main-content">
                <h2>Projets</h2>
                <button className="btn btn-primary mb-3" onClick={() => {
                    setIsEditing(false);
                    setShowForm(true);
                    setProjetData({ nom: '', budgetTotal: '', heuresAllouees: '' });
                }}>Add Project</button>
                <div className="projet-container">
                    {currentProjets.length > 0 ? (
                        currentProjets.map((projet) => (
                            <div key={projet.id} className="projet-item card p-3 mb-3 shadow-sm">
                                <h3>{projet.nom}</h3>
                                <p><strong>Budget Total:</strong> {projet.budgetTotal}</p>
                                <p><strong>Heures Allouees:</strong> {projet.heuresAllouees}</p>
                                <div className="projet-actions">
                                    <button className="btn btn-warning me-2" onClick={() => handleEdit(projet)}>Edit</button>
                                    <button className="btn btn-danger me-2" onClick={() => handleDelete(projet.id)}>Delete</button>
                                    <button className="btn btn-info me-2" onClick={handleShowCharts}>Info</button>
                                    <button className="btn btn-secondary" onClick={() => handleViewLotProjects(projet.id)}>View Lots</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No projects available.</p>
                    )}
                </div>

                {showForm && (
                    <div className="modal-overlay">
                        <div className="modal-content p-4 shadow-lg">
                            <h3>{isEditing ? 'Edit Project' : 'Add New Project'}</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="form-group mb-3">
                                    <label htmlFor="nom">Name:</label>
                                    <input
                                        type="text"
                                        id="nom"
                                        name="nom"
                                        value={projetData.nom}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="budgetTotal">Total Budget:</label>
                                    <input
                                        type="number"
                                        id="budgetTotal"
                                        name="budgetTotal"
                                        value={projetData.budgetTotal}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="heuresAllouees">Allocated Hours:</label>
                                    <input
                                        type="number"
                                        id="heuresAllouees"
                                        name="heuresAllouees"
                                        value={projetData.heuresAllouees}
                                        onChange={handleChange}
                                        className="form-control"
                                        required
                                    />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="btn btn-primary">Submit</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowForm(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}

                {showChartModal && (
                    <div className="chart-modal-overlay">
                        <div className="chart-modal-content p-4 shadow-lg">
                            <h3>Project Overview</h3>
                            <div className="chart-container d-flex">
                                <div className="chart-item me-3">
                                    <h4>Project Hours</h4>
                                    <ProjectHoursChart />
                                </div>
                                <div className="chart-item">
                                    <h4>Project Distribution</h4>
                                    <CircularChart data={pieChartData} />
                                </div>
                            </div>
                            <button className="btn btn-secondary mt-3" onClick={handleCloseCharts}>Close</button>
                        </div>
                    </div>
                )}

                <ReactPaginate
                    previousLabel={'Previous'}
                    nextLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={Math.ceil(projets.length / projetsPerPage)}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                />
            </div>
        </div>
    );
};

export default ProjetComponent;
