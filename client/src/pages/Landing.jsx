import { Link } from 'react-router-dom';
import { ArrowRight, MapPin, Calendar, CreditCard, Plane, Hotel, Coffee, User } from 'lucide-react';

const Landing = () => {
    return (
        <div style={{ overflowX: 'hidden' }}>
            {/* --- Hero Section --- */}
            <div style={{
                position: 'relative',
                height: '100vh',
                width: '100%',
                backgroundImage: 'url("https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1920&q=80")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: 'white'
            }}>
                {/* Overlay gradient */}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(11, 17, 33, 1) 100%)' }} />

                {/* Big Text - Moved Up */}
                <div style={{ position: 'absolute', top: '15%', left: 0, right: 0, zIndex: 10, textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.5rem', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem', opacity: 0.9 }}>Travel The World</h2>
                    <h1 style={{
                        fontSize: 'clamp(5rem, 15vw, 12rem)',
                        fontWeight: '900',
                        lineHeight: 0.8,
                        background: 'linear-gradient(to bottom, #fff 0%, rgba(255,255,255,0.7) 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        textShadow: '0 20px 50px rgba(0,0,0,0.5)'
                    }}>
                        EXPLORE
                    </h1>
                </div>

                {/* Absolute Cards Gallery */}
                <div style={{
                    position: 'absolute',
                    bottom: '10vh',
                    left: 0,
                    right: 0,
                    zIndex: 20,
                    display: 'flex',
                    justifyContent: 'center',
                    gap: '1.5rem',
                    padding: '0 2rem',
                    flexWrap: 'wrap'
                }}>
                    <HeroCard img="https://images.unsplash.com/photo-1542051841857-5f90071e7989" title="Tokyo" subtitle="Neon Lights" />
                    <HeroCard img="https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e" title="Kyoto" subtitle="Ancient Temples" />
                    <HeroCard img="https://images.unsplash.com/photo-1590559899731-a382839e5549?auto=format&fit=crop&w=800&q=80" title="Osaka" subtitle="Street Food" />
                    <Link to="/register" className="card glass btn-primary" style={{
                        width: '200px',
                        height: '280px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textDecoration: 'none',
                        cursor: 'pointer'
                    }}>
                        <span style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Start Now</span>
                        <ArrowRight size={24} />
                    </Link>
                </div>
            </div>

            {/* --- About / Timeline Section --- */}
            <div className="container" style={{ padding: '8rem 0', position: 'relative' }}>
                <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
                    <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>HOW IT WORKS</h2>
                    <div style={{ height: '4px', width: '100px', background: 'var(--accent-gradient)', margin: '0 auto' }} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: '4rem', alignItems: 'center' }}>
                    {/* Left Side Content */}
                    <div style={{ textAlign: 'right' }}>
                        <TimelineItem title="Create Your Trip" desc="Start by choosing your dream destinations and dates." align="right" />
                        <div style={{ height: '150px' }} />
                        <TimelineItem title="Track Budget" desc="Real-time cost estimation to keep your wallet happy." align="right" />
                    </div>

                    {/* Center Line */}
                    <div style={{ height: '100%', background: 'rgba(255,255,255,0.1)', position: 'relative' }}>
                        <TimelineDot top="10%" />
                        <TimelineDot top="50%" />
                        <TimelineDot top="90%" />
                    </div>

                    {/* Right Side Content */}
                    <div>
                        <div style={{ height: '150px' }} />
                        <TimelineItem title="Build Itinerary" desc="Drag and drop activities to create the perfect schedule." align="left" />
                        <div style={{ height: '150px' }} />
                        <TimelineItem title="Share & Updates" desc="Collaborate with friends and get live updates." align="left" />
                    </div>
                </div>
            </div>

            {/* --- What's Included Section --- */}
            <div style={{ background: 'var(--bg-secondary)', padding: '6rem 0' }}>
                <div className="container">
                    <h2 style={{ fontSize: '3rem', marginBottom: '4rem', textAlign: 'center' }}>EVERYTHING YOU NEED</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                        <FeatureBox icon={<Plane size={32} />} title="Flight Planning" desc="Track arrival and departure times with ease." />
                        <FeatureBox icon={<Hotel size={32} />} title="Accommodation" desc="Manage check-ins and hotel details in one place." />
                        <FeatureBox icon={<User size={32} />} title="Travel Guides" desc="Get AI-powered recommendations for every city." />
                        <FeatureBox icon={<Coffee size={32} />} title="Local Experiences" desc="Discover hidden gems and local favorites." />
                    </div>
                </div>
            </div>

            {/* --- Call to Action Footer --- */}
            <div style={{
                padding: '8rem 0',
                textAlign: 'center',
                background: 'linear-gradient(to top, var(--bg-primary), var(--bg-secondary))',
                position: 'relative',
                overflow: 'hidden'
            }}>
                <div className="container" style={{ position: 'relative', zIndex: 10 }}>
                    <h2 style={{ fontSize: '4rem', marginBottom: '2rem' }}>Ready to Go?</h2>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', marginBottom: '3rem' }}>Join thousands of travelers planning their perfect getaways.</p>
                    <Link to="/register" className="btn btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.25rem' }}>
                        Start Your Journey
                    </Link>
                </div>
                {/* Decorative background circle */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '600px',
                    height: '600px',
                    background: 'var(--accent-gradient)',
                    filter: 'blur(150px)',
                    opacity: 0.1,
                    zIndex: 0
                }} />
            </div>
        </div>
    );
};

// --- Helper Components ---

const HeroCard = ({ img, title, subtitle }) => (
    <div className="card" style={{
        width: '200px',
        height: '280px',
        padding: 0,
        overflow: 'hidden',
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.3s ease'
    }}>
        <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: '1.5rem 1rem',
            background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
        }}>
            <h3 style={{ fontSize: '1.25rem' }}>{title}</h3>
            <p style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.8)' }}>{subtitle}</p>
        </div>
    </div>
);

const TimelineItem = ({ title, desc, align }) => (
    <div style={{ textAlign: align }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--accent-primary)' }}>{title}</h3>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-secondary)' }}>{desc}</p>
    </div>
);

const TimelineDot = ({ top }) => (
    <div style={{
        position: 'absolute',
        left: '50%',
        top: top,
        transform: 'translate(-50%, -50%)',
        width: '16px',
        height: '16px',
        background: 'var(--text-primary)',
        borderRadius: '50%',
        boxShadow: '0 0 10px var(--accent-primary)'
    }} />
);

const FeatureBox = ({ icon, title, desc }) => (
    <div className="card glass" style={{ padding: '2.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div style={{ marginBottom: '1.5rem', color: 'var(--accent-secondary)' }}>{icon}</div>
        <h3 style={{ marginBottom: '1rem' }}>{title}</h3>
        <p style={{ color: 'var(--text-secondary)' }}>{desc}</p>
    </div>
);

export default Landing;
