import axios from 'axios';

// Define the base URL for event-related API requests
const EVENT_API_BASE_URL = 'http://localhost:8085/api/projet';

// Fetch events for a specific date
export const getEventsByDate = (date) => {
    return axios.get(`${EVENT_API_BASE_URL}?date=${date}`);
};

// Create a new event
export const createEvent = (event) => {
    return axios.post(EVENT_API_BASE_URL, event);
};

// Update an existing event
export const updateEvent = (id, event) => {
    return axios.put(`${EVENT_API_BASE_URL}/${id}`, event);
};

// Optionally, you can add more functions like delete an event later if needed
