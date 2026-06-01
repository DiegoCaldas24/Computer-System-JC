import { useEffect } from "react";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { SearchProvider } from "./context/SearchContext";
import { WhatsAppButton } from "./components/WhatsAppButton";

// --- Main App ---
export default function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <SearchProvider>
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-sky-100 selection:text-sky-700">
      <Navbar />
      <main>
        <Outlet />
      </main>

      <Footer />

      <WhatsAppButton />

      <style
        dangerouslySetInnerHTML={{
          __html: `
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-slow {
          animation: bounce-slow 4s ease-in-out infinite;
        }
      `,
        }}
      />
    </div>
    </SearchProvider>
  );
}
