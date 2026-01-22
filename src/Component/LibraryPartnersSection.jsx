import React from "react";

const partners = [
    {
        name: "City Library",
        logo: "/logos/city-library.jpeg",
    },
    {
        name: "Central Library",
        logo: "/logos/central-library.webp",
    },
    {
        name: "University Library",
        logo: "/logos/university-library.jpeg",
    },
    {
        name: "Regional Library",
        logo: "/logos/regional-library.jpeg",
    },
];


const LibraryPartnersSection = () => {
    return (
        <section className="py-20 bg-gray-50 dark:bg-gray-950">
            {/* Header */}
            <div className="max-w-6xl mx-auto px-6 text-center mb-14">
                <h2 className="text-4xl font-bold text-blue-700 dark:text-blue-400">
                    Trusted Library Partners
                </h2>
                <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                    We work with selected libraries to ensure quality resources,
                    fast access, and reliable service.
                </p>
            </div>

            {/* Cards */}
            <div className="max-w-8xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                {partners.map((partner, index) => (
                    <div
                        key={index}
                        className="group bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-800"
                    >
                        {/* Image */}
                        <div className="h-16 flex items-center justify-center mb-4">
                            <img
                                src={partner.logo}
                                alt={partner.name}
                                onError={(e) => {
                                    e.currentTarget.src =
                                        "https://via.placeholder.com/120x80?text=Library";
                                }}
                                className="max-h-14 object-contain transition group-hover:scale-105"
                            />
                        </div>

                        {/* Text */}
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 text-center">
                            {partner.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400 text-center">
                            Trusted institutional partner with verified resources.
                        </p>

                        {/* Accent */}
                        <div className="mt-4 h-1 w-14 mx-auto rounded-full bg-green-600 dark:bg-green-400" />
                    </div>
                ))}
            </div>



            {/* CTA */}
            <div className="mt-16 text-center">
                <button className="px-8 py-4 rounded-xl bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 text-white font-semibold transition">
                    Become a Partner
                </button>
            </div>
        </section>
    );
};

export default LibraryPartnersSection;
