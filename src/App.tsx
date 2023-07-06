// reset CSS
import "./style/reset.css";
  import { Route, BrowserRouter as Router, Routes, HashRouter  } from "react-router-dom";
import { HomePage, TestPage } from "./pages";

function App() {

  return (
    <div className="App vh100">
      <HashRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/test" element={<TestPage />} />
        </Routes>
      </HashRouter>
    </div>
  );
}

export default App;

// import React from 'react';
// import { Routes, Route } from 'react-router-dom';
// // import Home from './components/Home';
// // import About from './components/About';
// // import Contact from './components/Contact';
// // import NotFound from './components/NotFound';

// function App() {

//   function Home() {
//     return <h1>Home Page</h1>;
//   }
  
//   function About() {
//     return <h1>About Page</h1>;
//   }
  
//   function Contact() {
//     return <h1>Contact Page</h1>;
//   }
  
//   function NotFound() {
//     return <h1>Page Not Found</h1>;
//   }

//   return (
//     <div>
//       {/* Your application header or navigation */}
      
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/about" element={<About />} />
//         <Route path="/contact" element={<Contact />} />
//         <Route path="*" element={<NotFound />} />
//       </Routes>
      
//       {/* Your application footer */}
//     </div>
//   );
// }

// export default App;

