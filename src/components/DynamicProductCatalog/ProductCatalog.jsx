import React, { useState, useEffect } from "react";
import ProductCategory from "./ProductCategory";
import ProductSubcategory from "./ProductSubcategory";
import ProductList from "./ProductList";

const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState(null); //for all main 6 category
  const [selectedSubcategory, setSelectedSubcategory] = useState(null); // for subcategory under each category
  const [categories, setCategories] = useState([]); //to set fetched all data
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await fetch("/categories.json");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setCategories(data);

        // Set default category and subcategory after data is loaded
        if (data.length > 0) {
          const defaultCategory = data[0]; // take 0 index-Vehicle Parts & Accessories
          const defaultSubcategory = defaultCategory.subcategories?.[0] || null; // take Vehicle Parts & Accessories subcategories 0 index Truck Tires

          setSelectedCategory(defaultCategory);
          setSelectedSubcategory(defaultSubcategory);
        }
      } catch (err) {
        console.error("Error fetching categories:", err);
        setError("Failed to load product categories. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    // Set the first subcategory as default when a category is selected
    if (category.subcategories && category.subcategories.length > 0) {
      setSelectedSubcategory(category.subcategories[0]);
    } else {
      setSelectedSubcategory(null);
    }
  };

  const handleSubcategorySelect = (subcategory) => {
    setSelectedSubcategory(subcategory);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setSelectedSubcategory(null);
  };

  // Scroll down function for the arrow indicator
  const scrollToProducts = () => {
    const productsSection = document.querySelector(".lg\\:flex-row");
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
          <p className="mt-4 text-teal-800">Loading products...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center p-4 bg-red-50 rounded-lg max-w-md">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="px-4 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-800 mb-4 text-center">
          Product Catalog
        </h1>

        {/* Arrow indicator to guide users */}
        <div className="text-center mb-1 animate-bounce">
          <p className="text-teal-700 ">Explore Our Products Below</p>
          <button
            onClick={scrollToProducts}
            className="text-teal-700 hover:text-teal-900 transition-colors focus:outline-none"
            aria-label="Scroll to products"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 mx-auto"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </button>
        </div>

        {/* Category Navigation Row */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <ProductCategory
              key={category.id}
              category={category}
              isSelected={selectedCategory?.id === category.id}
              onSelect={handleCategorySelect}
            />
          ))}
        </div>

        {selectedCategory && (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Category sidebar */}
            <div className="lg:w-1/4 bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-bold text-teal-800 mb-4 flex items-center">
                <span className="mr-2 text-2xl">{selectedCategory.icon}</span>
                {selectedCategory.name}
              </h2>

              <div className="space-y-2">
                {selectedCategory.subcategories?.map((subcategory) => (
                  <ProductSubcategory
                    key={subcategory.id}
                    subcategory={subcategory}
                    isSelected={selectedSubcategory?.id === subcategory.id}
                    onSelect={handleSubcategorySelect}
                  />
                ))}
              </div>
            </div>

            {/* Products display */}
            <div className="lg:w-3/4">
              {selectedSubcategory ? (
                <ProductList
                  category={selectedCategory}
                  subcategory={selectedSubcategory}
                />
              ) : (
                <div className="bg-white rounded-lg shadow-md p-8 text-center">
                  <h3 className="text-xl text-gray-600 mb-4">
                    Select a subcategory to view products
                  </h3>
                  <p className="text-gray-500">
                    Choose from the list on the left to see available products
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCatalog;
