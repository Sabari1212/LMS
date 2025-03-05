import React, { useState } from 'react';

const Home = () => {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", query);
    // Implement API call or filtering logic here
  };

  return (
    <div className="flex flex-col items-center justify-center h-[350px] mt-10 bg-blue-500 text-white">
      <h1 className="font-bold text-3xl pt-5">Find the Best Courses for You</h1>
      <p className="mb-4 text-black-400">Discover, Learn, and Upskill with our wide range of courses</p>
      <div className="flex items-center bg-gray-800 rounded-lg px-4 py-2 w-96">
        <input type="text" placeholder="Search Courses" className="flex-grow bg-transparent outline-none text-white placeholder-gray-400"/>
        <button onClick={handleSearch}className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg ml-2">Search</button>
      </div>
      <button className="mt-4 bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg">Explore Courses</button>
    </div>
  );
};

export default Home;