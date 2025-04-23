

// "use client";

// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useJobContext } from "../context/JobContext";
// import { Heart, Briefcase, MapPin, Calendar, Tag } from "lucide-react";

// function JobCard({ job }) {
//   const { addToFavorites, isJobFavorite, getNormalizedJobType } =
//     useJobContext();
//   const [isFavorite, setIsFavorite] = useState(false);
//   const navigate = useNavigate();

//   useEffect(() => {
//     setIsFavorite(isJobFavorite(job.id));
//   }, [job.id, isJobFavorite]);

//   const handleFavoriteToggle = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     addToFavorites(job);
//     setIsFavorite(!isFavorite);
//   };

//   const handleCardClick = () => {
//     navigate(`/jobs/${job.id}`);
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return "Date not specified";
//     try {
//       const date = new Date(dateString);
//       const now = new Date();
//       const diffTime = Math.abs(now - date);
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

//       if (diffDays === 0) return "Today";
//       if (diffDays === 1) return "Yesterday";
//       if (diffDays < 7) return `${diffDays} days ago`;
//       if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

//       return date.toLocaleDateString();
//     } catch {
//       return "Date not specified";
//     }
//   };

//   // Get normalized job type for display
//   const displayJobType = getNormalizedJobType(job);

//   return (
//     <div onClick={handleCardClick} className="cursor-pointer group">
//       <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:translate-y-[-2px]">
//         <div className="p-6">
//           <div className="flex items-start gap-4">
//             <div className="relative h-14 w-14 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-200 dark:border-gray-600">
//               {job.company_logo ? (
//                 <img
//                   src={job.company_logo || "/placeholder.svg"}
//                   alt={job.company_name || "Company logo"}
//                   className="object-contain"
//                 />
//               ) : (
//                 <Briefcase className="h-6 w-6 text-gray-400" />
//               )}
//             </div>

//             <div className="flex-grow">
//               <div className="flex justify-between">
//                 <div>
//                   <div className="flex items-center">
//                     <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
//                       {job.title || "No title"}
//                     </h3>
//                     {job.remote && (
//                       <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded-full">
//                         Remote
//                       </span>
//                     )}
//                   </div>
//                   <p className="text-gray-500 dark:text-gray-400">
//                     {job.company_name || "Company name not specified"}
//                   </p>
//                 </div>
//                 <button
//                   className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
//                     isFavorite
//                       ? "text-red-500"
//                       : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
//                   }`}
//                   onClick={handleFavoriteToggle}
//                   aria-label={
//                     isFavorite ? "Remove from favorites" : "Add to favorites"
//                   }
//                 >
//                   <Heart
//                     className="h-5 w-5"
//                     fill={isFavorite ? "currentColor" : "none"}
//                   />
//                 </button>
//               </div>

//               <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
//                 <div className="flex items-center text-gray-600 dark:text-gray-300">
//                   <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
//                   <span className="text-sm">{displayJobType}</span>
//                 </div>
//                 <div className="flex items-center text-gray-600 dark:text-gray-300">
//                   <MapPin className="h-4 w-4 mr-2 text-gray-400" />
//                   <span className="text-sm truncate">
//                     {job.candidate_required_location || "Remote"}
//                   </span>
//                 </div>
//                 <div className="flex items-center text-gray-600 dark:text-gray-300">
//                   <Calendar className="h-4 w-4 mr-2 text-gray-400" />
//                   <span className="text-sm">{formatDate(job.created_at)}</span>
//                 </div>
//               </div>

//               <div className="mt-4 flex flex-wrap gap-2">
//                 {job.tags &&
//                   job.tags.slice(0, 3).map((tag, index) => (
//                     <span
//                       key={index}
//                       className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-md flex items-center"
//                     >
//                       <Tag className="h-3 w-3 mr-1" />
//                       {tag}
//                     </span>
//                   ))}
//                 {job.tags && job.tags.length > 3 && (
//                   <span className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md border border-gray-200 dark:border-gray-600">
//                     +{job.tags.length - 3} more
//                   </span>
//                 )}
//               </div>

//               <div className="mt-4 flex justify-between items-center">
//                 <Link
//                   to={`/jobs/${job.id}`}
//                   onClick={(e) => e.stopPropagation()}
//                   className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg transition-colors"
//                 >
//                   View Details
//                 </Link>
//                 <span className="text-sm text-gray-500 dark:text-gray-400">
//                   {job.salary || "Salary not specified"}
//                 </span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default JobCard;

"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useJobContext } from "../context/JobContext";
import { Heart, Briefcase, MapPin, Calendar, Tag } from "lucide-react";

const JobCard = ({ job }) => {
  const { addToFavorites, isJobFavorite, getNormalizedJobType } =
    useJobContext();
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsFavorite(isJobFavorite(job.id));
  }, [job.id, isJobFavorite]);

  const handleFavoriteToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToFavorites(job);
    setIsFavorite(!isFavorite);
  };

  const handleViewDetails = (e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("Navigating to job details:", `/jobs/${job.id}`);
    navigate(`/jobs/${job.id}`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Date not specified";
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;

      return date.toLocaleDateString();
    } catch {
      return "Date not specified";
    }
  };

  // Get normalized job type for display
  const displayJobType = getNormalizedJobType(job);

  return (
    <div
      className="cursor-pointer group"
      onClick={() => navigate(`/jobs/${job.id}`)}
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 transform group-hover:translate-y-[-2px]">
        <div className="p-6">
          <div className="flex items-start gap-4">
            <div className="relative h-14 w-14 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden flex-shrink-0 flex items-center justify-center border border-gray-200 dark:border-gray-600">
              {job.company_logo ? (
                <img
                  src={job.company_logo || "/placeholder.svg"}
                  alt={job.company_name || "Company logo"}
                  className="object-contain"
                />
              ) : (
                <Briefcase className="h-6 w-6 text-gray-400" />
              )}
            </div>

            <div className="flex-grow">
              <div className="flex justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {job.title || "No title"}
                    </h3>
                    {job.remote && (
                      <span className="ml-2 px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-400 text-xs rounded-full">
                        Remote
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    {job.company_name || "Company name not specified"}
                  </p>
                </div>
                <button
                  className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${
                    isFavorite
                      ? "text-red-500"
                      : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                  }`}
                  onClick={handleFavoriteToggle}
                  aria-label={
                    isFavorite ? "Remove from favorites" : "Add to favorites"
                  }
                >
                  <Heart
                    className="h-5 w-5"
                    fill={isFavorite ? "currentColor" : "none"}
                  />
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{displayJobType}</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <MapPin className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm truncate">
                    {job.candidate_required_location || "Remote"}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="text-sm">{formatDate(job.created_at)}</span>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {job.tags &&
                  job.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded-md flex items-center"
                    >
                      <Tag className="h-3 w-3 mr-1" />
                      {tag}
                    </span>
                  ))}
                {job.tags && job.tags.length > 3 && (
                  <span className="px-2 py-1 bg-gray-50 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md border border-gray-200 dark:border-gray-600">
                    +{job.tags.length - 3} more
                  </span>
                )}
              </div>

              <div className="mt-4 flex justify-between items-center">
                <button
                  onClick={handleViewDetails}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg transition-colors"
                >
                  View Details
                </button>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {job.salary || "Salary not specified"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobCard;

