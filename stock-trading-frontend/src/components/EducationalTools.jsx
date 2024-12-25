/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import AxiosHelper from "../config/AxiosHelper";
import { isTokenExpired } from "../services/LoginService";
import { useNavigate } from "react-router-dom";

const EducationalTools = () => {
  const [resources, setResources] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Check if logged in
  useEffect(() => {
    async function isLogin() {
      try {
        if (!token || (await isTokenExpired(token))) {
          navigate("/login");
        }
      } catch (error) {
        console.log(error);
      }
    }
    isLogin();
  }, []);

  useEffect(() => {
    AxiosHelper.get("/stocks/education")
      .then((response) => setResources(response.data))
      .catch((error) =>
        console.error("Error fetching educational resources:", error)
      );
  }, []);

  return (
    <div className="min-h-screen">
      <div className="container mx-auto p-6">
        <div className="bg-gradient-to-br from-purple-500 to-purple-700 p-6 rounded-lg shadow-lg text-white mb-6">
          <h2 className="text-2xl font-bold text-center">
            Educational Resources
          </h2>
          <p className="text-center mt-2">
            Learn about trading and enhance your knowledge with these curated
            resources.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {resources.map((resource, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-lg p-4 hover:shadow-xl transition"
            >
              <h3 className="font-bold text-blue-600">{resource.title}</h3>
              <a
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline mt-2 block"
              >
                Learn More
              </a>
            </div>
          ))}
        </div>

        {/* Video Tutorials Section */}
        <div className="mt-12">
          <h2 className="text-xl font-bold text-center text-purple-700 mb-6">
            Video Tutorials
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            <div className="relative">
              <iframe
                width="400"
                height="280"
                src="https://www.youtube.com/embed/by9_zHQzeZk?si=WvE7U_q3vGHoIFO0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
            <div className="relative">
              <iframe
                width="400"
                height="280"
                src="https://www.youtube.com/embed/by9_zHQzeZk?si=WvE7U_q3vGHoIFO0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
            <div className="relative">
              <iframe
                width="400"
                height="280"
                src="https://www.youtube.com/embed/by9_zHQzeZk?si=WvE7U_q3vGHoIFO0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                className="rounded-lg shadow-lg"
              ></iframe>
            </div>
            <div className="relative">
              <iframe
                width="400"
                height="280"
                src="https://www.youtube.com/embed/dp_C2f03sr4?si=2-6dKaINkwAuFE3A"
                title="YouTube video player"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              ></iframe>
            </div>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="bg-purple-50 p-6 rounded-lg shadow-lg mt-12">
          <h2 className="text-xl font-bold text-center text-purple-700 mb-6">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <blockquote className="bg-white rounded-lg shadow-lg p-4">
              <p className="text-gray-700">
                "These resources helped me start trading with confidence!"
              </p>
              <footer className="mt-2 text-sm text-gray-500">- Alex</footer>
            </blockquote>
            <blockquote className="bg-white rounded-lg shadow-lg p-4">
              <p className="text-gray-700">
                "The video tutorials are easy to follow and very informative."
              </p>
              <footer className="mt-2 text-sm text-gray-500">- Priya</footer>
            </blockquote>
            <blockquote className="bg-white rounded-lg shadow-lg p-4">
              <p className="text-gray-700">
                "Thanks to this platform, I learned risk management strategies."
              </p>
              <footer className="mt-2 text-sm text-gray-500">- John</footer>
            </blockquote>
          </div>
        </div>
      </div>
      {/* Footer */}
      <footer className="mt-16 py-6 bg-gray-800 text-center">
        <p className="text-sm font-light text-gray-400">
          &copy; 2024 Stock Trading Simulator | All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default EducationalTools;
