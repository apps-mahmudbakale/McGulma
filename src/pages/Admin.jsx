import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createClient } from "@supabase/supabase-js";
import Swal from "sweetalert2";

const supabase = createClient(
  "https://zcjxkiumbmmqeetouwrq.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpjanhraXVtYm1tcWVldG91d3JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzg5NzgwODQsImV4cCI6MjA1NDU1NDA4NH0.dXF58HghMOt4Be9q51_3L8wPFLmtmVmMZWNNl9egL7Y"
);

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [words, setWords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWord, setNewWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const wordsPerPage = 100; // Set the pagination limit
  const navigate = useNavigate();
  const [totalWords, setTotalWords] = useState(0);

  useEffect(() => {
    const storedUser = localStorage.getItem("user_id");
    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(storedUser);
    }
    fetchWords();
  }, [navigate, currentPage, searchTerm]);

  const fetchWords = async () => {
    let query = supabase
      .from("words")
      .select("id, word, definition", { count: "exact" }) // Count total words
      .order("word", { ascending: true })
      .range((currentPage - 1) * wordsPerPage, currentPage * wordsPerPage - 1);
  
    if (searchTerm) {
      query = query.ilike("word", `%${searchTerm}%`);
    }
  
    const { data, error, count } = await query;
  
    if (error) {
      console.error("Error fetching words:", error);
    } else {
      setWords(data);
      setTotalWords(count); // Set total words
      setTotalPages(Math.ceil(count / wordsPerPage));
    }
  };

  const handleAddOrUpdateWord = async () => {
    if (!newWord || !definition) return;

    if (isEdit && selectedWord) {
      // Update Word
      const { error } = await supabase
        .from("words")
        .update({ word: newWord, definition })
        .eq("id", selectedWord.id);

      if (!error) {
        Swal.fire("Updated!", "Word updated successfully", "success");
        fetchWords();
        closeModal();
      }
    } else {
      // Add Word
      const { error } = await supabase
        .from("words")
        .insert([{ word: newWord, definition, published: false }]);

      if (!error) {
        Swal.fire("Added!", "New word added successfully", "success");
        fetchWords();
        closeModal();
      }
    }
  };

  const handleViewWord = (word) => {
    setSelectedWord(word);
    setIsViewModalOpen(true);
  };

  const handleDeleteWord = async (wordId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to recover this word!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const { error } = await supabase
          .from("words")
          .delete()
          .eq("id", wordId);

        if (!error) {
          Swal.fire("Deleted!", "The word has been deleted.", "success");
          fetchWords();
        }
      }
    });
  };

  const handleEditWord = (word) => {
    setSelectedWord(word);
    setNewWord(word.word);
    setDefinition(word.definition);
    setIsEdit(true);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setNewWord("");
    setDefinition("");
    setSelectedWord(null);
    setIsEdit(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user_id");
    navigate("/login");
  };

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
            Total Words: {totalWords}
          </h2>
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search words..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-3 py-2 border rounded mb-3"
          />
          <button
            onClick={() => setIsModalOpen(true)}
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
              {words.map((word) => (
                <tr key={word.id} className="border border-gray-300">
                  <td className="p-2">{word.word}</td>
                  <td className="p-2">
                    <button
                      onClick={() => handleViewWord(word)}
                      className="px-3 py-1 bg-blue-500 text-white rounded mx-1"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleEditWord(word)}
                      className="px-3 py-1 bg-yellow-500 text-white rounded mx-1"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteWord(word.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded mx-1"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPage === 1 ? "bg-gray-300" : "bg-blue-500 text-white"
              }`}
            >
              Previous
            </button>
            <span className="px-4 py-2 border rounded">
              {currentPage} / {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(currentPage + 1)}
              className={`px-4 py-2 mx-1 border rounded ${
                currentPage === totalPages
                  ? "bg-gray-300"
                  : "bg-blue-500 text-white"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>

      {/* Add/Edit Word Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#0000007a] bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-[700px]">
            <h2 className="text-xl font-semibold mb-4">
              {isEdit ? "Edit Word" : "Add New Word"}
            </h2>
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
                onClick={closeModal}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleAddOrUpdateWord}
                className="px-4 py-2 bg-blue-500 text-white rounded"
              >
                {isEdit ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
      {/* View Modal */}
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
