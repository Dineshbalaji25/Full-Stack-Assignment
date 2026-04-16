import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';

const AuthSuccess: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      // Fetch user profile with this token
      const fetchProfile = async () => {
        try {
          const response = await api.get('/users/profile', {
            headers: { Authorization: `Bearer ${token}` }
          });
          login(response.data, token);
          navigate('/');
        } catch (error) {
          console.error('Failed to fetch profile', error);
          navigate('/login');
        }
      };
      fetchProfile();
    } else {
      navigate('/login');
    }
  }, [searchParams, navigate, login]);

  return (
    <div style={{ background: '#0f172a', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="animate-fade" style={{ color: 'white', textAlign: 'center' }}>
        <h2>Syncing your account...</h2>
        <p style={{ color: '#94a3b8' }}>Please wait a moment.</p>
      </div>
    </div>
  );
};

export default AuthSuccess;
