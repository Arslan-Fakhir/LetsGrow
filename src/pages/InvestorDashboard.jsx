import React from "react";

const startups = [
  {
    id: 1,
    name: "EcoBite",
    entrepreneur: "Arslan Fakhir",
    description: "This startup specializes in sustainable food delivery.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXkORMChqnlSIaSE30NBizeKUSbWoBbGixzQ&s",
  },
  {
    id: 2,
    name: "ChainIQ",
    entrepreneur: "Ahmad Nadeem",
    description: "An AI-powered supply chain optimization solution.",
    image:
      "https://d3lkc3n5th01x7.cloudfront.net/wp-content/uploads/2023/04/14003540/The-role-of-AI-in-logistics-and-supply-chain-banner.png",
  },
  {
    id: 3,
    name: "Harvestly",
    entrepreneur: "Kamran Sajjad",
    description: "A farm-to-table organic produce logistics app.",
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTtNcrEdEnYlInpgb0B5GqBt8fx8J-slr8xMA&s",
  },
];

const InvestorDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Section */}
      <div className="bg-white rounded-2xl shadow-lg p-6 mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex items-center gap-6">
          <img
            src="data:image/jpeg;base64,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"
            alt="Investor Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-blue-600"
          />
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Rayyan Azhar</h2>
            <p className="text-gray-500">Lahore, Pakistan</p>
            <div className="mt-4 space-y-1 text-sm text-gray-700">
              <p>
                <span className="font-semibold">Category:</span> All
              </p>
              <p>
                <span className="font-semibold">Invested Startups:</span> 3
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-xl w-full md:w-auto shadow-sm">
          <h3 className="font-semibold text-gray-800 mb-2">Today's Meeting</h3>
          <p className="text-sm">
            <span className="font-semibold">Startup:</span> ChainIQ
          </p>
          <p className="text-sm">
            <span className="font-semibold">Time:</span> 3:00 PM – 5:00 PM
          </p>
        </div>
      </div>

      {/* Startups Section */}
      <div className="mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Invested Startups
        </h2>
        <p className="text-gray-500 mb-6">
          Explore the startups you've invested in.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map(({ id, name, entrepreneur, description, image }) => (
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
              <h4 className="text-lg font-semibold text-gray-800">{name}</h4>
              <p className="text-sm text-gray-500 mb-2">
                Founder: {entrepreneur}
              </p>
              <p className="text-gray-700 flex-grow">{description}</p>
              <button className="mt-4 bg-green-600 text-white py-2 rounded hover:bg-green-700 transition">
                View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvestorDashboard;
