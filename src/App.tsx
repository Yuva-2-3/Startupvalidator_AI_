import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ValidatePage from "./pages/ValidatePage";
import AboutPage from "./pages/AboutPage";
import ForumPage from "./pages/ForumPage";
import StartupNewsPage from "./pages/StartupNewsPage";
import FundingFinderPage from "./pages/FundingFinder";  // ✅ Import Funding Finder Page
import { AppProvider } from "./context/AppContext"; 

function App() {
  return (
    <AppProvider>
      <Router>
        <MainLayout />
      </Router>
    </AppProvider>
  );
}

// ✅ Layout Component with Conditional Footer
function MainLayout() {
  const location = useLocation();
  const hideFooter = location.pathname === "/forum"; // Hide footer only on Forum Page

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/validate" element={<ValidatePage />} />
          <Route path="/forum" element={<ForumPage />} />
          <Route path="/startup-news" element={<StartupNewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/funding-finder" element={<FundingFinderPage />} />  {/* ✅ New Route */}
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
