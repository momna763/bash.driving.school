import { useState } from 'react'
import './App.css'
import logo from './assets/logo.jpeg'
import instructorBg from './assets/instructor.jpg'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'cards', label: 'Courses' },
  { id: 'areas', label: 'Areas' },
  { id: 'price', label: 'Pricing' },
  { id: 'testimonial', label: 'Reviews' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

const heroStats = [
  { label: 'Learners Trained', value: '2.5k+' },
  { label: 'Avg. First-Time Pass', value: '87%' },
  { label: 'Cities Covered', value: '14' },
]

const services = [
  {
    title: 'Manual & Automatic',
    detail:
      'Flexible pick-up locations, dual-control vehicles, and DVSA-approved instructors for both transmissions.',
  },
  {
    title: 'Fast Pass Intensives',
    detail: 'Condensed lesson blocks inspired by driving.org for learners who need to pass quickly.',
  },
  {
    title: 'Mock Test & Route Prep',
    detail: 'Full mock tests with feedback, local test-route practice, and nerves coaching.',
  },
  {
    title: 'Block Booking (10 hrs)',
    detail: 'Secure ten consecutive lessons from £300 depending on your area. Ideal for committed learners.',
  },
]

const lessonCards = [
  {
    title: 'Starter Discovery',
    price: '£35 / hr',
    blurb: 'Two calm orientation sessions to learn the cockpit drill, moving off and clutch control.',
  },
  {
    title: 'Pass Guarantee Plan',
    price: '£399',
    blurb: 'Ten focused lessons plus a full mock test and feedback notebook to accelerate progress.',
  },
  {
    title: 'Pass Plus',
    price: '£40 / hr',
    blurb: 'Night, motorway, and all-weather driving so you stay confident after the test.',
  },
]

const areaList = [
  'Rochdale',
  'Heywood',
  'Oldham',
  'Royton',
  'Chadderton',
  'Manchester',
  'Bury',
  'Bacup',
  'Middleton',
  'Nearby towns & villages',
]

const locationHighlights = [
  { name: 'Rochdale', detail: 'Manual & auto lessons across OL11 / OL12' },
  { name: 'Manchester', detail: 'City-centre pick up plus Salford Quays' },
  { name: 'Bury', detail: 'Routes through Pimhole, Fishpool, Walshaw' },
  { name: 'Oldham', detail: 'Royton, Chadderton, and Saddleworth roads' },
  { name: 'Middleton', detail: 'M60 corridor, Mills Hill, Langley' },
  { name: 'Bacup', detail: 'Pennine lanes and hill-start coaching' },
]

const priceHighlights = [
  { title: 'Pay As You Go', value: '£35/hr', detail: 'Manual or automatic, weekday or weekend.' },
  { title: '10 Hour Block', value: '£330', detail: 'Save £20 when you learn consistently.' },
  { title: 'Refresher', value: '£120', detail: '3 bespoke sessions to rebuild confidence.' },
]

const testimonials = [
  {
    quote:
      'Bash made parallel parking feel effortless. I passed first time at the Cheetham Hill test centre.',
    name: 'Safiya K.',
  },
  {
    quote:
      'Clear feedback after every lesson and super flexible with my shift work schedule.',
    name: 'Daniel W.',
  },
]

const blogPosts = [
  {
    title: 'Top 5 Manoeuvres You Must Master',
    date: 'Nov 15, 2025',
    blurb: 'Emergency stops, bay parking, and more explained in plain language.',
  },
  {
    title: 'Choosing Manual vs Automatic Lessons',
    date: 'Nov 9, 2025',
    blurb: 'Pros, cons, and how they affect test readiness in Greater Manchester.',
  },
]

const contactTypes = ['Manual Lessons', 'Automatic Lessons', 'Intensive Course', 'Pass Plus']

const socialLinks = [
  {
    label: 'TikTok',
    url: 'https://www.tiktok.com/@bashdriving?_r=1&_t=ZS-91iyh34ObRM',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M20 4c1.2 2.3 3.4 3.8 6 4v4.1c-2.2-0.1-4.2-0.7-6-1.8v9.5c0 4.5-3.6 8.2-8 8.2S4 24.3 4 19.8c0-4.4 3.6-8 8-8 0.4 0 0.8 0 1.2 0.1v4.4c-0.4-0.1-0.8-0.2-1.2-0.2-2.1 0-3.8 1.7-3.8 3.8s1.7 3.9 3.8 3.9 3.8-1.7 3.8-3.8V4h4.2z" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    url: 'https://www.facebook.com/bashdrivingschool',
    icon: (
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path d="M18 11.5V9.2c0-1 0.7-1.9 1.7-1.9H22V3h-3.1C14.8 3 13 5.5 13 8.8v2.7H10v4h3v13h5v-13h3.3l0.7-4H18z" />
      </svg>
    ),
  },
]

function App() {
  const [formStatus, setFormStatus] = useState({ type: 'idle', message: '' })
  const [navOpen, setNavOpen] = useState(false)

  const smoothScroll = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleNavClick = (id) => {
    smoothScroll(id)
    setNavOpen(false)
  }

  const handleContactSubmit = async (event) => {
    event.preventDefault()
    const form = event.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())
    setFormStatus({ type: 'loading', message: 'Sending...' })

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })

      if (!response.ok) {
        throw new Error('Failed request')
      }

      form.reset()
      setFormStatus({ type: 'success', message: 'Sent! We will reply soon.' })
    } catch (error) {
      console.error(error)
      setFormStatus({
        type: 'error',
        message: 'Unable to send right now. Please try again shortly.',
      })
    }
  }

  return (
    <div className="site">
      <header className="top-banner">
        <p>DVSA Approved Instructors • Same-day callbacks</p>
        <div className="banner-actions">
          <a href="tel:07855595078">07855 595 078</a>
          <span>info@bashdrivingschool.com</span>
        </div>
      </header>

      <div className="nav-shell">
        <div className="brand-pill" onClick={() => handleNavClick('home')}>
          <img src={logo} alt="Bash Driving School logo" />
          <div>
            <span>Since 2012</span>
            <h1>Bash Driving School</h1>
          </div>
        </div>
        <button
          className={`menu-toggle ${navOpen ? 'active' : ''}`}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={navOpen}
          onClick={() => setNavOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>
        <nav className={`nav-links ${navOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <button key={link.id} type="button" onClick={() => handleNavClick(link.id)}>
              {link.label}
            </button>
          ))}
        </nav>
        <button className="btn secondary" type="button" onClick={() => handleNavClick('contact')}>
          Book a lesson
        </button>
        <div className={`nav-overlay ${navOpen ? 'show' : ''}`} onClick={() => setNavOpen(false)} />
      </div>

      <main>
        <section id="home" className="hero section">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-copy">
                <p className="tag">Inspired by UK’s favourite schools</p>
                <h2>Confident driving starts with structured coaching.</h2>
                <p>
                  We blend the proven flow of driving.org with Bash Driving School personality—giving
                  you lesson plans, progress tracking, and upbeat instructors who won’t let nerves
                  win. Manual or automatic, we tailor every hour to how you learn best.
                </p>
                <div className="cta-row">
                  <a className="btn primary" href="#contact">
                    Schedule a callback
                  </a>
                  <a className="btn ghost" href="#services">
                    View lesson menu
                  </a>
                </div>
              </div>
              <div className="hero-media">
                <div className="floating-card accent">
                  <h4>98% recommend us</h4>
                  <p>Verified Google reviews from learners across Manchester and Oldham.</p>
                </div>
                <div className="floating-card">
                  <h4>Lesson blocks</h4>
                  <ul>
                    <li>Block booking 10 hours (£300*)</li>
                    <li>Mock tests with dashcam feedback</li>
                    <li>Home / work pick-up</li>
                  </ul>
                  <small>*Area dependent</small>
                </div>
              </div>
            </div>
            <div className="hero-image">
              <img src={instructorBg} alt="Bash Driving School instructor with learner" />
              <div className="image-pill top">DVSA Approved Team</div>
              <div className="image-pill bottom">Same-day callbacks</div>
            </div>
          </div>
          <div className="stats-grid">
            {heroStats.map((stat) => (
              <article key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className="section about">
          <div className="section-header">
            <p className="tag">About Us</p>
            <h3>Local instructors, national-standard polish.</h3>
          </div>
          <p>
            Every learner receives a lesson journal, milestone targets, and a WhatsApp progress wrap
            so you and your parents always know what is next. Vehicles are refreshed yearly and are
            equipped with the latest safety tech.
          </p>
        </section>

        <section id="services" className="section services">
          <div className="section-header">
            <p className="tag">Services</p>
            <h3>Driving.org-inspired lesson experiences</h3>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <article key={service.title} className="service-card" style={{ animationDelay: `${index * 120}ms` }}>
                <span className="service-chip">0{index + 1}</span>
                <h4>{service.title}</h4>
                <p>{service.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="cards" className="section">
          <div className="section-header">
            <p className="tag">Courses</p>
            <h3>Pick a card that matches your journey</h3>
          </div>
          <div className="card-grid">
            {lessonCards.map((card, index) => (
              <article key={card.title} style={{ animationDelay: `${index * 120}ms` }}>
                <h4>{card.title}</h4>
                <p className="price">{card.price}</p>
                <p>{card.blurb}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="areas" className="section">
          <div className="section-header">
            <p className="tag">Areas Covered</p>
            <h3>Greater Manchester & Oldham corridors</h3>
          </div>
          <div className="location-grid">
            {locationHighlights.map((spot) => (
              <article key={spot.name} className="location-card">
                <div className="location-icon" aria-hidden="true">
                  <svg viewBox="0 0 32 32">
                    <path d="M16 3c-5 0-9 4-9 9 0 7 9 17 9 17s9-10 9-17c0-5-4-9-9-9zm0 12.2c-1.8 0-3.2-1.4-3.2-3.2S14.2 8.8 16 8.8s3.2 1.4 3.2 3.2S17.8 15.2 16 15.2z" />
                  </svg>
                </div>
                <div>
                  <h4>{spot.name}</h4>
                  <p>{spot.detail}</p>
                </div>
              </article>
            ))}
          </div>
          <ul className="area-list">
            {areaList.map((place) => (
              <li key={place}>{place}</li>
            ))}
          </ul>
        </section>

        <section id="price" className="section">
          <div className="section-header">
            <p className="tag">Pricing</p>
            <h3>Fair, transparent lesson rates</h3>
          </div>
          <div className="price-grid">
            {priceHighlights.map((item) => (
              <article key={item.title}>
                <h4>{item.title}</h4>
                <p className="value">{item.value}</p>
                <p>{item.detail}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="testimonial" className="section testimonials">
          <div className="section-header">
            <p className="tag">Reviews</p>
            <h3>Learners highlight our calm energy</h3>
          </div>
          <div className="testimonial-grid">
            {testimonials.map((item) => (
              <blockquote key={item.name}>
                <p>“{item.quote}”</p>
                <cite>{item.name}</cite>
              </blockquote>
            ))}
          </div>
        </section>

        <section id="blog" className="section blog">
          <div className="section-header">
            <p className="tag">Blog</p>
            <h3>Guides for learners & parents</h3>
          </div>
          <div className="blog-grid">
            {blogPosts.map((post) => (
              <article key={post.title}>
                <h4>{post.title}</h4>
                <small>{post.date}</small>
                <p>{post.blurb}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact">
          <div className="section-header">
            <p className="tag">Contact</p>
            <h3>Send a message</h3>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label>
              Your Name (required)
              <input name="name" type="text" placeholder="Enter your name" required />
            </label>
            <label>
              Your Email (required)
              <input name="email" type="email" placeholder="name@example.com" required />
            </label>
            <label>
              Your Phone Number (required)
              <input name="phone" type="tel" placeholder="07855 595 078" required />
            </label>
            <label>
              Select Your Type (required)
              <select name="lessonType" required defaultValue="">
                <option value="" disabled>
                  — Please choose an option —
                </option>
                {contactTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Your Full Address (required)
              <textarea
                name="address"
                rows={3}
                placeholder="House number, street, town, postcode"
                required
              />
            </label>
            <label>
              Mention your availability
              <input name="availability" type="text" placeholder="Weekdays after 5pm" />
            </label>
            <label>
              Message
              <textarea name="message" rows={4} placeholder="How can we help?" />
            </label>
            <button className="btn primary" type="submit">
              Submit enquiry
            </button>
            {formStatus.type !== 'idle' && (
              <p className={`form-status ${formStatus.type}`}>{formStatus.message}</p>
            )}
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-brand">
          <img src={logo} alt="Bash Driving School logo" />
          <p>
            Helping Manchester learners drive confidently with structured lessons, progress reports,
            and warm instructors.
          </p>
        </div>
        <div className="footer-links">
          <div>
            <h5>Quick Links</h5>
            <ul>
              {navLinks.slice(0, 5).map((link) => (
                <li key={`footer-${link.id}`}>
                  <button type="button" onClick={() => smoothScroll(link.id)}>
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h5>Contact</h5>
            <ul>
              <li>07855 595 078</li>
              <li>info@bashdrivingschool.com</li>
              <li>Greater Manchester & Oldham</li>
            </ul>
          </div>
        </div>
        <div className="footer-socials">
          <h5>Social</h5>
          {socialLinks.map((link) => (
            <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="icon-link">
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
        <p className="footer-note">© {new Date().getFullYear()} Bash Driving School. All rights reserved.</p>
      </footer>
    </div>
  )
}

export default App
