import { useState } from 'react'
import './App.css'
import logo from './assets/logo.jpeg'
import instructorBg from './assets/instructor.jpg'
import success01 from './assets/success-01.jpeg'
import success02 from './assets/success-02.jpeg'
import success03 from './assets/success-03.jpeg'
import success04 from './assets/success-04.jpeg'
import success05 from './assets/success-05.jpeg'
import success06 from './assets/success-06.jpeg'
import success07 from './assets/success-07.jpeg'
import success08 from './assets/success-08.jpeg'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000'

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'services', label: 'Services' },
  { id: 'cards', label: 'Courses' },
  { id: 'areas', label: 'Areas' },
  { id: 'price', label: 'Pricing' },
  { id: 'testimonial', label: 'Reviews' },
  { id: 'success', label: 'Success Wall' },
  { id: 'blog', label: 'Blog' },
  { id: 'contact', label: 'Contact' },
]

const heroStats = [
  { label: 'Learners Trained', value: '2.5k+' },
  { label: 'Avg. First-Time Pass', value: '87%' },
  { label: 'Cities Covered', value: '14' },
]

const successPhotos = [
  { name: 'Amelia B.', detail: 'Passed in Rochdale • Manual', image: success01 },
  { name: 'Imran S.', detail: 'First-time pass • Automatic', image: success02 },
  { name: 'Naiema K.', detail: 'Mock-test champion', image: success03 },
  { name: 'Syeeda L.', detail: 'Confidence refresher', image: success04 },
  { name: 'Yusuf D.', detail: 'Fast-track intensive', image: success05 },
  { name: 'Haroon M.', detail: 'Route-ready in Oldham', image: success06 },
  { name: 'Hiba R.', detail: 'Motorway-ready grad', image: success07 },
  { name: 'Tariq J.', detail: 'Manual license secured', image: success08 },
]

const services = [
  {
    title: 'Manual & Automatic Instruction',
    detail:
      'Learn in modern dual-control vehicles with DVSA-approved instructors. Convenient pick-up and drop-off at your location.',
  },
  {
    title: 'Intensive Fast-Track Courses',
    detail: 'Accelerated learning program for those who need to pass quickly. Structured, focused lessons that deliver results.',
  },
  {
    title: 'Mock Tests & Route Familiarization',
    detail: 'Real test conditions with detailed feedback. Practice on actual test routes to boost confidence and readiness.',
  },
  {
    title: 'Block Booking Packages',
    detail: 'Secure 10 consecutive lessons at a discounted rate. Perfect for serious learners committed to success.',
  },
]

const lessonCards = [
  {
    title: 'Beginner Package',
    price: '£35 / hour',
    blurb: 'Perfect for new learners. Master the fundamentals with patient, expert instruction in dual-control vehicles.',
  },
  {
    title: 'Test Ready Package',
    price: '£399',
    blurb: '10 comprehensive lessons + full mock test with detailed feedback. Fast-track your journey to success.',
  },
  {
    title: 'Pass Plus Advanced',
    price: '£40 / hour',
    blurb: 'Post-test confidence building. Master motorway, night driving, and challenging weather conditions.',
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
  { title: 'Single Lesson', value: '£35/hr', detail: 'Flexible hourly lessons. Available 7 days a week for both manual and automatic.' },
  { title: '10-Hour Block', value: '£330', detail: 'Save £20 with our block booking. Best value for committed learners.' },
  { title: 'Refresher Course', value: '£120', detail: '3-lesson package designed to rebuild your confidence and refresh your skills.' },
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
        <div className="nav-wrapper">
          <div className="brand-pill" onClick={() => handleNavClick('home')}>
            <img src={logo} alt="Bash Driving School logo" />
            <div>
              <span>Since 2012</span>
              <h1>Bash Driving School</h1>
            </div>
          </div>
          <nav className={`nav-links ${navOpen ? 'open' : ''}`}>
            {navLinks.map((link) => (
              <button key={link.id} type="button" onClick={() => handleNavClick(link.id)}>
                {link.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="nav-actions">
          <button className="btn secondary" type="button" onClick={() => handleNavClick('contact')}>
            Book a lesson
          </button>
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
        </div>
        <div className={`nav-overlay ${navOpen ? 'show' : ''}`} onClick={() => setNavOpen(false)} />
      </div>

      <main>
        <section id="home" className="hero section">
          <div className="hero-grid">
            <div className="hero-content">
              <div className="hero-copy">
                <p className="tag">DVSA Approved • Est. 2012</p>
                <h2>Master the Road with Confidence</h2>
                <p>
                  Expert driving instruction tailored to your learning style. With structured lesson plans, 
                  real-time progress tracking, and patient, professional instructors, we help you become a 
                  safe, confident driver. Available in both manual and automatic transmission.
                </p>
                <div className="cta-row">
                  <button className="btn primary" onClick={() => smoothScroll('contact')}>
                    Book Your First Lesson
                  </button>
                  <button className="btn ghost" onClick={() => smoothScroll('services')}>
                    View Our Services
                  </button>
                </div>
              </div>
              <div className="hero-media">
                <div className="floating-card accent">
                  <h4>98% Satisfaction Rate</h4>
                  <p>Verified 5-star reviews from students across Greater Manchester.</p>
                </div>
                <div className="floating-card">
                  <h4>What's Included</h4>
                  <ul>
                    <li>Flexible scheduling</li>
                    <li>Door-to-door pick-up service</li>
                    <li>Progress tracking & feedback</li>
                    <li>Mock tests available</li>
                  </ul>
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
            <h3>Professional Instruction You Can Trust</h3>
          </div>
          <p>
            Since 2012, Bash Driving School has been helping learners across Greater Manchester achieve their 
            driving goals. Every student receives a personalized lesson plan, detailed progress reports, and 
            consistent communication via WhatsApp. Our modern, well-maintained vehicles are equipped with the 
            latest safety technology to ensure your learning experience is both safe and comfortable.
          </p>
        </section>

        <section id="services" className="section services">
          <div className="section-header">
            <p className="tag">Services</p>
            <h3>Comprehensive Driving Instruction</h3>
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
            <h3>Choose the Package That Suits You</h3>
            <p className="section-subheading">Click any course to book your lessons</p>
          </div>
          <div className="card-grid">
            {lessonCards.map((card, index) => (
              <article 
                key={card.title} 
                style={{ animationDelay: `${index * 120}ms` }}
                onClick={() => handleNavClick('contact')}
                role="button"
                tabIndex={0}
              >
                <div className="card-front">
                  <h4>{card.title}</h4>
                  <p className="price">{card.price}</p>
                  <span className="click-hint">Click to book →</span>
                </div>
                <div className="card-back">
                  <h4>{card.title}</h4>
                  <p>{card.blurb}</p>
                  <span className="click-hint">Click to book →</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="areas" className="section">
          <div className="section-header">
            <p className="tag">Areas Covered</p>
            <h3>Serving Greater Manchester & Surrounding Areas</h3>
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
        </section>

        <section id="price" className="section">
          <div className="section-header">
            <p className="tag">Pricing</p>
            <h3>Transparent, Competitive Rates</h3>
            <p className="section-subheading">Click any pricing option to book now</p>
          </div>
          <div className="price-grid">
            {priceHighlights.map((item) => (
              <article 
                key={item.title}
                onClick={() => handleNavClick('contact')}
                role="button"
                tabIndex={0}
              >
                <div className="price-front">
                  <h4>{item.title}</h4>
                  <p className="value">{item.value}</p>
                  <span className="click-hint">Click to book →</span>
                </div>
                <div className="price-back">
                  <h4>{item.title}</h4>
                  <p>{item.detail}</p>
                  <span className="click-hint">Click to book →</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="testimonial" className="section testimonials">
          <div className="section-header">
            <p className="tag">Reviews</p>
            <h3>What Our Students Say</h3>
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

        <section id="success" className="section success-gallery">
          <div className="section-header">
            <p className="tag">Success Stories</p>
            <h3>Celebrating Our Newly Qualified Drivers</h3>
            <p>Join hundreds of successful students who've passed their test with Bash Driving School.</p>
          </div>
          <div className="success-grid">
            {successPhotos.map((item) => (
              <figure key={item.name}>
                <img src={item.image} alt={item.name} loading="lazy" />
                <figcaption>
                  <strong>{item.name}</strong>
                  <span>{item.detail}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="blog" className="section blog">
          <div className="section-header">
            <p className="tag">Blog</p>
            <h3>Helpful Tips & Driving Guides</h3>
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
            <p className="tag">Contact Us</p>
            <h3>Ready to Start Your Driving Journey?</h3>
            <p className="section-subheading">Fill out the form below and we'll get back to you within 24 hours</p>
          </div>
          <form className="contact-form" onSubmit={handleContactSubmit}>
            <label>
              Full Name *
              <input name="name" type="text" placeholder="John Smith" required />
            </label>
            <label>
              Email Address *
              <input name="email" type="email" placeholder="john.smith@example.com" required />
            </label>
            <label>
              Phone Number *
              <input name="phone" type="tel" placeholder="07855 595 078" required />
            </label>
            <label>
              Lesson Type *
              <select name="lessonType" required defaultValue="">
                <option value="" disabled>
                  Select your preferred lesson type
                </option>
                {contactTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </label>
            <label>
              Pick-up Address *
              <textarea
                name="address"
                rows={3}
                placeholder="Street address, town, postcode (e.g., 123 High Street, Manchester, M1 1AA)"
                required
              />
            </label>
            <label>
              Your Availability
              <input name="availability" type="text" placeholder="e.g., Weekdays after 5pm, Weekends" />
            </label>
            <label>
              Additional Information
              <textarea name="message" rows={4} placeholder="Tell us about your experience level or any questions you have" />
            </label>
            <button className="btn primary" type="submit">
              Send Booking Request
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
            Professional driving instruction across Greater Manchester since 2012. Helping learners 
            become safe, confident drivers with expert tuition and personalized support.
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
