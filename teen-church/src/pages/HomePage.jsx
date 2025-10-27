import React, { useEffect, useState } from "react";
import { WideCard } from "../components/Cards";
import { fetchEvents } from "./EventsPage";
import { fetchLatestPhoto } from "./AlbumPage";

const HomePage = () => {
  const [latestEvent, setLatestEvent] = useState(null); 
  const [latestPhoto, setLatestPhoto] = useState(null);
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const bgImages = ["/bg.png", "/bg1.png", "/bg2.png"];

  useEffect(() => {
    const getLatestEvent = async () => {
      const records = await fetchEvents();
      if (records.length > 0) {
        setLatestEvent(records[0].fields); // 👈 use the first (soonest) event
      }
    };
    const getLatestPhoto = async () => {
      const photo = await fetchLatestPhoto();
      setLatestPhoto(photo);
    };
    getLatestEvent();
    getLatestPhoto();

    const timer = setTimeout(() => {
      setShowButtonText(false);
    }, 5000);

    // Cleanup the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBgIndex((prevIndex) => (prevIndex + 1) % bgImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(intervalId);
  }, [bgImages.length]);

  return (
    <>
      <div className="main">
        <div className="header relative h-[80vh] bg-black">
          {/* Background Slideshow */}
          {bgImages.map((image, index) => (
            <div
              key={index}
              className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
              style={{
                backgroundImage: `linear-gradient(rgba(0,0,0,0.5),rgba(0,0,0,0.5)), url(${image})`,
                opacity: index === currentBgIndex ? 1 : 0,
              }}
            />
          ))}

          {/* Foreground content */}
          <div className="relative z-10 flex flex-col items-center justify-center h-full py-24">
            <h1 className="text-white text-6xl sm:text-7xl font-bold p-10 text-center">
              Welcome to our{" "}
              <span className="text-7xl font-bold font-caprasimo text-gradient">
                Teens
              </span>{" "}
              Church
            </h1>
            <p className="pt-0 sm:pt-10 text-gradient text-xl sm:text-2xl text-center">
              Rooted in Christ, Rising in Purpose...
            </p>

            <div>
              <a
                className="px-2"
                target="_blank"
                href="https://web.facebook.com/faithsanctuaryparish.lagos.75"
              >
                <i className="fa-brands fa-facebook text-white connect hover:text-blue-700"></i>
              </a>
              <a
                className="px-2"
                target="_blank"
                href="https://www.instagram.com/rccgfaithsanctuary_lp77?igsh=OTd0NXFianZ1M25x"
              >
                <i className="fa-brands fa-instagram text-white connect hover:text-pink-700"></i>
              </a>
              <a
                className="px-2"
                target="_blank"
                href="https://www.youtube.com/@rccgfsplp7769"
              >
                <i className="fa-brands fa-youtube text-white connect hover:text-red-700"></i>
              </a>
            </div>
          </div>
        </div>

        <div className="pt-30 main-body bg-gradient-to-r from-blue-50 via-white to-theme-background-light min-h-screen w-full flex flex-col items-center gap">
          <div id="about" className="w-full flex justify-center">
            <WideCard
              title="About Us"
              accent="white-purple"
              subTitle="Our Mission"
              info={
                <div className="space-y-4">
                  <p>
                    At FSP Teens, our mission is to raise a generation of
                    teenagers who know God personally, love Him passionately, and
                    live for Him intentionally. As a vibrant arm of the Redeemed
                    Christian Church of God (RCCG), we are committed to helping
                    young people grow in their relationship with Christ through
                    worship, prayer, the Word, and fellowship.
                  </p>
                  <p>
                    We believe every teen carries divine potential, and through
                    discipleship, mentorship, and service, we guide them to
                    discover their God-given purpose and walk boldly in it. We
                    strive to build a community where faith is alive, love is
                    genuine, and holiness is our lifestyle.
                  </p>
                  <p>
                    Our goal is to empower teens to stand firm in truth, lead
                    with integrity, and influence their world for Jesus—whether
                    in their schools, homes, or online spaces. At FSP Teens,
                    we’re not just preparing for the future; we are shaping it
                    through a generation of believers passionate about God and
                    committed to transforming their world for His glory.
                  </p>
                </div>
              }
            />
          </div>

          <div id="order-of-service" className="w-full flex justify-center">
            <WideCard
              title="Order of Service"
              accent="purple-600"
              subTitle="So you'll know just when it's time"
              info={
                <ul className="list-disc pl-10 space-y-3">
                  <li>
                    <strong>9:00 – 9:30 AM</strong> — Sunday School
                  </li>
                  <li>
                    <strong>9:30 – 9:45 AM</strong> — Praise & Worship
                  </li>
                  <li>
                    <strong>9:45 – 10:00 AM</strong> — Prayer
                  </li>
                  <li>
                    <strong>10:00 – 10:45 AM</strong> — The Word
                  </li>
                  <li>
                    <strong>10:45 – 11:00 AM</strong> — Testimonies,
                    Announcements & Closing
                  </li>
                </ul>
              }
            />
          </div>

          <div className="w-full flex justify-center">
            <WideCard
              title="Album"
              accent="white-purple"
              type="album"
              subTitle={
                latestPhoto
                  ? "The latest from our gallery"
                  : "Fetching latest photo..."
              }
              img={latestPhoto?.Image ? latestPhoto.Image[0].url : "/album.png"}
              imgTitle={latestPhoto?.Caption || "A moment from our service"}
              button="View more"
              buttonLink="/album"
            />
          </div>

          {/* 🆕 Latest Event Section */}
          <div className="w-full flex justify-center">
            <WideCard
              title="Events"
              accent="purple-600"
              type="album"
              subTitle={
                latestEvent ? latestEvent.Name : "Fetching latest event..."
              }
              img={
                latestEvent?.Image
                  ? latestEvent.Image[0].url
                  : "/placeholder-event.jpg"
              }
              imgTitle={
                latestEvent
                  ? `${latestEvent.Date} — ${latestEvent.Location}`
                  : "Stay tuned for updates"
              }
              button="View more"
              buttonLink="/events"
            />
          </div>

          <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start md:bg-white md:p-20">
            <WideCard
              title="Just Wanna Find Us?"
              accent="purple-600"
              subTitle="Use this easy guide"
              img="/location.png"
              button="Let's Go"
              type="location"
              buttonLink="/location"
            />
            <WideCard
              title="Join the Family"
              accent="white-purple"
              subTitle={"Get in touch, let's meet Sunday!"}
              type="contact"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
