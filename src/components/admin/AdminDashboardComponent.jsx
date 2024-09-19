import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import { getEventsByDate, createEvent, updateEvent } from '../../services/EventService';
import Sidebar from './Sidebar';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const [date, setDate] = useState(new Date());
    const [eventTitle, setEventTitle] = useState('');
    const [comment, setComment] = useState('');
    const [events, setEvents] = useState([]);
    const [selectedEventId, setSelectedEventId] = useState(null);  // Ajout de l'état pour l'ID du projet sélectionné

    useEffect(() => {
        fetchEventsByDate(date);
    }, [date]);

    const fetchEventsByDate = (selectedDate) => {
        const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date to 'YYYY-MM-DD'
        getEventsByDate(formattedDate)
            .then(response => {
                if (Array.isArray(response.data)) {
                    setEvents(response.data);
                } else {
                    setEvents([]);
                }
            })
            .catch(error => {
                console.error("Error fetching events:", error);
                setEvents([]);
            });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const eventData = {
            title: eventTitle,
            comment: comment,
            eventDate: date.toISOString().split('T')[0], // Send date in 'YYYY-MM-DD' format
        };

        if (selectedEventId) {
            // Mise à jour du projet existant
            updateEvent(selectedEventId, eventData)
                .then(response => {
                    setEvents(events.map(event => 
                        event.id === selectedEventId ? response.data : event
                    ));
                    setEventTitle('');
                    setComment('');
                    setSelectedEventId(null); // Réinitialiser l'ID après la mise à jour
                })
                .catch(error => {
                    console.error("Error updating event:", error);
                });
        } else {
            // Création d'un nouveau projet
            createEvent(eventData)
                .then(response => {
                    setEvents([...events, response.data]); // Add the new event to the list
                    setEventTitle('');
                    setComment('');
                })
                .catch(error => {
                    console.error("Error creating event:", error);
                });
        }
    };

    const handleEdit = (event) => {
        // Pré-remplir le formulaire avec les détails du projet sélectionné
        setEventTitle(event.title);
        setComment(event.comment);
        setDate(new Date(event.eventDate));
        setSelectedEventId(event.id); // Enregistrer l'ID du projet sélectionné
    };

    return (
        <div className="dashboard-container">
            <Sidebar />

            <div className="main-content">
                <div className="calendar-section">
                    <h2>Project Review Calendar</h2>
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="calendar"
                    />
                    <p className="selected-date">Selected Date: {date.toDateString()}</p>

                    <div className="event-form">
                        <h3>{selectedEventId ? 'Edit Event' : 'Add Event'}</h3>
                        <form onSubmit={handleSubmit}>
                            <input 
                                type="text" 
                                placeholder="Event Title" 
                                value={eventTitle}
                                onChange={(e) => setEventTitle(e.target.value)} 
                                required
                            />
                            <textarea 
                                placeholder="Comment" 
                                value={comment}
                                onChange={(e) => setComment(e.target.value)} 
                                required
                            />
                            <button type="submit">{selectedEventId ? 'Update Event' : 'Add Event'}</button>
                        </form>
                    </div>
                </div>

                <div className="events-container">
                    <h3>Events</h3>
                    {events.length === 0 ? (
                        <p>No events added yet.</p>
                    ) : (
                        events.map((event) => (
                            <div key={event.id} className="event-item">
                                <p><strong>Date:</strong> {event.eventDate}</p>
                                <p><strong>Event:</strong> {event.title}</p>
                                <p><strong>Comment:</strong> {event.comment}</p>
                                <button onClick={() => handleEdit(event)}>Edit</button>  {/* Bouton pour éditer le projet */}
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;