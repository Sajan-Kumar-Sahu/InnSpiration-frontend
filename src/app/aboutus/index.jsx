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
          <picture>
            <source srcSet="/assets/webp/business-people-teamwork.webp" type="image/webp" />
            <img
              src="/assets/business-people-teamwork.jpg"
              alt="Our Mission"
              className="w-full h-auto rounded-xl shadow-md"
              loading="lazy"
            />
          </picture>
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
            <picture>
              <source srcSet="/assets/webp/Why_choose_us.webp" type="image/webp" />
              <img
                src="/assets/Why_choose_us.jpg"
                alt="Why Choose Us"
                className="rounded-lg shadow-lg w-full"
                loading="lazy"
              />
            </picture>
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
            {[
              {
                title: "🛏️ Real-Time Hotel Booking",
                desc: "Browse and book hotels with real-time availability, detailed listings, and instant confirmation."
              },
              {
                title: "📅 Hotel Management Dashboard",
                desc: "Tools for hotel owners to manage rooms, prices, availability, and reservations from one place."
              },
              {
                title: "🔎 Smart Search Filters",
                desc: "Help users find the perfect stay with filters for price, location, ratings, amenities, and more."
              },
              {
                title: "🛠️ Custom Travel Packages",
                desc: "Offer tailored packages including stays, meals, and local experiences — all in one place."
              },
              {
                title: "📊 Revenue & Feedback Insights",
                desc: "Get insights on revenue trends, occupancy rates, and customer feedback with an analytics dashboard."
              },
              {
                title: "📞 24/7 Customer Support",
                desc: "Enjoy round-the-clock support for both guests and hotel partners — via chat, call, or email."
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
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
            {[
              { name: "Sankarshan Pradhan", role: "Frontend Developer", img: "Sankarshan_Photo" },
              { name: "Sajan Kumar Sahu", role: "Backend Developer", img: "sajan_image" },
              { name: "Jyotiraditya Mishra", role: "Cloud Enginner", img: "jalaj" }
            ].map((member, idx) => (
              <div key={idx} className="bg-white p-6 rounded-lg shadow-md">
                <picture>
                  <source srcSet={`/assets/webp/${member.img}.webp`} type="image/webp" />
                  <img
                    src={`/assets/${member.img}.jpg`}
                    alt={member.name}
                    className="w-40 h-50 mx-auto rounded-lg object-cover mb-4"
                    loading="lazy"
                  />
                </picture>
                <h5 className="text-xl font-bold">{member.name}</h5>
                <p className="text-gray-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Aboutus;
