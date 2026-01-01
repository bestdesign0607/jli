export default function CallToAction() {
  return (
    <section className="bg-[#003366] py-20 flex justify-center items-center px-6">
      <div className="max-w-5xl w-full text-center bg-[#ffffff] text-white rounded-2xl py-16 px-6 md:px-16 border border-[#FF0000]/30 shadow-lg">
        <h2 className="text-3xl text-[#003366] md:text-4xl font-bold mb-4">
          Ready to transform your business
        </h2>
        <p className="text-gray-700 mb-8">
          Connect with our team and discover how we can help you achieve your
          business goals
        </p>

        <div className="mt-12 text-center">
          <a
            href="https://wa.me/2347026023535?text=Hello%20Recabite%20Hub,%20I%20need%20support"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#1ebe57] transition-colors"
          >
            Contact Us on WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
