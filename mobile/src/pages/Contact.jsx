import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaClock, FaCheckCircle } from 'react-icons/fa';
import Button from '../components/Button';
import SectionHeading from '../components/SectionHeading';

const initialForm = { name: '', email: '', phone: '', business: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleReset = () => {
    setForm(initialForm);
    setSubmitted(false);
  };

  return (
    <section className="w-full px-4 py-8 bg-bg min-h-screen">
      <SectionHeading
        eyebrow="Get In Touch"
        title="Contact Us"
        subtitle="Have a question? Our team is ready to help."
        className="text-center mb-6"
      />

      <div className="flex flex-col gap-6 max-w-sm mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="space-y-4 rounded-3xl bg-surface border border-border p-5 shadow-sm">
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <FaMapMarkerAlt />
              </span>
              <div>
                <p className="font-semibold text-primary-text text-sm">Address</p>
                <p className="text-xs text-secondary-text">Industrial Estate, Kochi, Kerala</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <FaPhoneAlt />
              </span>
              <div>
                <p className="font-semibold text-primary-text text-sm">Phone</p>
                <a href="tel:+919999999999" className="text-xs text-secondary-text hover:text-accent">
                  +91 99999 99999
                </a>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10 text-accent">
                <FaEnvelope />
              </span>
              <div>
                <p className="font-semibold text-primary-text text-sm">Email</p>
                <a href="mailto:info@calormega.com" className="text-xs text-secondary-text hover:text-accent">
                  info@calormega.com
                </a>
              </div>
            </div>
          </div>

          <div className="mt-4 overflow-hidden rounded-2xl shadow-sm border border-border">
            <iframe
              title="CALOR MEGA location"
              src="https://www.google.com/maps?q=Kochi,Kerala,India&output=embed"
              width="100%"
              height="200"
              style={{ border: 0 }}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <div className="rounded-3xl bg-surface border border-border p-5 shadow-sm">
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <FaCheckCircle className="mb-4 text-4xl text-success" />
                <p className="text-lg font-bold text-primary-text">Message Sent!</p>
                <p className="mt-2 text-xs text-secondary-text">
                  Thank you. Our team will contact you shortly.
                </p>
                <Button variant="outline" className="mt-6 w-full justify-center" onClick={handleReset}>
                  Send Another
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  placeholder="Full Name"
                  className="rounded-xl border border-border bg-bg px-4 py-3 text-sm text-primary-text outline-none focus:ring-1 focus:ring-accent"
                />
                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="rounded-xl border border-border bg-bg px-4 py-3 text-sm text-primary-text outline-none focus:ring-1 focus:ring-accent"
                />
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  className="rounded-xl border border-border bg-bg px-4 py-3 text-sm text-primary-text outline-none focus:ring-1 focus:ring-accent"
                />
                <textarea
                  required
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Your Message"
                  className="w-full rounded-xl border border-border bg-bg px-4 py-3 text-sm text-primary-text outline-none focus:ring-1 focus:ring-accent"
                />
                <Button type="submit" variant="primary" className="w-full justify-center mt-2">
                  Submit
                </Button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  );
}