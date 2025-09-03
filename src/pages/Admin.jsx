import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { initDb, saveDb, resetDb } from "../utils/dbHelper";

const Dashboard = () => {
  const [db, setDb] = useState(null);
  const [words, setWords] = useState([]);
  const [allWords, setAllWords] = useState([]);
  const [newWord, setNewWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [isEdit, setIsEdit] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const wordsPerPage = 100;
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user_id");
    if (!user) navigate("/login");

    const loadDb = async () => {
      const loadedDb = await initDb();
      setDb(loadedDb);
    };

    loadDb();
  }, [navigate]);

  useEffect(() => {
    if (db) refreshWords();
  }, [db, currentPage, searchTerm]);

  const refreshWords = async () => {
    if (!db) return;

    try {
      // First, get the total count
      const countStmt = db.prepare("SELECT COUNT(*) as count FROM words");
      countStmt.step();
      const totalCount = countStmt.getAsObject().count;
      countStmt.free();

      // Then get the filtered words
      let query = "SELECT * FROM words";
      let params = [];

      if (searchTerm) {
        query += " WHERE word LIKE ?";
        params = [`%${searchTerm}%`];
      }

      query += " ORDER BY id DESC"; // Order by newest first

      const stmt = db.prepare(query);
      stmt.bind(params);

      const fetchedWords = [];
      while (stmt.step()) {
        const row = stmt.getAsObject();
        fetchedWords.push(row);
      }
      stmt.free();

      console.log('Total words in DB:', totalCount);
      console.log('Fetched words:', fetchedWords.length);

      setAllWords(fetchedWords);
      setTotalPages(Math.ceil(fetchedWords.length / wordsPerPage));
      const paginated = fetchedWords.slice(
        (currentPage - 1) * wordsPerPage,
        currentPage * wordsPerPage
      );
      setWords(paginated);
    } catch (error) {
      console.error('Error refreshing words:', error);
      Swal.fire("Error!", "Failed to refresh the word list.", "error");
    }
  };

  const handleAddOrUpdateWord = async () => {
    if (!newWord || !definition || !db) return;

    try {
      if (isEdit && selectedWord) {
        const stmt = db.prepare("UPDATE words SET word = ?, definition = ? WHERE id = ?");
        stmt.bind([newWord, definition, selectedWord.id]);
        stmt.run();
        stmt.free();
        await Swal.fire("Updated!", "Word updated successfully", "success");
      } else {
        const stmt = db.prepare("INSERT INTO words (word, definition, published) VALUES (?, ?, ?)");
        stmt.bind([newWord, definition, 0]);
        stmt.run();
        stmt.free();
        await Swal.fire("Added!", "New word added successfully", "success");
      }

      await saveDb();
      
      // Force reload the database to ensure fresh state
      const freshDb = await initDb();
      setDb(freshDb);
      
      await refreshWords();
      closeModal();
    } catch (error) {
      console.error('Error adding/updating word:', error);
      Swal.fire("Error!", "Failed to save the word.", "error");
    }
  };

  const handleDeleteWord = async (id) => {
    if (!db) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the word.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        // Execute the delete operation
        const deleteStmt = db.prepare("DELETE FROM words WHERE id = ?");
        deleteStmt.bind([id]);
        deleteStmt.step();
        deleteStmt.free();

        // Save changes to IndexedDB
        await saveDb(db);

        // Reset database completely
        const freshDb = await resetDb();
        setDb(freshDb);

        // Force refresh UI
        setWords([]);
        setAllWords([]);

        // Show success message
        await Swal.fire("Deleted!", "The word has been removed.", "success");

        // Refresh the list after a short delay
        setTimeout(() => {
          refreshWords();
        }, 100);
      } catch (error) {
        console.error('Error deleting word:', error);
        await Swal.fire("Error!", "Failed to delete the word: " + error.message, "error");
        
        // Try to recover by resetting the database
        try {
          const freshDb = await resetDb();
          setDb(freshDb);
          refreshWords();
        } catch (recoveryError) {
          console.error('Recovery failed:', recoveryError);
        }
      }
    }
  };

  const handleViewWord = (word) => {
    setSelectedWord(word);
    setIsViewModalOpen(true);
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
            Total Words: {allWords.length}
          </h2>

          <input
            type="text"
            placeholder="Search words..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
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
