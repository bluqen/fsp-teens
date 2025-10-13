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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-100 py-16 px-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-purple-800">
        Upcoming Events
      </h1>

      {events.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No upcoming events yet.</p>
      ) : (
        <div className="max-w-5xl mx-auto grid gap-10 sm:grid-cols-2">
          {events.map(({ id, fields }) => (
            <div
              key={id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition p-6 flex flex-col"
            >
              {fields.Image && fields.Image[0] && (
                <img
                  src={fields.Image[0].url}
                  alt={fields.Name}
                  className="rounded-xl mb-4 h-56 w-full object-cover"
                />
              )}
              <h2 className="text-2xl font-bold text-purple-700 mb-1">
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
    </div>
  );
};

export default EventsPage;