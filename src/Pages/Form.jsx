import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Mail } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.email ||
      !formData.subject ||
      !formData.message
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    toast.success(`Message sent by ${formData.name} 🎉`, { autoClose: 3000 });
    console.log("Collected Data:", formData);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-10">
      <form
        onSubmit={handleSubmit}
        className="relative bg-[#111]/80 backdrop-blur-md border border-[#ff2c40]/50 rounded-2xl p-8 w-full max-w-lg shadow-lg"
        data-aos="fade-up"
      >
        {/* Header */}
        <div className="flex flex-col items-center mb-8" data-aos="zoom-in">
          <Mail className="text-[#ff2c40]" size={40} />
          <h2 className="text-3xl font-bold text-white mt-3">Get In Touch</h2>
          <p className="text-gray-400 text-sm text-center">
            Fill out the form and we'll get back to you as soon as possible.
          </p>
        </div>

        {/* Input Fields */}
        <div className="space-y-5">
          <div data-aos="fade-right" data-aos-delay="100">
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              type="text"
              required
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-[#ff2c40] outline-none shadow-sm"
            />
          </div>

          <div data-aos="fade-right" data-aos-delay="200">
            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email Address"
              type="email"
              required
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-[#ff2c40] outline-none shadow-sm"
            />
          </div>

          <div data-aos="fade-right" data-aos-delay="300">
            <input
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              placeholder="Subject"
              type="text"
              required
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-[#ff2c40] outline-none shadow-sm"
            />
          </div>

          <div data-aos="fade-right" data-aos-delay="400">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Your Message..."
              rows={4}
              required
              className="w-full p-3 rounded-lg bg-black/40 border border-gray-700 text-white placeholder-gray-400 focus:border-[#ff2c40] outline-none shadow-sm resize-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div data-aos="zoom-in-up" data-aos-delay="500">
          <button
            type="submit"
            className="mt-6 w-full py-3 rounded-lg bg-[#ff2c40] hover:bg-[#e60023] text-white font-bold shadow-lg shadow-[#ff2c40]/30 transition-all"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;
