// ProductList.jsx
import React from "react";

const ProductList = ({ category, subcategory }) => {
  // Function to calculate discount percentage
  const calculateDiscount = (originalPrice, offerPrice) => {
    const discount = ((originalPrice - offerPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-teal-800 flex items-center">
          <span className="mr-2 text-2xl">{category.icon}</span>
          {subcategory.name}
        </h2>
        <p className="text-gray-600">
          Products in {category.name} &gt; {subcategory.name}
        </p>
      </div>

      {subcategory.products && subcategory.products.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subcategory.products.map((product) => (
            <div
              key={product.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Product Image with fixed size */}
              <div className="h-48 w-full bg-gray-100 rounded-md mb-4 flex items-center justify-center overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="object-contain h-full w-full p-2"
                />
              </div>

              {/* Product Name */}
              <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 h-14">
                {product.name}
              </h3>

              {/* Size Selection */}
              {product.sizes && product.sizes.length > 0 && (
                <div className="mb-3">
                  <p className="text-sm text-gray-600 mb-1">Size:</p>
                  <div className="flex flex-wrap gap-2">
                    {product.sizes.map((size, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 border border-gray-300 rounded-md"
                      >
                        {size}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Pricing Information */}
              <div className="mt-auto">
                {product.offerPrice ? (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg font-bold text-teal-600">
                      {product.offerPrice}
                    </span>
                    <span className="text-sm text-gray-500 line-through">
                      {product.price}
                    </span>
                  </div>
                ) : (
                  <p className="text-lg font-bold text-teal-600 mb-2">
                    ${product.price}
                  </p>
                )}

                {/* See Details Button */}
                <button className="w-full bg-teal-500 hover:bg-teal-600 text-white py-2 rounded-md text-sm font-medium transition-colors flex items-center justify-center gap-1">
                  <span>See Details</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : subcategory.subcategories ? (
        <div className="bg-gray-50 rounded-lg p-6 text-center">
          <p className="text-gray-600 mb-4">
            Please select a specific product category from the nested options.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {subcategory.subcategories.map((nestedSubcategory) => (
              <div
                key={nestedSubcategory.id}
                className="bg-white p-4 rounded-lg border border-gray-200"
              >
                <h3 className="font-medium text-teal-800 mb-2">
                  {nestedSubcategory.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {nestedSubcategory.products?.length || 0} products available
                </p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-50 rounded-lg p-8 text-center">
          <div className="text-4xl text-gray-400 mb-4">📦</div>
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No products available
          </h3>
          <p className="text-gray-500">
            There are currently no products in this category.
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
