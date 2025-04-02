"use client";
import { useEffect, useState } from "react";
import fetchData from "@/lib/fetchData";
import Card from "@/components/Card";

const ITEMS_PER_PAGE = 16;

export default function HomePage() {
  const [items, setItems] = useState<Item[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState<Item | null>(null);

  useEffect(() => {
    async function load() {
      setIsLoading(true);
      const data = await fetchData();
      setItems(data);
      setIsLoading(false);
    }
    load();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedCard(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const totalPages = Math.ceil(items.length / ITEMS_PER_PAGE);
  const currentItems = items.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <main className="p-4 sm:p-6 lg:p-10 bg-gray-100 min-h-screen">
      {isLoading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {currentItems.map((item) => (
              <Card
                key={item._id}
                item={item}
                onClick={() => setSelectedCard(item)}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-10 flex-wrap gap-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition 
                ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:brightness-110 shadow-md"
                }`}
            >
              ⬅️ Prev
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-full font-medium transition 
                  ${
                    page === currentPage
                      ? "bg-blue-600 text-white shadow-md"
                      : "bg-white text-gray-800 hover:bg-gray-100 border"
                  }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-medium transition 
                ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-indigo-500 to-blue-500 text-white hover:brightness-110 shadow-md"
                }`}
            >
              Next ➡️
            </button>
          </div>
        </>
      )}

      {/* Zoom Modal */}
      {selectedCard && (
        <div
          className="fixed inset-0 bg-white bg-opacity-20 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <Card item={selectedCard} />
          </div>
        </div>
      )}
    </main>
  );
}
