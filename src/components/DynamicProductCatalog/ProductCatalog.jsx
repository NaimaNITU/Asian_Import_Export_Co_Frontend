import React, { useState, useEffect } from "react";
import ProductCategory from "./ProductCategory";
import ProductSubcategory from "./ProductSubcategory";
import ProductList from "./ProductList";

const ProductCatalog = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);

  // Sample product data structure
  const categories = [
    {
      id: 1,
      name: "Vehicle Parts & Accessories",
      icon: "🚗",
      subcategories: [
        {
          id: 101,
          name: "Truck Tires",
          products: [
            { id: 1001, name: "Heavy Duty Truck Tires", price: "$250" },
            { id: 1002, name: "All Season Truck Tires", price: "$280" },
          ],
        },
        {
          id: 102,
          name: "Golf Cart",
          products: [
            { id: 1003, name: "Electric Golf Cart", price: "$5,200" },
            { id: 1004, name: "Gas Golf Cart", price: "$4,800" },
          ],
        },
        {
          id: 103,
          name: "Rim",
          products: [
            { id: 1005, name: "Alloy Rims", price: "$120" },
            { id: 1006, name: "Steel Rims", price: "$85" },
          ],
        },
        {
          id: 104,
          name: "Electric Bike",
          products: [
            { id: 1007, name: "Mountain E-Bike", price: "$1,200" },
            { id: 1008, name: "City E-Bike", price: "$950" },
          ],
        },
        {
          id: 105,
          name: "Other parts",
          products: [
            { id: 1009, name: "Brake Pads", price: "$45" },
            { id: 1010, name: "Headlights", price: "$75" },
          ],
        },
      ],
    },
    {
      id: 2,
      name: "Metals & Metal Products",
      icon: "🔩",
      subcategories: [
        {
          id: 201,
          name: "Copper Scrap",
          products: [
            { id: 2001, name: "Clean Copper Scrap", price: "$6.50/kg" },
            { id: 2002, name: "Copper Wire Scrap", price: "$5.80/kg" },
          ],
        },
        {
          id: 202,
          name: "Cathode Copper",
          products: [
            { id: 2003, name: "Grade A Cathode Copper", price: "$8,200/ton" },
          ],
        },
        {
          id: 203,
          name: "Aluminum Metal",
          products: [
            { id: 2004, name: "Aluminum Ingots", price: "$2,200/ton" },
            { id: 2005, name: "Aluminum Sheets", price: "$3.50/kg" },
          ],
        },
      ],
    },
    {
      id: 3,
      name: "Dry Food",
      icon: "🍚",
      subcategories: [
        {
          id: 301,
          name: "Rice",
          products: [
            { id: 3001, name: "Basmati Rice", price: "$45/25kg" },
            { id: 3002, name: "Jasmine Rice", price: "$38/25kg" },
          ],
        },
        {
          id: 302,
          name: "Sugar",
          products: [
            { id: 3003, name: "White Refined Sugar", price: "$32/25kg" },
            { id: 3004, name: "Brown Sugar", price: "$36/25kg" },
          ],
        },
        {
          id: 303,
          name: "Nuts",
          subcategories: [
            {
              id: 3031,
              name: "Cashew Nuts",
              products: [
                { id: 3005, name: "Whole Cashews", price: "$12/kg" },
                { id: 3006, name: "Cashew Pieces", price: "$10/kg" },
              ],
            },
            {
              id: 3032,
              name: "Almond Nuts",
              products: [
                { id: 3007, name: "California Almonds", price: "$14/kg" },
                { id: 3008, name: "Organic Almonds", price: "$16/kg" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 4,
      name: "Agriculture",
      icon: "🌱",
      subcategories: [
        {
          id: 401,
          name: "Fresh Potatoes",
          products: [
            { id: 4001, name: "Red Potatoes", price: "$15/20kg" },
            { id: 4002, name: "Russet Potatoes", price: "$12/20kg" },
          ],
        },
        {
          id: 402,
          name: "Fresh Onion",
          products: [
            { id: 4003, name: "Yellow Onions", price: "$18/20kg" },
            { id: 4004, name: "Red Onions", price: "$20/20kg" },
          ],
        },
        {
          id: 403,
          name: "Organic Tea",
          products: [
            { id: 4005, name: "Green Tea", price: "$25/kg" },
            { id: 4006, name: "Black Tea", price: "$22/kg" },
          ],
        },
      ],
    },
    {
      id: 5,
      name: "Frozen Fish",
      icon: "🐟",
      subcategories: [
        {
          id: 501,
          name: "Eel",
          products: [{ id: 5001, name: "Freshwater Eel", price: "$18/kg" }],
        },
        {
          id: 502,
          name: "Crab",
          products: [
            { id: 5002, name: "Snow Crab", price: "$28/kg" },
            { id: 5003, name: "King Crab", price: "$45/kg" },
          ],
        },
        {
          id: 503,
          name: "Shrimps",
          products: [
            { id: 5004, name: "White Shrimp", price: "$16/kg" },
            { id: 5005, name: "Tiger Shrimp", price: "$22/kg" },
          ],
        },
        {
          id: 504,
          name: "Frozen Tilapia",
          products: [
            { id: 5006, name: "Whole Tilapia", price: "$8/kg" },
            { id: 5007, name: "Tilapia Fillets", price: "$12/kg" },
          ],
        },
        {
          id: 505,
          name: "Pacific Mackerel Fish",
          products: [{ id: 5008, name: "Whole Mackerel", price: "$10/kg" }],
        },
      ],
    },
    {
      id: 6,
      name: "Wood",
      icon: "🪵",
      subcategories: [
        {
          id: 601,
          name: "Wood Pellets",
          products: [
            { id: 6001, name: "Premium Wood Pellets", price: "$280/ton" },
            { id: 6002, name: "Standard Wood Pellets", price: "$240/ton" },
          ],
        },
      ],
    },
  ];

  // Set default category and subcategory on initial load
  useEffect(() => {
    const defaultCategory = categories[0]; // Vehicle Parts & Accessories
    const defaultSubcategory = defaultCategory.subcategories[0]; // Truck Tires

    setSelectedCategory(defaultCategory);
    setSelectedSubcategory(defaultSubcategory);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-teal-800 mb-8 text-center">
          Product Catalog
        </h1>

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
                {selectedCategory.subcategories.map((subcategory) => (
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
