import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const cities = [
  { name: "Dhaka", position: [23.8103, 90.4125] },
  { name: "Chittagong", position: [22.3569, 91.7832] },
  { name: "Rajshahi", position: [24.3745, 88.6042] },
  { name: "Khulna", position: [22.8456, 89.5403] },
];

const CoverageSection = () => {
  return (
    <section className="py-16 px-6 bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-7xl mx-auto text-center mb-10">
        <h2 className="text-4xl font-bold text-gray-800 mb-2">
          Our Delivery Cities
        </h2>
        <p className="text-gray-600 text-lg">
          We deliver books across multiple cities. Click on a city to see its location.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cities.map((city, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-lg overflow-hidden transform hover:scale-105 transition duration-300"
          >
            <div className="h-40">
              <MapContainer
                center={city.position}
                zoom={10}
                className="h-full w-full"
                scrollWheelZoom={false}
              >
                <TileLayer
                  attribution="&copy; OpenStreetMap contributors"
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={city.position} />
              </MapContainer>
            </div>
            <div className="p-4 text-center">
              <h3 className="font-bold text-gray-800 text-lg">{city.name}</h3>
              <p className="text-gray-600 text-sm mt-1">
                Book delivery available here
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CoverageSection;
