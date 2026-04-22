/**
 * Landing.jsx — Landing page adaptada de AsmrProg AI Landing Page
 * Imágenes servidas desde GitHub raw (no requieren descarga local)
 */

const RAW = 'https://raw.githubusercontent.com/AsmrProg-YT/AI-Landing-Page/master/assets';

const TABS = [
  { label: 'Get Started', href: '#app', active: true },
  { label: 'CONECT WALLET', href: '#api-docs', active: false },
  { label: 'AIHUB', href: '#aihub', active: false },
  { label: 'Security', href: '#security', active: false },
  { label: 'About Us', href: '#about', active: false },
];

const SERVICES = [
  {
    icon: 'fa-brain',
    gradient: 'linear-gradient(to top, #3f51b1 0%, #5a55ae 13%, #7b5fac 25%, #8f6aae 38%, #a86aa4 50%, #cc6b8e 62%, #f18271 75%, #f3a469 87%, #f7c978 100%)',
    title: 'Innovation',
    desc: 'Access a powerful suite of AI tools designed to optimize your processes and boost efficiency.',
    active: false,
  },
  {
    icon: 'fa-robot',
    gradient: 'linear-gradient(to top, #4fb576 0%, #44c489 30%, #28a9ae 46%, #28a2b7 59%, #4c7788 71%, #6c4f63 86%, #432c39 100%)',
    title: 'Expertise',
    desc: 'Receive customized advice and solutions from our AI specialists to elevate your projects.',
    active: true,
  },
  {
    icon: 'fa-graduation-cap',
    gradient: 'linear-gradient(to right, #f83600 0%, #f9d423 100%)',
    title: 'Learning',
    desc: 'Utilize a vast array of AI resources, from beginner guides to advanced courses for everyone.',
    active: false,
  },
  {
    icon: 'fa-network-wired',
    gradient: 'linear-gradient(to top, #0fd850 0%, #f9f047 100%)',
    title: 'Network',
    desc: 'Join a dynamic community of AI experts to share ideas and stay updated on trends.',
    active: false,
  },
];

export default function Landing({ onEnterApp }) {
  return (
    <div id="landing-root" style={{ fontFamily: "'Kanit', sans-serif", fontWeight: 300, background: '#09090c', minHeight: '100vh', color: '#ccc' }}>

      {/* ── Font Awesome CDN ── */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
      <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet" />

      {/* ════════════════════════ NAV ════════════════════════ */}
      <nav style={navStyle}>
        {/* Logo */}
        <div className="logo" style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="fa-solid fa-circle-nodes" style={{ background: '#a3e635', padding: 8, fontSize: 20, borderRadius: '50%', color: '#09090c' }} />
          <span style={{ color: '#fff', fontWeight: 600, fontSize: 18 }}>AIHUB</span>
        </div>

        {/* Nav links */}
        <div style={navLinksStyle}>
          {['Free Trial', 'AIHUB', 'Services', 'Discover'].map((item, i) => (
            <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <span style={{ width: 5, height: 5, background: '#a3e635', borderRadius: '50%', display: 'inline-block' }} />}
              <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: 14, transition: 'color .3s' }}
                onMouseEnter={e => e.target.style.color = '#a3e635'}
                onMouseLeave={e => e.target.style.color = '#fff'}>{item}</a>
            </span>
          ))}
          <span style={{ width: 5, height: 5, background: '#a3e635', borderRadius: '50%', display: 'inline-block' }} />
          <p style={{ fontSize: 13, color: '#ccc' }}>AI For All</p>
        </div>

        {/* Login + CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={loginStyle}>
            <a href="#" style={{ fontSize: 13, color: '#fff', textDecoration: 'none' }}>Login</a>
            <img src={`${RAW}/login.JPG`} alt="User" style={{ width: 32, height: 32, borderRadius: '50%', objectFit: 'cover' }} />
          </div>
          <button
            id="btn-launch-app"
            onClick={onEnterApp}
            style={{
              background: 'linear-gradient(135deg, #a3e635, #22c55e)',
              color: '#09090c', border: 'none', borderRadius: 50, padding: '8px 20px',
              fontFamily: 'Kanit, sans-serif', fontWeight: 600, fontSize: 14,
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'transform .2s, box-shadow .2s',
            }}
            onMouseEnter={e => { e.target.style.transform = 'scale(1.05)'; e.target.style.boxShadow = '0 0 16px rgba(163,230,53,.5)'; }}
            onMouseLeave={e => { e.target.style.transform = 'scale(1)'; e.target.style.boxShadow = 'none'; }}
          >
            Launch App →
          </button>
        </div>
      </nav>

      {/* ════════════════════════ HERO ════════════════════════ */}
      <section className="prompt-sec" style={{ padding: 20 }}>
        <h1 style={{ color: '#ccc', fontSize: 'clamp(62px, 12vw, 182px)', lineHeight: '0.9em', textAlign: 'center', marginTop: 36, userSelect: 'none' }}>
          INOVADORES IA
        </h1>

        <div style={{ position: 'relative', marginTop: 16 }}>
          <img
            src={`${RAW}/header.JPG`}
            alt="AI Hero"
            style={{ width: '100%', height: 440, borderRadius: 60, objectFit: 'cover', objectPosition: 'top center', boxShadow: '0 -20px 40px rgba(0,0,0,1)', display: 'block' }}
          />
          <input
            type="text"
            placeholder="Preguntame lo que quieras... ✨"
            style={{
              width: '55%', position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
              background: 'rgba(255,255,255,.22)', borderRadius: 20, backdropFilter: 'blur(14px)',
              border: '1px solid rgba(255,255,255,.4)', fontSize: 16, padding: 16,
              textAlign: 'center', color: '#fff', outline: 'none', fontFamily: 'Kanit, sans-serif',
            }}
          />

          {/* Tabs */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 2,
            position: 'absolute', bottom: -20, left: '50%', transform: 'translateX(-50%)',
            padding: 8, backdropFilter: 'blur(10px)', borderRadius: 50,
            background: 'rgba(23,23,23,.7)',
          }}>
            {TABS.map(tab => (
              <a
                key={tab.label}
                href={tab.href}
                style={{
                  color: tab.active ? '#231f1c' : '#fff',
                  background: tab.active ? '#a3e635' : '#231f1c',
                  padding: 10, width: 140, textAlign: 'center',
                  borderRadius: 50, transition: 'all .3s', textDecoration: 'none',
                  fontSize: 14, fontFamily: 'Kanit, sans-serif',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#a3e635'; e.currentTarget.style.color = '#231f1c'; }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = tab.active ? '#a3e635' : '#231f1c';
                  e.currentTarget.style.color = tab.active ? '#231f1c' : '#fff';
                }}
                onClick={tab.label === 'Get Started' ? (e) => { e.preventDefault(); onEnterApp(); } : undefined}
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ════════════════════════ SHOWCASE ════════════════════════ */}
      <section style={{ padding: '60px 80px 40px', marginTop: 40 }}>
        <h3 style={{ color: '#fff', fontSize: 'clamp(34px, 4vw, 56px)', textTransform: 'uppercase', textAlign: 'center', marginBottom: 50 }}>
          UNLEASH THE POTENTIAL OF AI WITH AIHUB
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, marginBottom: 20, flexWrap: 'wrap' }}>
          <p style={{ maxWidth: '50%', textAlign: 'justify', minWidth: 280 }}>
            Immerse yourself in the world of Artificial Intelligence with AIHUB. Whether you are a seasoned professional, an avid enthusiast, or a business looking to integrate AI, AIHUB offers the tools and resources you need to thrive.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {['img-1.JPG', 'img-2.JPG'].map(img => (
              <img key={img} src={`${RAW}/${img}`} alt="" style={{ width: 256, borderRadius: 40, border: '2px solid #c5c5c5', objectFit: 'cover' }} />
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          {['img-3.JPG', 'img-4.JPG', 'img-5.JPG'].map(img => (
            <img key={img} src={`${RAW}/${img}`} alt="" style={{ width: 256, borderRadius: 40, border: '2px solid #c5c5c5', objectFit: 'cover' }} />
          ))}
        </div>
      </section>

      {/* ════════════════════════ SERVICES ════════════════════════ */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '40px 80px 0', flexWrap: 'wrap', gap: 20 }}>
          <h3 style={{ color: '#fff', fontSize: 'clamp(34px, 4vw, 56px)', textTransform: 'uppercase', maxWidth: '60%', minWidth: 240 }}>
            NUESTROS SERVICIOS
          </h3>
          <p style={{ maxWidth: '35%', minWidth: 240 }}>
            At AIHUB, our goal is to democratize AI, making it accessible and beneficial for everyone. Join us in creating a smarter, more interconnected world.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'stretch', gap: 20, padding: '40px 80px', flexWrap: 'wrap' }}>
          {SERVICES.map(svc => (
            <div key={svc.title} style={{
              background: svc.active ? '#a3e635' : '#171717',
              padding: 20, borderRadius: 40,
              flex: '1 1 220px', minWidth: 200,
              transition: 'transform .3s',
              cursor: 'default',
            }}
              onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-4px)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
            >
              <div style={{
                display: 'flex', alignItems: 'center',
                background: svc.active ? '#000' : '#2e2c29',
                padding: '5px 20px 5px 5px', gap: 10,
                width: 'fit-content', borderRadius: 50, marginBottom: 30,
              }}>
                <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundImage: svc.gradient }} />
                <span style={{ color: svc.active ? '#a3e635' : '#fff', fontSize: 13 }}>AI {svc.title}</span>
              </div>
              <i className={`fa-solid ${svc.icon}`} style={{ fontSize: 28, color: svc.active ? '#09090c' : '#a3e635', marginBottom: 12, display: 'block' }} />
              <h5 style={{ textTransform: 'uppercase', color: svc.active ? '#000' : '#fff', fontSize: 'clamp(22px, 2.5vw, 36px)', marginBottom: 10 }}>
                {svc.title}
              </h5>
              <p style={{ color: svc.active ? '#313131' : '#ccc', fontSize: 14 }}>{svc.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ════════════════════════ VIDEO / DISCOVER ════════════════════════ */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '40px 80px 0', flexWrap: 'wrap', gap: 20 }}>
          <p style={{ maxWidth: '35%', minWidth: 240 }}>
            Discover our AI tools—from natural language processing to computer vision—that revolutionize your work!
          </p>
          <h3 style={{ color: '#fff', fontSize: 'clamp(34px, 4vw, 56px)', textTransform: 'uppercase', textAlign: 'right', maxWidth: '60%', minWidth: 240 }}>
            WHY CHOOSE AIHUB
          </h3>
        </div>

        <div style={{ margin: '20px 0 40px', padding: '0 80px', position: 'relative' }}>
          <img
            src={`${RAW}/footer.JPG`}
            alt="AI Dashboard"
            style={{ width: '100%', height: 420, objectFit: 'cover', objectPosition: 'top center', borderRadius: 40, display: 'block' }}
          />
          <button
            onClick={onEnterApp}
            id="btn-play-demo"
            style={{
              position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
              fontSize: 70, display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: 'rgba(86,85,85,.42)', backdropFilter: 'blur(8.7px)',
              border: '1px solid rgba(86,85,85,.3)', borderRadius: '50%',
              color: '#a3e635', padding: '16px 16px 16px 22px', cursor: 'pointer',
              transition: 'transform .3s, background .3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1.1)'; e.currentTarget.style.background = 'rgba(163,230,53,.2)'; }}
            onMouseLeave={e => { e.currentTarget.style.transform = 'translate(-50%,-50%) scale(1)'; e.currentTarget.style.background = 'rgba(86,85,85,.42)'; }}
            title="Abrir App"
          >
            <i className="fa-solid fa-play" style={{ fontSize: 48 }} />
          </button>
        </div>
      </section>

      {/* ════════════════════════ FOOTER ════════════════════════ */}
      <footer style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 20px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <i className="fa-solid fa-circle-nodes" style={{ background: '#a3e635', padding: 8, fontSize: 16, borderRadius: '50%', color: '#09090c' }} />
        </div>
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          padding: '8px 20px', background: '#171717', gap: 10, borderRadius: 50, width: '100%', margin: '0 16px',
        }}>
          {['Free Trial', 'AIHUB', 'Services', 'Discover'].map((item, i) => (
            <span key={item} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {i > 0 && <span style={{ width: 5, height: 5, background: '#a3e635', borderRadius: '50%' }} />}
              <a href="#" style={{ color: '#fff', textDecoration: 'none', fontSize: 13 }}>{item}</a>
            </span>
          ))}
          <span style={{ width: 5, height: 5, background: '#a3e635', borderRadius: '50%' }} />
          <p style={{ fontSize: 13, color: '#ccc' }}>Copyright © 2024 AsmrProg · Adapted for AI Web3 Dashboard</p>
        </div>
      </footer>

    </div>
  );
}

/* ── Estilos inline ── */
const navStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
  padding: '10px 20px', gap: 8,
  position: 'sticky', top: 0, zIndex: 100,
  background: 'rgba(9,9,12,.9)', backdropFilter: 'blur(16px)',
  borderBottom: '1px solid rgba(255,255,255,.05)',
};
const navLinksStyle = {
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  padding: '8px 20px', background: '#171717', gap: 10, borderRadius: 50,
};
const loginStyle = {
  display: 'flex', alignItems: 'center', gap: 16,
  background: '#171717', padding: '4px 4px 4px 14px', borderRadius: 50,
};
