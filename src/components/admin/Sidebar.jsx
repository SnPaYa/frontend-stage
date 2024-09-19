import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getAdminProfile } from '../../services/AdminService'; 
import './Sidebar.css';

const Sidebar = () => {
    const [admin, setAdmin] = useState(null);
    const navigate = useNavigate(); 

    useEffect(() => {
        getAdminProfile()
            .then(response => setAdmin(response.data))
            .catch(error => console.error("Error fetching admin profile:", error));
    }, []);

    const navigateTo = (path) => navigate(path);

    return (
        <div className="sidebar">
            <div className="logo-container">
                <img src="/logo.png" alt="Neo TechiT Logo" className="logo" />
            </div>
            {admin && (
                <div className="profile-bar">
                    <img 
                        src={`p.png`} 
                        alt="Admin Profile"
                        className="profile-picture"
                    />
                    <div className="profile-info">
                        <p className="profile-name">{admin.firstName} {admin.lastName}</p>
                        <p className="profile-email">{admin.email}</p>
                    </div>
                </div>
            )}
            <nav className="nav-links">
                <button className="nav-button" onClick={() => navigateTo('/employees')}>
                    <i className="fas fa-users"></i>
                    <span>Employees</span>
                </button>
                <button className="nav-button" onClick={() => navigateTo('/projects')}>
                    <i className="fas fa-briefcase"></i>
                    <span>Projects</span>
                </button>
                <button className="nav-button" onClick={() => navigateTo('/equipe')}>
                    <i className="fas fa-users-cog"></i>
                    <span>Teams</span>
                </button>
                <button className="nav-button home-button" onClick={() => navigateTo('/dashbord')}>
                    <i className="fas fa-home"></i>
                    <span>Home</span>
                </button>
            </nav>
        </div>
    );
};

export default Sidebar;
