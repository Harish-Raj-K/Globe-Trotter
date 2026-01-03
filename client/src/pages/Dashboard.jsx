import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { Plus, Calendar, MapPin, ArrowRight } from 'lucide-react';

const Dashboard = () => {
    const { user } = useAuth();
    const [trips, setTrips] = useState([]);
    const [loading, setLoading] = useState(true);
    const [recommendedCities, setRecommendedCities] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [tripsRes, citiesRes] = await Promise.all([
                    api.get('/trips'),
                    api.get('/cities/top')
                ]);
                setTrips(tripsRes.data.trips);
                setRecommendedCities(citiesRes.data.cities);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) return <div className="container" style={{ paddingTop: '2rem' }}>Loading...</div>;

    return (
        <div style={{ paddingBottom: '2rem' }}>
            {/* --- Hero Banner --- */}
            <div style={{
                height: '350px',
                position: 'relative',
                marginBottom: '-5rem',
                overflow: 'hidden'
            }}>
                <img
                    src="https://images.unsplash.com/photo-1476900543704-4312b78632f8?auto=format&fit=crop&w=1920&q=80"
                    alt="Dashboard Hero"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'brightness(0.7)' }}
                />
                <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to bottom, transparent 0%, var(--bg-primary) 100%)'
                }} />
                <div className="container" style={{ position: 'absolute', bottom: '6rem', left: '50%', transform: 'translateX(-50%)', width: '100%' }}>
                    <h1 style={{ fontSize: '3rem', marginBottom: '0.5rem', textShadow: '0 2px 10px rgba(0,0,0,0.5)' }}>Hello, {user?.fullName.split(' ')[0]} 👋</h1>
                    <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1.2rem', textShadow: '0 2px 4px rgba(0,0,0,0.5)' }}>Ready to plan your next great adventure?</p>
                </div>
            </div>

            <div className="container">
                {/* --- Action Bar --- */}
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '3rem', position: 'relative', zIndex: 10 }}>
                    <Link to="/create-trip" className="btn btn-primary shadow-glow">
                        <Plus size={18} style={{ marginRight: '0.5rem' }} /> Create New Trip
                    </Link>
                </div>

                {/* --- Recent Trips --- */}
                <section style={{ marginBottom: '4rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h3 className="text-gradient" style={{ fontSize: '1.75rem' }}>Your Recent Trips</h3>
                        <Link to="/my-trips" className="btn btn-secondary" style={{ fontSize: '0.9rem', padding: '0.5rem 1rem' }}>
                            View All <ArrowRight size={16} style={{ marginLeft: '0.5rem' }} />
                        </Link>
                    </div>

                    {trips.length > 0 ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2rem' }}>
                            {trips.slice(0, 3).map((trip) => (
                                <Link to={`/trips/${trip.id}`} key={trip.id} className="card" style={{ display: 'block', textDecoration: 'none', color: 'inherit', padding: 0, overflow: 'hidden' }}>
                                    <div style={{ height: '200px', position: 'relative' }}>
                                        <img
                                            src={trip.coverImage || "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80"}
                                            alt={trip.title}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
                                        />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)' }} />
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1.25rem' }}>
                                            <h4 style={{ fontSize: '1.4rem', marginBottom: '0.25rem' }}>{trip.title}</h4>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.8, fontSize: '0.9rem' }}>
                                                <Calendar size={14} />
                                                <span>{new Date(trip.startDate).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        <div className="card glass" style={{ textAlign: 'center', padding: '4rem', borderStyle: 'dashed', borderColor: 'var(--text-muted)' }}>
                            <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '1.1rem' }}>You haven't planned any trips yet.</p>
                            <Link to="/create-trip" className="btn btn-primary">Plan Your First Trip</Link>
                        </div>
                    )}
                </section>

                {/* --- Popular Destinations --- */}
                <section>
                    <h3 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Popular Destinations</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.5rem' }}>
                        {recommendedCities.map((city) => {
                            // Manual override for Dubai request or missing images
                            let cityImg = city.imageUrl;
                            // Check for Dubai (case-insensitive)
                            if (city.name.toLowerCase().includes('dubai')) {
                                cityImg = "https://images.unsplash.com/photo-1518684079-3c830dcef6c5?auto=format&fit=crop&w=800&q=80";
                            }

                            return (
                                <div key={city.id} className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
                                    <div style={{ height: '160px', position: 'relative' }}>
                                        <img
                                            src={cityImg}
                                            alt={city.name}
                                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80" }}
                                        />
                                        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
                                        <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1rem' }}>
                                            <span style={{ fontWeight: 'bold', fontSize: '1.1rem', display: 'block' }}>{city.name}</span>
                                            <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{city.country}</span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                        {/* Fallback Cities if API returns empty */}
                        {recommendedCities.length === 0 && (
                            <>
                                <FallbackCity name="Dubai" country="UAE" img="https://images.unsplash.com/photo-1512453979798-5ea936a7fe48?auto=format&fit=crop&w=800&q=80" />
                                <FallbackCity name="Paris" country="France" img="https://images.unsplash.com/photo-1502602898657-3e91760cbb34" />
                                <FallbackCity name="Rome" country="Italy" img="https://images.unsplash.com/photo-1552832230-c0197dd311b5" />
                                <FallbackCity name="Bali" country="Indonesia" img="https://images.unsplash.com/photo-1537996194471-e657df975ab4" />
                            </>
                        )}
                    </div>
                </section>
            </div>
        </div>
    );
};

const FallbackCity = ({ name, country, img }) => (
    <div className="card" style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}>
        <div style={{ height: '160px', position: 'relative' }}>
            <img src={img} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 60%)' }} />
            <div style={{ position: 'absolute', bottom: 0, left: 0, padding: '1rem' }}>
                <span style={{ fontWeight: 'bold', fontSize: '1.1rem', display: 'block' }}>{name}</span>
                <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>{country}</span>
            </div>
        </div>
    </div>
);

export default Dashboard;
