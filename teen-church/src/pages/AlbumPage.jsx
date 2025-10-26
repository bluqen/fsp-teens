import React, { useEffect, useState } from "react";
import { BackHomeButton } from "../components/BackButton";

const API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_ALBUM_TABLE;

/**
 * Fetches the latest uploaded photo (for homepage preview)
 */
export async function fetchLatestPhoto() {
  try {
    const res = await fetch(
      `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?maxRecords=1&sort[0][field]=Created%20Time&sort[0][direction]=desc`,
      {
        headers: {
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );

    if (!res.ok) throw new Error(`Error fetching photo: ${res.status}`);

    const data = await res.json();
    return data.records.length > 0 ? data.records[0].fields : null;
  } catch (err) {
    console.error("Error fetching latest photo:", err);
    return null;
  }
}

const AlbumPage = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const res = await fetch(
          `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}?sort[0][field]=Created%20Time&sort[0][direction]=desc`,
          {
            headers: {
              Authorization: `Bearer ${API_KEY}`,
            },
          }
        );

        const data = await res.json();
        setPhotos(data.records);
      } catch (err) {
        console.error("Error fetching photos:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPhotos();
  }, []);

  if (loading)
    return (
      <p className="text-center py-20 text-lg">
        Loading album... <i className="fa fa-spinner fa-spin"></i>
      </p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-theme-background-light py-16 px-6">
      <h1 className="text-4xl sm:text-5xl font-bold text-center mb-12 text-theme-primary">
        <i className="fa-solid fa-camera"></i> Church Album
      </h1>

      {photos.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">No photos yet.</p>
      ) : (
        <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-2 md:grid-cols-3">
          {photos.map(({ id, fields }) => (
            <div
              key={id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition overflow-hidden"
            >
              {fields.Image && fields.Image[0] && (
                <img
                  src={fields.Image[0].url}
                  alt={fields.Caption || "Album photo"}
                  className="h-64 w-full object-cover cursor-pointer"
                  onClick={() => setSelectedImage(fields.Image[0].url)}
                />
              )}
              {fields.Caption && (
                <div className="p-4 text-center">
                  <p className="text-theme-primary font-medium">
                    {fields.Caption}
                  </p>
                </div>
              )}
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
            alt="Enlarged album photo"
            className="max-w-full max-h-full object-contain rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

export default AlbumPage;
