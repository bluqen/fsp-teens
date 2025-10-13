import React from "react";
import { BackHomeButton } from "../components/BackButton";
import NavBar from "../components/NavBar";
import { Footer } from "../components/Cards";

const LocationPage = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-purple-100">
      <main className="flex-grow py-16 px-6">
        <h1 className="text-4xl sm:text-5xl font-bold text-center mb-10 text-purple-800">
          📍 Find Us
        </h1>

        <div className="max-w-5xl mx-auto text-center mb-10">
          <p className="text-lg text-gray-700">
            We meet every Sunday at <strong>RCCG Faith Sanctuary Parish</strong> <span className="font-bold font-serif text-2xl text-gradient-2">Teens Church</span>
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-purple-200">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3963.110870452663!2d3.3259154758400395!3d6.633150321877625!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b915d26b54745%3A0x9e7702b300fd09a8!2sRCCG%20Faith%20Sanctuary%20Parish!5e0!3m2!1sen!2sng!4v1760351003685!5m2!1sen!2sng"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="text-center mt-10">
          <a
            href="https://maps.app.goo.gl/yoiQ4fwdh7t7VZCB8"
            target="_blank"
            rel="noopener noreferrer"
            className="text-purple-700 hover:text-purple-900 underline"
          >
            Open in Google Maps
          </a>
        </div>

      </main>
      <Footer />
    </div>
  );
};

export default LocationPage;
