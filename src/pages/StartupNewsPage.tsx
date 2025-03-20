import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const API_KEY = "7a72785be34f4aecaf20cd4bb94bc02b"; // Replace with your actual API key
const BASE_URL = "https://newsapi.org/v2/everything";

// Specific startup-related keywords for better filtering
const keywords = [
  "startup funding", "startup investment", "startup launch"
];

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
            q: keywords.join(" OR "), // Search for multiple startup-related topics
            language: "en", // Fetch only English news
            sortBy: "publishedAt", // Get the latest news first
            apiKey: API_KEY,
            sources: "techcrunch,forbes,entrepreneur,business-insider",
          },
        });

        setNews(response.data.articles);
      } catch (err) {
        setError("Failed to fetch startup news. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []); // Runs once on mount

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
              {article.urlToImage && (
                <img src={article.urlToImage} alt={article.title} className="w-full h-40 object-cover rounded" />
              )}
              <h2 className="text-xl font-semibold mt-2">{article.title}</h2>
              <p className="text-sm text-gray-600">{article.source.name}</p>
              <a
                href={article.url}
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
