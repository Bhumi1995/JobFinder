

"use client";

import { useMemo } from "react";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";

const JobContext = createContext();

export const JobProvider = ({ children }) => {
  const [jobs, setJobs] = useState([]);
  const [allJobs, setAllJobs] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [jobsPerPage] = useState(10);
  const [filters, setFilters] = useState({
    workMode: [],
    location: [],
    jobType: [],
  });

  // Add a new searchTerm state
  const [searchTerm, setSearchTerm] = useState("");

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(
        "https://www.arbeitnow.com/api/job-board-api"
      );
      const jobsWithIds = response.data.data.map((job) => {
        // Normalize location data by taking the first part before comma
        const normalizedLocation = (job.location || "Remote")
          .toString()
          .split(",")[0]
          .trim();

        return {
          ...job,
          id: job.id || Math.random().toString(36).substr(2, 9),
          company_name: job.company_name || job.company,
          job_type: job.job_type || job.type,
          description: job.description || "",
          candidate_required_location: normalizedLocation,
          tags: job.tags || [],
          remote: job.remote || false,
        };
      });
      setJobs(jobsWithIds);
      setAllJobs(jobsWithIds);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError("Failed to fetch jobs. Please try again later.");
      setLoading(false);
    }
  }, []);

  // Helper function to normalize job types
  const getNormalizedJobType = useCallback((job) => {
    const description = (job.description || "").toString().toLowerCase();
    const jobType = (job.job_type || "").toString().toLowerCase();

    if (description.includes("part-time") || jobType.includes("part-time")) {
      return "Part-time";
    }
    if (description.includes("freelance") || jobType.includes("freelance")) {
      return "Freelance";
    }
    if (description.includes("contract") || jobType.includes("contract")) {
      return "Contract";
    }
    return "Full-time"; // Default
  }, []);

  // Extract all unique filter options
  const allWorkModes = ["Remote", "Hybrid", "On-site"];

  const allLocations = useMemo(() => {
    return [
      ...new Set(
        allJobs.map((job) => job.candidate_required_location || "Remote")
      ),
    ].filter(Boolean);
  }, [allJobs]);

  const allJobTypes = ["Full-time", "Part-time", "Contract", "Freelance"];

  // Modify the useEffect that applies filters to also consider the search term
  useEffect(() => {
    if (allJobs.length === 0) return;

    // Always start with all jobs
    let filtered = [...allJobs];

    // Apply search filter first if there's a search term
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (job) =>
          (job.title || "").toLowerCase().includes(term) ||
          (job.company_name || "").toLowerCase().includes(term) ||
          (job.description || "").toLowerCase().includes(term)
      );
    }

    // Work mode filter
    if (filters.workMode.length > 0) {
      filtered = filtered.filter((job) => {
        const jobWorkMode = job.remote
          ? "Remote"
          : (job.description || "").toString().toLowerCase().includes("hybrid")
          ? "Hybrid"
          : "On-site";
        return filters.workMode.includes(jobWorkMode);
      });
    }

    // Location filter - exact match with normalized locations
    if (filters.location.length > 0) {
      filtered = filtered.filter((job) => {
        const jobLocation = (job.candidate_required_location || "Remote")
          .toString()
          .toLowerCase();
        return filters.location.some(
          (loc) => loc.toString().toLowerCase() === jobLocation.toLowerCase()
        );
      });
    }

    // Job type filter
    if (filters.jobType.length > 0) {
      filtered = filtered.filter((job) => {
        const normalizedType = getNormalizedJobType(job);
        return filters.jobType.includes(normalizedType);
      });
    }

    setJobs(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters, allJobs, getNormalizedJobType, searchTerm]);

  const updateFilter = (filterType, value) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: Array.isArray(value) ? value : [value].filter(Boolean),
    }));
  };

  const clearFilters = () => {
    setFilters({
      workMode: [],
      location: [],
      jobType: [],
    });
  };

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem("jobFavorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("jobFavorites", JSON.stringify(favorites));
  }, [favorites]);

  // Calculate current jobs
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Update the searchJobs function to just set the searchTerm
  const searchJobs = useCallback((term) => {
    setSearchTerm(term);
  }, []);

  const getJobById = useCallback(
    async (id) => {
      let job = jobs.find((job) => job.id.toString() === id.toString());
      if (!job) {
        job = favorites.find((job) => job.id.toString() === id.toString());
      }
      if (!job) {
        try {
          const response = await axios.get(
            "https://www.arbeitnow.com/api/job-board-api"
          );
          job = response.data.jobs.find(
            (job) => job.id.toString() === id.toString()
          );
        } catch (err) {
          console.error("Error fetching job details:", err);
        }
      }
      return job;
    },
    [jobs, favorites]
  );

  const addToFavorites = useCallback((job) => {
    setFavorites((prev) => {
      const exists = prev.some((fav) => fav.id === job.id);
      return exists ? prev.filter((fav) => fav.id !== job.id) : [...prev, job];
    });
  }, []);

  const removeFromFavorites = useCallback((jobId) => {
    setFavorites((prev) => prev.filter((job) => job.id !== jobId));
  }, []);

  const isJobFavorite = useCallback(
    (jobId) => favorites.some((job) => job.id === jobId),
    [favorites]
  );

  const value = {
    jobs,
    allJobs,
    favorites,
    loading,
    error,
    fetchJobs,
    searchJobs,
    getJobById,
    addToFavorites,
    removeFromFavorites,
    isJobFavorite,
    currentPage,
    jobsPerPage,
    totalPages: Math.ceil(jobs.length / jobsPerPage),
    paginate,
    currentJobs,
    allWorkModes,
    allLocations,
    allJobTypes,
    filters,
    getNormalizedJobType,
    updateFilter,
    clearFilters,
    applyFilters: updateFilter, // Alias for backward compatibility
  };

  return <JobContext.Provider value={value}>{children}</JobContext.Provider>;
}

export const useJobContext = () => {
  const context = useContext(JobContext);
  if (context === undefined) {
    throw new Error("useJobContext must be used within a JobProvider");
  }
  return context;
};
