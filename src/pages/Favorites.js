"use client";

import { useEffect } from "react";
import { useJobContext } from "../context/JobContext";
import JobCard from "../components/JobCard";
import { Heart, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Favorites = () => {
  const { favorites, fetchJobs } = useJobContext();

  useEffect(() => {
    // Make sure jobs are loaded
    fetchJobs();
  }, [fetchJobs]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="bg-blue-600">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
              Saved Jobs
            </h1>
            <p className="text-blue-100 text-lg">
              {favorites.length} {favorites.length === 1 ? "job" : "jobs"} saved
              to your collection
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <Link
          to="/"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to job search
        </Link>

        {favorites.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center shadow-sm max-w-2xl mx-auto">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 text-blue-600 dark:text-blue-400 mb-6">
              <Heart className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-semibold mb-3">No saved jobs yet</h2>
            <p className="text-gray-500 dark:text-gray-400 mb-6 max-w-md mx-auto">
              Jobs you save will appear here. Click the heart icon on any job to
              save it for later.
            </p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              Browse Jobs
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            <div className="bg-white p-4 rounded-lg shadow-sm mb-4">
              <div className="flex justify-between items-center">
                <h2 className="text-lg font-semibold">Your Saved Jobs</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {favorites.length} {favorites.length === 1 ? "job" : "jobs"}{" "}
                  saved
                </div>
              </div>
            </div>

            {favorites.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Favorites;
