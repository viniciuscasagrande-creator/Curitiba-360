import { useState, useEffect } from 'react';
import { getEvents, createEvent, updateEvent, deleteEvent } from '../services/eventService';

export function useEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEvents();
      setEvents(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const addEvent = async (eventData) => {
    const newEv = await createEvent(eventData);
    setEvents(prev => [newEv, ...prev]);
    return newEv;
  };

  const editEvent = async (id, updates) => {
    await updateEvent(id, updates);
    setEvents(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const removeEvent = async (id) => {
    await deleteEvent(id);
    setEvents(prev => prev.filter(e => e.id !== id));
  };

  return { events, loading, error, refetch: fetchEvents, addEvent, editEvent, removeEvent };
}
