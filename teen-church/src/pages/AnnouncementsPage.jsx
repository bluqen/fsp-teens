import { useEffect, useState } from "react"
import { BackHomeButton } from "../components/BackButton"

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY
const BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID
const TABLE_NAME = "Announcements"

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
          headers: {
            Authorization: `Bearer ${AIRTABLE_API_KEY}`,
          },
        })
        const data = await res.json()
        setAnnouncements(data.records)
      } catch (err) {
        console.error("Error fetching announcements:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchAnnouncements()
  }, [])

  if (loading)
    return (
      <div className="flex justify-center items-center h-screen text-gray-500 text-xl">
        Loading Announcements... <i className="fa fa-spinner fa-spin"></i>
      </div>
    )

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-50 via-white to-purple-200 py-20 px-4 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-primary mb-10">
        Announcements
      </h1>

      <div className="flex flex-col gap-6 max-w-2xl w-full">
        {announcements.length > 0 ? (
          announcements.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-2xl p-6 text-gray-700 text-lg"
            >
              {item.fields.Text}
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">
            No announcements right now. Check back soon!
          </p>
        )}
      </div>
    </div>
  )
}

export default AnnouncementsPage
