import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

const CreateTrip = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        budgetLimit: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/trips', {
                ...formData,
                budgetLimit: formData.budgetLimit ? parseFloat(formData.budgetLimit) : null
            });
            navigate(`/trips/${response.data.trip.id}`);
        } catch (error) {
            console.error('Failed to create trip', error);
            alert('Failed to create trip');
        }
    };

    return (
        <div className="container" style={{ maxWidth: '600px', padding: '4rem 1rem' }}>
            <h1 style={{ marginBottom: '2rem' }}>Plan a New Trip</h1>
            <div className="card">
                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Trip Title</label>
                        <input
                            name="title"
                            className="input"
                            placeholder="e.g., Summer in Italy"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>Start Date</label>
                            <input
                                name="startDate"
                                type="date"
                                className="input"
                                value={formData.startDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '0.5rem' }}>End Date</label>
                            <input
                                name="endDate"
                                type="date"
                                className="input"
                                value={formData.endDate}
                                onChange={handleChange}
                                required
                            />
                        </div>
                    </div>

                    <div style={{ marginBottom: '1.5rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Budget Limit (Optional)</label>
                        <input
                            name="budgetLimit"
                            type="number"
                            className="input"
                            placeholder="5000"
                            value={formData.budgetLimit}
                            onChange={handleChange}
                        />
                    </div>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ display: 'block', marginBottom: '0.5rem' }}>Description</label>
                        <textarea
                            name="description"
                            className="input"
                            rows="3"
                            placeholder="Notes about this trip..."
                            value={formData.description}
                            onChange={handleChange}
                        />
                    </div>

                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Create Trip</button>
                </form>
            </div>
        </div>
    );
};

export default CreateTrip;
