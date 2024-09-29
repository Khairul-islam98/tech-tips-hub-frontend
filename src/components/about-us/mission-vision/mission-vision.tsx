export default function MissionVision() {
  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Mission & Vision</h2>
        <div className="mt-8 space-y-8">
          {/* Mission */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-black">Our Mission</h3>
            <p className="mt-4 text-gray-700">
              Our mission is to empower developers and tech enthusiasts by
              providing easy-to-follow tech tips, tutorials, and practical guides. 
              We simplify complex technical concepts, making them accessible to all.
            </p>
          </div>
          {/* Vision */}
          <div className="bg-white shadow-md rounded-lg p-8">
            <h3 className="text-2xl font-semibold text-black">Our Vision</h3>
            <p className="mt-4 text-gray-700">
              Our vision is to become the go-to hub for high-quality, insightful,
              and well-organized tech content that encourages learning and collaboration.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}