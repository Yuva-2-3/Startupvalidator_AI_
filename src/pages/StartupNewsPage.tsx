import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = "pub_755307be4331f7b3077297be474e8fcebc8c1"; // ⚠️ Move this to .env for security
const BASE_URL = "https://newsdata.io/api/1/news";
const PLACEHOLDER_IMAGE = "/placeholder.png"; // ✅ Corrected Path

const StartupNewsPage: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(BASE_URL, {
          params: {
            apikey: API_KEY,
            q: "startup",
            country: "us",
            language: "en",
            category: "business",
          },
        });

        if (response.status !== 200 || !response.data.results) {
          throw new Error("Invalid response from API");
        }

        // ✅ Filter articles with valid images
        const articlesWithImages = response.data.results.filter(
          (article: any) => article.image_url && article.image_url !== "None"
        );

        setNews(articlesWithImages);
      } catch (err) {
        console.error("API Fetch Error:", err);
        setError("Failed to fetch startup news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-6">🚀 Latest Startup News</h1>

      {/* Loading and Error Handling */}
      {loading && <p className="text-center">Fetching the latest startup news...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      {/* News Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {news.length > 0 ? (
          news.map((article, index) => (
            <div key={index} className="p-4 border rounded-lg shadow-lg bg-white">
              <img
                src={article.image_url || PLACEHOLDER_IMAGE}
                alt={article.title}
                className="w-full h-40 object-cover rounded"
                onError={(e) => (e.currentTarget.src = PLACEHOLDER_IMAGE)} // ✅ Corrected
              />
              <h2 className="text-xl font-semibold mt-2">{article.title}</h2>
              <p className="text-sm text-gray-600">{article.source_id || "Unknown Source"}</p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 mt-2 block hover:underline"
              >
                Read more
              </a>
            </div>
          ))
        ) : (
          <p className="text-center">No relevant startup news found.</p>
        )}
      </div>

      {/* Back to Home Button */}
      <div className="text-center mt-6">
        <Link to="/" className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700">
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default StartupNewsPage;
