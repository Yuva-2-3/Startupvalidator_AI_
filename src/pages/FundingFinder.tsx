import { useState } from "react";

const FundingFinder = () => {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState("");
  const [country, setCountry] = useState("India");

  const fetchGrants = async () => {
    const apiKey = "AIzaSyAcldPiCea14rY7WWK3lzCKdt9LZK4DGoA";
    const searchEngineId = "65b32a2b78c204eb5";

    // Modify query based on selected country
    const countryQuery =
      country === "India" ? "site:gov.in OR site:org.in" : "";
    const fullQuery = `${query} ${countryQuery} startup funding`;

    const url = `https://www.googleapis.com/customsearch/v1?q=${fullQuery}&cx=${searchEngineId}&key=${apiKey}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.items) {
        setResults(data.items);
      } else {
        alert("No results found. Try a different keyword.");
      }
    } catch (error) {
      console.error("Error fetching grants:", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center text-purple-600 mb-4">
        Find Startup Grants
      </h2>

      {/* Search Bar & Country Filter */}
      <div className="flex gap-2 mb-6">
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
          placeholder="Search grants (e.g. AI funding India)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />

        {/* Country Dropdown */}
        <select
          className="border border-gray-300 p-2 rounded-lg"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option value="India">India</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Global">Global</option>
        </select>

        <button
          onClick={fetchGrants}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
        >
          Search
        </button>
      </div>

      {/* Display Results in Cards */}
      <div className="space-y-4">
        {results.map((item, index) => (
          <div
            key={index}
            className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg"
          >
            <a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lg font-semibold text-blue-600 hover:underline"
            >
              {item.title}
            </a>
            <p className="text-gray-700 mt-2">{item.snippet}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FundingFinder;
