import { FaSearch, FaBookmark } from "react-icons/fa";
import HomeLogo from "../assets/HomeLogo.png";

const Home = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      {/* Content Container */}
      <div className="text-center">
        {/* Illustration */}
        <img 
          src={HomeLogo}
          alt="Dictionary Illustration" 
          className="w-48 mx-auto mb-4"
        />

        {/* Title */}
        <h1 className="text-3xl font-bold text-red-500 sm:text-4xl">
          McGulma’s Pharmaceutical Dictionary
          <span className="block text-lg text-gray-600">(Lexicon Pharmaceuticae McGulmae)</span>
        </h1>
        <p className="text-xl sm:text-2xl p-4 font-medium text-gray-600">Nigeria’s first pharmaceutical dictionary</p>
        <p className="text-xl sm:text-2xl font-medium italic text-blue-600">2,500+ definitions</p>

        {/* Search Bar */}
        <div className="relative mt-6 w-full max-w-md mx-auto">
          <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Enter word"
            className="w-full py-3 pl-12 pr-4 bg-white rounded-lg shadow-md focus:outline-none"
          />
        </div>

        {/* Publication Info */}
        <div className="mt-8 bg-white shadow-lg rounded-lg p-4 sm:p-6 max-w-lg mx-auto text-sm sm:text-base text-gray-700 text-center leading-relaxed">
          <p><strong>First published in Nigeria in 2025</strong></p>
          <p>ISBN: <span className="font-medium">978-978-774-985-5</span></p>
          <p>National Library of Nigeria Cataloguing-in-Publication Data</p>
          <p>A catalog record for this book is available from the National Library of Nigeria.</p>
          <p className="mt-2 text-gray-800 font-semibold">© Dr. Kabiru Abubakar Gulma, 2025. All rights reserved!</p>
        </div>
      </div>

      {/* Floating Bookmark Button */}
      <div className="fixed bottom-10">
        <button className="bg-red-500 p-4 rounded-full shadow-lg text-white">
          <FaBookmark className="text-xl" />
        </button>
      </div>
    </div>
  );
};

export default Home;
