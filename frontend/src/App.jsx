import { useState, useEffect } from 'react'
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

function App() {
  const [formStep, setFormStep] = useState(1)
  const [formStatus, setFormStatus] = useState({ type: 'idle', message: '' })
  const [navOpen, setNavOpen] = useState(false)
  const [theme, setTheme] = useState(() => {
    // Check localStorage or system preference
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) return savedTheme
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    lessonType: '',
    address: '',
    availability: '',
    message: ''
  })

  // Apply theme on mount and when it changes
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('theme', theme)
  }, [theme])

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light')
  }

  const scrollToSection = (id) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setNavOpen(false)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const validateStep = (step) => {
    if (step === 1) {
      if (!formData.name || !formData.email || !formData.phone) {
        setFormStatus({ type: 'error', message: 'Please fill in all required fields.' })
        return false
      }
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setFormStatus({ type: 'error', message: 'Please enter a valid email address.' })
        return false
      }
      // Phone validation (UK + Pakistan format)
      const phoneRegex = /^(\+44\d{10}|07\d{9}|\+92\d{10}|03\d{9}|0\d{10})$/
      const cleanedPhone = formData.phone.replace(/\s/g, '')
      
      if (!phoneRegex.test(cleanedPhone)) {
        setFormStatus({ 
          type: 'error', 
          message: 'Please enter a valid phone number (UK: 07xxx or +44xxx, Pakistan: 03xxx or +92xxx)' 
        })
        return false
      }
    }
    if (step === 2) {
      if (!formData.lessonType || !formData.address) {
        setFormStatus({ type: 'error', message: 'Please fill in all required fields.' })
        return false
      }
    }
    setFormStatus({ type: 'idle', message: '' })
    return true
  }

  const nextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(prev => Math.min(prev + 1, 3))
    }
  }

  const prevStep = () => {
    setFormStatus({ type: 'idle', message: '' })
    setFormStep(prev => Math.max(prev - 1, 1))
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    setFormStatus({ type: 'loading', message: 'Sending your request...' })

    try {
      const response = await fetch(`${API_BASE_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed request')
      }

      setFormStatus({ type: 'success', message: '✓ Booking request sent successfully! We\'ll contact you within 24 hours.' })
      setFormData({
        name: '',
        email: '',
        phone: '',
        lessonType: '',
        address: '',
        availability: '',
        message: ''
      })
      setFormStep(1)
    } catch (error) {
      console.error(error)
      setFormStatus({
        type: 'error',
        message: 'Unable to send request. Please call us directly at 07855 595 078.',
      })
    }
  }

  return (
    <div className="site">
      {/* Navigation */}
      <nav className="nav-shell">
        <div className="nav-wrapper">
          <div className="brand-pill" onClick={() => scrollToSection('home')}>
            <img src={logo} alt="Bash Driving School" />
            <div>
              <span>EST. 2012 • DVSA APPROVED</span>
              <h1>Bash Driving School</h1>
            </div>
          </div>
          <div className={`nav-links ${navOpen ? 'open' : ''}`}>
            <button onClick={() => scrollToSection('home')}>Home</button>
            <button onClick={() => scrollToSection('about')}>About</button>
            <button onClick={() => scrollToSection('services')}>Services</button>
            <button onClick={() => scrollToSection('courses')}>Courses</button>
            <button onClick={() => scrollToSection('pricing')}>Pricing</button>
            <button onClick={() => scrollToSection('areas')}>Areas</button>
            <button onClick={() => scrollToSection('testimonials')}>Reviews</button>
            <button onClick={() => scrollToSection('success')}>Success Stories</button>
          </div>
        </div>
        <div className="nav-actions">
          <button 
            className="theme-toggle"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
          <button className="btn btn-primary" onClick={() => scrollToSection('booking')}>
            Book Your Lesson
          </button>
          <button 
            className={`menu-toggle ${navOpen ? 'active' : ''}`}
            onClick={() => setNavOpen(!navOpen)}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-container">
          <div className="hero-content fade-in">
            <h1>Pass Your Driving Test with Confidence & Expert Skill</h1>
            <p className="hero-subtitle">
              Professional DVSA-approved instruction across Greater Manchester. 
              Learn with patient, experienced instructors in modern dual-control vehicles. 
              Manual & Automatic lessons available 7 days a week.
            </p>
            <div className="hero-cta">
              <button className="btn btn-primary" onClick={() => scrollToSection('booking')}>
                🚗 Book First Lesson
              </button>
              <button className="btn btn-secondary" onClick={() => scrollToSection('pricing')}>
                View Packages
              </button>
            </div>
            <div className="hero-badges">
              <div className="hero-badge">
                ✓ DVSA Approved
              </div>
              <div className="hero-badge">
                🏆 12+ Years Experience
              </div>
              <div className="hero-badge">
                ⭐ 98% Satisfaction
              </div>
            </div>
          </div>
          <div className="hero-image fade-in">
            <img src={instructorBg} alt="Professional driving instruction" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-icon">👥</div>
            <div className="stat-value">2,500+</div>
            <div className="stat-label">Students Trained</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-value">87%</div>
            <div className="stat-label">First-Time Pass Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📅</div>
            <div className="stat-value">12+</div>
            <div className="stat-label">Years of Excellence</div>
          </div>
        </div>
      </section>

      <main>
        {/* About Section */}
        <section id="about" className="section">
          <div className="section-header">
            <span className="section-tag">About Us</span>
            <h2 className="section-title">Professional Driving Instruction You Can Trust</h2>
            <p className="section-subtitle">
              Since 2012, Bash Driving School has been the premier choice for learner drivers across Greater Manchester. 
              Our DVSA-approved instructors provide patient, professional instruction in modern, well-maintained vehicles. 
              Every student receives personalized lesson plans, detailed progress tracking, and continuous support throughout their learning journey.
            </p>
          </div>
        </section>

        {/* Services Section */}
        <section id="services" className="section">
          <div className="section-header">
            <span className="section-tag">Our Services</span>
            <h2 className="section-title">Comprehensive Driving Instruction</h2>
            <p className="section-subtitle">Professional lessons tailored to your learning style and pace</p>
          </div>
          <div className="card-grid">
            <div className="premium-card">
              <div className="card-icon">🚗</div>
              <h4 className="card-title">Manual & Automatic Lessons</h4>
              <p className="card-description">
                Learn in modern dual-control vehicles with experienced DVSA-approved instructors. 
                Choose between manual or automatic transmission based on your preference.
              </p>
            </div>
            <div className="premium-card">
              <div className="card-icon">⚡</div>
              <h4 className="card-title">Intensive Fast-Track Courses</h4>
              <p className="card-description">
                Need to pass quickly? Our intensive courses offer condensed, focused instruction 
                designed to get you test-ready in the shortest time possible.
              </p>
            </div>
            <div className="premium-card">
              <div className="card-icon">✅</div>
              <h4 className="card-title">Mock Tests & Route Practice</h4>
              <p className="card-description">
                Experience real test conditions with detailed feedback. Practice on actual test 
                routes to build confidence and familiarity before your big day.
              </p>
            </div>
            <div className="premium-card">
              <div className="card-icon">📦</div>
              <h4 className="card-title">Block Booking Packages</h4>
              <p className="card-description">
                Save money with our 10-hour block bookings. Perfect for committed learners who 
                want consistency and the best value for their investment.
              </p>
            </div>
          </div>
        </section>

        {/* Courses Section */}
        <section id="courses" className="section">
          <div className="section-header">
            <span className="section-tag">Courses</span>
            <h2 className="section-title">Choose Your Learning Package</h2>
            <p className="section-subtitle">Click any package to start your booking</p>
          </div>
          <div className="card-grid">
            <div className="premium-card" onClick={() => scrollToSection('booking')}>
              <div className="card-icon">🌱</div>
              <h4 className="card-title">Beginner Package</h4>
              <div className="card-price">£35<span className="pricing-period">/hour</span></div>
              <p className="card-description">
                Perfect for new learners. Master the fundamentals with patient, expert instruction.
              </p>
              <ul className="card-features">
                <li>Flexible scheduling</li>
                <li>Door-to-door pick-up</li>
                <li>Progress tracking</li>
                <li>Patient instruction</li>
              </ul>
              <a href="#booking" className="card-cta">Book Now →</a>
            </div>
            <div className="premium-card" onClick={() => scrollToSection('booking')}>
              <div className="card-icon">🎯</div>
              <h4 className="card-title">Test Ready Package</h4>
              <div className="card-price">£399</div>
              <p className="card-description">
                10 comprehensive lessons + full mock test with detailed feedback.
              </p>
              <ul className="card-features">
                <li>10 structured lessons</li>
                <li>Full mock test included</li>
                <li>Detailed progress reports</li>
                <li>Test route practice</li>
              </ul>
              <a href="#booking" className="card-cta">Book Now →</a>
            </div>
            <div className="premium-card" onClick={() => scrollToSection('booking')}>
              <div className="card-icon">🏆</div>
              <h4 className="card-title">Pass Plus Advanced</h4>
              <div className="card-price">£40<span className="pricing-period">/hour</span></div>
              <p className="card-description">
                Post-test confidence building. Master motorway and challenging conditions.
              </p>
              <ul className="card-features">
                <li>Motorway driving</li>
                <li>Night driving skills</li>
                <li>All-weather training</li>
                <li>Advanced techniques</li>
              </ul>
              <a href="#booking" className="card-cta">Book Now →</a>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="section">
          <div className="section-header">
            <span className="section-tag">Pricing</span>
            <h2 className="section-title">Transparent, Competitive Rates</h2>
            <p className="section-subtitle">Choose the package that suits your needs and budget</p>
          </div>
          <div className="pricing-grid">
            <div className="pricing-card" onClick={() => scrollToSection('booking')}>
              <h4 className="pricing-title">Hourly Lessons</h4>
              <div className="pricing-price">£35<span className="pricing-period">/hr</span></div>
              <ul className="card-features">
                <li>Pay as you go flexibility</li>
                <li>Manual or automatic</li>
                <li>Available 7 days a week</li>
                <li>Door-to-door service</li>
                <li>Progress tracking included</li>
              </ul>
              <button className="btn btn-primary" style={{width: '100%'}}>Select Package</button>
            </div>
            <div className="pricing-card featured" onClick={() => scrollToSection('booking')}>
              <span className="pricing-badge">Most Popular</span>
              <h4 className="pricing-title">10-Hour Block</h4>
              <div className="pricing-price">£330</div>
              <ul className="card-features">
                <li>Save £20 off regular price</li>
                <li>10 consecutive lessons</li>
                <li>Structured learning plan</li>
                <li>Priority booking</li>
                <li>Mock test option</li>
              </ul>
              <button className="btn btn-primary" style={{width: '100%'}}>Select Package</button>
            </div>
            <div className="pricing-card" onClick={() => scrollToSection('booking')}>
              <h4 className="pricing-title">Refresher Course</h4>
              <div className="pricing-price">£120</div>
              <ul className="card-features">
                <li>3-lesson package</li>
                <li>Rebuild confidence</li>
                <li>Refresh your skills</li>
                <li>Ideal for returning drivers</li>
                <li>Personalized focus areas</li>
              </ul>
              <button className="btn btn-primary" style={{width: '100%'}}>Select Package</button>
            </div>
          </div>
          <div style={{textAlign: 'center', marginTop: 'var(--spacing-xl)', color: 'var(--text-secondary)'}}>
            <p>💡 <strong>Note:</strong> Click any pricing option to continue with your booking</p>
          </div>
        </section>

        {/* Areas Covered */}
        <section id="areas" className="section">
          <div className="section-header">
            <span className="section-tag">Service Areas</span>
            <h2 className="section-title">Serving Greater Manchester & Surrounding Areas</h2>
            <p className="section-subtitle">Professional instruction available across the region</p>
          </div>
          <div className="card-grid">
            {[
              { name: 'Rochdale', detail: 'Manual & auto lessons across OL11 / OL12' },
              { name: 'Manchester', detail: 'City-centre pick-up plus Salford Quays' },
              { name: 'Bury', detail: 'Routes through Pimhole, Fishpool, Walshaw' },
              { name: 'Oldham', detail: 'Royton, Chadderton, and Saddleworth roads' },
              { name: 'Middleton', detail: 'M60 corridor, Mills Hill, Langley' },
              { name: 'Bacup', detail: 'Pennine lanes and hill-start coaching' }
            ].map((area) => (
              <div key={area.name} className="premium-card">
                <div className="card-icon">📍</div>
                <h4 className="card-title">{area.name}</h4>
                <p className="card-description">{area.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Testimonials */}
        <section id="testimonials" className="section">
          <div className="section-header">
            <span className="section-tag">Reviews</span>
            <h2 className="section-title">What Our Students Say</h2>
            <p className="section-subtitle">Real feedback from real students</p>
          </div>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src={success01} alt="Safiya K" className="testimonial-avatar" />
                <div className="testimonial-info">
                  <h5>Safiya K.</h5>
                  <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="testimonial-text">
                "Bash made parallel parking feel effortless. I passed first time at the Cheetham Hill test centre. 
                The instruction was clear, patient, and incredibly professional."
              </p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src={success02} alt="Daniel W" className="testimonial-avatar" />
                <div className="testimonial-info">
                  <h5>Daniel W.</h5>
                  <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="testimonial-text">
                "Clear feedback after every lesson and super flexible with my shift work schedule. 
                Highly recommend to anyone looking for quality driving instruction."
              </p>
            </div>
            <div className="testimonial-card">
              <div className="testimonial-header">
                <img src={success03} alt="Amelia B" className="testimonial-avatar" />
                <div className="testimonial-info">
                  <h5>Amelia B.</h5>
                  <div className="testimonial-stars">⭐⭐⭐⭐⭐</div>
                </div>
              </div>
              <p className="testimonial-text">
                "Passed in Rochdale with flying colors! The mock tests really prepared me for the real thing. 
                Best driving school in Manchester hands down."
              </p>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section id="success" className="section">
          <div className="section-header">
            <span className="section-tag">Success Stories</span>
            <h2 className="section-title">Celebrating Our Newly Qualified Drivers</h2>
            <p className="section-subtitle">Join hundreds of successful students who've passed with Bash Driving School</p>
          </div>
          
          {/* Success Gallery Grid */}
          <div className="success-gallery">
            {[
              { name: 'Amelia B.', detail: 'Passed in Rochdale', image: success01 },
              { name: 'Imran S.', detail: 'First-time pass', image: success02 },
              { name: 'Naiema K.', detail: 'Mock-test champion', image: success03 },
              { name: 'Syeeda L.', detail: 'Confidence refresher', image: success04 },
              { name: 'Yusuf D.', detail: 'Fast-track intensive', image: success05 },
              { name: 'Haroon M.', detail: 'Route-ready', image: success06 },
              { name: 'Hiba R.', detail: 'Motorway-ready', image: success07 },
              { name: 'Tariq J.', detail: 'License secured', image: success08 }
            ].map((student) => (
              <div key={student.name} className="success-card">
                <div className="success-image-wrapper">
                  <img src={student.image} alt={student.name} />
                  <div className="success-overlay">
                    <div className="success-check">✓</div>
                  </div>
                </div>
                <div className="success-info">
                  <h5>{student.name}</h5>
                  <p>{student.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Booking Form */}
        <section id="booking" className="section">
          <div className="section-header">
            <span className="section-tag">Book Now</span>
            <h2 className="section-title">Ready to Start Your Driving Journey?</h2>
            <p className="section-subtitle">Fill out the form below and we'll get back to you within 24 hours</p>
          </div>
          
          <div className="booking-container">
            <div className="form-steps">
              <div className={`form-step ${formStep >= 1 ? 'active' : ''} ${formStep > 1 ? 'completed' : ''}`}>
                <div className="step-circle">{formStep > 1 ? '✓' : '1'}</div>
                <span className="step-label">Personal Info</span>
              </div>
              <div className={`form-step ${formStep >= 2 ? 'active' : ''} ${formStep > 2 ? 'completed' : ''}`}>
                <div className="step-circle">{formStep > 2 ? '✓' : '2'}</div>
                <span className="step-label">Lesson Details</span>
              </div>
              <div className={`form-step ${formStep >= 3 ? 'active' : ''}`}>
                <div className="step-circle">3</div>
                <span className="step-label">Submit</span>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit}>
              {formStatus.type !== 'idle' && formStatus.type !== 'loading' && (
                <div className="form-status-message" style={{
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-lg)',
                  marginBottom: 'var(--spacing-md)',
                  background: formStatus.type === 'success' ? '#d1fae5' : '#fee2e2',
                  color: formStatus.type === 'success' ? '#065f46' : '#991b1b',
                  fontWeight: 600,
                  fontSize: '0.9375rem'
                }}>
                  {formStatus.message}
                </div>
              )}
              
              {formStep === 1 && (
                <>
                  <div className="form-group">
                    <label>Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="John Smith"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="john.smith@example.com"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="07855 595 078"
                      required
                    />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn btn-primary" onClick={nextStep}>
                      Next Step →
                    </button>
                  </div>
                </>
              )}

              {formStep === 2 && (
                <>
                  <div className="form-group">
                    <label>Lesson Type *</label>
                    <select
                      name="lessonType"
                      value={formData.lessonType}
                      onChange={handleInputChange}
                      required
                    >
                      <option value="">Select your preferred lesson type</option>
                      <option value="Manual Lessons">Manual Lessons</option>
                      <option value="Automatic Lessons">Automatic Lessons</option>
                      <option value="Intensive Course">Intensive Course</option>
                      <option value="Pass Plus">Pass Plus</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Pick-up Address *</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      rows={3}
                      placeholder="Street address, town, postcode (e.g., 123 High Street, Manchester, M1 1AA)"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Your Availability</label>
                    <input
                      type="text"
                      name="availability"
                      value={formData.availability}
                      onChange={handleInputChange}
                      placeholder="e.g., Weekdays after 5pm, Weekends"
                    />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn btn-ghost" onClick={prevStep}>
                      ← Back
                    </button>
                    <button type="button" className="btn btn-primary" onClick={nextStep}>
                      Next Step →
                    </button>
                  </div>
                </>
              )}

              {formStep === 3 && (
                <>
                  <div className="form-group">
                    <label>Additional Information</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us about your experience level or any questions you have"
                    />
                  </div>
                  <div className="form-actions">
                    <button type="button" className="btn btn-ghost" onClick={prevStep}>
                      ← Back
                    </button>
                    <button type="submit" className="btn btn-warm">
                      🚗 Send Booking Request
                    </button>
                  </div>
                  {formStatus.type !== 'idle' && (
                    <div style={{
                      marginTop: 'var(--spacing-md)',
                      padding: 'var(--spacing-md)',
                      borderRadius: 'var(--radius-lg)',
                      background: formStatus.type === 'success' ? '#d1fae5' : formStatus.type === 'error' ? '#fee2e2' : '#e0e7ff',
                      color: formStatus.type === 'success' ? '#065f46' : formStatus.type === 'error' ? '#991b1b' : '#3730a3',
                      fontWeight: 600
                    }}>
                      {formStatus.message}
                    </div>
                  )}
                </>
              )}
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-column">
            <h5>Bash Driving School</h5>
            <p>
              Professional driving instruction across Greater Manchester since 2012. 
              Helping learners become safe, confident drivers with expert tuition and personalized support.
            </p>
            <div className="footer-social">
              <a href="https://www.facebook.com/bashdrivingschool" className="social-icon" target="_blank" rel="noreferrer">
                f
              </a>
              <a href="https://www.tiktok.com/@bashdriving" className="social-icon" target="_blank" rel="noreferrer">
                T
              </a>
            </div>
          </div>
          
          <div className="footer-column">
            <h5>Quick Links</h5>
            <ul>
              <li><button onClick={() => scrollToSection('home')}>Home</button></li>
              <li><button onClick={() => scrollToSection('about')}>About Us</button></li>
              <li><button onClick={() => scrollToSection('services')}>Services</button></li>
              <li><button onClick={() => scrollToSection('courses')}>Courses</button></li>
              <li><button onClick={() => scrollToSection('pricing')}>Pricing</button></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h5>Training Info</h5>
            <ul>
              <li>Manual Lessons</li>
              <li>Automatic Lessons</li>
              <li>Intensive Courses</li>
              <li>Pass Plus Training</li>
              <li>Mock Test Preparation</li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h5>Contact Info</h5>
            <ul>
              <li>📞 07855 595 078</li>
              <li>✉️ info@bashdrivingschool.com</li>
              <li>📍 Greater Manchester & Oldham</li>
              <li>🕒 Mon - Sun: 8am - 8pm</li>
            </ul>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} Bash Driving School. All rights reserved. | DVSA Approved Driving Instructors</p>
        </div>
      </footer>
    </div>
  )
}

export default App
