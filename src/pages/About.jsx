import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-10 px-4 sm:px-8 lg:px-16">
      <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6 sm:p-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-center text-red-500 mb-6">
          ABOUT
        </h1>
        <p className="text-gray-700 text-base sm:text-lg mb-4">
          Welcome to <span className="font-semibold">McGulma's Pharmaceutical Dictionary</span>, a comprehensive resource designed to provide clear, concise, and authoritative definitions of pharmaceutical terms. Whether you are a healthcare professional, student, researcher, or simply someone seeking a better understanding of pharmaceutical terminology, this dictionary offers reliable and accessible information.
        </p>
        <p className="text-gray-700 text-base sm:text-lg mb-4">
          With over <span className="font-semibold">2,500 meticulously curated terms</span>, McGulma's Pharmaceutical Dictionary covers a wide range of topics, including pharmacology, drug formulations, clinical applications, regulatory guidelines, and emerging trends in pharmaceutical sciences. Each entry is crafted to enhance understanding, facilitate learning, and support professional practice.
        </p>
        <p className="text-gray-700 text-base sm:text-lg mb-4">
          This dictionary serves as an essential reference tool for those navigating the dynamic and evolving world of pharmaceuticals. It is not just a glossary of terms but a bridge to deeper knowledge, ensuring that users can confidently interpret and apply pharmaceutical concepts in academic, clinical, and industrial settings.
        </p>
        <p className="text-gray-700 text-base sm:text-lg mb-4 italic">
          Welcome to a world of pharmaceutical knowledge—clearly defined and readily accessible.
        </p>

        <div className="border-t border-gray-200 mt-6 pt-4">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 text-center">
            McGulma’s Pharmaceutical Dictionary
          </h2>
          <p className="text-center text-gray-600 mt-2">
            Kabiru Abubakar Gulma, B. Pharm, MBA, MSc. Ph.D., FRSPH<br />
            <span className="font-semibold">Series Editor</span>
          </p>
        </div>

        <div className="mt-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Expert Editorial Committee
          </h3>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Dr. Aminu Ahmed Biambo</li>
            <li>Dr. Aliyu Sama’ila Musawa</li>
            <li>Pharm. Dike Chika Ugochukwu</li>
            <li>Dr. Balarabe Abdullahi Nazifi</li>
            <li>Pharm. Clement Hamidu</li>
            <li>Dr. Ibrahim Jatau</li>
            <li>Pharm. Abubakar I. Yakubu</li>
          </ul>
        </div>

        <div className="mt-6">
          <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
            Advisory Board
          </h3>
          <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
            <li>Professor Ahmed Tijjani Mora</li>
            <li>Pharm. Jegede Justina Ojonugwa</li>
            <li>Dr. Ismaeel Umar Yunusa</li>
            <li>Dr. Abubakar Sadiq Danraka</li>
            <li>Pharm. Yunusa Zubair</li>
            <li>Abdulhafiz T. Oniyangi</li>
            <li>Abdulazeez K. Oniyangi</li>
            <li>Pharm. Nelson Okwonna Nnamdi</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default About;
