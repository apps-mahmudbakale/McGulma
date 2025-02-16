import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  "https://zcjxkiumbmmqeetouwrq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjanhraXVtYm1tcWVldG91d3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NzgwODQsImV4cCI6MjA1NDU1NDA4NH0.dXF58HghMOt4Be9q51_3L8wPFLmtmVmMZWNNl9egL7Y"
);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [words, setWords] = useState([]);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [wordsPerPage] = useState(50);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user_id");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
    fetchWords();
  }, [navigate]);

  const fetchWords = async () => {
    const { data, error } = await supabase
      .from("words")
      .select("id, word, definition, published");
    if (error) console.error("Error fetching words:", error);
    else setWords(data);
  };

  const handleAddWord = async () => {
    if (!newWord || !definition) return;
    const { error } = await supabase
      .from("words")
      .insert([{ word: newWord, definition, published: false }]);
    if (!error) {
      fetchWords();
      setIsAddModalOpen(false);
      setNewWord("");
      setDefinition("");
    }
  };

  const togglePublished = async (wordId, currentStatus) => {
    await supabase
      .from("words")
      .update({ published: !currentStatus })
      .eq("id", wordId);
    fetchWords();
  };

  const handleViewWord = (word) => {
    setSelectedWord(word);
    setIsViewModalOpen(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/login");
  };

  const indexOfLastWord = currentPage * wordsPerPage;
  const indexOfFirstWord = indexOfLastWord - wordsPerPage;
  const currentWords = words.slice(indexOfFirstWord, indexOfLastWord);

  return (
    <div className="min-h-screen mt-[78px] bg-gray-100 p-6">
      <div className="max-w-full mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded"
        >
          Logout
        </button>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Words List</h2>
          <h2 className="text-lg font-semibold mb-2">
            Total Words: {words.length}
          </h2>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="mb-4 px-4 py-2 bg-blue-500 text-white rounded"
          >
            + Add Word
          </button>

          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">Word</th>
                <th className="border border-gray-300 p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentWords.map((word) => (
                <tr key={word.id} className="border border-gray-300">
                  <td className="p-2">{word.word}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleViewWord(word)}
                      className="px-3 py-1 bg-green-500 text-white rounded"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-4 text-center">
            <p className="text-lg font-semibold">
              Showing {currentWords.length} of {words.length} words
            </p>

            <div className="flex justify-center mt-2">
              <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 bg-gray-300 rounded mx-1"
              >
                Previous
              </button>
              <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={indexOfLastWord >= words.length}
                className="px-4 py-2 bg-gray-300 rounded mx-1"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {isAddModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0000007a] bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[700px]">
            <h2 className="text-xl font-semibold mb-4">Add New Word</h2>
            <input
              type="text"
              placeholder="Word"
              value={newWord}
              onChange={(e) => setNewWord(e.target.value)}
              className="w-full px-3 py-2 border rounded mb-3"
            />
            <textarea
              placeholder="Definition"
              value={definition}
              onChange={(e) => setDefinition(e.target.value)}
              className="w-full h-[143px] px-3 py-2 border rounded mb-3"
            />
            <div className="flex justify-between">
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddWord}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {isViewModalOpen && selectedWord && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0000007a] bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[500px]">
            <h2 className="text-xl font-semibold mb-4">{selectedWord.word}</h2>
            <p className="text-gray-700">{selectedWord.definition}</p>
            <button
              onClick={() => setIsViewModalOpen(false)}
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
