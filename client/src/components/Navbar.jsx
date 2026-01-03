import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Map, LogOut, User, Plus } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <nav style={{
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(10px)',
            borderBottom: '1px solid rgba(255,255,255,0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 100
        }}>
            <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '70px' }}>
                <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: 'white', textDecoration: 'none' }}>
                    <Map className="text-accent" />
                    <span className="text-gradient">GlobeTrotter</span>
                </Link>

                <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                    {user ? (
                        <>
                            <Link to="/create-trip" className="btn btn-primary" style={{ gap: '0.5rem' }}>
                                <Plus size={18} /> Plan Trip
                            </Link>
                            <Link to="/dashboard" style={{ color: 'var(--text-secondary)' }}>Dashboard</Link>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
                                    {user.fullName[0]}
                                </div>
                                <button onClick={handleLogout} className="btn btn-secondary" style={{ padding: '0.4rem', border: 'none', background: 'transparent' }}>
                                    <LogOut size={20} color="var(--text-muted)" />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={{ color: 'var(--text-primary)', fontWeight: '600' }}>Login</Link>
                            <Link to="/register" className="btn btn-primary">Get Started</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
