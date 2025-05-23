import React from "react";

const FormPage = () => {
  return (
    <div>
      <div class="min-h-screen bg-gray-100 py-10 px-4">
        <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8">
          <h2 class="text-3xl font-bold text-center text-green-700 mb-6">
            Submit Your Eco-Innovation
          </h2>

          <form class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label class="block font-semibold mb-1">First Name *</label>
              <input
                type="text"
                placeholder="Saad"
                class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label class="block font-semibold mb-1">Last Name *</label>
              <input
                type="text"
                placeholder="Mehmood"
                class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label class="block font-semibold mb-1">Email *</label>
              <input
                type="email"
                placeholder="you@example.com"
                class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label class="block font-semibold mb-1">CNIC *</label>
              <input
                type="text"
                placeholder="12345-1234567-1"
                class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label class="block font-semibold mb-1">Industry *</label>
              <input
                type="text"
                placeholder="Eco-friendly"
                class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label class="block font-semibold mb-1">Idea Subject</label>
              <input
                type="text"
                placeholder="Sustainable waterplants"
                class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>

            <div class="md:col-span-2">
              <label class="block font-semibold mb-1">Description *</label>
              <textarea
                rows="4"
                placeholder="Describe your idea..."
                class="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              ></textarea>
            </div>

            <div class="md:col-span-2">
              <label class="block font-semibold mb-1">
                Upload Video (optional)
              </label>
              <div class="flex items-center justify-center w-full">
                <label class="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-100">
                  <div class="flex flex-col items-center justify-center pt-5 pb-6">
                    <svg
                      class="w-10 h-10 mb-3 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m4 4H5a2 2 0 01-2-2V7a2 2 0 012-2h3l2 2h8a2 2 0 012 2v9a2 2 0 01-2 2z"
                      />
                    </svg>
                    <p class="text-sm text-gray-500">
                      <span class="font-semibold">Click to upload</span> or drag
                      & drop
                    </p>
                  </div>
                  <input type="file" class="hidden" />
                </label>
              </div>
            </div>

            <div class="md:col-span-2 flex justify-between mt-6">
              <button
                type="submit"
                class="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Contact
              </button>
              <button
                type="submit"
                class="bg-gray-700 text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
              >
                Invest Now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FormPage;
