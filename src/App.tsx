import React, { useState } from "react";
import { useFetchData } from "./hooks/useFetchData";
import Table from "./components/Table";
import Filters from "./components/Filters";
import { sortData, filterData } from "./utils";

const App: React.FC = () => {
  const { data, isLoading, isError } = useFetchData();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [sortKey, setSortKey] = useState<string>("country");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [confirmedSearchTerm, setConfirmedSearchTerm] = useState<string>("");

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="flex items-center text-purple-700">
          <svg
            className="animate-spin h-6 w-6 mr-3"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C1.8 0 0 1.8 0 4a8 8 0 004 8z"
            ></path>
          </svg>
          <p className="text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen bg-red-100">
        <p className="text-2xl font-bold text-red-500 mb-4">
          Error loading data
        </p>
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => {
            window.location.reload();
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  let processedData = sortData(data, sortKey as any, sortOrder);

  if (selectedCountry) {
    processedData = filterData(processedData, selectedCountry);
  }

  if (confirmedSearchTerm) {
    processedData = filterData(processedData, confirmedSearchTerm);
  }

  // Pagination
  const totalPages = Math.ceil(processedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const displayedData = processedData.slice(startIndex, endIndex);

  return (
    <div className="container mx-auto p-4">
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSelectedCountry={setSelectedCountry}
        setConfirmedSearchTerm={setConfirmedSearchTerm}
        setSortKey={setSortKey}
        setSortOrder={setSortOrder}
      />
      <Table data={displayedData} />
      <div className="flex justify-between items-center mt-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        >
          Previous
        </button>
        <span className="text-lg">
          {currentPage} / {totalPages}
        </span>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default App;
