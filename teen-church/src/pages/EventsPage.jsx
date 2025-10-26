import React, { useEffect, useState } from "react";
import { BackHomeButton } from "../components/BackButton";

export async function fetchEvents() {
  const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
  const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
  const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?sort[0][field]=Date&sort[0][direction]=asc`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!res.ok) throw new Error("Failed to fetch events");

    const data = await res.json();
    return data.records;
  } catch (err) {
    console.error("Error fetching events:", err);
    return [];
  }
}

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      const records = await fetchEvents();
      setEvents(records);
      setLoading(false);
    };
    loadEvents();
  }, []);

  if (loading)
    return (
      <p className="text-center py-20 text-lg">
        Loading events... <i className="fa fa-spinner fa-spin"></i>
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-theme-background-light via-white to-blue-100 py-16 px-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-theme-primary">
        Upcoming Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No upcoming events yet.</p>
      ) : (
        <div className="max-w-5xl mx-auto grid gap-10 sm:grid-cols-2 md:grid-cols-3 justify-center">
          {events.map(({ id, fields }) => (
            <div
              key={id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col"
            >
              {fields.Image?.[0]?.url && (
                <img
                  src={fields.Image[0].url}
                  alt={fields.Name}
                  className="rounded-xl mb-4 h-56 w-full object-cover cursor-pointer"
                  onClick={() => setSelectedImage(fields.Image[0].url)}
                />
              )}
              <h2 className="text-2xl font-bold text-theme-primary mb-1">
                {fields.Name}
              </h2>
              <p className="text-sm text-gray-500">
                {fields.Date} at {fields.Time} — {fields.Location}
              </p>
              <p className="mt-3 text-gray-700 leading-relaxed">
                {fields.Description}
              </p>
            </div>
          ))}
        </div>
      )}

      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={() => setSelectedImage(null)}
            className="absolute top-5 right-5 text-white text-5xl font-light hover:text-gray-300 transition"
            aria-label="Close image"
          >
            &times;
          </button>
          <img
            src={selectedImage}
            alt="Enlarged event"
            className="max-w-full max-h-full object-contain rounded-lg"
            // Prevent modal from closing when clicking on the image itself
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default EventsPage;