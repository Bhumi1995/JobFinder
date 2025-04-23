
"use client";

import { useState } from "react";
import { Filter } from "lucide-react";
import { useJobContext } from "../context/JobContext";

const FilterPanel = () => {
  const {
    allWorkModes,
    allLocations,
    allJobTypes,
    filters,
    updateFilter,
    clearFilters,
  } = useJobContext();

  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (filterType, value) => {
    updateFilter(filterType, value);
  };

  const hasActiveFilters = 
    filters.workMode.length > 0 || 
    filters.location.length > 0 || 
    filters.jobType.length > 0;

  return (
    <div className="mt-6">
      <div className="flex justify-between items-center">
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="flex items-center text-gray-700 hover:text-blue-600"
        >
          <Filter className="h-5 w-5 mr-2" />
          <span className="font-medium">Filters</span>
          {hasActiveFilters && (
            <span className="ml-2 px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
              Active
            </span>
          )}
        </button>

        {hasActiveFilters && (
          <button 
            onClick={clearFilters} 
            className="text-sm text-blue-600 hover:text-blue-800"
          >
            Clear all
          </button>
        )}
      </div>

      {isOpen && (
        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-gray-50 rounded-lg">
          {/* Location Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <select
              value={filters.location[0] || ""}
              onChange={(e) => handleFilterChange("location", e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Locations</option>
              {allLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>

          {/* Job Type Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Job Type
            </label>
            <select
              value={filters.jobType[0] || ""}
              onChange={(e) => handleFilterChange("jobType", e.target.value ? [e.target.value] : [])}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Types</option>
              {allJobTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* Work Mode Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Work Mode
            </label>
            <select
              value={filters.workMode[0] || ""}
              onChange={(e) => handleFilterChange("workMode", e.target.value ? [e.target.value] : [])}
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">All Modes</option>
              {allWorkModes.map((mode) => (
                <option key={mode} value={mode}>
                  {mode}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;