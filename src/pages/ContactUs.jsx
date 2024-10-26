import React, { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form submission logic here (e.g., send data to backend)
    alert("Thank you for contacting us!");
    setFormData({ name: '', email: '', message: '' }); // Reset form after submission
  };

  return (
    <div className="min-h-screen bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-white mb-6">
          <span className="text-purple-500">Contact</span>{' '}
          <span className="text-teal-400">Us</span>
        </h1>
        <p className="text-center text-gray-300 mb-8">
          We're here to help! Feel free to reach out with any questions or feedback.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-400"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-300 mb-2" htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="5"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold hover:bg-purple-600 transition-colors duration-300"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
