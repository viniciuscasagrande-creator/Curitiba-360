import { useState, useEffect } from 'react';
import { getUsers, createUser, updateUser } from '../services/userService';

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getUsers();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const addUser = async (userData) => {
    const newUser = await createUser(userData);
    setUsers(prev => [newUser, ...prev]);
    return newUser;
  };

  const editUser = async (id, updates) => {
    await updateUser(id, updates);
    setUsers(prev => prev.map(u => u.id === id ? { ...u, ...updates } : u));
  };

  return { users, loading, error, refetch: fetchUsers, addUser, editUser };
}
