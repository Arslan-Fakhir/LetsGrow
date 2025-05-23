import React from "react";

// Sample data
const startups = [
  {
    id: 1,
    name: "Sustainable Waterplants",
    entrepreneur: "Saad",
    description:
      "A smart solution to grow aquatic plants sustainably in urban environments.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDggk-iYVfU3dzfVcT8ipg-GSFg6mdhOT1g&s",
    rating: 3,
  },
  {
    id: 2,
    name: "Sustainable Glasses",
    entrepreneur: "Ahmad Nadeem",
    description:
      "Eco-friendly eyewear made from recycled and biodegradable materials.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZP23B8aA3G96eNCVgzg_6Mf9t-tHND1c9Cg&s",
    rating: 5,
  },
  {
    id: 3,
    name: "Sustainable Plastic",
    entrepreneur: "Hamza",
    description:
      "Eco-friendly eyewear made from recycled and biodegradable materials.",
    image:
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTdDggk-iYVfU3dzfVcT8ipg-GSFg6mdhOT1g&s",
    rating: 5,
  },
];

const StarRating = ({ count }) => (
  <div className="flex space-x-1 mt-2">
    {[...Array(5)].map((_, index) => (
      <span
        key={index}
        className={`text-yellow-400 text-sm ${
          index < count ? "opacity-100" : "opacity-30"
        }`}
      >
        ★
      </span>
    ))}
  </div>
);

const BrowseStartups = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          🌱 Browse Startup Ideas
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {startups.map(
            ({ id, name, entrepreneur, description, image, rating }) => (
              <div
                key={id}
                className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col transition hover:shadow-xl"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-full h-40 object-cover"
                  loading="lazy"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h4 className="text-lg font-semibold text-gray-800">
                    {name}
                  </h4>
                  <p className="text-sm text-gray-500 mb-1">
                    Founder:{" "}
                    <span className="text-gray-700">{entrepreneur}</span>
                  </p>
                  <p className="text-gray-700 text-sm flex-grow">
                    {description}
                  </p>
                  <StarRating count={rating} />
                  <button className="mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                    View Details
                  </button>
                </div>
              </div>
            )
          )}
        </div>

        <div className="mt-10 flex justify-center">
          <button className="bg-green-700 text-white font-semibold px-6 py-3 rounded-full hover:bg-green-800 transition">
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default BrowseStartups;
