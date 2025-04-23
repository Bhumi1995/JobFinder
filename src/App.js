// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { JobProvider } from "./context/JobContext";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import JobDetails from "./pages/JobDetails";
// import Favorites from "./pages/Favorites";

// function App() {
//   return (
    
//       <JobProvider>
//         <Router>
//           <div className="flex flex-col min-h-screen">
//             <Navbar />
//             <div className="flex-grow">
//               <Routes>
//                 <Route path="/" element={<Home />} />
//                 <Route path="/jobs/:id" element={<JobDetails />} />
//                 <Route path="/favorites" element={<Favorites />} />
//                 <Route path="/jobs/:id" element={<JobDetails/>}/>
//               </Routes>
//             </div>
//             <Footer />
//           </div>
//         </Router>
//       </JobProvider>
    
//   );
// }

// export default App;

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { JobProvider } from "./context/JobContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import JobDetails from "./pages/JobDetails";
import Favorites from "./pages/Favorites";

function App() {
  return (
    <JobProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/jobs/:id" element={<JobDetails />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
          <Footer />
        </div>
      </Router>
    </JobProvider>
  );
}

export default App;

