import React from "react";
import Aos from "aos";
import "aos/dist/aos.css";
import { useRef } from "react";
import emailjs from "@emailjs/browser";
import { Link } from "react-router-dom";

Aos.init();

const EMAIL_SERVICE_ID = import.meta.env.VITE_EMAIL_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY;

function ContactForm() {
  const form = useRef();

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        EMAIL_SERVICE_ID, // 🔹 replace
        TEMPLATE_ID, // 🔹 replace
        form.current,
        PUBLIC_KEY // 🔹 replace
      )
      .then(
        () => {
          alert("✅ Message sent successfully!");
          form.current.reset();
        },
        (error) => {
          console.error(error);
          alert("❌ Something went wrong. Please try again.");
        }
      );
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="max-w-md shadow-2xl rounded-2xl p-6 space-y-4"
    >
      <input
        type="text"
        name="user_name"
        placeholder="Your Name"
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 text-blue-100"
      />

      <input
        type="email"
        name="user_email"
        placeholder="Your Email"
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <textarea
        name="message"
        rows="4"
        placeholder="Your Message"
        required
        className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      ></textarea>

      <button
        type="submit"
        className="w-full bg-secondary text-white py-2 rounded-md hover:scale-105 transition-all"
      >
        Send
      </button>
    </form>
  );
}

export const HeadCards = ({ img_path, title, description, className }) => {
  return (
    <div
      className={`w-64 h-72 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 flex items-center justify-center p-4 flex-col rounded-4xl ${className}`}
    >
      <img
        src={img_path}
        alt="Logo"
        className="max-w-full max-h-full object-contain border-2 border-gray-300 px-2 py-6 rounded-4xl"
      />
      <h3 className="text-gray-400 font-extrabold font-sans">{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export const Cards = () => {
  return <div></div>;
};

export const WideCard = ({
  accent,
  title,
  subTitle,
  info,
  img,
  button,
  type,
  imgTitle,
  buttonLink
}) => {
  // Map accent values to full Tailwind classes
  const accentColorClass = {
    "purple-600": "text-primary",
    "red-500": "text-red-500",
    "blue-500": "text-blue-500",
    "white-purple": "text-white",
  };
  const accentBgColorClass = {
    "purple-600": "bg-transparent",
    "red-500": "bg-white",
    "blue-500": "bg-white",
    "white-purple": "bg-primary",
  };

  return (
    <div
      className={`${accentColorClass[accent]} ${
        accentBgColorClass[accent]
      } w-full md:max-w-3xl lg:max-w-4xl ${type === 'location' ? 'py-10 md:py-0' : 'py-10'} px-4 flex-col items-center`}
    >
      <div data-aos="fade-up" data-aos-duration="1000">
        {img && type !== "album" && (
          <img src={img} alt="Logo" className="max-w-full max-w-96 h-auto" />
        )}
        <p
          data-aos="fade-up"
          data-aos-duration="1000"
          className={`${
            accentColorClass[accent] || "text-gray-800"
          } font-sans text-4xl mt-5 text-center font-bold`}
        >
          {title}
        </p>
        <p
          className={`${
            accentColorClass[accent] || "text-gray-800"
          } font-sans text-xl mt-2 text-center`}
        >
          {subTitle}{" "}
          {(type === "album" && (
            <i className="fa-solid fa-chevron-down text-xl animate-bounce ml-2"></i>
          )) ||
            (type === "location" && (
              <i className="fa-solid fa-chevron-down text-xl animate-bounce ml-2"></i>
            ))}
        </p>
        <p
          className={`flex justify-center ${
            accentColorClass[accent] || "text-gray-800"
          } font-inter text-md mt-8`}
        >
        </p>
          {info}
        {type === "album" && (
          <>
          <div className="flex flex-col items-center">
            <img src={img} alt="Logo" className="max-w-100 max-h-100 " />
            <p className="text-center font-inter text-gray-300">{imgTitle}</p></div>
          </>
        )}
        {button && (
          <div className="flex justify-end md:justify-center">
            <Link to={buttonLink} className="mt-10 px-5 py-3 cursor-pointer text-white text-xl bg-secondary rounded-3xl">
              {button}
            </Link>
          </div>
        )}
        {type === "contact" && (
          <div className="flex justify-center">
            <ContactForm />
          </div>
        )}
      </div>
    </div>
  );
};

export const Footer = () => {
  return (
    <footer className="w-full bg-gray-900 text-gray-300 py-10 px-6">
      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 text-center md:text-left text-theme-background-light">
        {/* Column 1 - Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-primary mb-2">FSP Teens</h2>
          <p className="text-sm leading-relaxed text-gray-400">
            We are the teens' arm of RCCG Faith Sanctuary Parish — a place where young
            hearts grow in faith, discover purpose, and shine the light of
            Christ. 🌟
          </p>
        </div>

        {/* Column 2 - Quick Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-primary">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/album" className="hover:text-primary transition">
                Album
              </Link>
            </li>
            <li>
              <Link to="/events" className="hover:text-primary transition">
                Events
              </Link>
            </li>
            <li>
              <Link to="/announcements" className="hover:text-primary transition">
                Announcements
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3 - Contact / Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-3 text-primary">
            Stay Connected
          </h3>
          
          <div className="flex gap-3">
            <i class="fa-solid fa-location-dot"></i>
            <p className="text-sm mb-4 text-gray-400">30 Ibari St, off Iju Road, Ifako Agege, Lagos.</p>
          </div>
          <div className="flex gap-3">
            <i class="fa-solid fa-envelope"></i>
            <p className="text-sm mb-4 text-gray-400">rccgfaithsanctuary@gmail.com</p>
          </div>
          
          <div className="flex gap-3">
            <i class="fa-solid fa-phone"></i>
            <p className="text-sm mb-4 text-gray-400">+234 805 669 9920</p>
          </div>
          <br />
          <p className="text-sm mb-4 text-gray-400">
            RCCG FSP Parish, Lagos
            <br />
            Sunday Service: 9:00 AM – 11:00 AM
          </p>
          <div className="flex justify-center md:justify-start space-x-4 text-lg">
            <a
              href="https://www.instagram.com/rccgfaithsanctuary_lp77?igsh=OTd0NXFianZ1M25x"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a
              href="https://web.facebook.com/faithsanctuaryparish.lagos.75"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <i className="fab fa-facebook"></i>
            </a>
            <a
              href="https://www.youtube.com/@rccgfsplp7769"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition"
            >
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>

      <hr className="my-8 border-gray-700" />

      {/* Copyright */}
      <p className="text-center text-sm text-gray-500">
        © {new Date().getFullYear()} FSP Teens — All rights reserved.
        <span className="block text-gray-600 mt-1">
          Made with 💜 by{" "}
          <a
            className="text-blue-500 font-caprasimo"
            href="https://github.com/bluqen"
          >
            Bluqen
          </a>
        </span>
      </p>
    </footer>
  );
};
