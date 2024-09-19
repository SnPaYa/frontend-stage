import axios from 'axios';

const ADMIN_API_BASE_URL = 'http://localhost:8085/api/admin';

// Fetch the admin profile
export const getAdminProfile = () => {
    return axios.get(`${ADMIN_API_BASE_URL}/profile`);
};

// You can add more functions here if needed, e.g., for updating admin information