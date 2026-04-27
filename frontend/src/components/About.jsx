/**
 * About.jsx — Información detallada del proyecto ProofPay
 */
import React from 'react';
import { ExternalLink, ShieldCheck, History, BarChart3, Globe } from 'lucide-react';

export default function About() {
    return (
        <div style={{
            fontFamily: "'Kanit', sans-serif",
            color: '#ccc',
            background: 'rgba(23, 23, 23, 0.6)',
            backdropFilter: 'blur(12px)',
            borderRadius: '40px',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            padding: '60px 40px',
            width: '100%',
            maxWidth: '1200px',
            margin: '0 auto',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Decoración de fondo */}
            <div style={{
                position: 'absolute',
                top: '-100px',
                right: '-100px',
                width: '300px',
                height: '300px',
                background: 'radial-gradient(circle, rgba(163, 230, 53, 0.05) 0%, transparent 70%)',
                zIndex: 0
            }} />

            <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                {/* Badge superior */}
                <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: '#000',
                    padding: '8px 24px',
                    borderRadius: '50px',
                    border: '1px solid #a3e635',
                    marginBottom: '30px',
                    fontSize: '14px',
                    color: '#a3e635',
                    textTransform: 'uppercase',
                    letterSpacing: '1px'
                }}>
                    <i className="fa-solid fa-circle-info" />
                    About ProofPay
                </div>

                {/* Título Principal */}
                <h2 style={{
                    color: '#fff',
                    fontSize: 'clamp(32px, 5vw, 56px)',
                    lineHeight: '1.1',
                    marginBottom: '24px',
                    textTransform: 'uppercase',
                    fontWeight: 700
                }}>
                    Immutable. Transparent. <br />
                    <span style={{ color: '#a3e635' }}>Verifiable.</span>
                </h2>

                {/* Descripción */}
                <p style={{
                    fontSize: '18px',
                    maxWidth: '800px',
                    margin: '0 auto 50px',
                    lineHeight: '1.8',
                    color: '#aaa'
                }}>
                    ProofPay revolutionizes how freelancers and small businesses in LATAM manage their financial history.
                    We use <strong>Portaldot</strong> technology to create an income record that no one can alter,
                    allowing you to build a solid and reliable financial identity in Web3.
                </p>

                {/* Grid de Beneficios */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '30px',
                    marginBottom: '60px'
                }}>
                    {[
                        {
                            icon: <ShieldCheck size={32} />,
                            title: 'Security',
                            desc: 'Your payments are protected by Polkadot cryptography.'
                        },
                        {
                            icon: <History size={32} />,
                            title: 'Immutability',
                            desc: 'Once recorded, the history cannot be deleted or edited.'
                        },
                        {
                            icon: <BarChart3 size={32} />,
                            title: 'AI Analysis',
                            desc: 'Our AI interprets your data to generate bank-ready reports.'
                        },
                        {
                            icon: <Globe size={32} />,
                            title: 'Borderless',
                            desc: 'Prove your income anywhere in the world.'
                        }
                    ].map((item, i) => (
                        <div key={i} style={{
                            background: 'rgba(255, 255, 255, 0.02)',
                            border: '1px solid rgba(255, 255, 255, 0.05)',
                            padding: '30px',
                            borderRadius: '30px',
                            transition: 'transform 0.3s, background 0.3s',
                            cursor: 'default'
                        }}
                            onMouseEnter={e => {
                                e.currentTarget.style.transform = 'translateY(-5px)';
                                e.currentTarget.style.background = 'rgba(163, 230, 53, 0.05)';
                                e.currentTarget.style.borderColor = 'rgba(163, 230, 53, 0.2)';
                            }}
                            onMouseLeave={e => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)';
                            }}>
                            <div style={{
                                color: '#a3e635',
                                marginBottom: '20px',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                                {item.icon}
                            </div>
                            <h4 style={{ color: '#fff', fontSize: '20px', marginBottom: '12px', fontWeight: 600 }}>{item.title}</h4>
                            <p style={{ fontSize: '14px', color: '#888', lineHeight: '1.6' }}>{item.desc}</p>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
                    <a
                        href="https://portaldot.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                            background: 'linear-gradient(135deg, #a3e635, #22c55e)',
                            color: '#09090c',
                            textDecoration: 'none',
                            padding: '12px 32px',
                            borderRadius: '50px',
                            fontWeight: 600,
                            fontSize: '16px',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '10px',
                            transition: 'transform 0.2s, box-shadow 0.2s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 0 20px rgba(163, 230, 53, 0.4)'; }}
                        onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
                    >
                        Explore Ecosystem
                        <ExternalLink size={18} />
                    </a>

                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        style={{
                            background: 'transparent',
                            color: '#fff',
                            border: '1px solid rgba(255,255,255,0.2)',
                            padding: '12px 32px',
                            borderRadius: '50px',
                            fontWeight: 500,
                            fontSize: '16px',
                            cursor: 'pointer',
                            transition: 'background 0.2s'
                        }}
                        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
                    >
                        Back to top ↑
                    </button>
                </div>
            </div>
        </div>
    );
}