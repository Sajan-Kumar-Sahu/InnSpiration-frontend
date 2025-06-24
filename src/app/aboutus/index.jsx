import React from "react";

const Aboutus = () => {
  return (
    <div className="bg-white text-gray-800">
      {/* Hero Section */}
      <section className="bg-gray-100 py-16 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Story</h1>
          <h2 className="text-lg text-gray-600 max-w-2xl mx-auto">Welcome to InnSpiration </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          your trusted partner in seamless hotel booking and efficient hospitality management. Our platform is designed to make travel planning effortless for guests and operations hassle-free for hotel owners.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-2 gap-10 items-center">
          <img
            src="/assets/business-people-teamwork.jpg"
            alt="Our Mission"
            className="w-full h-auto rounded-xl shadow-md"
          />
          <div>
            <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
            <p className="text-gray-600 text-lg">
            Our mission is to bridge the gap between travelers seeking unforgettable stays and hotel owners striving to deliver exceptional service. We empower both sides with a smart, efficient, and user-friendly digital experience.
            </p>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
        <section className="py-16 bg-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-10">
            
            {/* Text Content */}
            <div className="md:w-1/2">
            <h2 className="text-3xl font-semibold mb-4">Why Choose Us?</h2>
            <p className="text-gray-600 mb-4 text-lg">
                At Innspiration, we believe in delivering more than just hotel bookings — we provide peace of mind, convenience, and exceptional value for both travelers and hoteliers.
            </p>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
                <li>✔️ User-friendly interface and seamless booking experience</li>
                <li>✔️ Smart search tools to find your ideal stay</li>
                <li>✔️ Secure and fast payment options</li>
                <li>✔️ 24/7 customer support for guests and hosts</li>
                <li>✔️ Scalable backend for managing multiple properties</li>
            </ul>
            </div>

            {/* Image */}
            <div className="md:w-1/2">
            <img
                src="/assets/Why choose us.jpg"
                alt="Why Choose Us"
                className="rounded-lg shadow-lg w-full"
            />
            </div>
        </div>
        </section>


      {/* What We Offer Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-semibold mb-4">What We Offer</h2>
            <p className="text-gray-600 max-w-2xl mx-auto mb-10 text-lg">
            Our platform is packed with features designed to simplify the hotel booking experience and
            streamline hotel operations for better efficiency and guest satisfaction.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-left">
            {/* Offer 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-2">🛏️ Real-Time Hotel Booking</h3>
                <p className="text-gray-600">
                Browse and book hotels with real-time availability, detailed listings, and instant confirmation.
                </p>
            </div>

            {/* Offer 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-2">📅 Hotel Management Dashboard</h3>
                <p className="text-gray-600">
                Tools for hotel owners to manage rooms, prices, availability, and reservations from one place.
                </p>
            </div>

            {/* Offer 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-2">🔎 Smart Search Filters</h3>
                <p className="text-gray-600">
                Help users find the perfect stay with filters for price, location, ratings, amenities, and more.
                </p>
            </div>

            {/* Offer 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-2">🛠️ Custom Travel Packages</h3>
                <p className="text-gray-600">
                Offer tailored packages including stays, meals, and local experiences — all in one place.
                </p>
            </div>

            {/* Offer 5 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-2">📊 Revenue & Feedback Insights</h3>
                <p className="text-gray-600">
                Get insights on revenue trends, occupancy rates, and customer feedback with an analytics dashboard.
                </p>
            </div>

            {/* Offer 6 */}
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-2">📞 24/7 Customer Support</h3>
                <p className="text-gray-600">
                Enjoy round-the-clock support for both guests and hotel partners — via chat, call, or email.
                </p>
            </div>
            </div>
        </div>
        </section>

      {/* Team Section */}
            <section className="py-16">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-semibold mb-6">Meet Our Team</h2>
                <p className="text-gray-600 mb-10">
                A passionate group of travelers, developers, and designers.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                {/* Team Member 1 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <img
                    src="/assets/Sankarshan Photo.jpg"
                    alt="Sankarshan Pradhan"
                    className="w-40 h-50 mx-auto rounded-b-lg object-cover object-center mb-4"                    />
                    <h5 className="text-xl font-bold">Sankarshan Pradhan</h5>
                    <p className="text-gray-500">Frontend Developer</p>
                </div>

                {/* Team Member 2 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <img
                    src="/assets/sajan image.jpg"
                    alt="Sajan Kumar Sahu"
                    className="w-40 h-50 mx-auto rounded-lg object-cover mb-4"
                    />
                    <h5 className="text-xl font-bold">Sajan Kumar Sahu</h5>
                    <p className="text-gray-500">Backend Developer</p>
                </div>

                {/* Team Member 3 */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <img
                    src="/assets/jalaj.png"
                    alt="Jyotiraditya Mishra"
                    className="w-40 h-50 mx-auto rounded-lg object-cover mb-4"
                    />
                    <h5 className="text-xl font-bold">Jyotiraditya Mishra</h5>
                    <p className="text-gray-500">Cloud Enginner</p>
                </div>
                </div>
            </div>
            </section>
    </div>
  );
};

export default Aboutus;
