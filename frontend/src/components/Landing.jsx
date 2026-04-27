import About from './About';

const RAW = 'https://raw.githubusercontent.com/AsmrProg-YT/AI-Landing-Page/master/assets';

const TABS = [
  { label: 'Connect Wallet', href: '#app', active: true },
  { label: 'ProofPay AI', href: '#aihub', active: false },
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
          <i className="fa-solid fa-file-invoice-dollar" style={{ background: '#a3e635', padding: 8, fontSize: 20, borderRadius: '50%', color: '#09090c' }} />
          <span style={{ color: '#fff', fontWeight: 600, fontSize: 18 }}>ProofPay</span>
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
          PROOFPAY
        </h1>

        <div style={{ position: 'relative', marginTop: 16 }}>
          <img
            src='https://images.unsplash.com/photo-1674027444485-cec3da58eef4?q=80&w=3840&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt="AI Hero"
            style={{ width: '100%', height: 500, borderRadius: 60, objectFit: 'cover', objectPosition: 'center', boxShadow: '0 -10px 40px rgba(0,0,0,1)', display: 'block', margin: '40px auto 0' }}
          />
          <input
            type="text"
            placeholder="askme anything... ✨"
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
                onClick={(e) => {
                  e.preventDefault();
                  if (tab.label === 'About Us') {
                    document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    onEnterApp();
                  }
                }}
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
          YOUR PAYMENTS, PROVEN ON-CHAIN
        </h3>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 40, marginBottom: 20, flexWrap: 'wrap' }}>
          <p style={{ maxWidth: '50%', textAlign: 'justify', minWidth: 280 }}>
            ProofPay is a financial transparency platform built on Portaldot. Every payment is stored as an immutable on-chain proof, allowing freelancers and small businesses to reliably prove their payment history without intermediaries.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            <img src="https://images.unsplash.com/photo-1732020858816-93c130ab8f49?q=80&w=1558&auto=format&fit=crop" alt="Abstract shape" style={{ width: 256, borderRadius: 40, border: '2px solid rgba(255,255,255,0.1)', objectFit: 'cover' }} />
            <img src="https://images.unsplash.com/photo-1706606999710-72658165a73d?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDN8fHxlbnwwfHx8fHw%3D" alt="Web3 abstract" style={{ width: 256, borderRadius: 40, border: '2px solid rgba(255,255,255,0.1)', objectFit: 'cover' }} />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
          <img src="https://images.unsplash.com/photo-1704189125621-55e8c6cfd166?q=80&w=1287&auto=format&fit=crop" alt="Abstract 1" style={{ width: 256, height: 380, borderRadius: 40, border: '2px solid rgba(255,255,255,0.1)', objectFit: 'cover' }} />
          <img src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?q=80&w=1287&auto=format&fit=crop" alt="Abstract 2" style={{ width: 256, height: 380, borderRadius: 40, border: '2px solid rgba(255,255,255,0.1)', objectFit: 'cover' }} />
          <img src="https://images.unsplash.com/photo-1677212004257-103cfa6b59d0?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Abstract 3" style={{ width: 256, height: 380, borderRadius: 40, border: '2px solid rgba(255,255,255,0.1)', objectFit: 'cover' }} />
        </div>
      </section>

      {/* ════════════════════════ SERVICES ════════════════════════ */}
      <section>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '40px 80px 0', flexWrap: 'wrap', gap: 20 }}>
          <h3 style={{ color: '#fff', fontSize: 'clamp(34px, 4vw, 56px)', textTransform: 'uppercase', maxWidth: '60%', minWidth: 240 }}>
            OUR SERVICES
          </h3>
          <p style={{ maxWidth: '35%', minWidth: 240 }}>
            At ProofPay, our goal is to give every freelancer and small business a trustless, verifiable financial identity on Web3.
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
            WHY CHOOSE PROOFPAY
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

      {/* ════════════════════════ ABOUT SECTION ════════════════════════ */}
      <section id="about" style={{ padding: '40px 80px' }}>
        <About />
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
          <p style={{ fontSize: 13, color: '#ccc' }}>Copyright © 2024 ProofPay · Built for Portaldot Mini Hackathon</p>
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
