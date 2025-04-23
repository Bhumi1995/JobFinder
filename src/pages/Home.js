

"use client";

import { useState, useEffect } from "react";
import JobCard from "../components/JobCard";
import SearchBar from "../components/SearchBar";
import FilterPanel from "../components/FilterPanel";
import { useJobContext } from "../context/JobContext";
import Pagination from "../components/Pagination";

const Home = () =>  {
  const { jobs, loading, error, fetchJobs, searchJobs, applyFilters, currentJobs, currentPage, totalPages, paginate } =
    useJobContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilters, setActiveFilters] = useState({
    jobType: [],
    location: [],
    experience: [],
  });

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleSearch = (term) => {
    setSearchTerm(term);
    searchJobs(term);
  };

  const handleFilterChange = (filters) => {
    setActiveFilters(filters);
    applyFilters(filters);
  };

  return (
    <main className="container">
      <section
        className="mb-10 h-100 w-screen h-[800px]"
        style={{
          backgroundImage:
            "url('https://static1.makeuseofimages.com/wordpress/wp-content/uploads/2022/12/passive-job-search-feature.jpg')",
        }}
      >
        <div className="text-center mb-8 pt-30 float-right mr-[270px] mt-[150px]">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Search through thousands of job listings to find the perfect match
            for your skills and career goals.
          </p>
          <SearchBar
            className=" border border-white-300"
            onSearch={handleSearch}
          />
        </div>
      </section>

      <div className="flex flex-col gap-6 mx-auto px-4 py-8">
        <FilterPanel
          onFilterChange={handleFilterChange}
          activeFilters={activeFilters}
        />

        <div>
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : error ? (
            <div className="text-center p-8 bg-red-50 rounded-lg">
              <p className="text-red-500">{error}</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="text-center p-8 bg-muted rounded-lg">
              <p className="text-muted-foreground">
                No jobs found. Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex justify-between items-center mb-4">
                <p className="text-muted-foreground">
                  {jobs.length} jobs found
                </p>
                <select
                  className="border rounded-md p-2 text-sm"
                  onChange={(e) => console.log(e.target.value)}
                >
                  <option value="latest">Latest</option>
                  <option value="salary">Highest Salary</option>
                  <option value="relevance">Relevance</option>
                </select>
              </div>
              {currentJobs.map((job) => (
                <JobCard key={job.id} job={job} />
              ))}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={paginate}
              />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default Home;