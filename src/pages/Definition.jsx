import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import { FaArrowLeft, FaRegBookmark, FaPlay } from "react-icons/fa";

const supabase = createClient(
  "https://zcjxkiumbmmqeetouwrq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjanhraXVtYm1tcWVldG91d3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NzgwODQsImV4cCI6MjA1NDU1NDA4NH0.dXF58HghMOt4Be9q51_3L8wPFLmtmVmMZWNNl9egL7Y"
);

export default function Definition() {
  const { word } = useParams();
  const [definition, setDefinition] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDefinition = async () => {
      const { data, error } = await supabase
        .from("words")
        .select("*")
        .eq("word", word)
        .single();

      if (error) {
        console.error("Error fetching definition:", error);
      } else {
        setDefinition(data);
      }
      setLoading(false);
    };

    fetchDefinition();
  }, [word]);

  if (loading) {
    return <div className="text-center p-10 text-lg">Loading...</div>;
  }

  if (!definition) {
    return <div className="text-center p-10 text-lg">Definition not found.</div>;
  }

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 pt-12">
      <div className="w-full max-w-2xl p-6">
        {/* Top Icons */}
        <div className="flex justify-between items-center mb-6">
          <FaArrowLeft  onClick={() => navigate(-1)} className="text-gray-600 cursor-pointer text-2xl" />
          <FaRegBookmark className="text-gray-600 cursor-pointer text-2xl" />
        </div>

        {/* Header Card */}
        <div className="relative bg-gradient-to-r from-indigo-900 to-indigo-700 p-6 rounded-2xl shadow-xl flex items-center justify-between">
          <h2 className="text-white font-bold text-2xl">{definition.word}</h2>
          <div className="bg-red-400 p-3 rounded-full">
            <FaPlay className="text-white text-lg" />
          </div>
        </div>

        {/* Definition Content */}
        <div className="bg-white p-8 mt-6 rounded-2xl shadow-xl">
          <h3 className="font-semibold text-gray-900 text-xl">{definition.word}</h3>
          <p className="text-gray-600 mt-2">{definition.definition}</p>
        </div>
      </div>
    </div>
  );
}
