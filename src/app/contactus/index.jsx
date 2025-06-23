import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Mail, Phone, MapPin, X } from 'lucide-react';

const ContactUs = () => {
  const form = useRef();
  const [showPopup, setShowPopup] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm('service_njp98gh', 'template_cvlx8jr', form.current, {
        publicKey: 'YIB8LUK9e6xL3l6HB',
      })
      .then(
        () => {
          console.log('SUCCESS!');
          setShowPopup(true);
          form.current.reset();
        },
        (error) => {
          console.log('FAILED...', error.text);
          alert("Failed to send message. Please try again.");
        },
      );
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-16 px-4 relative">
      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 bg-white/20 backdrop-blur-md flex items-center justify-center px-4">
        <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 text-center relative">
          <button
            onClick={() => setShowPopup(false)}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
          <h3 className="text-xl font-semibold text-green-600 mb-2">Message Sent!</h3>
          <p className="text-gray-600">Thank you for contacting us. We'll get back to you soon.</p>
          <button
            onClick={() => setShowPopup(false)}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          >
            Close
          </button>
        </div>
        </div>
      
      )}

      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-4">Contact Us</h2>
        <p className="text-center text-gray-600 mx-auto mb-12">
          Have questions or need help? Reach out to us — we're here to assist you 24/7.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Contact Info */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <MapPin className="text-blue-600 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900">Our Office</h4>
                  <p className="text-gray-600">123 Hotel Lane, Travel City, India</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Phone className="text-blue-600 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900">Phone</h4>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <Mail className="text-blue-600 w-6 h-6 mt-1" />
                <div>
                  <h4 className="font-semibold text-blue-900">Email</h4>
                  <p className="text-gray-600">support@innspiration.com</p>
                </div>
              </div>
            </div>
            {/* Map */}
            <div className="rounded-lg overflow-hidden shadow-md border border-white mt-6">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086002143855!2d-122.41941568468115!3d37.7749297797596!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808cfeee2fcf%3A0xbba7b1c364a7ea3f!2sHotel%20Example!5e0!3m2!1sen!2sin!4v1641782619076"
                width="100%"
                height="200"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-2xl shadow-lg transition-all duration-300">
            <form ref={form} onSubmit={sendEmail} className="space-y-5">
              {/* Hidden inputs for template variables */}
              <input type="hidden" name="to_name" value="Sankarshan Pradhan" />
              <input type="hidden" name="to_email" value="support@innspiration.com" />

              <input
                type="text"
                name="from_name"
                placeholder="Your Name"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="email"
                name="from_email"
                placeholder="Your Email"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              />
              <input
                type="text"
                name="subject"
                placeholder="Subject"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <textarea
                name="message"
                rows="4"
                placeholder="Your Message"
                className="w-full p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                required
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md font-medium hover:bg-blue-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
