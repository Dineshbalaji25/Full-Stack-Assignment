import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import toast from 'react-hot-toast';
import { User, Mail, Shield, Save, Key } from 'lucide-react';

const Profile: React.FC = () => {
  const { user, login, token } = useAuth();
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    try {
      const response = await api.patch('/users/profile', { username, email });
      if (token) {
        login(response.data, token);
      }
      toast.success('Profile updated successfully');
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePasswordChange = () => {
    toast('Password change functionality would be implemented here!', { icon: '🔐' });
  };

  return (
    <div className="animate-fade" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.875rem', fontWeight: 700 }}>Account Settings</h2>
        <p style={{ color: 'var(--text-muted)' }}>Manage your profile information and account preferences</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Left Column: Avatar & Summary */}
        <div className="glass" style={{ padding: '2rem', borderRadius: '1rem', textAlign: 'center', height: 'fit-content' }}>
          <div style={{ position: 'relative', width: '120px', height: '120px', margin: '0 auto 1.5rem' }}>
            {user?.avatar ? (
              <img src={user.avatar} alt="Avatar" style={{ width: '100%', height: '100%', borderRadius: '50%', border: '4px solid var(--primary)' }} />
            ) : (
              <div style={{ 
                width: '100%', height: '100%', borderRadius: '50%', 
                background: 'var(--card-bg)', border: '4px solid var(--border)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--text-muted)'
              }}>
                <User size={64} />
              </div>
            )}
            <div style={{ 
              position: 'absolute', bottom: 0, right: 0, 
              background: 'var(--primary)', padding: '6px', borderRadius: '50%',
              border: '2px solid var(--card-bg)'
            }}>
              <Shield size={16} color="white" />
            </div>
          </div>
          <h3 style={{ fontWeight: 600, fontSize: '1.25rem' }}>{user?.username}</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem', marginBottom: '1rem' }}>{user?.email}</p>
          <span style={{ 
            fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', 
            background: 'var(--primary)', color: 'white', padding: '4px 12px', borderRadius: '100px' 
          }}>
            {user?.role}
          </span>
        </div>

        {/* Right Column: Edit Form */}
        <div className="glass" style={{ padding: '2rem', borderRadius: '1rem' }}>
          <form onSubmit={handleUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <User size={16} /> Username
              </label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                style={{ 
                  width: '100%', padding: '0.75rem', borderRadius: '0.5rem', 
                  background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'white'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                <Mail size={16} /> Email Address
              </label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ 
                  width: '100%', padding: '0.75rem', borderRadius: '0.5rem', 
                  background: 'var(--card-bg)', border: '1px solid var(--border)', color: 'white'
                }}
              />
            </div>

            <div style={{ padding: '1.5rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '0.75rem', border: '1px solid rgba(99, 102, 241, 0.2)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ fontWeight: 600, fontSize: '0.875rem' }}>Security</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Secure your account with a unique password</p>
                </div>
                <button 
                  type="button"
                  onClick={handlePasswordChange}
                  style={{ 
                    padding: '0.5rem 1rem', borderRadius: '0.5rem', background: 'var(--border)', 
                    color: 'white', fontSize: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' 
                  }}
                >
                  <Key size={14} /> Update Password
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isUpdating}
              style={{ 
                width: 'fit-content', alignSelf: 'flex-end', padding: '0.75rem 2rem', 
                borderRadius: '0.75rem', background: 'var(--primary)', color: 'white', 
                fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem'
              }}
            >
              <Save size={18} /> {isUpdating ? 'Saving...' : 'Save Changes'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
