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

        <div className="flex justify-center gap-4">
          <button className="bg-[#FF0000] text-white font-semibold py-2 px-6 rounded-md hover:bg-[#003366] hover:text-[#ffffff] transition-all">
            Contact us
          </button>
          
        </div>
      </div>
    </section>
  );
}
