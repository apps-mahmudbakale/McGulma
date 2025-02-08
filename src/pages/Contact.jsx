import React, { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here, you can integrate an API to send the data
    alert("Thank you for your suggestion! We'll review it soon.");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-8 lg:px-16">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-red-500 mb-6">
          Contact & Suggestions
        </h1>
        <p className="text-gray-700 text-base sm:text-lg mb-4 text-center">
          <span className="font-semibold">We value your input!</span>  
          At <span className="font-semibold">McGulma's Pharmaceutical Dictionary</span>, we strive to provide a 
          comprehensive and up-to-date reference for pharmaceutical terms.
        </p>
        <p className="text-gray-700 text-base sm:text-lg mb-4 text-center">
          Pharmacy and medicine are constantly evolving, and new terms continue to emerge.
          If you've found a missing term or want to suggest improvements, we’d love to hear from you.
        </p>

        <p className="text-gray-700 text-base sm:text-lg mb-6 text-center">
          Your contributions help us build a more complete and accurate pharmaceutical knowledge base.  
          Reach out with your **suggestions, inquiries, or feedback** below:
        </p>

        {/* Contact Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter your name"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold">Suggestion</label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="4"
              placeholder="Enter your suggestion or feedback"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition duration-300"
          >
            Submit Suggestion
          </button>
        </form>

        <p className="text-gray-700 text-center text-base sm:text-lg mt-6">
          Thank you for being a part of <span className="font-semibold">McGulma's Pharmaceutical Dictionary</span>!
        </p>
      </div>
    </div>
  );
};

export default Contact;
