import { useState, useEffect, useRef } from "react";

// Navigation links (Home, About, Work)
const NAV_LINKS = ["Home", "About", "Work"];

// WORK PROJECTS DATA (used on Home and Work pages)
const WORK_PROJECTS = {
  upcoming: [
    {
      title: "OmniScan",
      description: "A cross-platform app that can scan food products, manage their digital pantry, and create their personal profile.",
      tech: ["Vue.js"],
      status: "Upcoming",
      color: "#f59e0b",
    },
  ],
  live: [
    {
      title: "Personal Portfolio",
      description: "This website is my current portfolio.",
      tech: ["React.js", "CSS"],
      status: "Live",
      color: "#f472b6",
    },
  ],
};

const ALL_PROJECTS = [...WORK_PROJECTS.live, ...WORK_PROJECTS.upcoming];

// MAIN APP COMPONENT (handles navigation and page state)
export default function Portfolio() {
  const [active, setActive] = useState("Home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const heroRef = useRef(null);
  const recentWorkRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // NAVIGATION HANDLER
  const handleNav = (page) => {
    setMenuOpen(false);
    if (page === "Home") {
      setActive("Home");
      heroRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (page === "Work") {
      setActive("Home");
      recentWorkRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (page === "About") {
      setActive("About");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else if (page === "Contact") {
      setActive("Contact");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // CONTACT FORM
  const handleSubmit = (e) => {
    e.preventDefault();
    const { firstName, lastName, email, message } = formData;
    if (!firstName.trim() || !lastName.trim() || !email.trim() || !message.trim()) {
      setErrorMessage("Please fill in all fields before sending.");
      setSubmitted(false);
      return;
    }
    setErrorMessage("");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setFormData({ firstName: "", lastName: "", email: "", message: "" });
  };

  // Render
  return (
    <div style={styles.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400;1,700&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { background: #fdf6f0; }
        ::selection { background: #f472b6; color: #fff; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #fdf6f0; }
        ::-webkit-scrollbar-thumb { background: #f9a8d4; border-radius: 99px; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(32px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .nav-link {
          position: relative;
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          font-weight: 500;
          font-size: 14px;
          letter-spacing: 0.04em;
          transition: color 0.2s;
          padding: 4px 0;
          color: #1a1a1a;
          text-decoration: none;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: #f472b6;
          transition: width 0.3s cubic-bezier(.4,0,.2,1);
          border-radius: 99px;
        }
        .nav-link:hover::after, .nav-link.active::after { width: 100%; }
        .nav-link.active { color: #f472b6; }

        .hero-fadeup { animation: fadeUp 0.8s cubic-bezier(.4,0,.2,1) both; }
        .hero-fadeup-1 { animation-delay: 0.1s; }
        .hero-fadeup-2 { animation-delay: 0.25s; }
        .hero-fadeup-3 { animation-delay: 0.4s; }
        .hero-fadeup-4 { animation-delay: 0.55s; }

        .work-card {
          transition: transform 0.3s cubic-bezier(.4,0,.2,1), box-shadow 0.3s;
          cursor: pointer;
        }
        .work-card:hover {
          transform: translateY(-6px) rotate(-1deg);
          box-shadow: 0 20px 60px rgba(244,114,182,0.25);
        }
        .cta-btn {
          position: relative;
          overflow: hidden;
          transition: transform 0.2s, box-shadow 0.2s;
          cursor: pointer;
        }
        .cta-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(120deg, transparent 30%, rgba(255,255,255,0.25) 50%, transparent 70%);
          background-size: 200%;
          background-position: 200% center;
          transition: background-position 0.5s;
        }
        .cta-btn:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(244,114,182,0.4); }
        .cta-btn:hover::before { background-position: -200% center; }
        .cta-btn:active { transform: translateY(0); }

        .input-field {
          transition: border-color 0.2s, box-shadow 0.2s;
          outline: none;
        }
        .input-field:focus {
          border-color: #f472b6 !important;
          box-shadow: 0 0 0 3px rgba(244,114,182,0.15);
        }
        .error-text {
          color: #e53e3e;
          font-size: 13px;
          margin-top: 8px;
          text-align: center;
        }

        @media (max-width: 768px) {
          .desktop-nav-links { display: none !important; }
          .hamburger-btn { display: flex !important; }
          .hero-pad { padding: 100px 20px 60px !important; }
          .hero-buttons { flex-direction: column !important; align-items: stretch !important; }
          .hero-buttons button { width: 100% !important; }
          .works-row { flex-direction: column !important; align-items: center !important; }
          .section-pad { padding: 50px 20px !important; }
          .about-grid { flex-direction: column !important; align-items: center !important; }
          .about-img { width: 100% !important; display: flex; justify-content: center; }
          .about-img img { width: 220px !important; height: auto !important; }
          .contact-grid { flex-direction: column !important; }
          .footer-inner { flex-direction: column !important; text-align: center !important; gap: 16px !important; }
          .container { padding: 0 20px !important; }
          .form-card { padding: 24px !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .container { padding: 0 32px !important; }
          .hero-pad { padding: 120px 32px 80px !important; }
          .about-img img { width: 240px !important; height: auto !important; }
        }
        @media (min-width: 1025px) and (max-width: 1280px) { .container { padding: 0 40px !important; } }
        @media (min-width: 1281px) { .container { padding: 0 32px !important; } }
      `}</style>

      <nav style={{
        ...styles.nav,
        background: scrolled ? "rgba(253,246,240,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        boxShadow: scrolled ? "0 1px 0 rgba(0,0,0,0.06)" : "none",
      }}>
        <div style={styles.navInner}>
          <div style={styles.logo}><span style={styles.logoMain}>Eya</span></div>
          <div className="desktop-nav-links" style={styles.navLinks}>
            {NAV_LINKS.map(link => (
              <span key={link} className={`nav-link${active === link || (link === "Work" && active === "Home") ? " active" : ""}`} onClick={() => handleNav(link)}>{link}</span>
            ))}
            <button className="cta-btn" style={styles.navCta} onClick={() => handleNav("Contact")}>Hire Me</button>
          </div>
          <button className="hamburger-btn" onClick={() => setMenuOpen(p => !p)} style={{ ...styles.hamburger, display: "none" }}>
            <span style={{ ...styles.hbar, transform: menuOpen ? "rotate(45deg) translate(5px,5px)" : "none" }} />
            <span style={{ ...styles.hbar, opacity: menuOpen ? 0 : 1 }} />
            <span style={{ ...styles.hbar, transform: menuOpen ? "rotate(-45deg) translate(5px,-5px)" : "none" }} />
          </button>
        </div>
        {menuOpen && (
          <div style={styles.mobileMenu}>
            {NAV_LINKS.map(link => (
              <span key={link} className={`nav-link${active === link || (link === "Work" && active === "Home") ? " active" : ""}`} style={{ fontSize: 18, padding: "12px 0", display: "block" }} onClick={() => handleNav(link)}>{link}</span>
            ))}
          </div>
        )}
      </nav>

      {active === "Home" && <HomePage handleNav={handleNav} heroRef={heroRef} recentWorkRef={recentWorkRef} />}
      {active === "About" && <AboutPage handleNav={handleNav} />}
      {active === "Contact" && <ContactPage formData={formData} setFormData={setFormData} handleSubmit={handleSubmit} submitted={submitted} errorMessage={errorMessage} />}

      <footer style={styles.footer}>
        <div className="footer-inner" style={styles.footerInner}>
          <p style={{ color: "#a0a0a0", fontSize: 13, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>© 2026 Angel Fea Roma Cruz</p>
        </div>
      </footer>
    </div>
  );
}

// HOME PAGE COMPONENT
function HomePage({ handleNav, heroRef, recentWorkRef }) {
  return (
    <>
      <div ref={heroRef}>
        <section style={styles.hero} className="hero-pad">
          <div style={styles.heroBlob} />
          <div className="container" style={{ ...styles.container, position: "relative", zIndex: 2, textAlign: "center" }}>
            <div style={styles.heroCentered}>
              <h1 className="hero-fadeup hero-fadeup-2" style={styles.heroH1Centered}>Welcome to my Portfolio</h1>
              <p className="hero-fadeup hero-fadeup-3" style={styles.heroBodyCentered}>Hi! I'm Angel Fea P. Roma Cruz, a BSIT student from STI San Jose Del Monte Bulacan.</p>
              <div className="hero-fadeup hero-fadeup-4 hero-buttons" style={styles.buttonGroup}>
                <button className="cta-btn" style={styles.heroBtnPrimary} onClick={() => handleNav("About")}>Know more →</button>
                <button className="cta-btn" style={styles.heroBtnOutline} onClick={() => handleNav("Work")}>View Work</button>
              </div>
            </div>
          </div>
        </section>
      </div>

      <div ref={recentWorkRef}>
        <section style={{ ...styles.section, background: "#fff" }} className="section-pad">
          <div className="container" style={styles.container}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 48, flexWrap: "wrap", gap: 16 }}>
              <div><p style={styles.sectionEyebrow}>Portfolio</p><h2 style={styles.sectionH2}>Recent <em style={{ fontStyle: "italic", color: "#f472b6" }}>Works</em></h2></div>
              <p style={{ ...styles.bodyText, maxWidth: 360 }}>The current projects that I have made and is involved.</p>
            </div>
            <div className="works-row" style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
              {ALL_PROJECTS.map((project, idx) => (
                <div key={idx} className="work-card" style={{ ...styles.projectCard, width: "300px", flexShrink: 0 }}>
                  <div style={styles.projectCardInner}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                      <span style={{ ...styles.projectStatus, background: project.color }}>{project.status}</span>
                    </div>
                    <h3 style={styles.projectTitle}>{project.title}</h3>
                    <p style={styles.projectDescription}>{project.description}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 16 }}>
                      {project.tech.map((tech, i) => <span key={i} style={styles.techTag}>{tech}</span>)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>

      <section style={{ ...styles.section, background: "#fdf6f0" }} className="section-pad">
        <div className="container" style={styles.container}>
          <div style={{ display: "flex", gap: 60, flexWrap: "wrap", alignItems: "center", justifyContent: "center" }}>
            <div style={{ flex: 1, minWidth: 280, textAlign: "center" }}>
              <p style={styles.sectionEyebrow}>Contact</p>
              <h2 style={{ ...styles.sectionH2, marginBottom: 20 }}>Let's <em style={{ fontStyle: "italic", color: "#f472b6" }}>Work Together</em></h2>
              <p style={{ ...styles.bodyText, marginBottom: 24, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>Have a project in mind?</p>
              <button className="cta-btn" style={styles.heroBtnPrimary} onClick={() => handleNav("Contact")}>Get in touch →</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// ABOUT PAGE COMPONENT
function AboutPage({ handleNav }) {
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ ...styles.hero, minHeight: "auto", padding: "60px 24px" }}>
        <div style={styles.heroBlob} />
        <div className="container" style={{ ...styles.container, textAlign: "center", position: "relative", zIndex: 2 }}>
          <p style={styles.sectionEyebrow}>About Me</p>
          <h1 style={{ ...styles.sectionH2, fontSize: "clamp(36px, 7vw, 72px)" }}>Nice to <em style={{ color: "#f472b6", fontStyle: "italic" }}>Meet You</em></h1>
        </div>
      </section>
      <section style={{ ...styles.section, background: "#fff" }} className="section-pad">
        <div className="container" style={styles.container}>
          <div className="about-grid" style={{ display: "flex", gap: 60, flexWrap: "wrap", alignItems: "center" }}>
            <div className="about-img" style={{ position: "relative", flexShrink: 0 }}>
              <div style={{ width: 260, height: 340, borderRadius: 24, background: "linear-gradient(160deg,#fce7f3,#ddd6fe)", overflow: "hidden", position: "relative" }}>
                <img src="/eya_ (2).jpg" alt="Angel Fea Roma Cruz" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 280 }}>
              <h2 style={{ ...styles.sectionH2, fontSize: "clamp(28px,4vw,42px)", marginBottom: 20 }}>BSIT Student &<br /><em style={{ fontStyle: "italic", color: "#f472b6" }}>Aspiring Cybersecurity Analyst </em></h2>
              <p style={{ ...styles.bodyText, marginBottom: 16, lineHeight: 1.8 }}>I am Angel Fea P. Roma Cruz, currently pursuing a Bachelor of Science in Information Technology at STI San Jose Del Monte Bulacan. I enjoy learning SAP and Cybersecurity on E-council. I have beginner to novice level skills on the following languages:</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginBottom: 32 }}>
                {["C#", "JavaScript", "HTML/CSS", "Python", "SQL"].map(t => <span key={t} style={styles.skillTag}>{t}</span>)}
              </div>
              <button className="cta-btn" style={styles.heroBtnPrimary} onClick={() => handleNav("Contact")}>Let's Work Together →</button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// CONTACT PAGE COMPONENT
function ContactPage({ formData, setFormData, handleSubmit, submitted, errorMessage }) {
  return (
    <div style={{ paddingTop: 80 }}>
      <section style={{ ...styles.hero, minHeight: "auto", padding: "60px 24px 40px" }}>
        <div style={styles.heroBlob} />
        <div className="container" style={{ ...styles.container, textAlign: "center", position: "relative", zIndex: 2 }}>
          <p style={styles.sectionEyebrow}>Get In Touch</p>
          <h1 style={{ ...styles.sectionH2, fontSize: "clamp(36px, 7vw, 72px)" }}>Let's <em style={{ color: "#f472b6", fontStyle: "italic" }}>Work</em><br />Something Together</h1>
        </div>
      </section>

      <section style={{ ...styles.section, background: "#fff" }} className="section-pad">
        <div className="container" style={styles.container}>
          <div className="contact-grid" style={{ display: "flex", gap: 60, flexWrap: "wrap" }}>
            <div style={{ flex: 1, minWidth: 260 }}>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, marginBottom: 16, color: "#1a1a1a" }}>
                Want to collaborate or just want to connect? <em style={{ color: "#f472b6" }}> Drop an Email! </em>
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div style={styles.contactItem}>
                  <div style={styles.contactIconBox}>📧</div>
                  <div><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#999", marginBottom: 2 }}>Gmail</p><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#1a1a1a", fontWeight: 500 }}>nglf.romacruz@gmail.com</p></div>
                </div>
                <div style={styles.contactItem}>
                  <div style={styles.contactIconBox}>📍</div>
                  <div><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, color: "#999", marginBottom: 2 }}>Location</p><p style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#1a1a1a", fontWeight: 500 }}>San Jose Del Monte, Bulacan</p></div>
                </div>
              </div>
              <div style={styles.socialLinksContainer}>
                <a href="https://www.facebook.com/eiyyaah" target="_blank" rel="noopener noreferrer" style={styles.socialLink} title="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" style={styles.socialIcon}>
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                  </svg>
                </a>
                <a href="https://www.linkedin.com/in/angel-fea-roma-cruz-17b7b6412/" target="_blank" rel="noopener noreferrer" style={styles.socialLink} title="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" style={styles.socialIcon}>
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <a href="https://github.com/nglfearmcrz" target="_blank" rel="noopener noreferrer" style={styles.socialLink} title="GitHub">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" style={styles.socialIcon}>
                    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.49.5.09.68-.21.68-.48 0-.24-.01-.88-.01-1.72-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1.01.07 1.54 1.04 1.54 1.04.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02.8-.22 1.65-.33 2.5-.33.85 0 1.7.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48C19.13 20.17 22 16.42 22 12c0-5.52-4.48-10-10-10z"/>
                  </svg>
                </a>
              </div>
            </div>
            <div style={{ flex: 1.5, minWidth: 300 }}>
              <div className="form-card" style={styles.formCard}>
                {submitted ? (
                  <div style={{ textAlign: "center", padding: "48px 0" }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🎉</div>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#1a1a1a", marginBottom: 8 }}>Message Sent!</h3>
                    <p style={styles.bodyText}>Thanks for reaching out. I'll get back to you soon!</p>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" }}>
                      {[["firstName", "First Name"], ["lastName", "Last Name"]].map(([field, label]) => (
                        <div key={field} style={{ flex: 1, minWidth: 120 }}>
                          <label style={styles.formLabel}>{label}</label>
                          <input className="input-field" style={styles.formInput} placeholder={label} value={formData[field]} onChange={e => setFormData(p => ({ ...p, [field]: e.target.value }))} />
                        </div>
                      ))}
                    </div>
                    <div style={{ marginBottom: 20 }}>
                      <label style={styles.formLabel}>Email Address</label>
                      <input className="input-field" style={styles.formInput} type="email" placeholder="your@email.com" value={formData.email} onChange={e => setFormData(p => ({ ...p, email: e.target.value }))} />
                    </div>
                    <div style={{ marginBottom: 28 }}>
                      <label style={styles.formLabel}>Message</label>
                      <textarea className="input-field" style={{ ...styles.formInput, height: 140, resize: "vertical" }} placeholder="Tell me about your project..." value={formData.message} onChange={e => setFormData(p => ({ ...p, message: e.target.value }))} />
                    </div>
                    {errorMessage && <div className="error-text">{errorMessage}</div>}
                    <button className="cta-btn" style={{ ...styles.heroBtnPrimary, width: "100%", fontSize: 16, padding: "16px 0", marginTop: errorMessage ? 8 : 0 }} onClick={handleSubmit}>Send Message ✉</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// STYLES OBJECT (all CSS-in-JS styles for the website)
const styles = {
  root: { fontFamily: "'DM Sans', sans-serif", background: "#fdf6f0", minHeight: "100vh", color: "#1a1a1a", overflowX: "hidden" },
  nav: { position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, transition: "background 0.3s, box-shadow 0.3s", padding: "0 24px" },
  navInner: { maxWidth: 1400, margin: "0 auto", height: 70, display: "flex", alignItems: "center", justifyContent: "space-between" },
  logo: { display: "flex", alignItems: "baseline", gap: 0 },
  logoMain: { fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: 22, color: "#1a1a1a", letterSpacing: "-0.02em" },
  navLinks: { display: "flex", alignItems: "center", gap: 32 },
  navCta: { background: "#f472b6", color: "#fff", border: "none", borderRadius: 99, padding: "10px 24px", fontSize: 14, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer", letterSpacing: "0.02em" },
  hamburger: { background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: 4, display: "flex" },
  hbar: { display: "block", width: 24, height: 2, background: "#1a1a1a", borderRadius: 99, transition: "transform 0.3s, opacity 0.3s" },
  mobileMenu: { padding: "16px 24px 24px", background: "rgba(253,246,240,0.98)", backdropFilter: "blur(12px)" },
  hero: { position: "relative", background: "#fdf6f0", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", paddingTop: 120, paddingBottom: 80, overflow: "hidden" },
  heroBlob: { position: "absolute", top: -120, right: -120, width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, #fce7f3 0%, #fdf6f0 70%)", filter: "blur(60px)", zIndex: 0 },
  container: { maxWidth: "none", margin: "0 auto", padding: "0 32px", width: "100%" },
  heroCentered: { maxWidth: 800, margin: "0 auto", textAlign: "center" },
  heroH1Centered: { fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(48px, 8vw, 80px)", lineHeight: 1.1, color: "#1a1a1a", marginBottom: 24, letterSpacing: "-0.02em", textAlign: "center" },
  heroBodyCentered: { fontFamily: "'DM Sans', sans-serif", fontSize: 17, lineHeight: 1.75, color: "#555", marginBottom: 32, maxWidth: 600, marginLeft: "auto", marginRight: "auto" },
  buttonGroup: { display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" },
  heroBtnPrimary: { background: "#f472b6", color: "#fff", border: "none", borderRadius: 99, padding: "14px 32px", fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer", letterSpacing: "0.02em" },
  heroBtnOutline: { background: "transparent", color: "#1a1a1a", border: "1.5px solid #1a1a1a", borderRadius: 99, padding: "14px 32px", fontSize: 15, fontFamily: "'DM Sans', sans-serif", fontWeight: 600, cursor: "pointer", letterSpacing: "0.02em" },
  section: { padding: "80px 0" },
  sectionEyebrow: { fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f472b6", marginBottom: 12 },
  sectionH2: { fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "clamp(32px, 5vw, 56px)", lineHeight: 1.1, color: "#1a1a1a", letterSpacing: "-0.02em", marginBottom: 8 },
  bodyText: { fontFamily: "'DM Sans', sans-serif", fontSize: 15, color: "#666", lineHeight: 1.7 },
  skillTag: { fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 500, background: "#fce7f3", color: "#be185d", padding: "5px 12px", borderRadius: 99, display: "inline-block" },
  formCard: { background: "#fdf6f0", border: "1.5px solid #f0e6e6", borderRadius: 24, padding: 36 },
  formLabel: { fontFamily: "'DM Sans', sans-serif", fontSize: 12, fontWeight: 600, color: "#888", letterSpacing: "0.06em", textTransform: "uppercase", display: "block", marginBottom: 8 },
  formInput: { width: "100%", fontFamily: "'DM Sans', sans-serif", fontSize: 14, padding: "12px 16px", borderRadius: 12, border: "1.5px solid #e8dede", background: "#fff", color: "#1a1a1a", display: "block" },
  contactItem: { display: "flex", gap: 16, alignItems: "center" },
  contactIconBox: { width: 44, height: 44, background: "#fce7f3", borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 },
  socialLinksContainer: { display: "flex", alignItems: "center", gap: 20, marginTop: 32 },
  socialLink: { display: "inline-flex", alignItems: "center", justifyContent: "center", width: 44, height: 44, borderRadius: "50%", background: "#1a1a1a", transition: "all 0.2s ease", cursor: "pointer", textDecoration: "none", ":hover": { transform: "translateY(-3px)", background: "#f472b6" } },
  socialIcon: { width: "22px", height: "22px", fill: "#fff" },
  footer: { background: "#1a1a1a", padding: "40px 24px" },
  footerInner: { maxWidth: 1400, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "center", flexWrap: "wrap", gap: 20 },
  projectCard: { borderRadius: 20, overflow: "hidden", padding: 0, background: "#fff", border: "1.5px solid #f0e6e6", transition: "transform 0.3s, box-shadow 0.3s", cursor: "pointer" },
  projectCardInner: { padding: 24 },
  projectStatus: { display: "inline-block", fontSize: 11, fontWeight: 700, letterSpacing: "0.08em", textTransform: "uppercase", padding: "4px 12px", borderRadius: 99, color: "#fff" },
  projectTitle: { fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: 20, marginBottom: 12, color: "#1a1a1a" },
  projectDescription: { fontFamily: "'DM Sans', sans-serif", fontSize: 14, color: "#666", lineHeight: 1.6, marginBottom: 8 },
  techTag: { fontFamily: "'DM Sans', sans-serif", fontSize: 11, fontWeight: 500, background: "#fce7f3", color: "#be185d", padding: "4px 10px", borderRadius: 99, display: "inline-block" },
};