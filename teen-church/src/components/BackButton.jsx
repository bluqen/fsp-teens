import { Link } from "react-router-dom"

export const BackHomeButton = () => (
  <Link
    to="/"
    className="fixed top-6 left-6 bg-purple-600 text-white px-4 py-2 rounded-full text-sm sm:text-base font-semibold shadow-lg hover:bg-purple-700 transition-all z-50"
  >
    ← Home
  </Link>
)
