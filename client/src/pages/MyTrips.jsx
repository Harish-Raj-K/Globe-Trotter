import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Calendar, MapPin, Plus } from 'lucide-react';

const MyTrips = () => {
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchTrips = async () => {
            try {
                const response = await api.get('/trips');
                setTrips(response.data.trips);
            } catch (error) {
                console.error('Error fetching trips:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchTrips();
    }, []);

    if (loading) return <div className="container" style={{ paddingTop: '2rem' }}>Loading...</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
                <h1>My Trips</h1>
                <Link to="/create-trip" className="btn btn-primary">
                    <Plus size={18} style={{ marginRight: '0.5rem' }} /> Plan New Trip
                </Link>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '2rem' }}>
                {trips.map((trip) => (
                    <Link to={`/trips/${trip.id}`} key={trip.id} className="card" style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: 0, overflow: 'hidden' }}>
                        <div style={{ height: '180px', background: '#334155', position: 'relative' }}>
                            {trip.coverImage ? (
                                <img src={trip.coverImage} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            ) : (
                                <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(45deg, var(--bg-card), var(--bg-secondary))' }}>
                                    <MapPin size={48} color="var(--text-muted)" />
                                </div>
                            )}
                        </div>
                        <div style={{ padding: '1.5rem' }}>
                            <h3 style={{ marginBottom: '0.5rem' }}>{trip.title}</h3>
                            <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={14} />
                                <span>{new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                <span>{trip.destinations?.length || 0} Cities</span>
                                <span>${trip.budgetLimit || 0} Budget</span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default MyTrips;
