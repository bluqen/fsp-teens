import React from "react";
import HomePage from "./pages/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Footer } from "./components/Cards";
import EventsPage from "./pages/EventsPage";
import AnnouncementsPage from "./pages/AnnouncementsPage";
import AlbumPage from "./pages/AlbumPage";
import LocationPage from "./pages/LocationPage";
import ScrollToTop from "./pages/ScrollToTop";

const App = () => {
  return (
    <main className="">
      <BrowserRouter>
      <ScrollToTop />
        <NavBar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/announcements" element={<AnnouncementsPage />} />
          <Route path="/album" element={<AlbumPage />} />
          <Route path="/location" element={<LocationPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </main>
  );
};

export default App;
