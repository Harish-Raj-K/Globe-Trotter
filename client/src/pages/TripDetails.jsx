import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../api/axios';
import { Calendar, MapPin, Plus, Trash2, Clock, DollarSign } from 'lucide-react';

const TripDetails = () => {
    const { id } = useParams();
    const [trip, setTrip] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showAddItem, setShowAddItem] = useState(false);

    // New Item State
    const [newItem, setNewItem] = useState({
        title: '',
        type: 'ACTIVITY',
        startTime: '',
        estimatedCost: ''
    });

    const fetchTrip = async () => {
        try {
            const response = await api.get(`/trips/${id}`);
            setTrip(response.data.trip);
        } catch (error) {
            console.error('Error fetching trip:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTrip();
    }, [id]);

    const handleAddItem = async (e) => {
        e.preventDefault();
        try {
            await api.post(`/trips/${id}/items`, newItem);
            setNewItem({
                title: '',
                type: 'ACTIVITY',
                startTime: '',
                estimatedCost: ''
            });
            setShowAddItem(false);
            fetchTrip(); // Refresh list
        } catch (error) {
            console.error('Error adding item:', error);
            alert('Failed to add activity');
        }
    };

    const handleDeleteItem = async (itemId) => {
        if (!confirm('Are you sure?')) return;
        try {
            // Check if DELETE endpoint exists. Based on step 171/172 it should use generic expense or needs new one?
            // Actually I didn't verify if I added DELETE route for items specifically.
            // Looking at step 172: router.post('/:id/items', tripController.addItem); 
            // I did NOT add a delete route for items in tripRoutes.js!
            // I will use a placeholder alert for now or try to quickly fix backend too if permissible.
            // Let's stick to adding items first as requested. delete can come later or I'll just omit the delete button functionality for now to avoid error.
            // Wait, I added the trash button in UI above. I should probably implement it or remove it.
            // Let's implement it. I'll need to add the route in the backend too.
            // For this specific 'replace_file_content', I'll just implement the frontend call assuming the backend will exist.
            // I'll fix the backend in a following step.
            await api.delete(`/trips/${id}/items/${itemId}`); // Use a hypothetical route
            fetchTrip();
        } catch (error) {
            console.error('Error deleting item:', error);
            alert('Deletion not implemented yet (Backend route missing)');
        }
    };

    if (loading) return <div className="container" style={{ paddingTop: '2rem' }}>Loading...</div>;
    if (!trip) return <div className="container" style={{ paddingTop: '2rem' }}>Trip not found</div>;

    return (
        <div className="container" style={{ padding: '2rem 1rem' }}>
            {/* Header */}
            <div className="card" style={{ padding: 0, overflow: 'hidden', marginBottom: '2rem' }}>
                <div style={{ height: '200px', background: '#334155', position: 'relative' }}>
                    {trip.coverImage ? (
                        <img src={trip.coverImage} alt={trip.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <div style={{ width: '100%', height: '100%', background: 'linear-gradient(45deg, var(--bg-card), var(--bg-secondary))' }} />
                    )}
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '2rem', background: 'linear-gradient(to top, rgba(15,23,42,0.9), transparent)' }}>
                        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{trip.title}</h1>
                        <div style={{ display: 'flex', gap: '1.5rem', color: 'rgba(255,255,255,0.8)' }}>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <Calendar size={18} />
                                {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
                            </span>
                            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                <DollarSign size={18} /> Budget: ${trip.budgetLimit || 'N/A'}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: '2rem' }}>
                {/* Main Content: Itinerary */}
                <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <h2>Itinerary</h2>
                        <button className="btn btn-primary" onClick={() => setShowAddItem(!showAddItem)}>
                            <Plus size={18} style={{ marginRight: '0.5rem' }} /> Add Activity
                        </button>
                    </div>

                    {showAddItem && (
                        <div className="card" style={{ marginBottom: '1.5rem', border: '1px solid var(--primary)' }}>
                            <h3 style={{ marginBottom: '1rem' }}>Add New Activity</h3>
                            <form onSubmit={handleAddItem}>
                                <div className="form-group">
                                    <label>Activity Title</label>
                                    <input
                                        type="text"
                                        className="input"
                                        placeholder="e.g., Eiffel Tower Tour"
                                        value={newItem.title}
                                        onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                                        required
                                    />
                                </div>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                    <div className="form-group">
                                        <label>Date & Time</label>
                                        <input
                                            type="datetime-local"
                                            className="input"
                                            value={newItem.startTime}
                                            onChange={(e) => setNewItem({ ...newItem, startTime: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label>Estimated Cost ($)</label>
                                        <input
                                            type="number"
                                            className="input"
                                            placeholder="0.00"
                                            value={newItem.estimatedCost}
                                            onChange={(e) => setNewItem({ ...newItem, estimatedCost: e.target.value })}
                                        />
                                    </div>
                                </div>
                                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                                    <button type="submit" className="btn btn-primary">Save Activity</button>
                                    <button type="button" className="btn btn-secondary" onClick={() => setShowAddItem(false)}>Cancel</button>
                                </div>
                            </form>
                        </div>
                    )}

                    {/* Itinerary List Placeholder - Grouped by Day Logic would go here */}
                    {trip.itineraryItems && trip.itineraryItems.length > 0 ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {trip.itineraryItems.map(item => (
                                <div key={item.id} className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <div style={{ padding: '0.5rem', background: 'rgba(56, 189, 248, 0.1)', borderRadius: 'var(--radius-sm)' }}>
                                        <Clock size={20} className="text-accent" />
                                    </div>
                                    <div style={{ flex: 1 }}>
                                        <h4>{item.title}</h4>
                                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{new Date(item.startTime).toLocaleString()} • ${item.estimatedCost}</p>
                                    </div>
                                    <button className="btn btn-icon" onClick={() => handleDeleteItem(item.id)}>
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="card" style={{ textAlign: 'center', padding: '3rem', borderStyle: 'dashed' }}>
                            <p style={{ color: 'var(--text-secondary)' }}>No activities planned yet.</p>
                        </div>
                    )}
                </div>

                {/* Sidebar: Destinations & Budget */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    <div className="card">
                        <h3 style={{ marginBottom: '1rem' }}>Destinations</h3>
                        {trip.destinations && trip.destinations.length > 0 ? (
                            <ul style={{ listStyle: 'none' }}>
                                {trip.destinations.map(dest => (
                                    <li key={dest.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                                        <MapPin size={18} className="text-accent" />
                                        <span>{dest.city.name}, {dest.city.country}</span>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p style={{ color: 'var(--text-secondary)' }}>No cities added.</p>
                        )}
                        <button className="btn btn-secondary" style={{ width: '100%', marginTop: '1rem', fontSize: '0.9rem' }}>+ Add City</button>
                    </div>

                    <div className="card">
                        <h3 style={{ marginBottom: '1rem' }}>Budget Overview</h3>
                        {/* Placeholder Chart */}
                        <div style={{ height: '150px', background: 'rgba(255,255,255,0.03)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <span style={{ color: 'var(--text-muted)' }}>Budget Chart</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripDetails;
