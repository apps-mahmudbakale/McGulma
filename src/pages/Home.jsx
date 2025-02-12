import { FaSearch, FaBookmark } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HomeLogo from "../assets/HomeLogo2.png";
import { createClient } from "@supabase/supabase-js";
import { debounce } from "lodash";

const supabase = createClient(
  "https://zcjxkiumbmmqeetouwrq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjanhraXVtYm1tcWVldG91d3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NzgwODQsImV4cCI6MjA1NDU1NDA4NH0.dXF58HghMOt4Be9q51_3L8wPFLmtmVmMZWNNl9egL7Y"
);

const Home = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [selectedWord, setSelectedWord] = useState(null);
  const [definition, setDefinition] = useState("");

  useEffect(() => {
    if (query.length > 1) {
      fetchWords(query);
    } else {
      setResults([]);
    }
  }, [query]);

  const fetchWords = debounce(async (searchTerm) => {
    const { data, error } = await supabase
      .from("words")
      .select("*")
      .ilike("word", `%${searchTerm}%`);

    if (error) {
      console.error("Supabase Error:", error);
    } else {
      setResults(data);
    }
  }, 200);

  const fetchDefinition = async (word) => {
    setSelectedWord(word);
    setQuery(""); // Clear search input
    setResults([]); // Clear results list

    const { data, error } = await supabase
      .from("words")
      .select("definition")
      .eq("word", word)
      .single();

    if (error) {
      console.error("Error fetching definition:", error);
      setDefinition("Definition not found.");
    } else {
      setDefinition(data.definition);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Content Container */}
      <div className="text-center w-full max-w-2xl">
        <img
          src={HomeLogo}
          alt="Dictionary Illustration"
          className="w-[500px] mx-auto mb-4"
        />
        <h1 className="text-3xl font-bold text-red-500 sm:text-4xl">
          {/* McGulma’s Pharmaceutical Dictionary */}
          <span className="block text-lg text-gray-600">
            (Lexicon Pharmaceuticae McGulmae)
          </span>
        </h1>
        <p className="text-xl sm:text-2xl p-4 font-medium text-gray-600">
          Nigeria’s first pharmaceutical dictionary
        </p>
        <p className="text-xl sm:text-2xl font-medium italic text-blue-600">
          2,500+ definitions
        </p>

         {/* Search Bar */}
        <div className="relative mt-6 w-full">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Enter word"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full py-3 pl-12 pr-4 bg-white rounded-lg shadow-md focus:outline-none text-lg"
          />
        </div>

        {/* Search Results */}
        {results.length > 0 && (
          <ul className="mt-2 bg-white shadow-md rounded-lg max-h-60 overflow-auto w-full">
            {results.map((item) => (
              <li
                key={item.id}
                className="p-2 border-b hover:bg-gray-200 cursor-pointer"
                onClick={() => fetchDefinition(item.word)}
              >
                {item.word}
              </li>
            ))}
          </ul>
        )}
         {/* Definition Display */}
         {selectedWord && (
          <div className="mt-4 bg-white shadow-md rounded-lg p-4 text-gray-800">
            <h2 className="text-2xl font-bold text-red-500">{selectedWord}</h2>
            <p className="mt-2 text-lg">{definition || "Loading definition..."}</p>
          </div>
        )}

        {/* Publication Info */}
        <div className="mt-8 bg-white shadow-lg rounded-lg p-4 sm:p-6 max-w-lg mx-auto text-sm sm:text-base text-gray-700 text-center leading-relaxed">
          <p>
            <strong>First published in Nigeria in 2025</strong>
          </p>
          <p>
            ISBN: <span className="font-medium">978-978-774-985-5</span>
          </p>
          <p>National Library of Nigeria Cataloguing-in-Publication Data</p>
          <p>
            A catalog record for this book is available from the National
            Library of Nigeria.
          </p>
          <p className="mt-2 text-gray-800 font-semibold">
            © Dr. Kabiru Abubakar Gulma, 2025. All rights reserved!
          </p>
        </div>
      </div>

     
    </div>
  );
};

export default Home;
